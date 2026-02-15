"use client";

import IconLabelSubtextButton from "@/registry/ruixenui/icon-label-subtext-button";

export default function IconLabelSubtextButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <IconLabelSubtextButton
        label="Download"
        subtext="12 MB"
        onClick={() => console.log("Download")}
      />
      <IconLabelSubtextButton label="Export CSV" subtext="12,341 rows" />
    </div>
  );
}
