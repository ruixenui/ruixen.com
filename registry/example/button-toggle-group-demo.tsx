"use client";

import * as React from "react";
import { ButtonToggleGroup } from "@/registry/ruixenui/button-toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export default function ButtonToggleGroupDemo() {
  const [alignment, setAlignment] = React.useState("left");

  const alignOptions = [
    { value: "left", label: "Left", icon: <AlignLeft className="size-4" /> },
    {
      value: "center",
      label: "Center",
      icon: <AlignCenter className="size-4" />,
    },
    { value: "right", label: "Right", icon: <AlignRight className="size-4" /> },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4">
      <ButtonToggleGroup
        options={alignOptions}
        value={alignment}
        onChange={setAlignment}
      />
      <ButtonToggleGroup
        options={alignOptions}
        value={alignment}
        onChange={setAlignment}
        variant="outline"
      />
    </div>
  );
}
