// utils/presetGradients.ts
import type { GradientState, GradientType } from "@/lib/use-gradient";

export type PresetCategory =
  | "Trending"
  | "Warm"
  | "Cool"
  | "Nature"
  | "Neon"
  | "Glass"
  | "Soft UI"
  | "Luxury";

export interface PresetStop {
  position: number; // 0..1
  color: string;
  opacity?: number;
}

export interface GradientPreset {
  id: string;
  name: string;
  category: PresetCategory;
  type: GradientType;
  angle?: number;
  origin?: { x: number; y: number };
  stops: PresetStop[];
}

export const PRESET_CATEGORIES: PresetCategory[] = [
  "Trending",
  "Warm",
  "Cool",
  "Nature",
  "Neon",
  "Glass",
  "Soft UI",
  "Luxury",
];

export const PRESET_GRADIENTS: GradientPreset[] = [
  // Trending
  {
    id: "trending-aurora",
    name: "Aurora Mesh",
    category: "Trending",
    type: "radial",
    origin: { x: 0.5, y: 0.4 },
    stops: [
      { position: 0, color: "#0f172a" },
      { position: 0.28, color: "#22c55e" },
      { position: 0.6, color: "#0ea5e9" },
      { position: 1, color: "#111827" },
    ],
  },
  {
    id: "trending-sunset",
    name: "Hyper Sunset",
    category: "Trending",
    type: "linear",
    angle: 135,
    stops: [
      { position: 0, color: "#fb7185" },
      { position: 0.5, color: "#f97316" },
      { position: 1, color: "#eab308" },
    ],
  },

  // Warm
  {
    id: "warm-sand",
    name: "Desert Sand",
    category: "Warm",
    type: "linear",
    angle: 120,
    stops: [
      { position: 0, color: "#f97316" },
      { position: 0.5, color: "#facc15" },
      { position: 1, color: "#fef3c7" },
    ],
  },
  {
    id: "warm-fire",
    name: "Fire Glow",
    category: "Warm",
    type: "radial",
    origin: { x: 0.5, y: 0.4 },
    stops: [
      { position: 0, color: "#ef4444" },
      { position: 0.45, color: "#f97316" },
      { position: 1, color: "#111827" },
    ],
  },

  // Cool
  {
    id: "cool-ice",
    name: "Nordic Ice",
    category: "Cool",
    type: "linear",
    angle: 145,
    stops: [
      { position: 0, color: "#0ea5e9" },
      { position: 0.5, color: "#22c55e" },
      { position: 1, color: "#0f172a" },
    ],
  },
  {
    id: "cool-pastel",
    name: "Pastel Sky",
    category: "Cool",
    type: "radial",
    origin: { x: 0.3, y: 0.3 },
    stops: [
      { position: 0, color: "#e0f2fe" },
      { position: 0.4, color: "#a5b4fc" },
      { position: 1, color: "#1e293b" },
    ],
  },

  // Nature
  {
    id: "nature-forest",
    name: "Deep Forest",
    category: "Nature",
    type: "linear",
    angle: 125,
    stops: [
      { position: 0, color: "#15803d" },
      { position: 0.4, color: "#166534" },
      { position: 1, color: "#052e16" },
    ],
  },
  {
    id: "nature-ocean",
    name: "Ocean Breeze",
    category: "Nature",
    type: "radial",
    origin: { x: 0.5, y: 0.3 },
    stops: [
      { position: 0, color: "#22c55e" },
      { position: 0.5, color: "#0ea5e9" },
      { position: 1, color: "#020617" },
    ],
  },

  // Neon
  {
    id: "neon-magenta",
    name: "Neon Magenta",
    category: "Neon",
    type: "conic",
    angle: 180,
    origin: { x: 0.5, y: 0.5 },
    stops: [
      { position: 0, color: "#22d3ee" },
      { position: 0.33, color: "#a855f7" },
      { position: 0.66, color: "#f97316" },
      { position: 1, color: "#22d3ee" },
    ],
  },
  {
    id: "neon-synth",
    name: "Synth Wave",
    category: "Neon",
    type: "linear",
    angle: 135,
    stops: [
      { position: 0, color: "#22c55e" },
      { position: 0.5, color: "#0ea5e9" },
      { position: 1, color: "#a855f7" },
    ],
  },

  // Glass
  {
    id: "glass-soft",
    name: "Glass Panel",
    category: "Glass",
    type: "linear",
    angle: 135,
    stops: [
      { position: 0, color: "#ffffffaa" },
      { position: 1, color: "#ffffff11" },
    ],
  },

  // Soft UI
  {
    id: "soft-ui",
    name: "Soft UI",
    category: "Soft UI",
    type: "radial",
    origin: { x: 0.3, y: 0.3 },
    stops: [
      { position: 0, color: "#e5e7eb" },
      { position: 0.5, color: "#f9fafb" },
      { position: 1, color: "#d1d5db" },
    ],
  },

  // Luxury
  {
    id: "lux-gold",
    name: "Luxury Gold",
    category: "Luxury",
    type: "linear",
    angle: 120,
    stops: [
      { position: 0, color: "#facc15" },
      { position: 0.5, color: "#eab308" },
      { position: 1, color: "#0f172a" },
    ],
  },
];

export function presetToState(preset: GradientPreset): GradientState {
  const stops = preset.stops.map((s, idx) => ({
    id: `${preset.id}-${idx}`,
    position: s.position,
    color: s.color,
    opacity: typeof s.opacity === "number" ? s.opacity : 1,
  }));
  return {
    type: preset.type,
    angle: preset.angle ?? 135,
    origin: preset.origin ?? { x: 0.5, y: 0.5 },
    stops,
    blendMode: "normal",
    smoothness: 1,
  };
}
