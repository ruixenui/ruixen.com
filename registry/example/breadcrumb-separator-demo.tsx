"use client";

import BreadcrumbSeparator from "@/registry/ruixenui/breadcrumb-separator";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones" },
];

export default function BreadcrumbSeparatorDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-8 p-4">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Chevron</p>
        <BreadcrumbSeparator items={items} separator="chevron" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Slash</p>
        <BreadcrumbSeparator items={items} separator="slash" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Dot</p>
        <BreadcrumbSeparator items={items} separator="dot" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Arrow</p>
        <BreadcrumbSeparator items={items} separator="arrow" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Dash</p>
        <BreadcrumbSeparator items={items} separator="dash" />
      </div>
    </div>
  );
}
