import type { GradientState, ColorStop } from "@/lib/use-gradient";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB | null {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function stopToCss(stop: ColorStop): string {
  const maybeHex = hexToRgb(stop.color);
  let color = stop.color;
  if (maybeHex) {
    color = `rgba(${maybeHex.r}, ${maybeHex.g}, ${maybeHex.b}, ${stop.opacity.toFixed(3)})`;
  }
  const pos = Math.round(stop.position * 100);
  return `${color} ${pos}%`;
}

export function gradientToCSSValue(state: GradientState): string {
  const stops = state.stops.map(stopToCss).join(", ");
  const origin = `${(state.origin.x * 100).toFixed(1)}% ${(state.origin.y * 100).toFixed(1)}%`;

  if (state.type === "linear") {
    return `linear-gradient(${state.angle}deg, ${stops})`;
  }
  if (state.type === "radial") {
    return `radial-gradient(circle at ${origin}, ${stops})`;
  }
  // conic
  return `conic-gradient(from ${state.angle}deg at ${origin}, ${stops})`;
}

export function generateGradientCSS(state: GradientState): string {
  const value = gradientToCSSValue(state);
  const blend =
    state.blendMode && state.blendMode !== "normal"
      ? `background-blend-mode: ${state.blendMode};\n`
      : "";
  return `background-image: ${value};
${blend}`.trim();
}
