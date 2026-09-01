"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ── Arc Wheel Select ────────────────────────────────────────────
 * An icon rail whose tiles ride a circle instead of a straight line.
 * Tile i sits at angle (i - selected) * step on a circle of `radius`
 * centred off to the right, so the selected tile is the only one left
 * on the axis and its neighbours bow outward as they fan away:
 *
 *   x = radius * (1 - cos θ)      y = radius * sin θ
 *
 * One spring drives x, y and scale together — that shared spring is
 * why it reads as a wheel turning rather than a list sliding.
 *
 * The icons animate themselves. Each one is an SVG carrying its own
 * keyframes, so the wheel moves tiles and nothing else — no pop, no
 * breathe, no wrapper scale pretending to be an animated icon. The
 * tile only ever changes colour to show the selection.
 * ─────────────────────────────────────────────────────────────── */

export type ArcWheelItem = {
  value: string;
  /** Accessible name for the tile. Never rendered — the rail is icons only. */
  label: string;
  /** Any node, and it animates itself — a self-animating SVG, a lucide
   *  icon, a logo. Nothing here drives it. */
  icon: React.ReactNode;
};

export interface ArcWheelSelectProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "onChange" | "defaultValue"
  > {
  items: ArcWheelItem[];
  /** Controlled selection. */
  value?: string;
  /** Uncontrolled starting selection. Defaults to the first item. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Radius of the arc in px. Larger is flatter. @default 220 */
  radius?: number;
  /** Degrees between tiles. Larger fans them out harder. @default 18 */
  step?: number;
  /** Tiles kept alive either side of the selection. @default 3 */
  visible?: number;
}

/** Wheel delta accumulated before the selection steps — tames trackpads. */
const WHEEL_STEP = 40;

/** Fixed row height. The arc spacing is radius × sin(step), so a row that grew
 *  with its content would start colliding with its neighbours. */
const ROW_H = 72;

const ROW_SPRING = {
  type: "spring",
  stiffness: 240,
  damping: 26,
  mass: 0.7,
} as const;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function ArcWheelSelect({
  items,
  value,
  defaultValue,
  onValueChange,
  radius = 220,
  step = 18,
  visible = 3,
  className,
  style,
  ...props
}: ArcWheelSelectProps) {
  const uid = React.useId();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [uncontrolled, setUncontrolled] = React.useState(() =>
    Math.max(
      0,
      items.findIndex((i) => i.value === defaultValue),
    ),
  );
  const controlledIndex = items.findIndex((i) => i.value === value);
  const selected =
    value !== undefined ? Math.max(0, controlledIndex) : uncontrolled;

  // Read by the wheel listener, which is registered once and never re-bound.
  const selectedRef = React.useRef(selected);
  selectedRef.current = selected;

  const select = React.useCallback(
    (index: number) => {
      const next = clamp(index, 0, items.length - 1);
      if (next === selectedRef.current) return;
      if (value === undefined) setUncontrolled(next);
      onValueChange?.(items[next].value);
    },
    [items, onValueChange, value],
  );

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      const at = selectedRef.current;
      // At either end the wheel is not ours — hand the scroll back to the page.
      if (
        (e.deltaY > 0 && at === items.length - 1) ||
        (e.deltaY < 0 && at === 0)
      )
        return;

      e.preventDefault();
      accum += e.deltaY;
      if (Math.abs(accum) < WHEEL_STEP) return;
      // One row per crossing, never several: a flick used to hand the spring a
      // target three rows out and the whole wheel lurched to catch it. The
      // surplus is dropped rather than banked, so the stepping stays even and
      // nothing keeps firing after the gesture stops.
      select(at + Math.sign(accum));
      accum = 0;
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [items.length, select]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const next = {
      ArrowDown: selected + 1,
      ArrowUp: selected - 1,
      Home: 0,
      End: items.length - 1,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };

  return (
    <div
      ref={containerRef}
      role="listbox"
      tabIndex={0}
      aria-label={props["aria-label"] ?? "Select an option"}
      aria-activedescendant={`${uid}-${selected}`}
      onKeyDown={onKeyDown}
      className={cn(
        // The width is the arc, not taste: tiles bow out by
        // radius × (1 − cos(visible × step)) and the box has to hold that.
        // It is also the wheel-capture area, so it must not be wider than the
        // rail — an invisible full-width box that eats scroll is a trap.
        // `overflow-hidden` is what clips the tiles swinging past the edge.
        "relative h-[420px] w-[184px] touch-none select-none overflow-hidden overscroll-contain outline-none sm:h-[520px]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      style={style}
      {...props}
    >
      {/* `presentation` keeps the listbox → option relationship intact: this
          wrapper only centres the arc, it is not a level of the tree. */}
      <div
        role="presentation"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
      >
        {items.map((item, i) => {
          const distance = Math.abs(i - selected);
          const isSelected = i === selected;
          const isFaded = distance > visible;
          const angle = ((i - selected) * step * Math.PI) / 180;

          return (
            <motion.div
              key={item.value}
              id={`${uid}-${i}`}
              role="option"
              aria-selected={isSelected}
              aria-label={item.label}
              onClick={() => select(i)}
              className={cn(
                "absolute inset-x-0 flex cursor-pointer items-center pl-3",
                isFaded && "pointer-events-none",
              )}
              style={{ top: "50%", marginTop: -ROW_H / 2, height: ROW_H }}
              // Skip the mount animation, or every tile flies out of the centre
              // on first paint instead of the wheel simply being there.
              initial={false}
              animate={{
                x: radius * (1 - Math.cos(angle)),
                y: radius * Math.sin(angle),
                scale: 1 - Math.min(distance, visible) * 0.08,
                // 0.24 per row read as ghosts once the text was gone: an icon
                // has far less ink than a title to lose.
                opacity: isFaded ? 0 : 1 - distance * 0.18,
              }}
              // Tiles more than one past the visible band are invisible, so they
              // jump instead of springing — the arc only ever animates the
              // handful you can see, not all N. They still land in the right
              // place, so re-entering the band is seamless.
              transition={
                reduceMotion || distance > visible + 1
                  ? { duration: 0 }
                  : ROW_SPRING
              }
            >
              {/* A plain tile. The icon inside it is already moving on its own,
                  and a second animation on top of that only fights it. */}
              <div
                className={cn(
                  "flex size-[60px] items-center justify-center rounded-2xl border transition-colors duration-300 [&_svg]:size-8",
                  isSelected
                    ? "border-border bg-muted/60 text-foreground shadow-sm"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {item.icon}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
