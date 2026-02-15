"use client";

import { GlassImageCompare } from "@/registry/ruixenui/glass-image-compare";

export default function GlassImageCompareDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 16px",
      }}
    >
      <GlassImageCompare
        before="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=60&auto=format"
        after="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=60&auto=format&sat=-100"
        beforeLabel="Original"
        afterLabel="Edited"
      />
    </div>
  );
}
