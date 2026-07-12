"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface Chapter {
  /** Stable, unique identifier for the chapter. */
  id: string;
  /** Bold heading shown at the top of the preview card. */
  title: string;
  /** Supporting copy shown under the title (clamped to three lines). */
  description?: React.ReactNode;
  /** Small muted label rendered above the title (e.g. a timestamp or step no.). */
  meta?: React.ReactNode;
}

export interface ChapterScrubberProps {
  /** Chapters rendered top-to-bottom, one uniform tick each. */
  chapters: Chapter[];
  /** Which side the preview card opens toward. Auto-flips near a viewport edge. Default `"right"`. */
  side?: "left" | "right";
  /** Length a tick reaches at the crest of the magnification, in pixels. Default `56`. */
  peakLength?: number;
  /** Resting length of every tick, in pixels. Keep it small. Default `14`. */
  restLength?: number;
  /** Height of each row in pixels; the gap between ticks. Smaller = denser. Default `10`. */
  rowHeight?: number;
  /** Radius of the magnification wave, in rows — how far the rise reaches from the pointer. Default `4`. */
  radius?: number;
  /** Marks one chapter as the persistent "current" position (e.g. where an agent is now). */
  currentIndex?: number;
  /** Fires when the active (hovered/focused) chapter changes. */
  onActiveChange?: (chapter: Chapter | null, index: number) => void;
  /** Fires when a chapter is chosen via click, Enter or Space. */
  onSelect?: (chapter: Chapter, index: number) => void;
  /** Accessible name for the rail. Default `"Chapters"`. */
  label?: string;
  className?: string;
}

const CARD_WIDTH = 260;
const GAP = 20;
// Tight, near-critically-damped spring: tracks the cursor with almost no lag
// and never overshoots — the wave feels attached to the pointer.
const POINTER_SPRING = { stiffness: 700, damping: 52, mass: 0.5 };
// Softer spring for the rise/settle so the wave swells and relaxes gracefully.
const STRENGTH_SPRING = { stiffness: 260, damping: 30, mass: 0.6 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Raised-cosine bump: 1 at the crest, 0 beyond the radius, with zero slope at
// both ends so the wave has no seams — the source of the buttery falloff.
function bump(distance: number, radius: number) {
  if (distance >= radius) return 0;
  return 0.5 * (1 + Math.cos(Math.PI * (distance / radius)));
}

interface TickProps {
  index: number;
  pointer: MotionValue<number>;
  strength: MotionValue<number>;
  radius: number;
  restLength: number;
  peakLength: number;
  isCurrent: boolean;
}

const Tick = React.memo(function Tick({
  index,
  pointer,
  strength,
  radius,
  restLength,
  peakLength,
  isCurrent,
}: TickProps) {
  const width = useTransform(() => {
    const rise = strength.get() * bump(Math.abs(index - pointer.get()), radius);
    return restLength + rise * (peakLength - restLength);
  });
  const opacity = useTransform(() => {
    const rise = strength.get() * bump(Math.abs(index - pointer.get()), radius);
    const base = isCurrent ? 0.55 : 0.22;
    return base + rise * (1 - base);
  });
  const scaleY = useTransform(() => {
    const rise = strength.get() * bump(Math.abs(index - pointer.get()), radius);
    // Only a slight thickening at the crest (2px -> ~2.8px); the length change
    // carries the rise, thickness is a quiet secondary cue.
    return 1 + rise * 0.4;
  });

  return (
    <motion.span
      aria-hidden="true"
      style={{ width, opacity, scaleY }}
      className={cn(
        "block h-[2px] rounded-full",
        isCurrent ? "bg-primary" : "bg-foreground",
      )}
    />
  );
});

export function ChapterScrubber({
  chapters,
  side = "right",
  peakLength = 56,
  restLength = 14,
  rowHeight = 10,
  radius = 4,
  currentIndex,
  onActiveChange,
  onSelect,
  label = "Chapters",
  className,
}: ChapterScrubberProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const buttonsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  // Namespaced so option ids stay unique across instances and don't depend on
  // chapter.id being a valid, collision-free DOM id.
  const baseId = React.useId();
  const optionId = (index: number) => `${baseId}-opt-${index}`;

  const rawPointer = useMotionValue(0);
  const rawStrength = useMotionValue(0);
  const springPointer = useSpring(rawPointer, POINTER_SPRING);
  const springStrength = useSpring(rawStrength, STRENGTH_SPRING);
  // Reduced motion: drop the temporal easing but keep the spatial wave, so the
  // rise is instant rather than sprung.
  const pointer = prefersReducedMotion ? rawPointer : springPointer;
  const strength = prefersReducedMotion ? rawStrength : springStrength;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [engaged, setEngaged] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);
  const [cardHeight, setCardHeight] = React.useState(0);
  const hoveringRef = React.useRef(false);
  const focusedRef = React.useRef<number | null>(null);
  const activeRef = React.useRef(0);

  const commitActive = React.useCallback((index: number) => {
    if (index !== activeRef.current) {
      activeRef.current = index;
      setActiveIndex(index);
    }
  }, []);

  const last = chapters.length - 1;

  React.useEffect(() => {
    onActiveChange?.(
      engaged ? chapters[activeIndex] : null,
      engaged ? activeIndex : -1,
    );
  }, [engaged, activeIndex, chapters, onActiveChange]);

  // Measure the card so its vertical travel can be clamped to the rail.
  React.useEffect(() => {
    if (cardRef.current) setCardHeight(cardRef.current.offsetHeight);
  }, [activeIndex]);

  // Flip toward the roomier side if the card would spill past the viewport.
  React.useEffect(() => {
    if (!engaged) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = el.ownerDocument.defaultView?.innerWidth ?? 0;
    const need = CARD_WIDTH + GAP + 8;
    let useRight = side === "right";
    if (useRight && vw - rect.right < need && rect.left >= need)
      useRight = false;
    if (!useRight && rect.left < need && vw - rect.right >= need)
      useRight = true;
    setFlipped(useRight !== (side === "right"));
  }, [engaged, activeIndex, side]);

  const resolvedSide =
    side === "right"
      ? flipped
        ? "left"
        : "right"
      : flipped
        ? "right"
        : "left";

  const totalHeight = chapters.length * rowHeight;
  // Exactly one tick is tabbable at a time (roving tabindex).
  const rovingIndex = engaged ? activeIndex : (currentIndex ?? 0);

  const cardTop = useTransform(pointer, (p) => {
    const half = cardHeight / 2;
    const center = clamp(
      (p + 0.5) * rowHeight,
      half,
      Math.max(half, totalHeight - half),
    );
    return center - half;
  });
  const cardScale = useTransform(strength, [0, 1], [0.97, 1]);
  const cardX = useTransform(
    strength,
    [0, 1],
    [resolvedSide === "right" ? -6 : 6, 0],
  );

  const engageAt = (pointerRow: number, activeAt: number) => {
    rawPointer.set(pointerRow);
    rawStrength.set(1);
    commitActive(clamp(activeAt, 0, last));
    if (!engaged) setEngaged(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const row = (event.clientY - rect.top) / rowHeight - 0.5;
    hoveringRef.current = true;
    engageAt(clamp(row, -0.5, last + 0.5), Math.round(row));
  };

  const handlePointerLeave = () => {
    hoveringRef.current = false;
    if (focusedRef.current != null) {
      rawPointer.set(focusedRef.current);
    } else {
      rawStrength.set(0);
      setEngaged(false);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      focusedRef.current = null;
      if (!hoveringRef.current) {
        rawStrength.set(0);
        setEngaged(false);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next = focusedRef.current ?? activeRef.current;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = Math.min(last, next + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = Math.max(0, next - 1);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    buttonsRef.current[next]?.focus();
  };

  return (
    <div
      ref={containerRef}
      style={{ width: peakLength }}
      className={cn("relative", className)}
    >
      <div
        ref={listRef}
        role="listbox"
        aria-label={label}
        aria-orientation="vertical"
        aria-activedescendant={engaged ? optionId(activeIndex) : undefined}
        className="flex w-full flex-col"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        {chapters.map((chapter, index) => {
          const isCurrent = index === currentIndex;
          const descText =
            typeof chapter.description === "string"
              ? `. ${chapter.description}`
              : "";
          return (
            <button
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              key={chapter.id}
              id={optionId(index)}
              type="button"
              role="option"
              aria-selected={isCurrent}
              aria-label={`${chapter.title}${descText}`}
              tabIndex={index === rovingIndex ? 0 : -1}
              onFocus={() => {
                focusedRef.current = index;
                engageAt(index, index);
              }}
              onClick={() => onSelect?.(chapter, index)}
              style={{ height: rowHeight }}
              className={cn(
                "flex w-full items-center rounded-sm outline-none",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                resolvedSide === "left" ? "justify-end" : "justify-start",
              )}
            >
              <Tick
                index={index}
                pointer={pointer}
                strength={strength}
                radius={radius}
                restLength={restLength}
                peakLength={peakLength}
                isCurrent={isCurrent}
              />
            </button>
          );
        })}
      </div>

      {chapters[activeIndex] ? (
        <motion.div
          ref={cardRef}
          aria-hidden="true"
          style={{
            top: cardTop,
            x: cardX,
            scale: cardScale,
            opacity: strength,
            ...(resolvedSide === "right"
              ? { left: peakLength + GAP }
              : { right: peakLength + GAP }),
          }}
          className={cn(
            "pointer-events-none absolute z-10 w-[260px] rounded-2xl border border-border bg-popover px-4 py-3.5 text-popover-foreground",
            "shadow-[0_2px_6px_-2px_rgba(0,0,0,0.08),0_16px_36px_-12px_rgba(0,0,0,0.22)]",
            resolvedSide === "right" ? "origin-left" : "origin-right",
          )}
        >
          {chapters[activeIndex].meta ? (
            <div className="mb-1 text-xs font-medium tabular-nums text-muted-foreground">
              {chapters[activeIndex].meta}
            </div>
          ) : null}
          <div className="truncate text-sm font-semibold leading-snug tracking-[-0.01em]">
            {chapters[activeIndex].title}
          </div>
          {chapters[activeIndex].description ? (
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {chapters[activeIndex].description}
            </p>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}

export default ChapterScrubber;
