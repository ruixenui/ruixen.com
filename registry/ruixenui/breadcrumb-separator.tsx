"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Breadcrumb Separator — Reactive hover-cascade breadcrumb.

   The separator isn't decoration — it's a directional cue.
   When you hover a parent item, you're expressing intent to
   "go back." Items after the hovered one fade and shift right,
   as if they'd be popped from the navigation stack. The
   separator adjacent to the hovered item scales with a spring
   overshoot, reinforcing the spatial metaphor.

   Two transition curves:
     • Separator scale: cubic-bezier(0.34, 1.56, 0.64, 1) — spring
     • Fade cascade: cubic-bezier(0.16, 1, 0.3, 1) — smooth ease-out
   ═══════════════════════════════════════════════════════════ */

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

function renderSeparator(type: SeparatorType) {
  if (type === "chevron") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M5.25 3.5L8.75 7L5.25 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const chars: Record<string, string> = {
    slash: "/",
    dot: "·",
    arrow: "→",
    dash: "—",
  };

  return <span className="text-xs leading-none">{chars[type]}</span>;
}

export default function BreadcrumbSeparator({
  items,
  separator = "chevron",
  className,
}: BreadcrumbSeparatorProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol
        className="flex flex-wrap items-center gap-1"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = !!item.href && !isLast;
          const isHovered = hoveredIndex === index;
          const isFaded = hoveredIndex !== null && index > hoveredIndex;
          const isSeparatorActive = hoveredIndex === index;

          return (
            <li
              key={index}
              className="inline-flex items-center"
              onMouseEnter={() => {
                if (isLink) {
                  setHoveredIndex(index);
                } else {
                  setHoveredIndex(null);
                }
              }}
              style={{
                opacity: isFaded ? 0.4 : 1,
                transform: isFaded ? "translateX(2px)" : "translateX(0)",
                transition:
                  "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {isLink ? (
                <a
                  href={item.href}
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-sm transition-colors duration-200",
                    isHovered
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-sm",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  className="ml-1 mr-0.5 inline-flex items-center text-muted-foreground"
                  aria-hidden="true"
                  style={{
                    transform: isSeparatorActive ? "scale(1.2)" : "scale(1)",
                    transition:
                      "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
                  }}
                >
                  {renderSeparator(separator)}
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
