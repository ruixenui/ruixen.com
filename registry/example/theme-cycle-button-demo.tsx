"use client";

import ThemeCycleButton from "../ruixenui/theme-cycle-button";

export default function DemoThemeCycleButton() {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      {/* Pill variant with label hidden */}
      <ThemeCycleButton variant="pill" showLabel={false} />

      {/* Ghost variant + large size + mode callback */}
      <ThemeCycleButton
        variant="ghost"
        size="lg"
        onModeChange={(mode) => console.log("Theme changed to:", mode)}
      />
    </main>
  );
}
