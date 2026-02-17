"use client";

import { DragAndDropTabs } from "@/registry/ruixenui/drag-and-drop-tabs";

export default function DragAndDropTabsDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <DragAndDropTabs
        items={[
          { value: "tab1", label: "Tab 1", content: "Content for Tab 1." },
          { value: "tab2", label: "Tab 2", content: "Content for Tab 2." },
          { value: "tab3", label: "Tab 3", content: "Content for Tab 3." },
          { value: "tab4", label: "Tab 4", content: "Content for Tab 4." },
          { value: "tab5", label: "Tab 5", content: "Content for Tab 5." },
        ]}
        defaultValue="tab1"
      />
    </div>
  );
}
