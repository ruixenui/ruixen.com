"use client";

import { BreadcrumbBoxed } from "@/registry/ruixenui/breadcrumb-boxed";

const mainPath = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Navigation", href: "#" },
  { label: "Breadcrumb" },
];

const shortPath = [
  { label: "Dashboard", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Profile" },
];

const longPath = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "Electronics", href: "#" },
  { label: "Accessories", href: "#" },
  { label: "Cables" },
];

export default function BreadcrumbBoxedDemo() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-8 p-8">
      <BreadcrumbBoxed items={mainPath} />
      <BreadcrumbBoxed items={shortPath} rounded="full" />
      <BreadcrumbBoxed items={longPath} rounded="md" />
    </div>
  );
}
