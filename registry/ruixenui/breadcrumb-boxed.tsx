"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Breadcrumb Boxed — Segment relief with underline wipe.

   Items sit inside a bordered container like a segmented
   control. Each segment is an independent tactile surface —
   hover one and it lifts from the container (bg-background,
   subtle shadow), while a 2px accent underline wipes in
   from the left edge. Everything is LOCAL to the hovered
   item — no cascade, no pill, no content changes.

   Four distinct paradigms across the breadcrumb family:
     • separator: hover affects OTHER items      (cascade)
     • icon:      a HIGHLIGHT slides to target   (pill)
     • dropdown:  HIDDEN CONTENT unfolds in place (expand)
     • boxed:     the ITEM ITSELF transforms      (relief)

   Curve: cubic-bezier(0.65, 0, 0.35, 1) — ease-in-out.
   The underline starts slow, bursts through the middle,
   decelerates at the end. A "painting" feel — symmetric
   wipe, no spring, no deceleration-only.

   Separators: 1px vertical divider lines. The most
   "segmented control" separator — visually distinct from
   chevrons (separator/icon) and slashes (dropdown).
   ═══════════════════════════════════════════════════════════ */

export interface BreadcrumbBoxedItem {
  label: string;
  href?: string;
}

export interface BreadcrumbBoxedProps {
  items: BreadcrumbBoxedItem[];
  rounded?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const containerRadius: Record<string, string> = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const segmentRadius: Record<string, string> = {
  sm: "rounded-[2px]",
  md: "rounded",
  lg: "rounded-md",
  full: "rounded-full",
};

export function BreadcrumbBoxed({
  items,
  rounded = "lg",
  className,
}: BreadcrumbBoxedProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex border bg-muted/40 p-1",
        containerRadius[rounded],
        className,
      )}
    >
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = !!item.href && !isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span
                  className="mx-px h-4 w-px shrink-0 bg-border/50"
                  aria-hidden="true"
                />
              )}
              {isLink ? (
                <a
                  href={item.href}
                  className={cn(
                    "group relative overflow-hidden px-3 py-1.5 text-sm text-muted-foreground transition-all duration-150 hover:bg-background hover:text-foreground hover:shadow-sm",
                    segmentRadius[rounded],
                  )}
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-foreground/70 transition-[width] duration-300 group-hover:w-full"
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.65, 0, 0.35, 1)",
                    }}
                  />
                </a>
              ) : (
                <span
                  className={cn(
                    "relative overflow-hidden px-3 py-1.5 text-sm",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                    segmentRadius[rounded],
                  )}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                  {isLast && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-foreground/70" />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
