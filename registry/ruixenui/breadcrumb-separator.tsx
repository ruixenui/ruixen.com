"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Slash, Minus } from "lucide-react";

type SeparatorType = "chevron" | "slash" | "dot" | "arrow" | "dash";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbSeparatorProps {
  items: BreadcrumbItem[];
  separator?: SeparatorType;
  className?: string;
}

const separatorIcons: Record<SeparatorType, React.ReactNode> = {
  chevron: <ChevronRight className="size-4 text-muted-foreground" />,
  slash: <span className="text-muted-foreground">/</span>,
  dot: <span className="text-muted-foreground">·</span>,
  arrow: <span className="text-muted-foreground">→</span>,
  dash: <Minus className="size-3 text-muted-foreground" />,
};

export default function BreadcrumbSeparator({
  items,
  separator = "chevron",
  className,
}: BreadcrumbSeparatorProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

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
                <span className="mx-1" aria-hidden="true">
                  {separatorIcons[separator]}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export {
  BreadcrumbSeparator as BreadcrumbSeparatorComponent,
  type BreadcrumbSeparatorProps,
};
