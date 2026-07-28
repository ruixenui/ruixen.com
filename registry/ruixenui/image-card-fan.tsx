"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FanCardItem {
  /** Stable, unique identifier. */
  id: string;
  /** Image URL rendered as the card face. */
  src: string;
  /** Shown beside the fan while this card is active, and its accessible name. */
  title: string;
  /** Shown on the opposite side while this card is active. */
  description?: string;
}

export interface ImageCardFanProps {
  /** Cards in the hand, in fan order. */
  cards: readonly FanCardItem[];
  /** Active card id. Pass to control the selection yourself. */
  activeId?: string;
  /** Card width in pixels. Height follows a 5:7 ratio. Shrinks to fit narrow containers. */
  cardWidth?: number;
  className?: string;
  /** Initially active card. Defaults to the first card. */
  defaultActiveId?: string;
  /** Fires when a different card is picked. */
  onSelect?: (card: FanCardItem) => void;
}

/** Flick speed, in px/s, that selects a card regardless of how far it travelled. */
const SELECT_VELOCITY = -600;

/** Cards waiting in the hand sit behind the active one, so they ride smaller. */
const HAND_SCALE = 0.72;

/** Spread each card into a symmetric arc around the middle of the hand. */
function fanTransform(index: number, count: number, spacing: number) {
  const offset = index - (count - 1) / 2;
  // The arc keeps a constant total sweep, so a bigger hand fans tighter.
  const stepDeg = count > 1 ? Math.min(9, 46 / (count - 1)) : 0;
  const rotate = offset * stepDeg;

  return {
    rotate,
    x: offset * spacing,
    y: Math.abs(rotate) * 1.9,
  };
}

export function ImageCardFan({
  cards,
  activeId: controlledActiveId,
  cardWidth = 224,
  className,
  defaultActiveId,
  onSelect,
}: ImageCardFanProps) {
  const shouldReduceMotion = useReducedMotion();
  const fanRef = React.useRef<HTMLDivElement>(null);
  // Set while a pointer drag is in flight so the trailing click is ignored.
  const draggingRef = React.useRef(false);
  const [fanWidth, setFanWidth] = React.useState<number | null>(null);
  const [internalActiveId, setInternalActiveId] = React.useState(
    defaultActiveId ?? cards[0]?.id,
  );
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  // Dragging a card claims the vertical touch axis, which on a phone means
  // swiping over the fan scrolls nothing. Pointer devices only.
  const [canDrag, setCanDrag] = React.useState(false);

  // Fall back to the first card whenever the requested id is not in the hand:
  // a swapped `cards` array, a stale controlled id, a bad `defaultActiveId`.
  // Without this the fan has no card lifted and no side text — an empty state
  // that is otherwise unreachable.
  const requestedId = controlledActiveId ?? internalActiveId;
  const activeId = cards.some((card) => card.id === requestedId)
    ? requestedId
    : cards[0]?.id;
  const activeIndex = cards.findIndex((card) => card.id === activeId);
  const activeCard = cards[activeIndex];

  React.useEffect(() => {
    setCanDrag(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  React.useEffect(() => {
    const node = fanRef.current;

    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setFanWidth(entry.contentRect.width);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Cards shrink rather than overflow once the column gets narrow.
  const width =
    fanWidth === null ? cardWidth : Math.min(cardWidth, fanWidth * 0.55);

  // Every travel distance scales off the card, so the fan holds together at
  // any width instead of only at the default.
  const height = width * 1.4;
  // Enough clearance under the hand for the outer cards to droop along the arc
  // without hanging out of the box — previews clip anything that does.
  const baseBottom = height * 0.09;
  const hoverLift = height * 0.34;
  const activeLift = height * 0.62;
  const selectDistance = -height * 0.5;

  const handCards = cards.filter((card) => card.id !== activeId);
  const hoveredIndex = hoveredId
    ? handCards.findIndex((card) => card.id === hoveredId)
    : -1;

  // Clamp the horizontal spread so the outermost cards (including their hover
  // scale) never clip against the column edges.
  const maxOffset = (handCards.length - 1) / 2;
  // 0.45 covers half a hand-sized card plus the extra width a 9° tilt adds.
  const halfAvailable =
    fanWidth === null ? Number.POSITIVE_INFINITY : fanWidth / 2 - width * 0.45;
  const fanSpacing =
    maxOffset > 0
      ? Math.min(
          width * (handCards.length > 5 ? 0.43 : 0.52),
          Math.max(width * 0.23, halfAvailable / maxOffset),
        )
      : 0;

  const cardTransition = shouldReduceMotion
    ? { duration: 0.16, ease: "easeOut" as const }
    : {
        damping: 30,
        mass: 0.9,
        stiffness: 340,
        type: "spring" as const,
      };

  const textTransition = { duration: shouldReduceMotion ? 0 : 0.32 };
  const textOffset = shouldReduceMotion ? 0 : 10;

  function clearHover(id: string) {
    setHoveredId((current) => (current === id ? null : current));
  }

  function selectCard(card: FanCardItem) {
    if (card.id === activeId) {
      return;
    }

    clearHover(card.id);

    if (controlledActiveId === undefined) {
      setInternalActiveId(card.id);
    }

    onSelect?.(card);
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-6 lg:gap-10",
        className,
      )}
    >
      <div className="w-full shrink-0 text-center sm:w-40 sm:text-right md:w-48 lg:w-56">
        {activeCard ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: textOffset }}
            key={activeCard.id}
            transition={textTransition}
          >
            <p className="font-mono text-muted-foreground text-xs tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(cards.length).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-balance font-semibold text-2xl text-foreground leading-tight tracking-tight lg:text-3xl">
              {activeCard.title}
            </h3>
          </motion.div>
        ) : null}
      </div>

      <div
        className="relative w-full min-w-0 flex-1"
        ref={fanRef}
        style={{ minHeight: height * 1.78 }}
      >
        {cards.map((card) => {
          const isActive = card.id === activeId;
          const handIndex = handCards.findIndex(
            (candidate) => candidate.id === card.id,
          );

          let target: { rotate: number; scale: number; x: number; y: number };
          let zIndex: number;

          if (isActive) {
            target = { rotate: 0, scale: 1, x: 0, y: -activeLift };
            zIndex = 100;
          } else {
            const fan = fanTransform(handIndex, handCards.length, fanSpacing);
            const isHovered = card.id === hoveredId;
            // Neighbours step aside, and the push falls off with distance.
            const neighborShift =
              hoveredIndex !== -1 && !isHovered
                ? (Math.sign(handIndex - hoveredIndex) * width * 0.14) /
                  Math.max(1, Math.abs(handIndex - hoveredIndex))
                : 0;

            target = {
              rotate: isHovered ? fan.rotate * 0.55 : fan.rotate,
              scale: isHovered ? HAND_SCALE * 1.08 : HAND_SCALE,
              x: fan.x + neighborShift,
              // Lift to a constant height so hovered cards fully clear the
              // bottom edge no matter how far they droop along the arc.
              y: isHovered ? -hoverLift : fan.y,
            };
            zIndex = isHovered ? 60 : 10 + handIndex;
          }

          return (
            <motion.div
              animate={target}
              className="absolute left-1/2"
              initial={false}
              key={card.id}
              style={{ bottom: baseBottom, marginLeft: -width / 2, zIndex }}
              transition={cardTransition}
            >
              <motion.button
                aria-label={card.title}
                aria-pressed={isActive}
                className={cn(
                  "block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "cursor-default"
                    : "cursor-grab active:cursor-grabbing",
                )}
                drag={canDrag && !isActive ? "y" : false}
                dragConstraints={{ bottom: 0, top: -height * 1.65 }}
                dragElastic={0.12}
                dragSnapToOrigin
                onBlur={() => clearHover(card.id)}
                // Enter and Space reach this natively; a drag never does,
                // because the pointer sequence sets the flag first.
                onClick={() => {
                  if (draggingRef.current) {
                    draggingRef.current = false;
                    return;
                  }

                  selectCard(card);
                }}
                onDragEnd={(_event, info) => {
                  if (
                    info.offset.y < selectDistance ||
                    info.velocity.y < SELECT_VELOCITY
                  ) {
                    selectCard(card);
                  }
                }}
                onDragStart={() => {
                  draggingRef.current = true;
                }}
                onFocus={() => {
                  if (!isActive) {
                    setHoveredId(card.id);
                  }
                }}
                onHoverEnd={() => clearHover(card.id)}
                onHoverStart={() => {
                  if (!isActive) {
                    setHoveredId(card.id);
                  }
                }}
                onPointerDown={() => {
                  draggingRef.current = false;
                }}
                type="button"
              >
                {/* Decorative: the button label and the side text carry the name. */}
                <img
                  alt=""
                  className="aspect-[5/7] select-none rounded-xl border border-border bg-muted object-cover shadow-lg"
                  draggable={false}
                  src={card.src}
                  style={{ width }}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="w-full shrink-0 text-center sm:w-40 sm:text-left md:w-48 lg:w-56"
      >
        {activeCard?.description ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-pretty text-muted-foreground text-sm leading-relaxed"
            initial={{ opacity: 0, y: textOffset }}
            key={activeCard.id}
            transition={textTransition}
          >
            {activeCard.description}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
