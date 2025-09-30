// app/magic-tree-demo/page.tsx
"use client";

import React from "react";
import MagicTree, { MagicNode } from "@/registry/ruixenui/magic-tree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MagicTreeDemoPage() {
  const handleSelect = (node: MagicNode) => {
    console.log("✨ Selected Magic Node:", node);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-900 dark:via-purple-900 dark:to-black p-8 flex flex-col items-center gap-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 drop-shadow-md">
        ✨ MagicTree Demo
      </h1>

      {/* Card Container */}
      <Card className="w-full max-w-2xl shadow-lg rounded-xl border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-300">
            Explore the Magical Tree 🌟
          </CardTitle>
        </CardHeader>

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
