"use client";

import * as React from "react";
import { ElitePlanCard } from "@/registry/ruixenui/elite-plan-card";

export default function ProductShowcaseDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <ElitePlanCard
        imageUrl="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
        title="Lunar Series"
        subtitle="Ruixen Collection"
        description="Experience the fusion of art and design with the Lunar Series. Minimalist, bold, and timeless."
        onAction={() => alert("Learn more clicked!")}
      />
    </div>
  );
}
