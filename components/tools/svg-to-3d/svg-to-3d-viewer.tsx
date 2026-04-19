/**
 * Vanilla Three.js viewer for the SVG→3D editor.
 *
 * Does NOT use @react-three/fiber. Next.js 15's App Router aliases all
 * `react` imports to its bundled React 19 build, which removes the
 * `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` export that
 * react-reconciler@0.27 (bundled with R3F v8) expects — so R3F v8 can't
 * run there. R3F v9 requires React 19 peer, which Ruixen doesn't provide,
 * and its JSX type augmentation clashes with several existing Ruixen
 * components. Dropping to vanilla Three.js avoids both problems.
 *
 * The component owns its canvas, scene, renderer and RAF loop, rebuilds
 * the extruded mesh when the SVG changes, and exposes imperative
 * callbacks for PNG capture and mesh export via the `register*` props.
 */

"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { PLYExporter } from "three/examples/jsm/exporters/PLYExporter.js";
import { extrudeSvg } from "./lib/extrusion";
import { materialPresets, type MaterialSettings } from "./engine/materials";
import type { TextureSettings } from "./lib/types";
import type { LightSettings, Export3DFormat } from "./lib/canvas-defaults";

export type AnimationType =
  | "none"
  | "spin"
  | "float"
  | "pulse"
  | "wobble"
  | "spinFloat"
  | "swing";

interface ViewerProps {
  svg: string;
  depth: number;
  smoothness: number;
  color: string;
  bgColor: string;
  textureUrl: string | null;
  textureSettings: TextureSettings;
  materialSettings: MaterialSettings;
  cursorOrbit: boolean;
  orbitStrength: number;
  resetOnIdle: boolean;
  resetDelay: number;
  animate: AnimationType;
  animateSpeed: number;
  animateReverse: boolean;
  rotationX: number;
  rotationY: number;
  zoom: number;
  resetKey: number;
  lightSettings: LightSettings;
  registerCapture?: (
    fn: (
      resolution: number,
      withBackground: boolean,
      onCapture: (dataUrl: string) => void,
      aspectRatio?: number | null,
    ) => void,
  ) => void;
  registerCanvas?: (canvas: HTMLCanvasElement) => void;
  register3DExport?: (
    fn: (format: Export3DFormat, filename?: string) => void,
  ) => void;
}

function buildMaterial(
  settings: MaterialSettings,
  color: string,
  texture: THREE.Texture | null,
): THREE.Material {
  const preset = materialPresets[settings.preset];
  const isGold = settings.preset === "gold";
  const isEmissive = settings.preset === "emissive";
  const wantsTransparency = settings.transparent || settings.opacity < 1;
  const baseColor = texture ? "#ffffff" : isGold ? "#d4a017" : color;
  const emissiveColor = isEmissive ? color : "#000000";
  const emissiveIntensity = preset.emissiveIntensity ?? 0;
  const transmissionAmount = wantsTransparency ? 1 - settings.opacity : 0;

  return new THREE.MeshPhysicalMaterial({
    color: baseColor,
    map: texture ?? undefined,
    metalness: settings.metalness,
    roughness: wantsTransparency
      ? Math.max(0.02, settings.roughness * 0.3)
      : settings.roughness,
    transmission: transmissionAmount,
    thickness: wantsTransparency ? 2.5 : 0,
    ior: wantsTransparency ? 1.5 : 1.45,
    opacity: 1,
    transparent: false,
    wireframe: settings.wireframe,
    emissive: new THREE.Color(emissiveColor),
    emissiveIntensity,
    clearcoat: wantsTransparency ? 1 : (preset.clearcoat ?? 0),
    clearcoatRoughness: 0.05,
    side: THREE.FrontSide,
    envMapIntensity: 1,
  });
}

function createContactShadow(scene: THREE.Scene): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.ShadowMaterial({ opacity: 0.4 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -3;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

export function SVGTo3DViewer(props: ViewerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const loaderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs to mutable scene state, updated via props through the effects below.
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const animGroupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const bgPlaneRef = useRef<THREE.Mesh | null>(null);
  const shadowRef = useRef<THREE.Mesh | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  // Animation state
  const elapsedRef = useRef(0);
  const initialYRef = useRef<number | null>(null);

  // Interaction state
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const cursorOffsetRef = useRef({ x: 0, y: 0 });
  const baseRotRef = useRef({ x: props.rotationX, y: props.rotationY });
  const targetZoomRef = useRef(props.zoom);

  // Mirror props into refs so the RAF loop can read the latest values
  // without re-creating the loop on every render.
  const propsRef = useRef(props);
  propsRef.current = props;

  /** One-time: create scene, renderer, camera, lights. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = host.clientWidth;
    const height = host.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0a");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "default",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    host.appendChild(canvas);
    rendererRef.current = renderer;
    propsRef.current.registerCanvas?.(canvas);

    // Lights
    const ambient = new THREE.AmbientLight(
      0xffffff,
      props.lightSettings.ambientIntensity,
    );
    scene.add(ambient);
    ambientLightRef.current = ambient;

    const key = new THREE.DirectionalLight(
      0xffffff,
      props.lightSettings.keyIntensity,
    );
    key.position.set(
      props.lightSettings.keyX,
      props.lightSettings.keyY,
      props.lightSettings.keyZ,
    );
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    keyLightRef.current = key;

    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(-5, 3, -3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.2);
    rim.position.set(0, -4, 6);
    scene.add(rim);

    const point = new THREE.PointLight(0xffffff, 0.3);
    point.position.set(0, 5, 0);
    scene.add(point);

    const hemi = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 0.5);
    scene.add(hemi);

    // Background plane (behind the extruded SVG) — unlit so the color
    // renders 1:1 instead of being dimmed by scene lighting.
    const bgPlaneGeom = new THREE.PlaneGeometry(100, 100);
    const bgPlaneMat = new THREE.MeshBasicMaterial({
      color: props.bgColor,
    });
    const bgPlane = new THREE.Mesh(bgPlaneGeom, bgPlaneMat);
    bgPlane.position.z = -3;
    scene.add(bgPlane);
    bgPlaneRef.current = bgPlane;

    // Transparent ShadowMaterial plane just in front of the bg — receives
    // the backdrop shadow the unlit bg plane can't, then composites it
    // onto the bright bg. Unlit materials don't receive shadows on their
    // own, so this is the clean way to get shadows on a flat-color bg.
    const bgShadowMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const bgShadow = new THREE.Mesh(bgPlaneGeom, bgShadowMat);
    bgShadow.position.z = -2.99;
    bgShadow.receiveShadow = true;
    scene.add(bgShadow);

    // Contact shadow
    shadowRef.current = createContactShadow(scene);

    // Nested groups: anim (for loop animations) → mesh (for rotations)
    const animGroup = new THREE.Group();
    animGroupRef.current = animGroup;
    scene.add(animGroup);

    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    animGroup.add(meshGroup);

    // RAF loop
    let raf = 0;
    let lastTime = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const p = propsRef.current;
      const damping = 0.08;
      const friction = 0.92;
      const orbitDamping = 0.04;

      // Drag momentum
      if (!isDraggingRef.current) {
        velocityRef.current.x *= friction;
        velocityRef.current.y *= friction;
        if (
          Math.abs(velocityRef.current.x) > 0.0001 ||
          Math.abs(velocityRef.current.y) > 0.0001
        ) {
          baseRotRef.current.x += velocityRef.current.x;
          baseRotRef.current.y += velocityRef.current.y;
        }
      }

      const targetX =
        baseRotRef.current.x + (p.cursorOrbit ? cursorOffsetRef.current.x : 0);
      const targetY =
        baseRotRef.current.y + (p.cursorOrbit ? cursorOffsetRef.current.y : 0);

      if (meshGroup) {
        meshGroup.rotation.x +=
          (targetX - meshGroup.rotation.x) *
          (p.cursorOrbit && !isDraggingRef.current ? orbitDamping : damping);
        meshGroup.rotation.y +=
          (targetY - meshGroup.rotation.y) *
          (p.cursorOrbit && !isDraggingRef.current ? orbitDamping : damping);
      }

      // Responsive zoom
      const aspect = canvas.clientWidth / (canvas.clientHeight || 1);
      const responsiveFactor = aspect < 1 ? 1 / aspect : 1;
      const effectiveZoom = targetZoomRef.current * responsiveFactor;
      camera.position.z += (effectiveZoom - camera.position.z) * damping;

      // Loop animation
      if (animGroup && p.animate !== "none") {
        elapsedRef.current += delta * p.animateSpeed;
        const t = elapsedRef.current;
        const dir = p.animateReverse ? -1 : 1;
        if (initialYRef.current === null)
          initialYRef.current = animGroup.position.y;

        switch (p.animate) {
          case "spin":
            animGroup.rotation.y += delta * 0.5 * p.animateSpeed * dir;
            break;
          case "float":
            animGroup.position.y =
              initialYRef.current + Math.sin(t * 1.5) * 0.3;
            break;
          case "pulse": {
            const s = 1 + Math.sin(t * 2) * 0.05;
            animGroup.scale.setScalar(s);
            break;
          }
          case "wobble":
            animGroup.rotation.z = Math.sin(t * 2) * 0.1 * dir;
            break;
          case "swing":
            animGroup.rotation.y = Math.sin(t * 1.5) * 0.26 * dir;
            break;
          case "spinFloat":
            animGroup.rotation.y += delta * 0.4 * p.animateSpeed * dir;
            animGroup.position.y =
              initialYRef.current + Math.sin(t * 1.2) * 0.25;
            break;
        }
      }

      renderer.render(scene, camera);
    };
    tick();

    // Resize observer
    const ro = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, true);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material))
            obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        }
      });
      renderer.dispose();
      if (canvas.parentElement === host) host.removeChild(canvas);
    };
    // Intentional: we want this effect to run once. Further prop changes
    // are handled by the targeted effects below via refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Rebuild the extruded mesh when the svg/depth/smoothness changes. */
  useEffect(() => {
    if (!sceneRef.current || !meshGroupRef.current) return;
    if (!props.svg) return;

    const signal = { aborted: false };
    setLoading(true);
    setProgress(0);

    (async () => {
      const result = await extrudeSvg(
        props.svg,
        props.depth,
        props.smoothness,
        {
          onProgress: setProgress,
          signal,
        },
      );
      if (!result || signal.aborted) {
        setLoading(false);
        return;
      }

      // Remove previous mesh
      if (meshRef.current && meshGroupRef.current) {
        meshGroupRef.current.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        const mat = meshRef.current.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else (mat as THREE.Material).dispose();
      }

      const material = buildMaterial(
        propsRef.current.materialSettings,
        propsRef.current.color,
        textureRef.current,
      );
      const mesh = new THREE.Mesh(result.geometry, material);
      mesh.castShadow = true;
      mesh.position.set(-result.center.x, -result.center.y, -result.center.z);
      const group = meshGroupRef.current;
      if (!group) return;
      group.scale.set(result.baseScale, -result.baseScale, result.baseScale);
      group.add(mesh);
      meshRef.current = mesh;

      setLoading(false);
    })();

    return () => {
      signal.aborted = true;
    };
  }, [props.svg, props.depth, props.smoothness]);

  /** Keep material, color, and texture in sync. */
  useEffect(() => {
    if (!meshRef.current) return;
    const oldMat = meshRef.current.material;
    meshRef.current.material = buildMaterial(
      props.materialSettings,
      props.color,
      textureRef.current,
    );
    if (Array.isArray(oldMat)) oldMat.forEach((m) => m.dispose());
    else (oldMat as THREE.Material).dispose();
  }, [props.materialSettings, props.color]);

  /** Load/unload texture when the URL changes. */
  useEffect(() => {
    if (!props.textureUrl) {
      textureRef.current?.dispose();
      textureRef.current = null;
      if (meshRef.current) {
        const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
        mat.map = null;
        mat.needsUpdate = true;
      }
      return;
    }
    const loader = new THREE.TextureLoader();
    loader.load(props.textureUrl, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      textureRef.current?.dispose();
      textureRef.current = tex;
      if (meshRef.current) {
        const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
        mat.map = tex;
        mat.color.set("#ffffff");
        mat.needsUpdate = true;
      }
    });
  }, [props.textureUrl]);

  /** Texture transform (offset / repeat / rotation) */
  useEffect(() => {
    const tex = textureRef.current;
    if (!tex) return;
    tex.offset.set(
      props.textureSettings.offsetX,
      props.textureSettings.offsetY,
    );
    tex.repeat.set(
      props.textureSettings.repeatX,
      props.textureSettings.repeatX,
    );
    tex.rotation = props.textureSettings.rotation;
    tex.center.set(0.5, 0.5);
    tex.needsUpdate = true;
  }, [props.textureSettings]);

  /** Background plane color */
  useEffect(() => {
    if (!bgPlaneRef.current) return;
    (bgPlaneRef.current.material as THREE.MeshBasicMaterial).color.set(
      props.bgColor,
    );
  }, [props.bgColor]);

  /** Lights */
  useEffect(() => {
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = props.lightSettings.ambientIntensity;
    }
    if (keyLightRef.current) {
      keyLightRef.current.position.set(
        props.lightSettings.keyX,
        props.lightSettings.keyY,
        props.lightSettings.keyZ,
      );
      keyLightRef.current.intensity = props.lightSettings.keyIntensity;
    }
    if (shadowRef.current)
      shadowRef.current.visible = props.lightSettings.shadowEnabled;
  }, [props.lightSettings]);

  /** Rotation / zoom reset (triggered by resetKey). */
  useEffect(() => {
    baseRotRef.current.x = props.rotationX;
    baseRotRef.current.y = props.rotationY;
    velocityRef.current = { x: 0, y: 0 };
    targetZoomRef.current = props.zoom;
  }, [props.rotationX, props.rotationY, props.zoom, props.resetKey]);

  /** Animation reset when animate turns on/off. */
  useEffect(() => {
    if (props.animate === "none" && animGroupRef.current) {
      animGroupRef.current.rotation.set(0, 0, 0);
      animGroupRef.current.position.set(0, 0, 0);
      animGroupRef.current.scale.setScalar(1);
      elapsedRef.current = 0;
      initialYRef.current = null;
    }
  }, [props.animate]);

  /** Cursor orbit tracking */
  useEffect(() => {
    if (!props.cursorOrbit) {
      cursorOffsetRef.current = { x: 0, y: 0 };
      return;
    }
    const onMove = (e: MouseEvent) => {
      if (isDraggingRef.current) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      cursorOffsetRef.current = {
        x: ny * props.orbitStrength,
        y: nx * props.orbitStrength,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [props.cursorOrbit, props.orbitStrength]);

  /** Drag + scroll on canvas. */
  useEffect(() => {
    const canvas = rendererRef.current?.domElement;
    if (!canvas) return;

    const onDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = { x: 0, y: 0 };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      const sensitivity = 0.01;
      baseRotRef.current.x += dy * sensitivity;
      baseRotRef.current.y += dx * sensitivity;
      velocityRef.current = { x: dy * sensitivity, y: dx * sensitivity };
    };
    const onUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      canvas.releasePointerCapture(e.pointerId);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomRef.current = Math.max(
        2,
        Math.min(20, targetZoomRef.current + e.deltaY * 0.01),
      );
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  /** PNG capture */
  useEffect(() => {
    if (!props.registerCapture) return;
    props.registerCapture(
      (resolution, withBackground, onCapture, aspectRatio) => {
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        if (!scene || !camera || !renderer) return;

        const prevBg = scene.background;
        const shadowVisible = shadowRef.current?.visible ?? true;
        const bgVisible = bgPlaneRef.current?.visible ?? true;
        if (!withBackground) {
          scene.background = null;
          if (shadowRef.current) shadowRef.current.visible = false;
          if (bgPlaneRef.current) bgPlaneRef.current.visible = false;
        }

        const canvas = renderer.domElement;
        const prevW = canvas.width;
        const prevH = canvas.height;
        const prevStyle = canvas.style.cssText;

        const renderAspect = aspectRatio ?? prevW / prevH;
        const w = resolution;
        const h = Math.round(resolution / renderAspect);

        canvas.style.position = "fixed";
        canvas.style.left = "-9999px";

        renderer.setSize(w, h, false);
        camera.aspect = renderAspect;
        camera.updateProjectionMatrix();
        renderer.setClearColor(0x000000, 0);
        renderer.render(scene, camera);

        if (aspectRatio || withBackground) {
          onCapture(canvas.toDataURL("image/png"));
        } else {
          const tmp = document.createElement("canvas");
          tmp.width = w;
          tmp.height = h;
          const tctx = tmp.getContext("2d")!;
          tctx.drawImage(canvas, 0, 0);
          const imgData = tctx.getImageData(0, 0, w, h).data;
          let minX = w,
            minY = h,
            maxX = 0,
            maxY = 0;
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              if (imgData[(y * w + x) * 4 + 3] > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          const cw = maxX - minX + 1;
          const ch = maxY - minY + 1;
          const pad = Math.max(10, Math.round(Math.max(cw, ch) * 0.05));
          const x0 = Math.max(0, minX - pad);
          const y0 = Math.max(0, minY - pad);
          const x1 = Math.min(w, maxX + 1 + pad);
          const y1 = Math.min(h, maxY + 1 + pad);
          const cropped = document.createElement("canvas");
          cropped.width = x1 - x0;
          cropped.height = y1 - y0;
          const cctx = cropped.getContext("2d")!;
          cctx.drawImage(tmp, x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0);
          onCapture(cropped.toDataURL("image/png"));
        }

        renderer.setSize(prevW, prevH, false);
        canvas.style.cssText = prevStyle;
        camera.aspect = prevW / prevH;
        camera.updateProjectionMatrix();
        scene.background = prevBg;
        if (shadowRef.current) shadowRef.current.visible = shadowVisible;
        if (bgPlaneRef.current) bgPlaneRef.current.visible = bgVisible;
      },
    );
  }, [props.registerCapture]);

  /** 3D export */
  useEffect(() => {
    if (!props.register3DExport) return;
    props.register3DExport((format, filename = "ruixen-3d") => {
      if (!meshRef.current || !meshGroupRef.current) return;

      const exportGroup = new THREE.Group();
      meshRef.current.updateWorldMatrix(true, false);
      const geom = meshRef.current.geometry.clone();
      geom.applyMatrix4(meshRef.current.matrixWorld);
      const mat = Array.isArray(meshRef.current.material)
        ? meshRef.current.material.map((m) => m.clone())
        : meshRef.current.material.clone();
      exportGroup.add(new THREE.Mesh(geom, mat));

      const download = (data: BlobPart, mime: string, ext: string) => {
        const blob = new Blob([data], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      if (format === "stl") {
        const result = new STLExporter().parse(exportGroup, { binary: true });
        download(result, "model/stl", "stl");
      } else if (format === "obj") {
        download(new OBJExporter().parse(exportGroup), "text/plain", "obj");
      } else if (format === "ply") {
        const result = new PLYExporter().parse(exportGroup, () => {}, {
          binary: true,
        });
        if (result) download(result, "application/octet-stream", "ply");
      } else if (format === "glb") {
        new GLTFExporter().parse(
          exportGroup,
          (result) => {
            const data =
              result instanceof ArrayBuffer
                ? result
                : new TextEncoder().encode(JSON.stringify(result));
            download(data, "model/gltf-binary", "glb");
          },
          (err) => console.error("GLTF export failed", err),
          { binary: true },
        );
      }
    });
  }, [props.register3DExport]);

  /** Loader visibility — delay 800ms so short extrusions don't flash. */
  useEffect(() => {
    if (loading) {
      loaderTimerRef.current = setTimeout(() => setShowLoader(true), 800);
    } else {
      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
      setShowLoader(false);
    }
    return () => {
      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    };
  }, [loading]);

  return (
    <div ref={hostRef} className="relative w-full h-full">
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${showLoader ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-xl px-4 py-2">
          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="text-xs text-white/70">
            {progress > 0 && progress < 100 ? `${progress}%` : "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );
}
