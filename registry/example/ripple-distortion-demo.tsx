"use client";

import RippleDistortion from "@/registry/ruixenui/ripple-distortion";

export default function DemoOne() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RippleDistortion
        imageSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        width="90vw"
        height="60vh"
        frequency={25}
        amplitude={0.03}
        speed={6.0}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
}
