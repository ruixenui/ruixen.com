"use client";

import * as React from "react";
import {
  LivePreviewStyleSelect,
  StyleOption,
} from "@/registry/ruixenui/live-preview-style-select";

const gradientOptions: StyleOption[] = [
  {
    value: "sunset",
    label: "Sunset Glow",
    previewClass: "bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300",
    description: "Warm pink-orange-yellow gradient",
  },
  {
    value: "aqua",
    label: "Aqua Breeze",
    previewClass: "bg-gradient-to-r from-teal-400 to-cyan-500",
    description: "Cool teal and cyan tones",
  },
  {
    value: "night",
    label: "Night Sky",
    previewClass: "bg-gradient-to-r from-indigo-900 via-purple-800 to-black",
    description: "Dark indigo with deep purple accents",
  },
  {
    value: "forest",
    label: "Forest Haze",
    previewClass: "bg-gradient-to-r from-green-600 via-lime-400 to-emerald-500",
    description: "Lush green earthy tones",
  },
];

export default function DemoLivePreviewStyleSelect() {
  const [style, setStyle] = React.useState<string>("");

  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center space-y-4">
      <LivePreviewStyleSelect
        options={gradientOptions}
        label="Select Gradient"
        placeholder="Choose a gradient..."
        selectWidth="280px" // fixed width for all options
        previewHeight="180px"
      />
      {style && (
        <p className="text-sm text-gray-700">
          Selected style: <span className="font-semibold">{style}</span>
        </p>
      )}
    </div>
  );
}
