"use client";

import { MagneticTabs } from "@/registry/ruixenui/magnetic-tabs";

export default function MagneticTabsDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <MagneticTabs
        items={[
          {
            value: "overview",
            label: "Overview",
            content: "Overview content goes here.",
          },
          {
            value: "activity",
            label: "Activity",
            content: "Activity content goes here.",
          },
          {
            value: "settings",
            label: "Settings",
            content: "Settings content goes here.",
          },
          { value: "faq", label: "FAQ", content: "FAQ content goes here." },
        ]}
        defaultValue="overview"
      />
    </div>
  );
}
