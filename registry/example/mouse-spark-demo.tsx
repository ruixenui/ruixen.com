"use client";

import React from "react";
import MouseSpark from "@/registry/ruixenui/mouse-spark";

export default function MouseSparkDemo() {
  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <MouseSpark width={1000} height={600} theme="light" />
    </div>
  );
}
