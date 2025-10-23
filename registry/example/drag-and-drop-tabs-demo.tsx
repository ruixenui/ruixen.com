"use client";

import DragAndDropTabs from "@/registry/ruixenui/drag-and-drop-tabs";

export default function DragAndDropTabsDemoPage() {
  const demoItems = [
    { value: "tab1", label: "Tab 1", content: "This is content for Tab 1." },
    { value: "tab2", label: "Tab 2", content: "This is content for Tab 2." },
    { value: "tab3", label: "Tab 3", content: "This is content for Tab 3." },
    { value: "tab4", label: "Tab 4", content: "This is content for Tab 4." },
    { value: "tab5", label: "Tab 5", content: "This is content for Tab 5." },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <DragAndDropTabs items={demoItems} defaultValue="tab1" />
    </div>
  );
}
