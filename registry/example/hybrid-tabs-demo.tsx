"use client";

import HybridTabs from "@/registry/ruixenui/hybrid-tabs";

export default function HybridTabsDemo() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HybridTabs defaultValue="home" className="mb-8" />
    </main>
  );
}
