"use client";

import ThemeCycleButton from "@/registry/ruixenui/theme-cycle-button";

export default function DemoThemeCycleButton() {
  return (
    <main className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      {/* Pill variant with label hidden */}
      <ThemeCycleButton variant="pill" showLabel={false} />
    </main>
  );
}
