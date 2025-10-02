"use client";

import ColorPickerInput from "../ruixenui/color-picker-input";

export default function DemoColorPicker() {
  const handleColorChange = (color: string, opacity: number) => {
    console.log("Selected:", color, "Opacity:", opacity);
  };

  return (
    <div className="flex items-center justify-center">
      <ColorPickerInput
        initialColor="#EC4899"
        initialOpacity={80}
        onChange={handleColorChange}
      />
    </div>
  );
}
