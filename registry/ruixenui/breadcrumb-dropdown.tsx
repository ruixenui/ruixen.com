"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Breadcrumb Dropdown — Inline-expanding collapsible path.

   Kills the floating dropdown entirely. Instead of hovering
   a trigger to summon a disembodied menu, click the ··· and
   the hidden path segments unfold INLINE — items stagger in
   from the left, each 50ms apart, expanding the breadcrumb
   to reveal the full path. Click again to snap it closed.

   Three distinct paradigms across the breadcrumb family:
     • separator: hover affects OTHER items      (cascade)
     • icon:      a HIGHLIGHT slides to target   (pill)
     • dropdown:  HIDDEN CONTENT unfolds in place (expand)

   The trigger icon morphs between three dots (collapsed)
   and a dash (expanded) with a scale + rotate crossfade.

   Curve: cubic-bezier(0.0, 0.0, 0.2, 1) — Material
   standard deceleration. No spring overshoot — the stagger
   choreography is the motion interest, not the curve.
   ═══════════════════════════════════════════════════════════ */

interface BreadcrumbDropdownItem {
  label: string;
  href?: string;
}

interface BreadcrumbDropdownProps {
  items: BreadcrumbDropdownItem[];
  maxVisible?: number;
  className?: string;
}

export default function BreadcrumbDropdown({
  items,
  maxVisible = 3,
  className,
}: BreadcrumbDropdownProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [itemVisible, setItemVisible] = React.useState<boolean[]>([]);
  const staggerTimers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const shouldCollapse = items.length > maxVisible;
  const hiddenItems = shouldCollapse
    ? items.slice(1, items.length - (maxVisible - 2))
    : [];
  const visibleEnd = shouldCollapse
    ? items.slice(items.length - (maxVisible - 2))
    : items.slice(1);
  const hiddenCount = hiddenItems.length;

  const toggle = React.useCallback(() => {
    staggerTimers.current.forEach(clearTimeout);
    staggerTimers.current = [];

    if (!expanded) {
      setExpanded(true);
      setItemVisible(new Array(hiddenCount).fill(false));
      for (let i = 0; i < hiddenCount; i++) {
        const timer = setTimeout(() => {
          setItemVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * 50);
        staggerTimers.current.push(timer);
      }
    } else {
      setItemVisible([]);
      setExpanded(false);
    }
  }, [expanded, hiddenCount]);

  React.useEffect(() => {
    return () => {
      staggerTimers.current.forEach(clearTimeout);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol className="flex flex-wrap items-center gap-0.5 text-sm">
        {/* First item — always visible */}
        <li className="inline-flex items-center">
          {items[0].href ? (
            <a
              href={items[0].href}
              className="rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {items[0].label}
            </a>
          ) : (
            <span className="px-1.5 py-0.5 text-muted-foreground">
              {items[0].label}
            </span>
          )}
          {items.length > 1 && <Sep />}
        </li>

        {/* Expand / collapse trigger */}
        {shouldCollapse && (
          <li className="inline-flex items-center">
            <button
              onClick={toggle}
              className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-foreground/[0.06] hover:text-foreground"
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse path" : "Expand path"}
            >
              <span className="relative flex size-4 items-center justify-center">
                {/* Three dots — visible when collapsed */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="absolute inset-0"
                  style={{
                    opacity: expanded ? 0 : 1,
                    transform: expanded
                      ? "scale(0.8) rotate(-90deg)"
                      : "scale(1) rotate(0deg)",
                    transition: "all 0.2s cubic-bezier(0.0, 0.0, 0.2, 1)",
                  }}
                >
                  <circle cx="3" cy="8" r="1.2" />
                  <circle cx="8" cy="8" r="1.2" />
                  <circle cx="13" cy="8" r="1.2" />
                </svg>
                {/* Dash — visible when expanded */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute inset-0"
                  style={{
                    opacity: expanded ? 1 : 0,
                    transform: expanded
                      ? "scale(1) rotate(0deg)"
                      : "scale(0.8) rotate(90deg)",
                    transition: "all 0.2s cubic-bezier(0.0, 0.0, 0.2, 1)",
                  }}
                >
                  <path
                    d="M4 8H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <Sep />
          </li>
        )}

        {/* Hidden items — unfold inline with stagger */}
        {expanded &&
          hiddenItems.map((item, i) => {
            const visible = itemVisible[i] ?? false;
            return (
              <li
                key={`hidden-${i}`}
                className="inline-flex items-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-8px)",
                  transition:
                    "opacity 0.25s cubic-bezier(0.0, 0.0, 0.2, 1), transform 0.25s cubic-bezier(0.0, 0.0, 0.2, 1)",
                }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="px-1.5 py-0.5 text-muted-foreground">
                    {item.label}
                  </span>
                )}
                <Sep />
              </li>
            );
          })}

        {/* Visible end items */}
        {visibleEnd.map((item, index) => {
          const isLast = index === visibleEnd.length - 1;
          return (
            <li key={`end-${index}`} className="inline-flex items-center">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    "px-1.5 py-0.5",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <Sep />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Sep() {
  return (
    <span
      className="mx-1 select-none text-xs text-muted-foreground/30"
      aria-hidden="true"
    >
      /
    </span>
  );
}

export {
  BreadcrumbDropdown,
  type BreadcrumbDropdownProps,
  type BreadcrumbDropdownItem,
};
