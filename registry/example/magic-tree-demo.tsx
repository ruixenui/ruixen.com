"use client";

import React from "react";
import MagicTree, { MagicNode } from "@/registry/ruixenui/magic-tree";

export default function MagicTreeDemoPage() {
  const handleSelect = (node: MagicNode) => {
    console.log("✨ Selected Magic Node:", node);
  };

  return (
    <div className="py-16 flex flex-col items-center gap-6">
      <MagicTree onSelect={handleSelect} />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click folders to expand/collapse. Selected items sparkle ✨ in the
        console!
      </p>
    </div>
  );
}
