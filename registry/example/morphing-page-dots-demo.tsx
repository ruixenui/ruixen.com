"use client";

import { MorphingPageDots } from "@/registry/ruixenui/morphing-page-dots";

export default function MorphingPageDotsDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <MorphingPageDots total={7} />
    </div>
  );
}
