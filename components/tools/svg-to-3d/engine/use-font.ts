/**
 * Google Font loader + text-to-SVG.
 *
 * Adapted from 3dsvg (MIT, © Renato Costa).
 *
 * Fonts are fetched through the same-origin proxy at
 * /api/tools/svg-to-3d/font to comply with the site CSP.
 */

import { useState, useEffect } from "react";
import opentype from "opentype.js";
import { FONTS, fontProxyUrl } from "../lib/fonts";

const fontCache = new Map<string, opentype.Font>();
const fontPromiseCache = new Map<string, Promise<opentype.Font>>();

export async function loadFont(name: string): Promise<opentype.Font> {
  const cached = fontCache.get(name);
  if (cached) return cached;

  const inflight = fontPromiseCache.get(name);
  if (inflight) return inflight;

  const promise = (async () => {
    const response = await fetch(fontProxyUrl(name));
    if (!response.ok) {
      throw new Error(`Font fetch failed: ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    const font = opentype.parse(buffer);
    fontCache.set(name, font);
    return font;
  })();

  fontPromiseCache.set(name, promise);
  promise.catch(() => fontPromiseCache.delete(name));
  return promise;
}

export function useFont(fontName: string): opentype.Font | null {
  const [loadedFont, setLoadedFont] = useState<opentype.Font | null>(() => {
    return fontCache.get(fontName) ?? null;
  });

  useEffect(() => {
    if (!fontName) return;
    if (!FONTS.some((f) => f.name === fontName)) return;

    const cached = fontCache.get(fontName);
    if (cached) {
      setLoadedFont(cached);
      return;
    }

    let cancelled = false;
    loadFont(fontName)
      .then((font) => {
        if (!cancelled) setLoadedFont(font);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [fontName]);

  return loadedFont;
}

export function textToSvg(text: string, font: opentype.Font): string {
  const size = 200;
  const available = size - 20;

  let fontSize = 180;
  let fullPath = font.getPath(text, 0, 0, fontSize);
  let bb = fullPath.getBoundingBox();
  let w = bb.x2 - bb.x1;
  let h = bb.y2 - bb.y1;

  while ((w > available || h > available) && fontSize > 8) {
    fontSize -= 4;
    fullPath = font.getPath(text, 0, 0, fontSize);
    bb = fullPath.getBoundingBox();
    w = bb.x2 - bb.x1;
    h = bb.y2 - bb.y1;
  }

  const offsetX = (size - w) / 2 - bb.x1;
  const offsetY = (size - h) / 2 - bb.y1;

  const glyphs = font.stringToGlyphs(text);
  let x = offsetX;
  const paths: string[] = [];

  for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];
    const glyphPath = glyph.getPath(x, offsetY, fontSize);
    const d = glyphPath.toPathData(2);
    if (d) {
      paths.push(`<path d="${d}" fill="black" fill-rule="evenodd"/>`);
    }
    const advance =
      (glyph.advanceWidth || 0) * (fontSize / (font.unitsPerEm || 1000));
    if (i < glyphs.length - 1) {
      const kerning = font.getKerningValue(glyphs[i], glyphs[i + 1]);
      x += advance + kerning * (fontSize / (font.unitsPerEm || 1000));
    } else {
      x += advance;
    }
  }

  if (paths.length === 0) return "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${paths.join("")}</svg>`;
}

export const fontList = FONTS;
