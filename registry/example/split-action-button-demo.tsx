"use client";

import SplitActionButton from "@/registry/ruixenui/split-action-button";

export default function DemoSplitActionButton() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      <SplitActionButton
        mainLabel="Save"
        mainAction={() => alert("Saved!")}
        secondaryActions={[
          { label: "Save As PDF", onClick: () => alert("Saved as PDF") },
          { label: "Save As DOCX", onClick: () => alert("Saved as DOCX") },
        ]}
      />

      <SplitActionButton
        mainLabel="Export"
        mainAction={() => alert("Exported!")}
        secondaryActions={[
          { label: "Export CSV", onClick: () => alert("Exported CSV") },
          { label: "Export XLSX", onClick: () => alert("Exported XLSX") },
        ]}
        size="lg"
      />
    </div>
  );
}
