"use client";

import { ButtonDropdown } from "@/registry/ruixenui/button-dropdown";

export default function ButtonDropdownDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <ButtonDropdown
        label="Actions"
        items={[
          { label: "Edit", onClick: () => console.log("Edit") },
          { label: "Duplicate", onClick: () => console.log("Duplicate") },
          { label: "Archive", onClick: () => console.log("Archive") },
          {
            label: "Delete",
            onClick: () => console.log("Delete"),
            destructive: true,
          },
        ]}
      />
    </div>
  );
}
