"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarFloatingProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  actions?: React.ReactNode;
  className?: string;
}

export default function NavbarFloating({
  logo = <span className="font-semibold">Logo</span>,
  links = [
    { label: "Home", href: "#", active: true },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
  ],
  actions,
  className,
}: NavbarFloatingProps) {
  return (
    <div className={cn("w-full px-4 py-4", className)}>
      <header className="mx-auto flex h-12 max-w-4xl items-center justify-between rounded-full border bg-background/80 px-4 shadow-sm backdrop-blur">
        <Link href="/" className="flex items-center">
          {logo}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                link.active
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {actions ?? (
            <Button size="sm" className="rounded-full">
              Get Started
            </Button>
          )}
        </div>
      </header>
    </div>
  );
}
