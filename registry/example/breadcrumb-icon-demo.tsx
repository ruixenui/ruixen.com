"use client";

import BreadcrumbIcon from "@/registry/ruixenui/breadcrumb-icon";
import { Home, Folder, File, Settings, Users } from "lucide-react";

const basicItems = [
  { label: "Home", href: "/" },
  { label: "Documents", href: "/documents" },
  { label: "Projects", href: "/documents/projects" },
  { label: "Annual Report" },
];

const customIconItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Team", href: "/settings/team", icon: Users },
  { label: "Members" },
];

const folderItems = [
  { label: "Root", href: "/", icon: Home },
  { label: "Documents", href: "/documents", icon: Folder },
  { label: "Work", href: "/documents/work", icon: Folder },
  { label: "Report.pdf", icon: File },
];

export default function BreadcrumbIconDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-8 p-4">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          With Home Icon
        </p>
        <BreadcrumbIcon items={basicItems} showHomeIcon />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Custom Icons
        </p>
        <BreadcrumbIcon items={customIconItems} />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          File System Style
        </p>
        <BreadcrumbIcon items={folderItems} showHomeIcon={false} />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Icon Only (First Item)
        </p>
        <BreadcrumbIcon
          items={[
            { label: "Home", href: "/", icon: Home },
            { label: "Products", href: "/products" },
            { label: "Details" },
          ]}
          showHomeIcon={false}
        />
      </div>
    </div>
  );
}
