"use client";

import ColorPickerInput from "../ruixenui/color-picker-input";

export default function DemoColorPicker() {
  const handleColorChange = (color: string, opacity: number) => {
    console.log("Selected:", color, "Opacity:", opacity);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <ColorPickerInput
        initialColor="#EC4899"
        initialOpacity={80}
        onChange={handleColorChange}
      />
    </div>
  );
}
