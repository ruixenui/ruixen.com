"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface PhoneScrollHeroProps {
  /** Headline block. Sits *behind* the phone, so the phone can climb over it. */
  titleComponent: React.ReactNode;
  /** Rendered inside the phone screen. */
  children?: React.ReactNode;
  /**
   * How far the phone climbs into the title, as a share of its own height.
   * A percentage keeps the overlap proportional at every breakpoint without a
   * resize listener. Default `20`.
   */
  overlap?: number;
  /** Backward tilt of the phone at the start of the scroll, in deg. Default `22`. */
  tilt?: number;
  className?: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/* ── pieces ──────────────────────────────────────────────────── */

/** Device chassis. Every surface is a shadcn token, so the frame follows the
 *  host theme; only the camera island is a fixed colour (see below). */
function PhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[13rem] sm:w-[15rem] md:w-[17rem]">
      {/* side buttons */}
      <span
        aria-hidden
        className="absolute -left-[2px] top-[16%] h-7 w-[3px] rounded-l-sm bg-muted-foreground/30"
      />
      <span
        aria-hidden
        className="absolute -left-[2px] top-[24%] h-11 w-[3px] rounded-l-sm bg-muted-foreground/30"
      />
      <span
        aria-hidden
        className="absolute -right-[2px] top-[22%] h-14 w-[3px] rounded-r-sm bg-muted-foreground/30"
      />
      <div className="aspect-[9/19.5] rounded-[2.5rem] border border-border bg-muted p-[0.35rem] shadow-[0_10px_20px_rgba(0,0,0,0.18),0_40px_60px_-20px_rgba(0,0,0,0.35)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-background ring-1 ring-inset ring-border/70">
          {/* Camera island. Deliberately *not* themed — it is a hole in the
              glass, so it stays black in light and dark, exactly as on a real
              device showing a dark app. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2 z-10 h-[1.1rem] w-[4.25rem] -translate-x-1/2 rounded-full bg-black"
          />
          {children ?? (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/70">
                Replace screen
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

/**
 * A hero whose phone mockup starts tilted back on the X axis, straightens to
 * flat as the section scrolls through, and climbs up over the headline.
 *
 * - Pass the headline as `titleComponent`; it renders *behind* the phone.
 * - Pass the screen content as `children` (a `<video>`, an `<img>`, or JSX).
 * - Tune how long the motion takes with `className="h-[…]"`.
 *
 * Honours `prefers-reduced-motion`: the phone renders flat and static, and no
 * scroll listener is attached.
 */
export function PhoneScrollHero({
  titleComponent,
  children,
  overlap = 20,
  tilt = 22,
  className,
}: PhoneScrollHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);

  // Scroll progress (0 → 1) read from the section's *own* window. motion's
  // `useScroll` always binds to the global `window`, so it goes dead when the
  // component is portaled into another document (the docs preview iframe).
  // `ownerDocument.defaultView` is correct in the top page and the frame alike.
  const progress = useMotionValue(0);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;
    let raf = 0;
    // Mirrors motion's default ["start start", "end end"] offset: 0 when the
    // section top meets the viewport top, 1 when its bottom meets the bottom.
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, rect.height - win.innerHeight);
      progress.set(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    const onScroll = () => {
      if (!raf) raf = win.requestAnimationFrame(update);
    };
    update();
    win.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onScroll);
    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, progress]);

  const rotateX = useTransform(progress, [0, 1], [tilt, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  // The title drifts up far slower than the phone, so the gap between them
  // closes as you scroll and the phone ends up over the letters.
  const titleY = useTransform(progress, [0, 1], [0, -24]);
  const phoneY = useTransform(progress, [0, 1], ["0%", `-${overlap}%`]);

  // Reduced motion: no tilt, no climb — the phone just sits under the title.
  const still = Boolean(prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className={cn(
        "relative flex h-[60rem] w-full items-center justify-center overflow-hidden p-2 md:h-[80rem] md:p-8",
        className,
      )}
    >
      <div className="w-full" style={{ perspective: "1200px" }}>
        <motion.div
          style={{ y: still ? 0 : titleY }}
          className="relative z-0 mx-auto max-w-5xl px-4 text-center"
        >
          {titleComponent}
        </motion.div>

        {/* Higher z-index than the title — this is what makes it overlap. */}
        <motion.div
          style={{
            y: still ? 0 : phoneY,
            rotateX: still ? 0 : rotateX,
            scale: still ? 1 : scale,
          }}
          className="relative z-10 -mt-6 md:-mt-12"
        >
          <PhoneFrame>{children}</PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

export default PhoneScrollHero;
