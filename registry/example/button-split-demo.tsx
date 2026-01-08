"use client";

import ButtonSplit from "@/registry/ruixenui/button-split";

export default function ButtonSplitDemo() {
  const saveOptions = [
    { label: "Save as Draft", onClick: () => console.log("Save as Draft") },
    {
      label: "Save and Publish",
      onClick: () => console.log("Save and Publish"),
    },
    {
      label: "Save and Schedule",
      onClick: () => console.log("Save and Schedule"),
    },
  ];

  const downloadOptions = [
    { label: "Download as PDF", onClick: () => console.log("Download PDF") },
    { label: "Download as PNG", onClick: () => console.log("Download PNG") },
    { label: "Download as SVG", onClick: () => console.log("Download SVG") },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonSplit
        label="Save"
        onClick={() => console.log("Save clicked")}
        options={saveOptions}
      />
      <ButtonSplit
        label="Download"
        onClick={() => console.log("Download clicked")}
        options={downloadOptions}
        variant="secondary"
      />
    </div>
  );
}
