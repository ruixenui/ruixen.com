"use client";

import BreadcrumbDropdown from "@/registry/ruixenui/breadcrumb-dropdown";

const manyItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Computers", href: "/products/electronics/computers" },
  { label: "Laptops", href: "/products/electronics/computers/laptops" },
  { label: "Gaming Laptops" },
];

const fewItems = [
  { label: "Home", href: "/" },
  { label: "Settings", href: "/settings" },
  { label: "Profile" },
];

export default function BreadcrumbDropdownDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-8 p-4">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Many Items (Collapsed with Dots)
        </p>
        <BreadcrumbDropdown
          items={manyItems}
          maxVisible={3}
          dropdownIcon="dots"
        />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Collapsed with Folder Icon
        </p>
        <BreadcrumbDropdown
          items={manyItems}
          maxVisible={3}
          dropdownIcon="folder"
        />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Show More Items (maxVisible=4)
        </p>
        <BreadcrumbDropdown items={manyItems} maxVisible={4} />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Few Items (No Collapse)
        </p>
        <BreadcrumbDropdown items={fewItems} maxVisible={3} />
      </div>
    </div>
  );
}
