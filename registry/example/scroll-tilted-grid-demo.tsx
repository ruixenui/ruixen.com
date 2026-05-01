"use client";

import { useRef } from "react";

import { ScrollTiltedGrid } from "@/registry/ruixenui/scroll-tilted-grid";

export default function ScrollTiltedGridDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      data-scroll-tilted-grid-demo
      className="relative h-screen overflow-y-auto overflow-x-hidden rounded-xl bg-background"
      style={{ scrollbarWidth: "none" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-scroll-tilted-grid-demo]::-webkit-scrollbar{display:none}`,
        }}
      />
      <ScrollTiltedGrid
        container={containerRef}
        loop
        maxCycles={4}
        sectionPadding="0.75rem"
        maxWidth="md"
        gap={6}
      />
    </div>
  );
}
