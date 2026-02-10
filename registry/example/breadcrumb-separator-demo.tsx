"use client";

import BreadcrumbSeparator from "@/registry/ruixenui/breadcrumb-separator";

const items = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Navigation", href: "#" },
  { label: "Breadcrumbs" },
];

const shortItems = [
  { label: "Docs", href: "#" },
  { label: "API", href: "#" },
  { label: "Reference" },
];

export default function BreadcrumbSeparatorDemo() {
  return (
    <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8 p-8">
      <BreadcrumbSeparator items={items} />
      <div className="flex flex-col items-center gap-4">
        <BreadcrumbSeparator items={shortItems} separator="slash" />
        <BreadcrumbSeparator items={shortItems} separator="dot" />
        <BreadcrumbSeparator items={shortItems} separator="arrow" />
      </div>
    </div>
  );
}
