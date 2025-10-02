"use client";

import React from "react";
import MagicTree, { MagicNode } from "@/registry/ruixenui/magic-tree";
import { Card, CardContent } from "@/components/ui/card";

export default function MagicTreeDemoPage() {
  const handleSelect = (node: MagicNode) => {
    console.log("✨ Selected Magic Node:", node);
  };

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <Card className="w-full shadow-lg rounded-xl border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
        <CardContent>
          <MagicTree onSelect={handleSelect} />
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click folders to expand/collapse. Selected items sparkle ✨ in the
        console!
      </p>
    </div>
  );
}
