"use client";

import * as React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatIcon,
  CommandIcon,
  InboxIcon,
  Menu01Icon,
  PencilEdit01Icon,
  Share08Icon,
  ToggleOnIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/**
 * Toolbar Dock — Vercel-style floating icon dock.
 *
 * A dark pill of icon buttons. One continuous tooltip rail lives above the
 * dock: on hover it slides (x) and clip-paths itself so only the active label
 * is revealed, sitting perfectly above the hovered icon.
 *
 * One item is marked `toggle` and stays pinned on the right. Clicking it
 * collapses the dock to JUST that button and back — the icon strip is an
 * overflow-clipped region whose width springs between 0 and its measured size,
 * so the icons slide out FROM the toggle and tuck back INTO it. The toggle
 * never moves: the wrapper reserves the expanded width as a constant footprint,
 * so the centered pill can't recenter as it resizes.
 *
 * Movement craft:
 *  - Tooltip `x` and `clipPath` are spring-driven by Motion in the SAME rAF
 *    tick, so the slide and the reveal window never desync.
 *  - The collapse width is one spring on a tiny element → cheap, 60fps.
 *  - Geometry is read from layout (offsetLeft / offsetWidth), transform-
 *    independent, so nothing fights an in-flight animation.
 */

export interface ToolbarDockItem {
  /** Stable identifier. */
  id: string;
  /** Accessible label, shown in the tooltip rail. */
  label: string;
  /** Icon node — rendered inside the circular button. */
  icon: React.ReactNode;
  /** Keyboard hint chips, e.g. ["⌘", "K"] or ["C"]. */
  shortcut?: string[];
  /** Show a small notification dot on the button. */
  badge?: boolean;
  /** Marks this button as the collapse/expand toggle (pinned, never moves). */
  toggle?: boolean;
  /** Click handler (ignored when `toggle` is set). */
  onClick?: () => void;
}

interface ToolbarDockProps {
  items?: ToolbarDockItem[];
  className?: string;
  /** Start collapsed — only the toggle button is visible. */
  defaultCollapsed?: boolean;
}

/* Springs tuned per role. Clip is near-critically damped (no overshoot); x is a
   touch livelier; the collapse width is smooth with a hint of settle. */
const SPRING_X = {
  type: "spring" as const,
  stiffness: 650,
  damping: 44,
  mass: 0.7,
};
const SPRING_CLIP = {
  type: "spring" as const,
  stiffness: 720,
  damping: 52,
  mass: 0.7,
};
const COLLAPSE_SPRING = {
  type: "spring" as const,
  stiffness: 460,
  damping: 42,
  mass: 0.9,
};

const ICON_PROPS = { className: "h-full w-full", strokeWidth: 2 } as const;

const DEFAULT_ITEMS: ToolbarDockItem[] = [
  {
    id: "comment",
    label: "Comment",
    icon: <HugeiconsIcon icon={BubbleChatIcon} {...ICON_PROPS} />,
    shortcut: ["C"],
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: <HugeiconsIcon icon={InboxIcon} {...ICON_PROPS} />,
    badge: true,
  },
  {
    id: "flags",
    label: "Feature Flags",
    icon: <HugeiconsIcon icon={ToggleOnIcon} {...ICON_PROPS} />,
  },
  {
    id: "draft",
    label: "Draft Mode",
    icon: <HugeiconsIcon icon={PencilEdit01Icon} {...ICON_PROPS} />,
  },
  {
    id: "share",
    label: "Share",
    icon: <HugeiconsIcon icon={Share08Icon} {...ICON_PROPS} />,
  },
  {
    id: "menu",
    label: "Menu",
    icon: <HugeiconsIcon icon={Menu01Icon} {...ICON_PROPS} />,
    badge: true,
    toggle: true,
  },
];

/** Sum offsetLeft up the offsetParent chain until `ancestor`. Transform-independent. */
function offsetLeftWithin(
  el: HTMLElement | null,
  ancestor: HTMLElement | null,
): number {
  let x = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return x;
}

const HIDDEN_CLIP = "inset(0px 100% 0px 0px round 10px)";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function ToolbarDock({
  items = DEFAULT_ITEMS,
  className,
  defaultCollapsed = false,
}: ToolbarDockProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const segRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  /* Tooltip rail state. */
  const visibleRef = React.useRef(false);
  const appearingRef = React.useRef(true);
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, clip: HIDDEN_CLIP });

  /* Collapse state + measured geometry (strip width + constant footprint). */
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [metrics, setMetrics] = React.useState<{
    strip: number;
    footprint: number;
  } | null>(null);

  /* Measure the icon strip (always full width — content is absolutely placed)
     and the pill's expanded footprint, before paint. */
  useIsoLayoutEffect(() => {
    const strip = stripRef.current?.offsetWidth ?? 0;
    const footprint = wrapperRef.current?.offsetWidth ?? 0;
    setMetrics({ strip, footprint });
  }, [items]);

  const reveal = React.useCallback((index: number) => {
    const rail = railRef.current;
    const seg = segRefs.current[index];
    const btn = btnRefs.current[index];
    const wrapper = wrapperRef.current;
    if (!rail || !seg || !btn || !wrapper) return;

    const railWidth = rail.offsetWidth || 1;
    const left = seg.offsetLeft;
    const right = railWidth - seg.offsetLeft - seg.offsetWidth;
    const leftPct = (left / railWidth) * 100;
    const rightPct = (right / railWidth) * 100;

    const segCenter = offsetLeftWithin(seg, wrapper) + seg.offsetWidth / 2;
    const btnCenter = offsetLeftWithin(btn, wrapper) + btn.offsetWidth / 2;
    const dx = btnCenter - segCenter;

    appearingRef.current = !visibleRef.current;
    visibleRef.current = true;

    setVisible(true);
    setPos({
      x: dx,
      clip: `inset(0px ${rightPct}% 0px ${leftPct}% round 10px)`,
    });
  }, []);

  const hideTooltip = React.useCallback(() => {
    visibleRef.current = false;
    setVisible(false);
  }, []);

  const handleItem = React.useCallback(
    (item: ToolbarDockItem) => {
      if (item.toggle) {
        hideTooltip();
        setCollapsed((c) => !c);
      } else {
        item.onClick?.();
      }
    },
    [hideTooltip],
  );

  const appearing = appearingRef.current;

  const indexed = items.map((item, index) => ({ item, index }));
  const toggleEntries = indexed.filter((e) => e.item.toggle);
  const iconEntries = indexed.filter((e) => !e.item.toggle);

  const renderButton = (item: ToolbarDockItem, index: number) => {
    const isToggle = !!item.toggle;
    return (
      <button
        key={item.id}
        ref={(el) => {
          btnRefs.current[index] = el;
        }}
        type="button"
        aria-expanded={isToggle ? !collapsed : undefined}
        aria-label={
          isToggle
            ? collapsed
              ? "Expand toolbar"
              : "Collapse toolbar"
            : undefined
        }
        tabIndex={!isToggle && collapsed ? -1 : undefined}
        onClick={() => handleItem(item)}
        onMouseEnter={() => reveal(index)}
        onFocus={() => reveal(index)}
        className="flex items-center justify-center outline-none"
      >
        <div className="group relative flex size-8 items-center justify-center rounded-full p-1.5 transition-colors hover:bg-accent">
          <span className="h-full w-full [&>svg]:h-full [&>svg]:w-full">
            {item.icon}
          </span>
          {item.badge && (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full border-[1.7px] border-background bg-primary transition-colors group-hover:border-accent" />
          )}
        </div>
        <span className="sr-only">{item.label}</span>
      </button>
    );
  };

  return (
    <div
      ref={wrapperRef}
      style={metrics ? { width: metrics.footprint } : undefined}
      className={cn(
        "relative inline-flex h-12 items-center justify-end text-foreground",
        className,
      )}
    >
      {/* ── Tooltip rail — one surface that slides + clips ── */}
      <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-3">
        <motion.div
          ref={railRef}
          initial={false}
          animate={{ x: pos.x, clipPath: pos.clip, opacity: visible ? 1 : 0 }}
          transition={{
            opacity: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
            x: appearing ? { duration: 0 } : SPRING_X,
            clipPath: appearing ? { duration: 0 } : SPRING_CLIP,
          }}
          style={{ willChange: "transform, clip-path, opacity" }}
          className="relative flex w-max rounded-[10px] bg-primary text-primary-foreground shadow-xl"
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                segRefs.current[i] = el;
              }}
              className="z-[1] inline-flex h-8 items-center justify-center"
            >
              <div className="flex items-center justify-center gap-2 whitespace-nowrap px-3 text-[13px] font-medium leading-tight tracking-[-0.01em] text-primary-foreground">
                {item.label}
                {item.shortcut && (
                  <span className="flex items-center justify-center gap-1">
                    {item.shortcut.map((key, k) => (
                      <kbd
                        key={k}
                        className="inline-flex size-5 items-center justify-center rounded-sm border border-primary-foreground/30 p-0.5 text-xs text-primary-foreground"
                      >
                        {key === "⌘" ? (
                          <HugeiconsIcon
                            icon={CommandIcon}
                            size={12}
                            strokeWidth={2}
                          />
                        ) : (
                          key
                        )}
                      </kbd>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Pill — right-aligned in the constant footprint, so it can shrink
             to the toggle without the toggle ever moving ── */}
      <div
        onMouseLeave={hideTooltip}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) hideTooltip();
        }}
        className="relative z-10 flex h-12 items-center rounded-full border border-border bg-background/95 p-2 shadow-lg backdrop-blur"
      >
        {/* Icon strip — overflow-clipped; width springs 0 ⇄ measured. Content is
            right-anchored so it reveals/retracts from the toggle side. */}
        <motion.div
          className="relative h-8 overflow-hidden"
          initial={false}
          animate={
            metrics
              ? {
                  width: collapsed ? 0 : metrics.strip,
                  opacity: collapsed ? 0 : 1,
                }
              : undefined
          }
          style={metrics ? undefined : { width: "auto" }}
          transition={{
            width: COLLAPSE_SPRING,
            opacity: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div
            ref={stripRef}
            className="absolute right-0 top-0 flex h-8 items-center gap-0.5 pr-0.5"
          >
            {iconEntries.map(({ item, index }) => renderButton(item, index))}
          </div>
        </motion.div>

        {/* Pinned toggle — the anchor everything opens/closes from. */}
        {toggleEntries.map(({ item, index }) => (
          <div key={item.id} className="shrink-0">
            {renderButton(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolbarDock;
