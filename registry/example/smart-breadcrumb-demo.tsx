"use client";

import { SmartBreadcrumb } from "@/registry/ruixenui/smart-breadcrumb";
import { Home, Folder, FileText, BarChart, Settings } from "lucide-react";

export default function SmartBreadcrumbDemo() {
  const items1 = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <Folder className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: <BarChart className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Overview",
      isCurrent: true,
      icon: <FileText className="size-4 stroke-[1.8]" />,
    },
  ];

  const items2 = [
    {
      label: "Dashboard",
      href: "/",
      icon: <Home className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <BarChart className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Users",
      href: "/users",
      icon: <Folder className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: <FileText className="size-4 stroke-[1.8]" />,
    },
    {
      label: "Settings",
      isCurrent: true,
      icon: <Settings className="size-4 stroke-[1.8]" />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-12 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Smart Breadcrumb Demo</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          A dynamic, configurable breadcrumb component built with Lucide icons,
          tooltips, ellipsis handling, and hover effects for modern interfaces.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-6 w-full max-w-md">
          <h2 className="font-semibold mb-3">Basic Breadcrumb</h2>
          <SmartBreadcrumb items={items1} />
        </div>

        <div className="p-6 w-full max-w-md">
          <h2 className="font-semibold mb-3">
            With Ellipsis & Custom Separator
          </h2>
          <SmartBreadcrumb
            items={items2}
            showEllipsis
            maxVisible={4}
            separator={<span className="text-gray-500">›</span>}
          />
        </div>

        <div className="p-6 w-full max-w-md">
          <h2 className="font-semibold mb-3">Without Icons</h2>
          <SmartBreadcrumb items={items2} showEllipsis={false} />
        </div>
      </div>
    </div>
  );
}
