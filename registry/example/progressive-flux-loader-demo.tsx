"use client";

import { ProgressiveFluxLoader } from "@/registry/ruixenui/progressive-flux-loader";

export default function ProgressiveFluxLoaderDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-6 py-16">
      <ProgressiveFluxLoader duration={14} loop />
    </div>
  );
}
