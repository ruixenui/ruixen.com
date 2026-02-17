"use client";

import { InvertTabs } from "@/registry/ruixenui/invert-tabs";

export default function InvertTabsDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <InvertTabs defaultValue="engineering" />
    </div>
  );
}
