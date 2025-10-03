"use client";

import RippleDistortion from "@/registry/ruixenui/ripple-distortion";

export default function DemoOne() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <div className="w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <RippleDistortion
          imageSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          frequency={25.0}
          amplitude={0.03}
          speed={6.0}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
