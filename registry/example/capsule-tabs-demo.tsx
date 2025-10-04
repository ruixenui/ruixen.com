"use client";

import CapsuleTabs, {
  ScrollableTabItem,
} from "@/registry/ruixenui/capsule-tabs";

export default function CapsuleTabsDemoPage() {
  // Example items to show how it works
  const demoItems: ScrollableTabItem[] = Array.from({ length: 20 }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: (
      <div className="text-center text-lg font-semibold">
        This is content for <span className="text-primary">Tab {i + 1}</span>.
      </div>
    ),
  }));

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8 bg-muted/30">
      <h1 className="text-3xl font-bold mb-6 text-center">Capsule Tabs Demo</h1>
      <p className="mb-6 text-muted-foreground text-center max-w-xl">
        Use the arrows to navigate between pages of tabs. Click on any tab to
        view its content below.
      </p>

      <CapsuleTabs
        items={demoItems}
        defaultValue={demoItems[0].value}
        visibleCount={5} // Tabs visible per page
        className="w-full max-w-2xl"
      />
    </main>
  );
}
