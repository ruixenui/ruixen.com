"use client";

import { useState } from "react";
import { ScrollRuler } from "@/registry/ruixenui/scroll-ruler";

export default function ScrollRulerDemo() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex min-h-[200px] w-full max-w-md mx-auto items-center justify-center px-6">
      <ScrollRuler
        min={-90}
        max={90}
        step={1}
        value={value}
        suffix="°"
        sound
        onChange={setValue}
      />
    </div>
  );
}
