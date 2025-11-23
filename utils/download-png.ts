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

function stopColor(stop: ColorStop): string {
  const rgb = hexToRgb(stop.color);
  if (!rgb) return stop.color;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${stop.opacity})`;
}

export function downloadPNG(state: GradientState, filename = "gradient.png") {
  if (typeof document === "undefined") return;
  const canvas = document.createElement("canvas");
  const size = 1024;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const stops = state.stops;

  if (state.type === "linear") {
    const rad = (state.angle * Math.PI) / 180;
    const half = Math.sqrt(2) * size;
    const x0 = cx - Math.cos(rad) * half;
    const y0 = cy - Math.sin(rad) * half;
    const x1 = cx + Math.cos(rad) * half;
    const y1 = cy + Math.sin(rad) * half;
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    for (const s of stops) {
      g.addColorStop(s.position, stopColor(s));
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  } else if (state.type === "radial") {
    const ox = state.origin.x * size;
    const oy = state.origin.y * size;
    const r = Math.sqrt(cx * cx + cy * cy);
    const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
    for (const s of stops) {
      g.addColorStop(s.position, stopColor(s));
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  } else {
    // conic approximation: sweep wedges
    const ox = state.origin.x * size;
    const oy = state.origin.y * size;
    const radius = Math.sqrt(cx * cx + cy * cy);
    const steps = 360;
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps;
      const t1 = (i + 1) / steps;
      const angle0 = ((t0 * 360 + state.angle) * Math.PI) / 180;
      const angle1 = ((t1 * 360 + state.angle) * Math.PI) / 180;

      const color = sampleStops(stops, t0);
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.arc(ox, oy, radius, angle0, angle1);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, "image/png");
}

function sampleStops(stops: ColorStop[], t: number): string {
  if (!stops.length) return "transparent";
  if (t <= stops[0].position) return stopColor(stops[0]);
  if (t >= stops[stops.length - 1].position)
    return stopColor(stops[stops.length - 1]);

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (t >= a.position && t <= b.position) {
      const u = (t - a.position) / (b.position - a.position);
      const ca = hexToRgb(a.color);
      const cb = hexToRgb(b.color);
      if (!ca || !cb) return stopColor(a);
      const r = ca.r + (cb.r - ca.r) * u;
      const g = ca.g + (cb.g - ca.g) * u;
      const bch = ca.b + (cb.b - ca.b) * u;
      const alpha = a.opacity + (b.opacity - a.opacity) * u;
      return `rgba(${r},${g},${bch},${alpha})`;
    }
  }

  return stopColor(stops[0]);
}
