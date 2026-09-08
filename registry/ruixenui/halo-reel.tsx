"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ── Halo Reel ───────────────────────────────────────────────────
 * Cards ride an ellipse. Card i sits at θ = i·step + rotation on an
 * ellipse of radii (rx, ry):
 *
 *   x = rx·cos θ      y = ry·sin θ      scale = min + (1−min)·(cos θ + 1)/2
 *
 * cos θ does all the work: it places the card, sizes it, and — through the
 * scale — stacks it. One number driving three properties is why a card that
 * looks nearer *is* nearer; the stacking can never disagree with the
 * perspective.
 *
 * One `rotation` motion value drives the whole ring. Every card derives its
 * transform from it through `useTransform`, so a spin never re-renders React
 * — the ring turns at 60 fps whether it is autoplaying, being dragged, or
 * settling onto a snap.
 * ─────────────────────────────────────────────────────────────── */

export type HaloReelItem = {
  /** Image for the card. Omit it and the card falls back to the text face. */
  src?: string;
  alt?: string;
  /** Text face, used when there is no `src`. Both default to the shadcn
   *  `card` tokens, so a text card themes itself in light and dark. */
  bgColor?: string;
  textColor?: string;
  title?: string;
  subtitle?: string;
};

export interface HaloReelProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  items: HaloReelItem[];
  /** Card width in px at the front of the ring. @default 130 */
  cardWidth?: number;
  /** Card height in px at the front of the ring. @default 180 */
  cardHeight?: number;
  /** Scale of the card at the far side of the ring. @default 0.4 */
  minScale?: number;
  /** Horizontal radius as a fraction of the stage width. @default 0.45 */
  radiusXRatio?: number;
  /** Where the ellipse is centred across the stage. `0` pins it to the left
   *  edge, so the far half of the ring is clipped away. @default 0 */
  centerXRatio?: number;
  /** Vertical radius as a fraction of the stage height. @default 0.36 */
  radiusYRatio?: number;
  /** Rotate one card forward on a timer. @default true */
  autoPlay?: boolean;
  /** Time (ms) a card is held at the front before the next step. @default 1000 */
  holdDuration?: number;
  /** Duration (ms) of one step. @default 700 */
  stepDuration?: number;
  /** Hold the autoplay while a pointer rests on a card. @default true */
  pauseOnHover?: boolean;
  /** Spin the ring by dragging it. @default true */
  draggable?: boolean;
  /** Gap between neighbouring cards at the widest point of the ring, in card
   *  widths. `1` is just touching, above that they sit slightly apart, below
   *  that they overlap. The ring repeats `items` until it holds this spacing,
   *  so a wider ring means more cards rather than bigger gaps. @default 1.2 */
  spread?: number;
  /** Ceiling on the number of cards drawn around the ring. @default 64 */
  maxCards?: number;
  /** Multiplier on the drag rotation. @default 1 */
  dragSensitivity?: number;
  /** Node parked in the middle of the ring, behind the cards. */
  centerLabel?: React.ReactNode;
  /** @default true */
  showCenterLabel?: boolean;
}

const TAU = Math.PI * 2;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function HaloReel({
  items,
  cardWidth = 130,
  cardHeight = 180,
  minScale = 0.4,
  radiusXRatio = 0.45,
  centerXRatio = 0,
  radiusYRatio = 0.36,
  autoPlay = true,
  holdDuration = 1000,
  stepDuration = 700,
  pauseOnHover = true,
  draggable = true,
  spread = 1.2,
  maxCards = 64,
  dragSensitivity = 1,
  centerLabel,
  showCenterLabel = true,
  className,
  style,
  ...props
}: HaloReelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const count = items.length;

  const rotation = useMotionValue(0);
  const draggingRef = React.useRef(false);
  const hoverRef = React.useRef(false);

  const [size, setSize] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const measure = () =>
      setSize({ w: node.offsetWidth, h: node.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const radiusX = size.w * radiusXRatio;
  const radiusY = size.h * radiusYRatio;

  // The ring is sized by the stage and *filled* by repeating the items — the
  // one way a wide ring and close cards can both be true. Neighbours sit
  // `radius × step` apart at the widest point of each axis, so the tighter
  // axis decides how many slots the ring needs; below that number a wider ring
  // just means bigger gaps.
  const slots = clamp(
    Math.ceil(
      TAU *
        Math.max(
          radiusX / (cardWidth * spread),
          radiusY / (cardHeight * spread),
        ),
    ),
    count,
    Math.max(count, maxCards),
  );
  const step = slots ? TAU / slots : 0;

  // Cards shrink continuously to fit whatever box they are given, instead of
  // stepping at a breakpoint — a ring that jumps at 768px reads as broken on
  // every width either side of it.
  const fit = size.w
    ? clamp(
        Math.min(
          size.w / (radiusX + cardWidth),
          size.h / (2 * radiusY + cardHeight),
        ),
        0.45,
        1,
      )
    : 1;
  const cardW = cardWidth * fit;
  const cardH = cardHeight * fit;

  // Autoplay. Each step schedules the next, so a paused tick costs a re-check
  // and nothing else — no interval keeps firing behind a held pointer.
  React.useEffect(() => {
    if (!autoPlay || reduceMotion || !count) return;

    let timer = 0;
    let controls: ReturnType<typeof animate> | undefined;

    const tick = () => {
      timer = window.setTimeout(() => {
        if (draggingRef.current || (pauseOnHover && hoverRef.current)) {
          tick();
          return;
        }
        controls = animate(rotation, rotation.get() - step, {
          duration: stepDuration / 1000,
          ease: [0.4, 0, 0.2, 1],
          onComplete: tick,
        });
      }, holdDuration);
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      controls?.stop();
    };
  }, [
    autoPlay,
    count,
    holdDuration,
    pauseOnHover,
    reduceMotion,
    rotation,
    step,
    stepDuration,
  ]);

  /* ── drag ──────────────────────────────────────────────────── */

  const dragRef = React.useRef({ left: 0, top: 0, angle: 0 });

  const pointerAngle = (e: React.PointerEvent) => {
    const { left, top } = dragRef.current;
    // Normalising by the radii un-squashes the ellipse, so a drag along its
    // flat side turns the ring by the same amount as one along its tall side.
    return Math.atan2(
      (e.clientY - top - size.h / 2) / (radiusY || 1),
      (e.clientX - left - size.w * centerXRatio) / (radiusX || 1),
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || (e.pointerType === "mouse" && e.button !== 0)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = { left: rect.left, top: rect.top, angle: 0 };
    dragRef.current.angle = pointerAngle(e);
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const angle = pointerAngle(e);
    // Wrap into (−π, π] so crossing the seam behind the ring is one small
    // delta and not a full turn in the wrong direction.
    const delta =
      ((angle - dragRef.current.angle + Math.PI * 3) % TAU) - Math.PI;
    dragRef.current.angle = angle;
    rotation.set(rotation.get() + delta * dragSensitivity);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // Settle onto the nearest card — the ring never rests between two.
    const snapped = Math.round(rotation.get() / step) * step;
    if (reduceMotion) {
      rotation.set(snapped);
      return;
    }
    animate(rotation, snapped, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
  };

  const spinBy = (direction: number) => {
    const target = Math.round(rotation.get() / step) * step - direction * step;
    if (reduceMotion) {
      rotation.set(target);
      return;
    }
    animate(rotation, target, {
      duration: stepDuration / 1000,
      ease: [0.4, 0, 0.2, 1],
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!direction) return;
    e.preventDefault();
    spinBy(direction);
  };

  if (!count) return null;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={props["aria-label"] ?? "Image carousel"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative h-[100dvh] w-full touch-pan-y select-none overflow-hidden outline-none",
        draggable && "cursor-grab active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        className,
      )}
      style={style}
      {...props}
    >
      {showCenterLabel && centerLabel ? (
        <div
          className="pointer-events-none absolute inset-y-0 z-0 flex items-center justify-center px-4 text-center"
          // Parked in whatever space the ring leaves rather than at a fixed
          // spot, so it can never end up underneath the cards at any width.
          style={{
            left: size.w * centerXRatio + radiusX + cardW / 2,
            right: 0,
          }}
        >
          {centerLabel}
        </div>
      ) : null}

      {Array.from({ length: slots }, (_, i) => (
        <WheelCard
          key={i}
          item={items[i % count]}
          // The ring repeats `items` to stay dense. A screen reader should hear
          // each image once, not once per lap, so only the first pass is real
          // content and the copies are decoration.
          decorative={i >= count}
          index={i}
          step={step}
          rotation={rotation}
          radiusX={radiusX}
          radiusY={radiusY}
          centerXRatio={centerXRatio}
          minScale={minScale}
          width={cardW}
          height={cardH}
          onHoverChange={(hovered) => {
            hoverRef.current = hovered;
          }}
        />
      ))}
    </div>
  );
}

/* ── card ────────────────────────────────────────────────────── */

function WheelCard({
  item,
  index,
  step,
  rotation,
  radiusX,
  radiusY,
  centerXRatio,
  minScale,
  width,
  height,
  decorative,
  onHoverChange,
}: {
  item: HaloReelItem;
  index: number;
  step: number;
  rotation: MotionValue<number>;
  radiusX: number;
  radiusY: number;
  centerXRatio: number;
  minScale: number;
  width: number;
  height: number;
  decorative: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const cos = useTransform(rotation, (r) => Math.cos(index * step + r));
  const sin = useTransform(rotation, (r) => Math.sin(index * step + r));

  const x = useTransform(cos, (c) => c * radiusX);
  const y = useTransform(sin, (s) => s * radiusY);
  const scale = useTransform(
    cos,
    (c) => minScale + (1 - minScale) * ((c + 1) / 2),
  );
  const zIndex = useTransform(scale, (s) => Math.round(s * 1000));

  return (
    <motion.div
      role={decorative ? undefined : "group"}
      aria-roledescription={decorative ? undefined : "slide"}
      aria-hidden={decorative || undefined}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      style={{
        x,
        y,
        scale,
        zIndex,
        width,
        height,
        left: `${centerXRatio * 100}%`,
        top: "50%",
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
      className="absolute overflow-hidden shadow-xl"
    >
      {item.src ? (
        <img
          src={item.src}
          alt={decorative ? "" : (item.alt ?? "")}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-1 bg-card p-3 text-center text-card-foreground"
          style={{
            backgroundColor: item.bgColor,
            color: item.textColor,
          }}
        >
          {item.title ? (
            <span className="text-2xl font-black leading-none">
              {item.title}
            </span>
          ) : null}
          {item.subtitle ? (
            <span className="text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
              {item.subtitle}
            </span>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}

export default HaloReel;
