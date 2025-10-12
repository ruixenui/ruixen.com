"use client";

import React from "react";
import MouseSpark from "@/registry/ruixenui/mouse-spark";

export default function MouseSparkDemo() {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg border">
      <MouseSpark width={800} height={400} theme="dark" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-white text-lg font-medium text-center px-4">
          Move your mouse to see the spark effect!
        </p>
      </div>
    </div>
  );
}
