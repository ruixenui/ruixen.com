"use client";

import ButtonSplit from "@/registry/ruixenui/button-split";

export default function ButtonSplitDemo() {
  const saveOptions = [
    { label: "Save as Draft", value: "draft" },
    { label: "Save and Publish", value: "publish" },
    { label: "Save and Schedule", value: "schedule" },
  ];

  const downloadOptions = [
    { label: "Download as PDF", value: "pdf" },
    { label: "Download as PNG", value: "png" },
    { label: "Download as SVG", value: "svg" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonSplit
        options={saveOptions}
        onPrimaryClick={() => console.log("Save clicked")}
        onOptionSelect={(v) => console.log("Selected:", v)}
      >
        Save
      </ButtonSplit>
      <ButtonSplit
        options={downloadOptions}
        variant="outline"
        onPrimaryClick={() => console.log("Download clicked")}
        onOptionSelect={(v) => console.log("Selected:", v)}
      >
        Download
      </ButtonSplit>
    </div>
  );
}
