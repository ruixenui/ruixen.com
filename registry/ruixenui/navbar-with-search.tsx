"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarWithSearchProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string; active?: boolean }[];
  placeholder?: string;
  shortcut?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  className?: string;
}

export default function NavbarWithSearch({
  logo = <span className="font-semibold">Logo</span>,
  links = [
    { label: "Home", href: "#", active: true },
    { label: "Docs", href: "#" },
    { label: "Components", href: "#" },
  ],
  placeholder = "Search...",
  shortcut = "⌘K",
  onSearch,
  actions,
  className,
}: NavbarWithSearchProps) {
  const [value, setValue] = React.useState("");

  return (
    <header className={cn("w-full border-b", className)}>
      <div className="flex h-14 items-center justify-between gap-4 px-4">
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
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden w-full max-w-sm md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="h-9 w-full rounded-md border bg-transparent pl-9 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/20"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 text-xs text-muted-foreground">
              {shortcut}
            </kbd>
          </div>
          {actions ?? <Button size="sm">Sign In</Button>}
        </div>
      </div>
    </header>
  );
}
