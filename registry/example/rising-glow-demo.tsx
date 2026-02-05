"use client";

import { RisingGlow } from "@/registry/ruixenui/rising-glow";

export default function RisingGlowDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-12 p-8">
      <RisingGlow color="#7CF734" spread={40}>
        <h1 className="text-6xl font-bold tracking-tight text-foreground md:text-8xl">
          Lumina
        </h1>
      </RisingGlow>

      <RisingGlow color="#3b82f6" particleCount={16} spread={25}>
        <p className="text-2xl font-medium text-foreground">Text that glows</p>
      </RisingGlow>
    </div>
  );
}
