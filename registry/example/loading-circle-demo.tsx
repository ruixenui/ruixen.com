"use client";

import * as React from "react";
import { LoadingCircle } from "@/registry/ruixenui/loading-circle";

export default function LoadingCircleDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center transition-colors">
      <LoadingCircle />
    </div>
  );
}
