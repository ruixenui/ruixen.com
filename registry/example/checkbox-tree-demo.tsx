"use client";

import * as React from "react";
import { CheckboxTree } from "@/registry/ruixenui/checkbox-tree";

export default function CheckboxTreeDemo() {
  const [selected, setSelected] = React.useState<string[]>([
    "src-components",
    "ui-button",
  ]);

  const fileTree = [
    {
      id: "src",
      label: "src",
      children: [
        {
          id: "src-components",
          label: "components",
          children: [
            {
              id: "ui",
              label: "ui",
              children: [
                { id: "ui-button", label: "button.tsx" },
                { id: "ui-input", label: "input.tsx" },
                { id: "ui-card", label: "card.tsx" },
              ],
            },
            { id: "header", label: "header.tsx" },
            { id: "footer", label: "footer.tsx" },
          ],
        },
        {
          id: "src-lib",
          label: "lib",
          children: [
            { id: "lib-utils", label: "utils.ts" },
            { id: "lib-hooks", label: "hooks.ts" },
          ],
        },
      ],
    },
    {
      id: "public",
      label: "public",
      children: [
        { id: "public-images", label: "images" },
        { id: "public-fonts", label: "fonts" },
      ],
    },
  ];

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-4">
      <div className="rounded-lg border p-4">
        <CheckboxTree
          nodes={fileTree}
          value={selected}
          onValueChange={setSelected}
        />
      </div>
    </div>
  );
}
