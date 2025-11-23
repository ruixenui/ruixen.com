// utils/randomGradient.ts
import type { GradientState, ColorStop } from "@/lib/use-gradient";
import { PRESET_GRADIENTS, presetToState } from "./preset-gradients";

export function getRandomGradient(current?: GradientState): GradientState {
  // simple: pick a random preset; keep locked stops where possible
  const preset =
    PRESET_GRADIENTS[Math.floor(Math.random() * PRESET_GRADIENTS.length)];
  const base = presetToState(preset);
  if (!current) return base;

  const locked = current.stops.filter((s) => s.locked);
  if (!locked.length) return base;

  const unlocked = base.stops.filter((s) => !s.locked);
  const merged: ColorStop[] = [];
  locked.forEach((ls, i) => {
    merged.push({
      ...ls,
      position: i === 0 ? 0 : i === locked.length - 1 ? 1 : ls.position,
    });
  });
  unlocked.forEach((us) => merged.push(us));
  merged.sort((a, b) => a.position - b.position);

  return { ...base, stops: merged };
}
