"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

// Memoized spring config to prevent object recreation
const createSpringTransition = (stiffness: number, damping: number) => ({
  type: "spring" as const,
  stiffness,
  damping,
});

// Stable drag constraints - never changes
const DRAG_CONSTRAINTS = { left: 0, right: 0 } as const;

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  // consider wrapped alternative
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

/** Memoized individual card - prevents re-renders when sibling cards change */
type StackCardProps<T extends CardStackItem> = {
  item: T;
  index: number;
  isActive: boolean;
  cardWidth: number;
  cardHeight: number;
  x: number;
  y: number;
  z: number;
  lift: number;
  rotateX: number;
  rotateZ: number;
  scale: number;
  zIndex: number;
  reduceMotion: boolean | null;
  springTransition: { type: "spring"; stiffness: number; damping: number };
  handleDragEnd: (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onSelect: (index: number) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

const StackCard = React.memo(function StackCard<T extends CardStackItem>({
  item,
  index,
  isActive,
  cardWidth,
  cardHeight,
  x,
  y,
  z,
  lift,
  rotateX,
  rotateZ,
  scale,
  zIndex,
  reduceMotion,
  springTransition,
  handleDragEnd,
  onSelect,
  renderCard,
}: StackCardProps<T>) {
  const handleClick = React.useCallback(() => {
    onSelect(index);
  }, [onSelect, index]);

  return (
    <motion.div
      className={cn(
        "absolute bottom-0 rounded-2xl border-4 border-black/10 dark:border-white/10 overflow-hidden shadow-xl",
        "will-change-transform select-none",
        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: y + 40,
              x,
              rotateZ,
              rotateX,
              scale,
            }
      }
      animate={{
        opacity: 1,
        x,
        y: y + lift,
        rotateZ,
        rotateX,
        scale,
      }}
      transition={springTransition}
      onClick={handleClick}
      drag={isActive ? "x" : false}
      dragConstraints={isActive ? DRAG_CONSTRAINTS : undefined}
      dragElastic={isActive ? 0.18 : undefined}
      onDragEnd={isActive ? handleDragEnd : undefined}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translateZ(${z}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {renderCard ? (
          renderCard(item, { active: isActive })
        ) : (
          <DefaultFanCard item={item} active={isActive} />
        )}
      </div>
    </motion.div>
  );
}) as <T extends CardStackItem>(props: StackCardProps<T>) => React.ReactElement;

/** Memoized default card content */
const DefaultFanCard = React.memo(function DefaultFanCard({
  item,
}: {
  item: CardStackItem;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      {/* image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* subtle gradient overlay at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="truncate text-lg font-semibold text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-white/80">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,

  cardWidth = 520,
  cardHeight = 320,

  overlap = 0.48,
  spreadDeg = 48,

  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,

  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,

  springStiffness = 280,
  springDamping = 28,

  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,

  showDots = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  // keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Memoize computed geometry values - these only change when props change
  const { maxOffset, cardSpacing, stepDeg } = React.useMemo(
    () => ({
      maxOffset: Math.max(0, Math.floor(maxVisible / 2)),
      cardSpacing: Math.max(10, Math.round(cardWidth * (1 - overlap))),
      stepDeg:
        Math.floor(maxVisible / 2) > 0
          ? spreadDeg / Math.floor(maxVisible / 2)
          : 0,
    }),
    [maxVisible, cardWidth, overlap, spreadDeg],
  );

  // Memoize spring transition to prevent object recreation on every render
  const springTransition = React.useMemo(
    () => createSpringTransition(springStiffness, springDamping),
    [springStiffness, springDamping],
  );

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    setActive((a) => (loop || a > 0 ? wrapIndex(a - 1, len) : a));
  }, [loop, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    setActive((a) => (loop || a < len - 1 ? wrapIndex(a + 1, len) : a));
  }, [loop, len]);

  // Memoized keyboard handler
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [prev, next],
  );

  // Memoized drag end handler - stable reference prevents motion.div re-renders
  const handleDragEnd = React.useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (reduceMotion) return;
      const travel = info.offset.x;
      const v = info.velocity.x;
      const threshold = Math.min(160, cardWidth * 0.22);

      if (travel > threshold || v > 650) prev();
      else if (travel < -threshold || v < -650) next();
    },
    [reduceMotion, cardWidth, prev, next],
  );

  // autoplay - removed `active` from deps to prevent effect restart on every card change
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        setActive((a) => (loop || a < len - 1 ? wrapIndex(a + 1, len) : a));
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
  ]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* background wash / spotlight (unique feel) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-black/5 blur-3xl dark:bg-white/5"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/10 blur-3xl dark:bg-black/30"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              // hide far-away cards cleanly
              if (!visible) return null;

              // fan geometry
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10; // subtle arc-down feel
              const z = -abs * depthPx;

              const isActive = off === 0;

              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;

              const rotateX = isActive ? 0 : tiltXDeg;

              const zIndex = 100 - abs;

              return (
                <StackCard
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={isActive}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  x={x}
                  y={y}
                  z={z}
                  lift={lift}
                  rotateX={rotateX}
                  rotateZ={rotateZ}
                  scale={scale}
                  zIndex={zIndex}
                  reduceMotion={reduceMotion}
                  springTransition={springTransition}
                  handleDragEnd={handleDragEnd}
                  onSelect={setActive}
                  renderCard={renderCard}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots navigation centered at bottom */}
      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full transition",
                    on
                      ? "bg-foreground"
                      : "bg-foreground/30 hover:bg-foreground/50",
                  )}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
              aria-label="Open link"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
