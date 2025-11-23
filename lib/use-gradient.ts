// hooks/useGradient.ts
"use client";

import { useCallback, useMemo, useState } from "react";
import {
  PRESET_GRADIENTS,
  presetToState,
  type GradientPreset,
} from "@/utils/preset-gradients";
import { getRandomGradient } from "@/utils/random-gradient";

export type GradientType = "linear" | "radial" | "conic";

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "soft-light"
  | "color-dodge"
  | "color-burn";

export interface GradientOrigin {
  x: number; // 0..1
  y: number; // 0..1
}

export interface ColorStop {
  id: string;
  position: number; // 0..1
  color: string; // hex | rgb() | hsl() (we mainly use hex for state)
  opacity: number; // 0..1
  locked?: boolean;
}

export interface GradientState {
  type: GradientType;
  angle: number; // deg
  origin: GradientOrigin;
  stops: ColorStop[];
  blendMode: BlendMode;
  smoothness: number; // 0..1
}

export interface UseGradientResult {
  gradient: GradientState;
  setType: (type: GradientType) => void;
  setAngle: (angle: number) => void;
  setOrigin: (origin: GradientOrigin) => void;
  addStop: (position?: number) => void;
  updateStop: (id: string, patch: Partial<ColorStop>) => void;
  removeStop: (id: string) => void;
  reorderStops: (fromIndex: number, toIndex: number) => void;
  reverseStops: () => void;
  shuffleStops: () => void;
  toggleStopLock: (id: string) => void;
  setBlendMode: (mode: BlendMode) => void;
  setSmoothness: (value: number) => void;
  applyPreset: (preset: GradientPreset) => void;
  randomize: () => void;
}

function createDefaultState(): GradientState {
  // Start with a beautiful default gradient
  return {
    type: "linear",
    angle: 135,
    origin: { x: 0.5, y: 0.5 },
    stops: [
      {
        id: "default-1",
        position: 0,
        color: "#9395C4",
        opacity: 1,
      },
      {
        id: "default-2",
        position: 1,
        color: "#08434A",
        opacity: 1,
      },
    ],
    blendMode: "normal",
    smoothness: 1,
  };
}

export function useGradient(): UseGradientResult {
  const [gradient, setGradient] = useState<GradientState>(() =>
    createDefaultState(),
  );

  const setType = useCallback((type: GradientType) => {
    setGradient((g) => ({ ...g, type }));
  }, []);

  const setAngle = useCallback((angle: number) => {
    setGradient((g) =>
      g.type === "linear" || g.type === "conic" ? { ...g, angle } : g,
    );
  }, []);

  const setOrigin = useCallback((origin: GradientOrigin) => {
    setGradient((g) => ({
      ...g,
      origin: {
        x: Math.min(1, Math.max(0, origin.x)),
        y: Math.min(1, Math.max(0, origin.y)),
      },
    }));
  }, []);

  const addStop = useCallback((position?: number) => {
    setGradient((g) => {
      const newPos =
        typeof position === "number"
          ? position
          : g.stops.length >= 2
            ? (g.stops[0].position + g.stops[g.stops.length - 1].position) / 2
            : 0.5;
      const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
      const newStop: ColorStop = {
        id,
        color: "#ffffff",
        opacity: 1,
        position: Math.min(1, Math.max(0, newPos)),
      };
      const stops = [...g.stops, newStop].sort(
        (a, b) => a.position - b.position,
      );
      return { ...g, stops };
    });
  }, []);

  const updateStop = useCallback((id: string, patch: Partial<ColorStop>) => {
    setGradient((g) => {
      const stops = g.stops
        .map((s) => (s.id === id ? { ...s, ...patch } : s))
        .map((s) => ({
          ...s,
          position:
            typeof patch.position === "number"
              ? Math.min(1, Math.max(0, s.position))
              : s.position,
          opacity:
            typeof patch.opacity === "number"
              ? Math.min(1, Math.max(0, s.opacity))
              : s.opacity,
        }))
        .sort((a, b) => a.position - b.position);
      return { ...g, stops };
    });
  }, []);

  const removeStop = useCallback((id: string) => {
    setGradient((g) => {
      if (g.stops.length <= 2) return g; // keep at least 2 stops
      const stops = g.stops.filter((s) => s.id !== id);
      return { ...g, stops };
    });
  }, []);

  const reorderStops = useCallback((fromIndex: number, toIndex: number) => {
    setGradient((g) => {
      const arr = [...g.stops];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      // Keep positions, just reorder visually
      return { ...g, stops: arr };
    });
  }, []);

  const reverseStops = useCallback(() => {
    setGradient((g) => {
      const reversed = [...g.stops]
        .map((s) => ({ ...s, position: 1 - s.position }))
        .sort((a, b) => a.position - b.position);
      return { ...g, stops: reversed };
    });
  }, []);

  const shuffleStops = useCallback(() => {
    setGradient((g) => {
      const locked = g.stops.filter((s) => s.locked);
      const unlocked = g.stops.filter((s) => !s.locked);
      for (let i = unlocked.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unlocked[i], unlocked[j]] = [unlocked[j], unlocked[i]];
      }
      const combined = [...locked, ...unlocked].sort(
        (a, b) => a.position - b.position,
      );
      return { ...g, stops: combined };
    });
  }, []);

  const toggleStopLock = useCallback((id: string) => {
    setGradient((g) => ({
      ...g,
      stops: g.stops.map((s) =>
        s.id === id ? { ...s, locked: !s.locked } : s,
      ),
    }));
  }, []);

  const setBlendMode = useCallback((mode: BlendMode) => {
    setGradient((g) => ({ ...g, blendMode: mode }));
  }, []);

  const setSmoothness = useCallback((value: number) => {
    setGradient((g) => ({ ...g, smoothness: Math.min(1, Math.max(0, value)) }));
  }, []);

  const applyPreset = useCallback((preset: GradientPreset) => {
    setGradient(presetToState(preset));
  }, []);

  const randomize = useCallback(() => {
    setGradient((g) => getRandomGradient(g));
  }, []);

  // memoized for convenience if needed by components
  useMemo(() => gradient, [gradient]);

  return {
    gradient,
    setType,
    setAngle,
    setOrigin,
    addStop,
    updateStop,
    removeStop,
    reorderStops,
    reverseStops,
    shuffleStops,
    toggleStopLock,
    setBlendMode,
    setSmoothness,
    applyPreset,
    randomize,
  };
}
