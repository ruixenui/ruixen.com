"use client";

import * as React from "react";
import CheckboxGroup from "@/registry/ruixenui/checkbox-group";

export default function CheckboxGroupDemo() {
  const [selected, setSelected] = React.useState<string[]>(["react"]);

  const frameworks = [
    {
      value: "react",
      label: "React",
      description: "A JavaScript library for building user interfaces",
    },
    {
      value: "nextjs",
      label: "Next.js",
      description: "The React framework for production",
    },
    {
      value: "astro",
      label: "Astro",
      description: "Build faster websites with less JavaScript",
    },
    {
      value: "remix",
      label: "Remix",
      description: "Full stack web framework",
      disabled: true,
    },
  ];

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center">
      <div className="flex flex-col gap-6">
        <CheckboxGroup
          label="Select your frameworks"
          options={frameworks}
          value={selected}
          onValueChange={setSelected}
        />
        <CheckboxGroup
          label="Horizontal layout"
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          orientation="horizontal"
        />
      </div>
    </div>
  );
}
