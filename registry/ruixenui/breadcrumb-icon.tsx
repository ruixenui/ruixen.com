"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Breadcrumb Icon — Magnetic pill-tracking breadcrumb.

   Flips the cascade metaphor on its head. Instead of dimming
   everything else when you hover, a soft pill highlight
   slides TO the item you're pointing at — the highlight
   comes to you. The hovered icon does a spring micro-bounce
   for tactile feedback without disturbing its neighbors.

   Two fundamentally different interaction approaches:
     • breadcrumb-separator: hover affects OTHER items (cascade)
     • breadcrumb-icon: hover affects ONLY the target (pill tracks)

   Curves:
     • Pill slide: cubic-bezier(0.33, 1.52, 0.58, 1) — spring overshoot
     • Icon pop:   cubic-bezier(0.34, 1.56, 0.64, 1) — tactile bounce
   ═══════════════════════════════════════════════════════════ */

export interface BreadcrumbIconItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

export interface BreadcrumbIconProps {
  items: BreadcrumbIconItem[];
  showHomeIcon?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export function BreadcrumbIcon({
  items,
  showHomeIcon = true,
  iconOnly = false,
  className,
}: BreadcrumbIconProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [pill, setPill] = React.useState({ left: 0, width: 0 });
  const containerRef = React.useRef<HTMLOListElement>(null);
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
  const hasPositioned = React.useRef(false);

  const itemsWithIcons = items.map((item, index) => ({
    ...item,
    icon: item.icon || (index === 0 && showHomeIcon ? Home : undefined),
  }));

  const handleHover = React.useCallback((index: number) => {
    setHoveredIndex(index);
    const el = itemRefs.current[index];
    const container = containerRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPill({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      });
    }
  }, []);

  React.useEffect(() => {
    if (hoveredIndex !== null) {
      hasPositioned.current = true;
    }
  }, [hoveredIndex]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol
        ref={containerRef}
        className="relative flex flex-wrap items-center gap-0.5"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Magnetic pill — slides to the hovered item */}
        <div
          className="pointer-events-none absolute rounded-md bg-foreground/[0.06]"
          style={{
            left: pill.left,
            width: pill.width,
            top: 0,
            bottom: 0,
            opacity: hoveredIndex !== null ? 1 : 0,
            transition:
              hoveredIndex !== null && hasPositioned.current
                ? "left 0.35s cubic-bezier(0.33, 1.52, 0.58, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease"
                : "opacity 0.2s ease",
          }}
        />

        {itemsWithIcons.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = !!item.href && !isLast;
          const isHovered = hoveredIndex === index;
          const Icon = item.icon;

          const iconEl = Icon ? (
            <Icon
              className="size-3.5"
              style={{
                transform: isHovered ? "scale(1.18)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          ) : null;

          return (
            <li key={index} className="z-10 inline-flex items-center">
              {isLink ? (
                <a
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors duration-200",
                    isHovered
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  onMouseEnter={() => handleHover(index)}
                >
                  {iconEl}
                  {!iconOnly && <span>{item.label}</span>}
                </a>
              ) : (
                <span
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                  onMouseEnter={() => setHoveredIndex(null)}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {iconEl}
                  {!iconOnly && <span>{item.label}</span>}
                </span>
              )}
              {!isLast && (
                <span
                  className="mx-0.5 inline-flex items-center text-muted-foreground/30"
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M4.5 3L7.5 6L4.5 9"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
