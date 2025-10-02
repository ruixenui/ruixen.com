"use client";

import React from "react";
import GlowTree, { GlowNode } from "@/registry/ruixenui/glow-tree";
import { Card, CardContent } from "@/components/ui/card";

export default function GlowTreeDemoPage() {
  const handleSelect = (node: GlowNode) => {
    console.log("⚡ Selected Glow Node:", node);
  };

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <Card className="w-full shadow-lg border border-yellow-200 dark:border-yellow-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
        <CardContent>
          <GlowTree onSelect={handleSelect} />
        </CardContent>
      </Card>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click folders to expand/collapse. Items with ⚡ glow are special!
      </p>
    </div>
  );
}
