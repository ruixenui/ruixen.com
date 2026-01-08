"use client";

import * as React from "react";
import ButtonToggleGroup from "@/registry/ruixenui/button-toggle-group";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

export default function ButtonToggleGroupDemo() {
  const [alignment, setAlignment] = React.useState("left");
  const [formatting, setFormatting] = React.useState<string[]>([]);

  const alignOptions = [
    { value: "left", icon: <AlignLeft className="size-4" /> },
    { value: "center", icon: <AlignCenter className="size-4" /> },
    { value: "right", icon: <AlignRight className="size-4" /> },
  ];

  const formatOptions = [
    { value: "bold", icon: <Bold className="size-4" /> },
    { value: "italic", icon: <Italic className="size-4" /> },
    { value: "underline", icon: <Underline className="size-4" /> },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4">
      <ButtonToggleGroup
        options={alignOptions}
        value={alignment}
        onValueChange={setAlignment}
      />
      <ButtonToggleGroup
        options={formatOptions}
        value={formatting}
        onValueChange={setFormatting}
        multiple
      />
    </div>
  );
}
