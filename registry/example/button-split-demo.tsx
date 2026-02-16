"use client";

import { ButtonSplit } from "@/registry/ruixenui/button-split";

export default function ButtonSplitDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <ButtonSplit
        label="Save"
        onClick={() => console.log("Save")}
        options={[
          { label: "Save as Draft", onClick: () => console.log("Draft") },
          { label: "Save and Publish", onClick: () => console.log("Publish") },
          {
            label: "Save and Schedule",
            onClick: () => console.log("Schedule"),
          },
        ]}
      />
    </div>
  );
}
