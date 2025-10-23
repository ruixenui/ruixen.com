"use client";

import * as React from "react";
import { ShirtParallaxCard } from "@/registry/ruixenui/shirt-parallax-card";

export default function ShirtParallaxDemo() {
  return (
    <div className="flex items-center justify-center">
      <ShirtParallaxCard
        title="Premium Cotton Shirt"
        description="Soft-touch fabric with a tailored fit — perfect for work and casual wear."
        price="$39.99"
      />
    </div>
  );
}
