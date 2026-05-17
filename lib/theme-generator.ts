/**
 * Shadcn theme generator.
 *
 * Derives a complete shadcn theme (light + dark, 19 tokens each) from
 * two inputs: a primary color (hex) and a base hue (0-360). Outputs
 * either HSL bare-value format (shadcn v1 convention) or OKLCH function
 * format (shadcn v2+).
 */

export type HSL = { h: number; s: number; l: number };

export const THEME_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
] as const;

export type Token = (typeof THEME_TOKENS)[number];
export type Theme = Record<Token, HSL>;
export type OutputFormat = "hsl" | "oklch";

const ZINC_LIGHT: Theme = {
  background: { h: 0, s: 0, l: 100 },
  foreground: { h: 240, s: 10, l: 3.9 },
  card: { h: 0, s: 0, l: 100 },
  "card-foreground": { h: 240, s: 10, l: 3.9 },
  popover: { h: 0, s: 0, l: 100 },
  "popover-foreground": { h: 240, s: 10, l: 3.9 },
  primary: { h: 240, s: 5.9, l: 10 },
  "primary-foreground": { h: 0, s: 0, l: 98 },
  secondary: { h: 240, s: 4.8, l: 95.9 },
  "secondary-foreground": { h: 240, s: 5.9, l: 10 },
  muted: { h: 240, s: 4.8, l: 95.9 },
  "muted-foreground": { h: 240, s: 3.8, l: 46.1 },
  accent: { h: 240, s: 4.8, l: 95.9 },
  "accent-foreground": { h: 240, s: 5.9, l: 10 },
  destructive: { h: 0, s: 84.2, l: 60.2 },
  "destructive-foreground": { h: 0, s: 0, l: 98 },
  border: { h: 240, s: 5.9, l: 90 },
  input: { h: 240, s: 5.9, l: 90 },
  ring: { h: 240, s: 5.9, l: 10 },
};

const ZINC_DARK: Theme = {
  background: { h: 240, s: 10, l: 3.9 },
  foreground: { h: 0, s: 0, l: 98 },
  card: { h: 240, s: 10, l: 3.9 },
  "card-foreground": { h: 0, s: 0, l: 98 },
  popover: { h: 240, s: 10, l: 3.9 },
  "popover-foreground": { h: 0, s: 0, l: 98 },
  primary: { h: 0, s: 0, l: 98 },
  "primary-foreground": { h: 240, s: 5.9, l: 10 },
  secondary: { h: 240, s: 3.7, l: 15.9 },
  "secondary-foreground": { h: 0, s: 0, l: 98 },
  muted: { h: 240, s: 3.7, l: 15.9 },
  "muted-foreground": { h: 240, s: 5, l: 64.9 },
  accent: { h: 240, s: 3.7, l: 15.9 },
  "accent-foreground": { h: 0, s: 0, l: 98 },
  destructive: { h: 0, s: 62.8, l: 30.6 },
  "destructive-foreground": { h: 0, s: 0, l: 98 },
  border: { h: 240, s: 3.7, l: 15.9 },
  input: { h: 240, s: 3.7, l: 15.9 },
  ring: { h: 240, s: 4.9, l: 83.9 },
};

const NEUTRAL_TOKENS: ReadonlySet<Token> = new Set([
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
]);

export function hexToHsl(hex: string): HSL {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return { h: 0, s: 0, l: 50 };
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue /= 6;
  }
  return { h: hue * 360, s: s * 100, l: l * 100 };
}

export function hslToHex(hsl: HSL): string {
  const [r, g, b] = hslToRgb(hsl);
  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hslToRgb({ h, s, l }: HSL): [number, number, number] {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const hPrime = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hPrime < 1) [r, g, b] = [c, x, 0];
  else if (hPrime < 2) [r, g, b] = [x, c, 0];
  else if (hPrime < 3) [r, g, b] = [0, c, x];
  else if (hPrime < 4) [r, g, b] = [0, x, c];
  else if (hPrime < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = lN - c / 2;
  return [r + m, g + m, b + m];
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklch([r, g, b]: [number, number, number]): [
  number,
  number,
  number,
] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const lP = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const mP = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const sP = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const lC = Math.cbrt(lP);
  const mC = Math.cbrt(mP);
  const sC = Math.cbrt(sP);

  const L = 0.2104542553 * lC + 0.793617785 * mC - 0.0040720468 * sC;
  const a = 1.9779984951 * lC - 2.428592205 * mC + 0.4505937099 * sC;
  const bOk = 0.0259040371 * lC + 0.7827717662 * mC - 0.808675766 * sC;

  const C = Math.sqrt(a * a + bOk * bOk);
  let H = (Math.atan2(bOk, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

/**
 * Build a full theme by tinting the zinc reference theme with a custom base
 * hue (for neutral surfaces) and a custom primary color. Destructive stays
 * as the standard red — colorblind users rely on its hue stability.
 */
export function deriveTheme(
  baseHue: number,
  primaryHex: string,
  mode: "light" | "dark",
): Theme {
  const template = mode === "light" ? ZINC_LIGHT : ZINC_DARK;
  const primary = hexToHsl(primaryHex);
  const result = {} as Theme;

  for (const token of THEME_TOKENS) {
    const t = template[token];
    if (token === "primary") {
      result[token] = primary;
    } else if (token === "primary-foreground") {
      result[token] =
        primary.l < 50 ? { h: 0, s: 0, l: 98 } : { h: 240, s: 5.9, l: 10 };
    } else if (token === "ring") {
      result[token] = primary;
    } else if (NEUTRAL_TOKENS.has(token)) {
      result[token] = { h: baseHue, s: t.s, l: t.l };
    } else {
      result[token] = t;
    }
  }
  return result;
}

export function formatHslValue(hsl: HSL): string {
  return `${trim(hsl.h)} ${trim(hsl.s)}% ${trim(hsl.l)}%`;
}

export function formatOklchValue(hsl: HSL): string {
  const rgb = hslToRgb(hsl);
  const [L, C, H] = rgbToOklch(rgb);
  return `oklch(${(L * 100).toFixed(2)}% ${C.toFixed(4)} ${H.toFixed(2)})`;
}

function trim(n: number): string {
  return Number.isInteger(n) ? n.toString() : n.toFixed(1);
}

export function generateCss(
  light: Theme,
  dark: Theme,
  format: OutputFormat = "hsl",
): string {
  const fmt = format === "hsl" ? formatHslValue : formatOklchValue;
  const lightLines = THEME_TOKENS.map(
    (t) => `    --${t}: ${fmt(light[t])};`,
  ).join("\n");
  const darkLines = THEME_TOKENS.map(
    (t) => `    --${t}: ${fmt(dark[t])};`,
  ).join("\n");
  return `@layer base {
  :root {
    --radius: 0.5rem;
${lightLines}
  }
  .dark {
${darkLines}
  }
}`;
}
