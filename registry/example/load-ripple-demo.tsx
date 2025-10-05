"use client";

import * as React from "react";
import { LoadRipple } from "@/registry/ruixenui/load-ripple";

export default function LoaderDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center transition-colors">
      <LoadRipple />
    </div>
  );
}
