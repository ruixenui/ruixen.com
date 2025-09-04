"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ColorPickerProps {
  colors?: string[];
  initialColor?: string;
  initialOpacity?: number;
  onChange?: (color: string, opacity: number) => void;
}

const defaultColors = [
  "#F87171",
  "#FB923C",
  "#FACC15",
  "#4ADE80",
  "#22D3EE",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#A3E635",
  "#06B6D4",
  "#0EA5E9",
  "#6366F1",
];

const toRGBA = (hex: string, opacity: number) => {
  const alpha = Math.round(opacity * 2.55)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
};

export default function ColorPickerInput({
  colors = defaultColors,
  initialColor = "#3B82F6",
  initialOpacity = 100,
  onChange,
}: ColorPickerProps) {
  const [color, setColor] = useState(initialColor);
  const [opacity, setOpacity] = useState(initialOpacity);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const finalColor = toRGBA(color, opacity);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor, opacity);
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    onChange?.(color, newOpacity);
  };

  const handleCopy = () => copyToClipboard(finalColor);

  return (
    <div className="w-full max-w-md border bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 space-y-5">
      {/* Title & Preview */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Select a Color
        </h3>
        <div
          className="w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-700"
          style={{ backgroundColor: finalColor }}
        />
      </div>

      {/* Swatches Grid */}
      <div className="grid grid-cols-6 gap-3">
        {colors.map((c) => {
          const selected = color === c;
          return (
            <button
              key={c}
              onClick={() => handleColorChange(c)}
              className="w-9 h-9 rounded-full relative ring-offset-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform hover:scale-110"
              style={{ backgroundColor: c }}
            >
              {selected && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow" />
              )}
            </button>
          );
        })}
      </div>

      {/* Opacity Control */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>Opacity</span>
          <span>{opacity}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={opacity}
          onChange={(e) => handleOpacityChange(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Color Output & Copy */}
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={finalColor.toUpperCase()}
          className="w-full px-3 py-1.5 text-sm font-mono rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
        />
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-500" />
          )}
        </button>
      </div>
    </div>
  );
}
