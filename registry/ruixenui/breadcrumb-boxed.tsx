"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbBoxedItem {
  label: string;
  href?: string;
}

type BoxedVariant = "default" | "filled" | "outline" | "ghost";

interface BreadcrumbBoxedProps {
  items: BreadcrumbBoxedItem[];
  variant?: BoxedVariant;
  showHomeIcon?: boolean;
  rounded?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const variantStyles: Record<BoxedVariant, string> = {
  default: "border bg-background shadow-sm",
  filled: "bg-muted",
  outline: "border-2 border-border",
  ghost: "bg-muted/50",
};

const roundedStyles = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export default function BreadcrumbBoxed({
  items,
  variant = "default",
  showHomeIcon = true,
  rounded = "lg",
  className,
}: BreadcrumbBoxedProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex px-4 py-2",
        variantStyles[variant],
        roundedStyles[rounded],
        className,
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isFirst && showHomeIcon && <Home className="size-4" />}
                  <span>{item.label}</span>
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
                  {isFirst && showHomeIcon && <Home className="size-4" />}
                  <span>{item.label}</span>
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="mx-0.5 size-4 text-muted-foreground/60"
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

export { BreadcrumbBoxed, type BreadcrumbBoxedProps, type BreadcrumbBoxedItem };
