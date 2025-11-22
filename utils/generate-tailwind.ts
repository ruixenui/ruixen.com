import type { GradientState } from "@/lib/use-gradient";
import { gradientToCSSValue } from "./generate-css";

export function generateTailwindClass(state: GradientState): string {
  const value = gradientToCSSValue(state);
  // Escape spaces as underscores to work nicely with bg-[...]
  const safe = value
    .replace(/\s+/g, "_")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
  return `bg-[${safe}]`;
}
