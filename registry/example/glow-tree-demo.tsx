"use client";

import React from "react";
import GlowTree, { GlowNode } from "@/registry/ruixenui/glow-tree";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function GlowTreeDemoPage() {
  const handleSelect = (node: GlowNode) => {
    console.log("⚡ Selected Glow Node:", node);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white dark:from-gray-900 dark:via-yellow-900 dark:to-black p-8 flex flex-col items-center gap-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-yellow-600 dark:text-yellow-300 drop-shadow-lg">
        ⚡ GlowTree Demo
      </h1>

      {/* Card for GlowTree */}
      <Card className="w-full max-w-2xl rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-yellow-600 dark:text-yellow-300">
            Browse the Glowing Tree 🌟
          </CardTitle>
        </CardHeader>

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
