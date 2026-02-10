"use client";

import { BreadcrumbIcon } from "@/registry/ruixenui/breadcrumb-icon";
import { Home, Folder, File, Settings, Users } from "lucide-react";

const fileItems = [
  { label: "Home", href: "#", icon: Home },
  { label: "Documents", href: "#", icon: Folder },
  { label: "Projects", href: "#", icon: Folder },
  { label: "Report.pdf", icon: File },
];

const appItems = [
  { label: "Dashboard", href: "#", icon: Home },
  { label: "Settings", href: "#", icon: Settings },
  { label: "Team", icon: Users },
];

export default function BreadcrumbIconDemo() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-8 p-8">
      <BreadcrumbIcon items={fileItems} showHomeIcon={false} />
      <BreadcrumbIcon items={appItems} showHomeIcon={false} />
      <BreadcrumbIcon items={fileItems} showHomeIcon={false} iconOnly />
    </div>
  );
}
