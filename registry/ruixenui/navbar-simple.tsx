"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarSimpleProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  actions?: React.ReactNode;
  className?: string;
}

export default function NavbarSimple({
  logo = <span className="font-semibold">Logo</span>,
  links = [
    { label: "Home", href: "#", active: true },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
  ],
  actions,
  className,
}: NavbarSimpleProps) {
  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-8">
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
        <div className="flex items-center gap-2">
          {actions ?? (
            <>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
