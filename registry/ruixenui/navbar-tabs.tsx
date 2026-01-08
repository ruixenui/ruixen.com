"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarTabsProps {
  logo?: React.ReactNode;
  tabs?: { label: string; href: string; active?: boolean; count?: number }[];
  actions?: React.ReactNode;
  className?: string;
}

export default function NavbarTabs({
  logo = <span className="font-semibold">Logo</span>,
  tabs = [
    { label: "Overview", href: "#", active: true },
    { label: "Analytics", href: "#" },
    { label: "Reports", href: "#", count: 3 },
    { label: "Settings", href: "#" },
  ],
  actions,
  className,
}: NavbarTabsProps) {
  return (
    <header className={cn("w-full", className)}>
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center">
          {logo}
        </Link>
        <div className="flex items-center gap-2">
          {actions ?? <Button size="sm">New Report</Button>}
        </div>
      </div>
      <div className="border-b px-4">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => (
            <Link
              key={tab.href + tab.label}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 border-b-2 py-3 text-sm transition-colors",
                tab.active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {tab.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
