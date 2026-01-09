"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Circle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavbarStatusProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  status?: {
    label: string;
    state: "online" | "offline" | "busy";
  };
  metrics?: {
    uptime?: string;
    latency?: string;
  };
  className?: string;
}

const statusColors = {
  online: "text-green-500",
  offline: "text-muted-foreground",
  busy: "text-yellow-500",
};

export default function NavbarStatus({
  logo = <span className="font-semibold">Logo</span>,
  links = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Analytics", href: "#" },
    { label: "Reports", href: "#" },
  ],
  status = { label: "Online", state: "online" },
  metrics = { uptime: "99.9%", latency: "45ms" },
  className,
}: NavbarStatusProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            {logo}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  link.active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {metrics && (
            <div className="hidden items-center gap-4 text-sm md:flex">
              {metrics.uptime && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Activity className="size-3.5" />
                  <span>{metrics.uptime} uptime</span>
                </div>
              )}
              {metrics.latency && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Zap className="size-3.5" />
                  <span>{metrics.latency}</span>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Circle
              className={cn("size-2 fill-current", statusColors[status.state])}
            />
            <span className="text-sm">{status.label}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
