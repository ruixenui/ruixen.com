"use client";

import ParticleField from "@/registry/ruixenui/particle-field";

export default function DemoOne() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background text-white gap-6">
      <div className="w-[800px] h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-700">
        <ParticleField
          particleCount={120}
          particleSize={2}
          particleColor="white"
          backgroundColor="black"
          speed={1}
          connectDistance={150}
        />
      </div>
    </div>
  );
}
