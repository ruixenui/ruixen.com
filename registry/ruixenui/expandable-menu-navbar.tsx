"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

interface NavItem {
  label: string;
  meta?: string;
  href?: string;
  external?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface ExpandableMenuNavbarProps {
  brand?: React.ReactNode;
  brandLabel?: string;
  sections?: NavSection[];
  status?: string;
  version?: string;
  shortcut?: string;
  height?: number | string;
  className?: string;
}

const DEFAULT_SECTIONS: NavSection[] = [
  {
    items: [
      { label: "Index", meta: "01" },
      { label: "Work", meta: "24" },
      { label: "Notes", meta: "12" },
      { label: "Lab", meta: "08" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Changelog", meta: "v2.4" },
      { label: "Library", meta: "126" },
      { label: "Tools", meta: "07" },
      { label: "Press kit", meta: "↗", external: true },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Contact" },
      { label: "Newsletter", meta: "monthly" },
      { label: "Twitter", meta: "↗", external: true },
      { label: "GitHub", meta: "↗", external: true },
    ],
  },
];

function StackedMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden
      className="text-foreground"
    >
      <rect x="2" y="2" width="11" height="11" rx="1.5" fill="currentColor" />
      <rect
        x="7"
        y="7"
        width="11"
        height="11"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

const SPRING = { type: "spring", stiffness: 280, damping: 32 } as const;
const ITEM_EASE = [0.22, 0.61, 0.36, 1] as const;
const COLLAPSED_HEIGHT = 56;
const WRAPPER_PADDING = 32;

export default function ExpandableMenuNavbar({
  brand,
  brandLabel = "Index",
  sections = DEFAULT_SECTIONS,
  status = "Available",
  version = "v2.4.1",
  shortcut = "M",
  height = 560,
  className,
}: ExpandableMenuNavbarProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [measuredOpenHeight, setMeasuredOpenHeight] = React.useState(0);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      setMeasuredOpenHeight(Math.max(0, el.clientHeight - WRAPPER_PADDING));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  React.useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  const fallbackOpenHeight =
    (typeof height === "number" ? height : 560) - WRAPPER_PADDING;
  const openHeight =
    measuredOpenHeight > 0 ? measuredOpenHeight : fallbackOpenHeight;

  const flatIndex = React.useMemo(() => {
    const offsets: number[] = [];
    let acc = 0;
    for (const s of sections) {
      offsets.push(acc);
      acc += s.items.length;
    }
    return offsets;
  }, [sections]);

  return (
    <div
      ref={containerRef}
      className={[
        "relative w-full overflow-hidden rounded-2xl border border-border bg-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ height }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 z-[1] bg-foreground/[0.04] backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center p-4">
        <motion.div
          initial={false}
          animate={{ height: open ? openHeight : COLLAPSED_HEIGHT }}
          transition={SPRING}
          className={[
            "pointer-events-auto flex w-full max-w-md flex-col overflow-hidden",
            "rounded-2xl border border-border bg-card/85 backdrop-blur-md",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_28px_-12px_rgba(0,0,0,0.18)]",
            "dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_28px_-12px_rgba(0,0,0,0.6)]",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="expandable-menu-content"
            className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 text-foreground outline-none focus-visible:ring-1 focus-visible:ring-foreground/20"
          >
            <span className="flex items-center gap-2.5">
              {brand ?? <StackedMark />}
              <span className="text-sm font-medium tracking-tight">
                {brandLabel}
              </span>
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="hidden h-5 select-none items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                {shortcut}
              </kbd>
              <span className="font-medium uppercase tracking-[0.08em] text-foreground">
                {open ? "Close" : "Menu"}
              </span>
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                aria-hidden
              >
                <path
                  d="M3.5 5.25 7 8.75l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </motion.svg>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="panel"
                id="expandable-menu-content"
                ref={scrollRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ touchAction: "pan-y" }}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex flex-col gap-4 p-3">
                  {sections.map((section, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-0.5">
                      {section.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.06 + sIdx * 0.04,
                            ease: ITEM_EASE,
                          }}
                          className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          {section.title}
                        </motion.div>
                      )}

                      {section.items.map((item, iIdx) => {
                        const idx = flatIndex[sIdx] + iIdx;
                        return (
                          <motion.a
                            key={item.label}
                            href={item.href ?? "#"}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.32,
                              delay: 0.1 + idx * 0.022,
                              ease: ITEM_EASE,
                            }}
                            className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
                          >
                            <span className="flex items-center gap-2 font-medium tracking-tight">
                              {item.label}
                            </span>
                            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                              {item.meta && <span>{item.meta}</span>}
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                aria-hidden
                                className="-translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                              >
                                <path
                                  d="M4 2.5 7.5 6 4 9.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  fill="none"
                                />
                              </svg>
                            </span>
                          </motion.a>
                        );
                      })}
                    </div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.36, duration: 0.3 }}
                    className="mt-1 flex items-center justify-between border-t border-border px-3 pt-3 font-mono text-[11px] text-muted-foreground"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-foreground/40" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground/70" />
                      </span>
                      {status}
                    </span>
                    <span>{version}</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
