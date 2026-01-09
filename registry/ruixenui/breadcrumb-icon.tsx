"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Home,
  Folder,
  File,
  Settings,
  type LucideIcon,
} from "lucide-react";

interface BreadcrumbIconItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

interface BreadcrumbIconProps {
  items: BreadcrumbIconItem[];
  showHomeIcon?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export default function BreadcrumbIcon({
  items,
  showHomeIcon = true,
  iconOnly = false,
  className,
}: BreadcrumbIconProps) {
  // Add home icon to first item if not present
  const itemsWithIcons = items.map((item, index) => ({
    ...item,
    icon: item.icon || (index === 0 && showHomeIcon ? Home : undefined),
  }));

  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {itemsWithIcons.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {Icon && <Icon className="size-4" />}
                  {!iconOnly && <span>{item.label}</span>}
                </a>
              ) : (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {Icon && <Icon className="size-4" />}
                  {!iconOnly && <span>{item.label}</span>}
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
        })}
      </ol>
    </nav>
  );
}

export { BreadcrumbIcon, type BreadcrumbIconProps, type BreadcrumbIconItem };
