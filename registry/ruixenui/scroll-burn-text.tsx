"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollBurnTextProps {
  /**
   * The blocks, read in order. Each one comes up out of the dark, passes the
   * lens and burns off, uncovering the next one standing behind it.
   */
  sections: string[];
  /** Line shown on the opening frame, before the first block is close enough to read. Fades out on the first flick of scroll. */
  hint?: React.ReactNode;
  /** Scroll distance each block gets. Taller is slower. Default `"170vh"`. */
  runway?: string;
  /** Scrollable ancestor to track instead of the page — pass this when pinning inside a bounded panel. */
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Film grain, as a tiled SVG rather than a bitmap: it is the one texture here
 * that has to sit over the whole frame, and a few hundred bytes of turbulence
 * beats shipping a PNG large enough not to visibly repeat. The gamma on alpha
 * is what keeps it grain — raw turbulence averages half opaque, which is a grey
 * wash over the frame rather than specks on it.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='gamma' exponent='4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/** Progress through a block's own slot at which it starts to burn. */
const BURN_AT = 0.62;
/** How much of the slot the burn takes to eat the block whole. */
const BURN_SPAN = 0.38;
/** Slots of approach before the first block reaches the front. */
const LEAD = 0.7;
/** Alpha of a block still standing behind the one up front. */
const DIM = 0.3;
/**
 * How far into its own fade the first block already is on the opening frame.
 * Without it the runway opens on an empty frame: the first block sits exactly
 * at the start of its ramp, which is zero, and there is nothing to scroll
 * toward. A shape this faint at the far end of the room is the whole cue.
 */
const OPEN = 0.22;
/** Distance a block is born at, in units of the distance it is read at. */
const FAR = 4;
/** Distance it has closed to by the time it is gone — a quarter of reading distance is four times the size. */
const NEAR = 0.25;
/**
 * Burn a single glyph fades over. Kept in step with the `0.09` in the glyph's
 * own opacity, which has to be a literal so Tailwind can see the class.
 */
const RAMP = 0.09;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Tracks `prefers-reduced-motion`. Straight off matchMedia rather than out of an
 * animation library — the burn writes its own styles, so a motion dependency
 * would be carried for this one boolean.
 */
function useReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduce(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);
  return reduce;
}

export function ScrollBurnText({
  sections,
  hint = "scroll down",
  runway = "170vh",
  container,
  className,
}: ScrollBurnTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const runwayRef = React.useRef<HTMLDivElement>(null);
  const counterRef = React.useRef<HTMLDivElement>(null);
  const hintRef = React.useRef<HTMLDivElement>(null);
  const blockRefs = React.useRef<(HTMLParagraphElement | null)[]>([]);

  const count = sections.length;

  // Read inside the scroll handler so retyping the copy does not tear the
  // listener down and rebuild it.
  const total = React.useRef(count);
  total.current = count;

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const el = runwayRef.current;
    if (!el) return;
    const containerEl = container?.current ?? null;
    const win = el.ownerDocument.defaultView ?? window;
    const scroller: HTMLElement | Window = containerEl ?? win;

    // Where a glyph sits in its block is a wrap-time fact, so the burn order is
    // measured once rather than derived from the character index: index order
    // would eat the copy in reading order, which is a wipe, not a burn.
    const measure = () => {
      blockRefs.current.forEach((block) => {
        if (!block) return;
        const w = block.offsetWidth || 1;
        const h = block.offsetHeight || 1;
        (Array.from(block.children) as HTMLElement[]).forEach((node) => {
          const x = (node.offsetLeft + node.offsetWidth / 2) / w;
          const y = (node.offsetTop + node.offsetHeight / 2) / h;
          // Two crossed waves instead of a noise field: they cost two sines and
          // land their blobs at the scale of a few glyphs, which is the bite a
          // real burn takes. A per-glyph random would give static, not holes.
          const blob =
            0.5 +
            0.28 * Math.sin(x * 11.3 + y * 6.1 + 1.7) +
            0.22 * Math.sin(x * 5.7 - y * 13.9 + 4.2);
          // Middle of the block goes first and the corners hold out longest,
          // so the copy is eaten from the inside the way paper takes a flame.
          const middle = Math.hypot(x - 0.5, (y - 0.5) * 1.15) / 0.62;
          node.style.setProperty(
            "--t",
            `${clamp01(0.05 + 0.55 * middle + 0.45 * blob)}`,
          );
        });
      });
    };

    // Only the block that is actually burning needs its progress rewritten. The
    // rest hold at 0 or 1, and writing those every frame would recalculate a few
    // hundred glyph opacities for nothing.
    const burnt: number[] = [];
    let active = -1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = containerEl ? containerEl.clientHeight : win.innerHeight;
      const top = containerEl
        ? rect.top - containerEl.getBoundingClientRect().top
        : rect.top;
      const p = clamp01(-top / (rect.height - viewport || 1));

      const count = total.current;
      // One slot per block. The runway stops with the last block at the moment
      // its burn would start, so the piece ends on that copy whole rather than
      // on a frame of ash.
      const t = -LEAD + p * (count - 1 + LEAD + BURN_AT);
      let front = 0;

      blockRefs.current.forEach((block, i) => {
        const wrap = block?.parentElement;
        if (!block || !wrap) return;
        const q = t - i;
        if (q > 1) front = Math.min(i + 1, count - 1);

        const alpha =
          clamp01((q + LEAD + OPEN) / 0.45) *
          (DIM + (1 - DIM) * clamp01(q / 0.45));

        // Nothing to paint before it arrives, and nothing left of it once the
        // burn has run — the last block never reaches that, so this only ever
        // clears blocks that are already ash.
        if (alpha <= 0 || q > 1) {
          wrap.style.visibility = "hidden";
          return;
        }
        wrap.style.visibility = "visible";
        wrap.style.opacity = `${alpha}`;
        // A lens, not an easing. Distance falls at a steady rate and size is one
        // over distance, so a block creeps while it is far off and rushes once
        // it is close — the same curve anything coming at you actually follows.
        // Doubling at a fixed rate instead would read as a flat zoom.
        const depth = Math.max(
          FAR - ((FAR - NEAR) * (q + LEAD)) / (1 + LEAD),
          NEAR,
        );
        wrap.style.transform = `scale(${1 / depth})`;

        // Run past 1 by the width of a glyph's own fade, or the glyph holding
        // the highest threshold is still half lit when the burn is over.
        const burn = clamp01((q - BURN_AT) / BURN_SPAN) * (1 + RAMP);
        if (burnt[i] !== burn) {
          burnt[i] = burn;
          block.style.setProperty("--b", `${burn}`);
          // The split follows this block's own burn, so the type comes apart
          // optically at the moment it comes apart physically — and the one
          // arriving behind it stays clean.
          block.style.setProperty("--ab", `${0.35 + burn * 2.6}`);
        }
      });

      // Off by the time the first block is anywhere near readable.
      if (hintRef.current) {
        hintRef.current.style.opacity = `${clamp01(1 - p / 0.08)}`;
      }
      if (active !== front) {
        active = front;
        if (counterRef.current) {
          counterRef.current.textContent = `${String(front + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = win.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onResize);
    // The column re-wraps when the panel does, and every threshold is pinned to
    // where a glyph landed, so a resized panel needs a fresh measure even when
    // nothing scrolled.
    const ro = containerEl ? new ResizeObserver(onResize) : null;
    if (containerEl && ro) ro.observe(containerEl);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onResize);
      ro?.disconnect();
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, container]);

  // `relative` so the glyphs measure against the block rather than against the
  // frame — they are laid out in the block, but their offsets are reported
  // against the nearest positioned ancestor.
  // The type is sized off the frame rather than off breakpoints, and off the
  // same number as the column: a block has to hold its share of the frame at
  // reading distance, and stepping the size while the column scales smoothly
  // leaves it a third of the height it should be between two breakpoints.
  const column =
    "relative w-[min(84vw,36rem)] text-center text-[clamp(1.25rem,6.5vw,2.75rem)] font-bold leading-[1.05] tracking-tight text-foreground";

  if (prefersReducedMotion) {
    return (
      <div className={cn("w-full bg-background px-6 py-24", className)}>
        <div className="mx-auto grid max-w-2xl gap-10">
          {sections.map((body, i) => (
            <p key={i} className={cn(column, "w-full text-left")}>
              {body}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-background", className)}>
      <div
        ref={runwayRef}
        style={{ height: `calc(${runway} * ${count})` }}
        className="w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
          <div
            ref={counterRef}
            className="pointer-events-none absolute bottom-5 left-6 z-10 text-[0.65rem] font-medium uppercase tracking-[0.22em] tabular-nums text-muted-foreground"
          />

          {hint ? (
            <div
              ref={hintRef}
              className="pointer-events-none absolute inset-x-0 bottom-16 z-10 text-center"
            >
              {/* The rule under it is the direction. The word alone reads as a
                  label on the frame rather than an instruction to the reader. */}
              <span className="relative text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground after:absolute after:left-1/2 after:top-full after:mt-2 after:h-8 after:w-px after:bg-gradient-to-b after:from-muted-foreground/50 after:to-transparent after:content-['']">
                {hint}
              </span>
            </div>
          ) : null}

          {sections.map((body, i) => (
            <div
              key={i}
              // Hidden until the first frame places it, so the blocks never
              // flash stacked on top of each other.
              style={{ visibility: "hidden" }}
              className="absolute inset-0 grid place-items-center will-change-transform"
              aria-hidden
            >
              <p
                ref={(node) => {
                  blockRefs.current[i] = node;
                }}
                className={column}
                style={
                  {
                    "--b": 0,
                    "--ab": 0.35,
                    // The RGB split is two shadows rather than two more copies
                    // of the copy: same fringe, a third of the DOM, and it
                    // widens off the same number that is eating the glyphs.
                    textShadow:
                      "calc(var(--ab) * -1px) 0 rgb(255 45 85 / 0.85), calc(var(--ab) * 1px) 0 rgb(0 225 255 / 0.85)",
                  } as React.CSSProperties
                }
              >
                {Array.from(body).map((ch, k) =>
                  ch === " " ? (
                    " "
                  ) : (
                    // The whole comparison lives in CSS: one custom property on
                    // the block against a threshold baked into each glyph. The
                    // scroll handler writes one value per frame, and the engine
                    // resolves the few hundred that answer to it.
                    <span
                      key={k}
                      className="opacity-[calc((var(--t,1)_+_0.09_-_var(--b,0))*11)]"
                    >
                      {ch}
                    </span>
                  ),
                )}
              </p>
            </div>
          ))}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{ backgroundImage: GRAIN, backgroundSize: "180px" }}
          />

          {/* The visual layer is split to the glyph, which assistive tech reads
              as loose letters, so the copy is carried once more intact. */}
          <p className="sr-only">{sections.join(" ")}</p>
        </div>
      </div>
    </div>
  );
}

export default ScrollBurnText;
