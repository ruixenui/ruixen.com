"use client";

import { RisingGlow } from "@/registry/ruixenui/rising-glow";

export default function RisingGlowDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl md:text-8xl font-bold relative z-10">Lumina</h1>
      {/* Rising Glow animation below text */}
      <div className="w-full max-w-sm">
        <RisingGlow
          particleCount={80}
          particleColor="#138dff"
          height={100}
          width="100%"
        />
      </div>
    </div>
  );
}
