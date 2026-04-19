/**
 * SVG → extruded Three.js geometry.
 *
 * Framework-free: pure Three.js with no React or R3F dependencies. Used by
 * the viewer component to turn an SVG string into a merged BufferGeometry
 * with triplanar UVs and the scale/center metadata the scene needs.
 *
 * Extrusion + UV logic adapted from 3dsvg (MIT, © Renato Costa).
 */

import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export interface ExtrusionResult {
  geometry: THREE.BufferGeometry;
  center: THREE.Vector3;
  baseScale: number;
}

function recomputeTriplanarUVs(geo: THREE.BufferGeometry, bb: THREE.Box3) {
  const bbSize = new THREE.Vector3();
  bb.getSize(bbSize);
  const uvAttr = geo.attributes.uv;
  const posAttr = geo.attributes.position;
  const normalAttr = geo.attributes.normal;
  const maxDimUv = Math.max(bbSize.x, bbSize.y, bbSize.z) || 1;

  for (let j = 0; j < uvAttr.count; j++) {
    const px = posAttr.getX(j);
    const py = posAttr.getY(j);
    const pz = posAttr.getZ(j);
    const nx = Math.abs(normalAttr.getX(j));
    const ny = Math.abs(normalAttr.getY(j));
    const nz = Math.abs(normalAttr.getZ(j));

    let u: number, v: number;
    if (nz >= nx && nz >= ny) {
      u = (px - bb.min.x) / maxDimUv;
      v = 1 - (py - bb.min.y) / maxDimUv;
    } else if (nx >= ny) {
      u = (pz - bb.min.z) / maxDimUv;
      v = 1 - (py - bb.min.y) / maxDimUv;
    } else {
      u = (px - bb.min.x) / maxDimUv;
      v = (pz - bb.min.z) / maxDimUv;
    }
    uvAttr.setXY(j, u, v);
  }
  uvAttr.needsUpdate = true;
}

function isViewBoxRect(shape: THREE.Shape, vbW: number, vbH: number): boolean {
  // Consider a shape a "viewBox rect" (likely a background) if either:
  // (a) it's a 4-5 point polygon within 8% of the canvas size, OR
  // (b) any shape whose bounding box covers ≥92% of the canvas area.
  // Figma/Sketch exports often have bg rects with a 0.5px outer margin that
  // fails a tight exact-match check, and some exports wrap the bg in a path.
  const pts = shape.getPoints(4);
  const bb = new THREE.Box2();
  for (const p of pts) bb.expandByPoint(p);
  const size = new THREE.Vector2();
  bb.getSize(size);
  const canvasArea = vbW * vbH;
  const shapeArea = size.x * size.y;
  const coverage = shapeArea / canvasArea;

  if (coverage >= 0.92) return true;

  if (pts.length === 4 || pts.length === 5) {
    const tolerance = 0.08;
    if (
      Math.abs(size.x - vbW) / vbW < tolerance &&
      Math.abs(size.y - vbH) / vbH < tolerance
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Strip `<pattern>` declarations and neutralize `fill="url(#patternId)"`
 * references so SVGLoader doesn't expand them into hundreds of tile shapes.
 * Common culprit: design-tool exports that bake a checker pattern as a
 * "transparency indicator" into the SVG content itself.
 */
function preprocessSvg(svg: string): string {
  const idMatches = svg.matchAll(
    /<pattern\b[^>]*\bid\s*=\s*["']([^"']+)["'][^>]*>/gi,
  );
  const patternIds = new Set<string>();
  for (const m of idMatches) patternIds.add(m[1]);

  if (patternIds.size === 0) return svg;

  let cleaned = svg.replace(/<pattern\b[\s\S]*?<\/pattern>/gi, "");

  for (const id of patternIds) {
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    cleaned = cleaned.replace(
      new RegExp(`fill\\s*=\\s*["']url\\(#${safe}\\)["']`, "gi"),
      'fill="none"',
    );
    cleaned = cleaned.replace(
      new RegExp(`stroke\\s*=\\s*["']url\\(#${safe}\\)["']`, "gi"),
      'stroke="none"',
    );
  }

  return cleaned;
}

function inferCanvasSize(svgString: string): { w: number; h: number } | null {
  // Prefer viewBox; fall back to the svg root's width/height when absent.
  const vbMatch = svgString.match(
    /viewBox\s*=\s*["']\s*([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)/,
  );
  if (vbMatch) {
    const w = parseFloat(vbMatch[3]);
    const h = parseFloat(vbMatch[4]);
    if (w > 0 && h > 0) return { w, h };
  }
  const svgTagMatch = svgString.match(/<svg\b[^>]*>/i);
  const tag = svgTagMatch?.[0] ?? "";
  const wMatch = tag.match(/\bwidth\s*=\s*["']?([\d.]+)/i);
  const hMatch = tag.match(/\bheight\s*=\s*["']?([\d.]+)/i);
  if (wMatch && hMatch) {
    const w = parseFloat(wMatch[1]);
    const h = parseFloat(hMatch[1]);
    if (w > 0 && h > 0) return { w, h };
  }
  return null;
}

function parseShapesFromSVG(svgString: string): THREE.Shape[] {
  const loader = new SVGLoader();
  const cleanedSvg = preprocessSvg(svgString);
  const svgData = loader.parse(cleanedSvg);

  const canvas = inferCanvasSize(svgString);
  const vbW = canvas?.w ?? null;
  const vbH = canvas?.h ?? null;
  const canvasArea = vbW && vbH ? vbW * vbH : null;

  type Candidate = { shape: THREE.Shape; area: number };
  const candidates: Candidate[] = [];

  const push = (shape: THREE.Shape) => {
    if (vbW && vbH && isViewBoxRect(shape, vbW, vbH)) return;
    const pts = shape.getPoints(4);
    const bb = new THREE.Box2();
    for (const p of pts) bb.expandByPoint(p);
    const size = new THREE.Vector2();
    bb.getSize(size);
    candidates.push({ shape, area: size.x * size.y });
  };

  svgData.paths.forEach((path) => {
    const style = path.userData?.style;
    const hasFill =
      style?.fill && style.fill !== "none" && style.fill !== "transparent";
    const hasStroke =
      style?.stroke &&
      style.stroke !== "none" &&
      style.stroke !== "transparent";

    // If any subpath is open (first ≠ last point) and the element also has a
    // stroke, treat the element as stroke-only. SVGLoader closes open filled
    // paths with a straight line, turning a C-arc into a pie-slice disc;
    // when the author also supplied a stroke, they almost certainly wanted
    // the outline, not the pie.
    const hasOpenSubpath = path.subPaths.some((sp) => {
      const pts = sp.getPoints(2);
      if (pts.length < 2) return false;
      return pts[0].distanceTo(pts[pts.length - 1]) > 0.01;
    });
    const skipFill = hasFill && hasStroke && hasOpenSubpath;

    if (hasFill && !skipFill) {
      for (const shape of SVGLoader.createShapes(path)) push(shape);
    }

    if (hasStroke) {
      const strokeWidth = parseFloat(style?.strokeWidth ?? "2");
      const divisions = 12;
      path.subPaths.forEach((subPath) => {
        const points = subPath.getPoints(divisions);
        if (points.length < 2) return;

        const shape = new THREE.Shape();
        const halfWidth = strokeWidth / 2;
        const leftSide: THREE.Vector2[] = [];
        const rightSide: THREE.Vector2[] = [];

        for (let i = 0; i < points.length; i++) {
          const curr = points[i];
          const prev = points[Math.max(0, i - 1)];
          const next = points[Math.min(points.length - 1, i + 1)];
          const dx = next.x - prev.x;
          const dy = next.y - prev.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          leftSide.push(
            new THREE.Vector2(curr.x + nx * halfWidth, curr.y + ny * halfWidth),
          );
          rightSide.push(
            new THREE.Vector2(curr.x - nx * halfWidth, curr.y - ny * halfWidth),
          );
        }

        shape.moveTo(leftSide[0].x, leftSide[0].y);
        for (let i = 1; i < leftSide.length; i++)
          shape.lineTo(leftSide[i].x, leftSide[i].y);
        for (let i = rightSide.length - 1; i >= 0; i--)
          shape.lineTo(rightSide[i].x, rightSide[i].y);
        shape.closePath();
        push(shape);
      });
    }

    if (!hasFill && !hasStroke) {
      for (const shape of SVGLoader.createShapes(path)) push(shape);
    }
  });

  // Pattern-tile filter. Design-tool exports sometimes bake a transparency-
  // indicator pattern (checker, dots) into the SVG as hundreds of small
  // same-scale rects. If many tiny shapes coexist with a few big ones, the
  // tiny ones are almost certainly background noise — drop them so the real
  // foreground shapes can dominate the extrusion.
  if (canvasArea) {
    const SMALL_FRACTION = 0.02;
    const smallCount = candidates.filter(
      (c) => c.area / canvasArea < SMALL_FRACTION,
    ).length;
    const bigCount = candidates.length - smallCount;
    if (smallCount > 30 && bigCount > 0) {
      return candidates
        .filter((c) => c.area / canvasArea >= SMALL_FRACTION)
        .map((c) => c.shape);
    }
  }

  return candidates.map((c) => c.shape);
}

/**
 * Asynchronously extrude an SVG into a merged BufferGeometry, yielding to
 * the main thread every BATCH_SIZE shapes so complex SVGs don't freeze UI.
 * `onProgress` fires with 0–100. `signal` aborts mid-flight.
 */
export async function extrudeSvg(
  svgString: string,
  depth: number,
  smoothness: number,
  options: {
    onProgress?: (pct: number) => void;
    signal?: { aborted: boolean };
  } = {},
): Promise<ExtrusionResult | null> {
  const { onProgress, signal } = options;
  const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0));
  const BATCH_SIZE = 20;
  const isAborted = () => signal?.aborted === true;

  const allShapes = parseShapesFromSVG(svgString);
  if (allShapes.length === 0) return null;

  const tempGeo = new THREE.ShapeGeometry(allShapes);
  tempGeo.computeBoundingBox();
  const flatSize = new THREE.Vector3();
  tempGeo.boundingBox!.getSize(flatSize);
  const maxFlatDim = Math.max(flatSize.x, flatSize.y, 1);
  tempGeo.dispose();

  const complexity = allShapes.length;
  const qualityScale = complexity > 200 ? 0.3 : complexity > 50 ? 0.6 : 1;
  const scaledDepth = (depth / 10) * maxFlatDim;
  const bevelScale = Math.min(maxFlatDim * 0.02, 1);
  const bevelSegments = Math.round((3 + smoothness * 20) * qualityScale);
  const curveSegments = Math.round((24 + smoothness * 176) * qualityScale);
  const bevelThickness = bevelScale * (0.15 + smoothness * 0.2);
  const bevelSize = bevelScale * (0.15 + smoothness * 0.2);

  const extrudeSettings = {
    depth: scaledDepth,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments,
    curveSegments,
  };

  const individualGeos: THREE.ExtrudeGeometry[] = [];
  for (let i = 0; i < allShapes.length; i++) {
    if (isAborted()) {
      individualGeos.forEach((g) => g.dispose());
      return null;
    }
    individualGeos.push(
      new THREE.ExtrudeGeometry(allShapes[i], extrudeSettings),
    );
    if ((i + 1) % BATCH_SIZE === 0) {
      onProgress?.(Math.round(((i + 1) / allShapes.length) * 90));
      await yieldToMain();
    }
  }

  if (isAborted()) {
    individualGeos.forEach((g) => g.dispose());
    return null;
  }

  onProgress?.(92);
  await yieldToMain();

  const merged = BufferGeometryUtils.mergeGeometries(individualGeos, false);
  individualGeos.forEach((g) => g.dispose());
  if (!merged || isAborted()) {
    if (merged) merged.dispose();
    return null;
  }

  onProgress?.(96);
  await yieldToMain();

  merged.computeBoundingBox();
  merged.computeVertexNormals();
  recomputeTriplanarUVs(merged, merged.boundingBox!);

  const bb = merged.boundingBox!;
  const ctr = new THREE.Vector3();
  bb.getCenter(ctr);
  const size = new THREE.Vector3();
  bb.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const s = maxDim > 0 ? 4 / maxDim : 1;

  onProgress?.(100);
  return { geometry: merged, center: ctr, baseScale: s };
}
