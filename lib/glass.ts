// lib/glass.ts
"use client";

export type RGBA = { r: number; g: number; b: number; a: number };
export type BackgroundType = "frosted" | "image" | "grid" | "noise";

export type GlassState = {
  // Background context (canvas)
  background: {
    type: BackgroundType;
    imageUrl?: string;
    gridSize?: number;
    noiseOpacity?: number;
    darkMode?: boolean;
  };

  // Card surface
  bgColor: RGBA;
  blur: number; // px
  radius: number; // px
  opacity: number; // 0..1 (kept in sync with bgColor.a)
  borderWidth: number; // px
  borderColor: RGBA;

  // Filters & depth
  shadow: boolean;
  shadowIntensity: number; // 0..1
  saturate: number; // 0..200 (percent)

  // Overlay
  gradientOverlay: boolean;
  gradientAngle: number; // deg

  // Hover
  hoverEnabled: boolean;
  hoverBlur: number;
  hoverOpacity: number;
  hoverShadow: boolean;
};

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const rgba = (c: RGBA) =>
  `rgba(${clamp(c.r, 0, 255)}, ${clamp(c.g, 0, 255)}, ${clamp(c.b, 0, 255)}, ${clamp(c.a, 0, 1).toFixed(3)})`;

export const withAlpha = (c: RGBA, a: number): RGBA => ({
  ...c,
  a: clamp(a, 0, 1),
});

export const hexToRgba = (hex: string, alpha = 1): RGBA => {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((x) => x + x)
      .join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b, a: clamp(alpha, 0, 1) };
};

export const rgbaToHexAlpha = (c: RGBA) => {
  const toHex = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  const hex = `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
  const alpha = clamp(c.a, 0, 1);
  return { hex, alpha };
};

export const defaultGlassState: GlassState = {
  background: {
    type: "frosted",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    gridSize: 24,
    noiseOpacity: 0.08,
    darkMode: false,
  },
  bgColor: { r: 255, g: 255, b: 255, a: 0.14 },
  blur: 16,
  radius: 16,
  opacity: 0.14,
  borderWidth: 1,
  borderColor: { r: 255, g: 255, b: 255, a: 0.35 },
  shadow: true,
  shadowIntensity: 0.6,
  saturate: 140,
  gradientOverlay: true,
  gradientAngle: 135,
  hoverEnabled: true,
  hoverBlur: 24,
  hoverOpacity: 0.22,
  hoverShadow: true,
};

const shadowFor = (intensity: number) => {
  const a = clamp(0.06 + intensity * 0.24, 0.06, 0.3);
  return `0 10px 30px rgba(0,0,0,${a.toFixed(3)})`;
};

export const generatePureCss = (state: GlassState) => {
  const bg = rgba(withAlpha(state.bgColor, state.opacity));
  const border = rgba(state.borderColor);
  const hoverBg = rgba(withAlpha(state.bgColor, state.hoverOpacity));
  const blur = `${clamp(state.blur, 0, 100)}px`;
  const hoverBlur = `${clamp(state.hoverBlur, 0, 100)}px`;
  const radius = `${clamp(state.radius, 0, 64)}px`;
  const borderWidth = `${clamp(state.borderWidth, 0, 16)}px`;
  const sat = (clamp(state.saturate, 0, 200) / 100).toFixed(2);
  const boxShadow = state.shadow ? shadowFor(state.shadowIntensity) : "none";
  const hoverShadow = state.hoverShadow
    ? shadowFor(state.shadowIntensity * 1.1)
    : boxShadow;

  const overlay = state.gradientOverlay
    ? `\n  position: relative;\n}\n.glass-card::before {\n  content: ""; position:absolute; inset:0; pointer-events:none; border-radius: inherit;\n  background: linear-gradient(${state.gradientAngle}deg, rgba(255,255,255,0.20), rgba(255,255,255,0.02));`
    : "";

  return `/* Paste into your stylesheet */
.glass-card {
  background: ${bg};
  backdrop-filter: blur(${blur}) saturate(${sat});
  -webkit-backdrop-filter: blur(${blur}) saturate(${sat});
  border: ${borderWidth} solid ${border};
  border-radius: ${radius};
  box-shadow: ${boxShadow};
  transition: background .2s ease, backdrop-filter .2s ease, box-shadow .2s ease, border-color .2s ease;${overlay}
}

${
  state.hoverEnabled
    ? `.glass-card:hover {
  background: ${hoverBg};
  backdrop-filter: blur(${hoverBlur}) saturate(${sat});
  -webkit-backdrop-filter: blur(${hoverBlur}) saturate(${sat});
  box-shadow: ${hoverShadow};
}`
    : ""
}`;
};

export const generateTailwindSnippet = (state: GlassState) => {
  const bg = rgba(withAlpha(state.bgColor, state.opacity));
  const border = rgba(state.borderColor);
  const blur = `${clamp(state.blur, 0, 100)}px`;
  const hoverBlur = `${clamp(state.hoverBlur, 0, 100)}px`;
  const radius = `${clamp(state.radius, 0, 64)}px`;
  const borderWidth = `${clamp(state.borderWidth, 0, 16)}px`;
  const sat = (clamp(state.saturate, 0, 200) / 100).toFixed(2);
  const shadow = state.shadow ? shadowFor(state.shadowIntensity) : "none";
  const hoverBg = rgba(withAlpha(state.bgColor, state.hoverOpacity));
  const hoverShadow = state.hoverShadow
    ? shadowFor(state.shadowIntensity * 1.1)
    : shadow;

  const base = [
    `relative`,
    `transition-all`,
    `bg-[${bg}]`,
    `backdrop-blur-[${blur}]`,
    `backdrop-saturate-[${sat}]`,
    `rounded-[${radius}]`,
    `border`,
    `border-[${border}]`,
    `border-[${borderWidth}]`,
    shadow !== "none"
      ? `shadow-[${shadow.replaceAll(" ", "_")}]`
      : `shadow-none`,
  ];

  const overlay = state.gradientOverlay
    ? `\n  <div className="pointer-events-none absolute inset-0 rounded-[${radius}] bg-[linear-gradient(${state.gradientAngle}deg,rgba(255,255,255,0.20),rgba(255,255,255,0.02))]" />`
    : "";

  const hover = state.hoverEnabled
    ? [
        `hover:bg-[${hoverBg}]`,
        `hover:backdrop-blur-[${hoverBlur}]`,
        hoverShadow !== "none"
          ? `hover:shadow-[${hoverShadow.replaceAll(" ", "_")}]`
          : `hover:shadow-none`,
      ]
    : [];

  const classes = [...base, ...hover].join(" ");

  const html = `<div className="${classes}">
  <!-- content -->
  ${overlay}
</div>`;

  return html;
};

export const formatCssBlock = (css: string) =>
  css.replace(/\n{3,}/g, "\n\n").trim();

// --- Share via URL ---
const ENCODING_PREFIX = "g=";
export const encodeStateToQuery = (state: GlassState) => {
  const json = JSON.stringify(state);
  const b64 =
    typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(json)))
      : Buffer.from(json, "utf-8").toString("base64");
  return `${ENCODING_PREFIX}${b64}`;
};

export const decodeStateFromQuery = (queryValue: string): GlassState | null => {
  try {
    const b64 = queryValue.startsWith(ENCODING_PREFIX)
      ? queryValue.slice(ENCODING_PREFIX.length)
      : queryValue;
    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(escape(atob(b64)))
        : Buffer.from(b64, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {}
    document.body.removeChild(ta);
    return ok;
  }
};

export const downloadFile = (
  filename: string,
  content: string,
  mime = "text/plain",
) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
