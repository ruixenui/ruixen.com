"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import GlassColorPicker from "@/components/generator/glass/color-picker";
import { RGBA } from "@/lib/glass";

// Convert hex to RGBA
function hexToRgba(hex: string): RGBA {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : { r: 0, g: 0, b: 0, a: 1 };
}

// Convert RGBA to hex
function rgbaToHex(rgba: RGBA): string {
  return `#${Math.round(rgba.r).toString(16).padStart(2, "0")}${Math.round(rgba.g).toString(16).padStart(2, "0")}${Math.round(rgba.b).toString(16).padStart(2, "0")}`;
}

export default function ColorPicker({
  label,
  value,
  onHex,
}: {
  label: string;
  value: string;
  onHex: (hex: string) => void;
}) {
  const rgbaValue = hexToRgba(value);

  const handleChange = (rgba: RGBA) => {
    const hex = rgbaToHex(rgba);
    onHex(hex);
  };

  return (
    <GlassColorPicker label={label} value={rgbaValue} onChange={handleChange} />
  );
}
