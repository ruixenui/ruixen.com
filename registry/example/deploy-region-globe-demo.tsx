"use client";

import * as React from "react";
import { DeployRegionGlobe } from "@/registry/ruixenui/deploy-region-globe";

export default function DeployRegionGlobeDemo() {
  const [picked, setPicked] = React.useState<string | null>(null);

  return (
    <div className="flex min-h-[560px] w-full flex-col items-center justify-center gap-5 bg-background px-6 py-12">
      <DeployRegionGlobe
        onConfirm={(region) => setPicked(`${region.name} (${region.code})`)}
      />
      <p className="font-mono text-xs text-muted-foreground">
        {picked
          ? `Selected ${picked}`
          : "Pick a region — the globe flies to it — then confirm."}
      </p>
    </div>
  );
}
