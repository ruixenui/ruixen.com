"use client";

import { ButtonDropdown } from "@/registry/ruixenui/button-dropdown";

export default function ButtonDropdownDemo() {
  const items = [
    { label: "Edit", onClick: () => console.log("Edit") },
    { label: "Duplicate", onClick: () => console.log("Duplicate") },
    { label: "Archive", onClick: () => console.log("Archive") },
    {
      label: "Delete",
      onClick: () => console.log("Delete"),
      destructive: true,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <ButtonDropdown label="Actions" items={items} />
      <ButtonDropdown label="More Options" items={items} variant="outline" />
      <ButtonDropdown label="Settings" items={items} variant="secondary" />
    </div>
  );
}
