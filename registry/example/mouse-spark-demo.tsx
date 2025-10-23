"use client";

import React from "react";
import MouseSpark from "@/registry/ruixenui/mouse-spark";

export default function MouseSparkDemo() {
  return (
    <div className="relative w-full overflow-hidden">
      <MouseSpark width={800} height={400} theme="light" />
    </div>
  );
}
