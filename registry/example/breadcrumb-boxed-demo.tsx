"use client";

import BreadcrumbBoxed from "@/registry/ruixenui/breadcrumb-boxed";

const items = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" },
];

export default function BreadcrumbBoxedDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-8 p-4">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <BreadcrumbBoxed items={items} variant="default" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Filled</p>
        <BreadcrumbBoxed items={items} variant="filled" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Outline</p>
        <BreadcrumbBoxed items={items} variant="outline" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Ghost</p>
        <BreadcrumbBoxed items={items} variant="ghost" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Rounded Full
        </p>
        <BreadcrumbBoxed items={items} variant="default" rounded="full" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Without Home Icon
        </p>
        <BreadcrumbBoxed items={items} variant="filled" showHomeIcon={false} />
      </div>
    </div>
  );
}
