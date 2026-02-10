"use client";

import { BreadcrumbDropdown } from "@/registry/ruixenui/breadcrumb-dropdown";

const deepPath = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "Electronics", href: "#" },
  { label: "Computers", href: "#" },
  { label: "Laptops", href: "#" },
  { label: "Gaming Laptops" },
];

const mediumPath = [
  { label: "Dashboard", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Appearance", href: "#" },
  { label: "Theme" },
];

const shortPath = [
  { label: "Home", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Profile" },
];

export default function BreadcrumbDropdownDemo() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-8 p-8">
      <BreadcrumbDropdown items={deepPath} maxVisible={3} />
      <BreadcrumbDropdown items={mediumPath} maxVisible={3} />
      <BreadcrumbDropdown items={shortPath} />
    </div>
  );
}
