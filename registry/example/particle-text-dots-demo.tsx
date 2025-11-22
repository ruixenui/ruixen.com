"use client";

import * as React from "react";
import { ParticleTextDots } from "@/registry/ruixenui/particle-text-dots";

export default function ParticleTextDotsDemo() {
  return (
    <div className="relative flex justify-center pt-3 px-3">
      <ParticleTextDots text="UI/UX" variant="dark" />
    </div>
  );
}
