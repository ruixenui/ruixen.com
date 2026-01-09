"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarSplitProps {
  logo?: React.ReactNode;
  leftLinks?: { label: string; href: string; active?: boolean }[];
  rightLinks?: { label: string; href: string }[];
  className?: string;
}

export default function NavbarSplit({
  logo = <span className="font-semibold">Logo</span>,
  leftLinks = [
    { label: "Products", href: "#", active: true },
    { label: "Solutions", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  rightLinks = [
    { label: "Docs", href: "#" },
    { label: "Support", href: "#" },
  ],
  className,
}: NavbarSplitProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            {logo}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {leftLinks.map((link) => (
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
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {rightLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
