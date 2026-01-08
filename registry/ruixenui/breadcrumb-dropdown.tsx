"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, MoreHorizontal, Folder } from "lucide-react";

interface BreadcrumbDropdownItem {
  label: string;
  href?: string;
}

interface BreadcrumbDropdownProps {
  items: BreadcrumbDropdownItem[];
  maxVisible?: number;
  dropdownIcon?: "dots" | "folder";
  className?: string;
}

export default function BreadcrumbDropdown({
  items,
  maxVisible = 3,
  dropdownIcon = "dots",
  className,
}: BreadcrumbDropdownProps) {
  const shouldCollapse = items.length > maxVisible;
  const visibleStart = shouldCollapse ? 1 : items.length;
  const hiddenItems = shouldCollapse
    ? items.slice(1, items.length - (maxVisible - 2))
    : [];
  const visibleEnd = shouldCollapse
    ? items.slice(items.length - (maxVisible - 2))
    : [];

  const DropdownIcon = dropdownIcon === "folder" ? Folder : MoreHorizontal;

  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {/* First item */}
        <li className="inline-flex items-center gap-1.5">
          {items[0].href ? (
            <a
              href={items[0].href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {items[0].label}
            </a>
          ) : (
            <span className="text-muted-foreground">{items[0].label}</span>
          )}
          {items.length > 1 && (
            <ChevronRight
              className="mx-1 size-4 text-muted-foreground"
              aria-hidden="true"
            />
          )}
        </li>

        {/* Collapsed items in dropdown */}
        {shouldCollapse && hiddenItems.length > 0 && (
          <li className="inline-flex items-center gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-7 p-0 text-muted-foreground hover:text-foreground"
                >
                  <DropdownIcon className="size-4" />
                  <span className="sr-only">More pages</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {hiddenItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    {item.href ? (
                      <a href={item.href}>{item.label}</a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ChevronRight
              className="mx-1 size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </li>
        )}

        {/* Visible end items */}
        {(shouldCollapse ? visibleEnd : items.slice(1)).map(
          (item, index, arr) => {
            const isLast = index === arr.length - 1;

            return (
              <li key={index} className="inline-flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      isLast
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    className="mx-1 size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          },
        )}
      </ol>
    </nav>
  );
}

export {
  BreadcrumbDropdown,
  type BreadcrumbDropdownProps,
  type BreadcrumbDropdownItem,
};
