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

export interface ScrollOverHeroProps {
  /** Small pill / label rendered above the title. */
  eyebrow?: React.ReactNode;
  /** Main headline. */
  title: React.ReactNode;
  /** Supporting paragraph under the title. */
  description?: React.ReactNode;
  /** Row of CTA buttons / actions. */
  actions?: React.ReactNode;
  /**
   * The panel that rises and overlaps the pinned title as the page scrolls.
   * Drop in a screenshot, `<video>`, or a custom mock. Falls back to a themed
   * placeholder.
   */
  media?: React.ReactNode;
  /**
   * Total scroll height of the pinned section. Taller = the title stays pinned
   * longer and the media rises more slowly. Default `"220vh"`.
   */
  scrollLength?: string;
  className?: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

// Title rest padding (px). Must match the `pt-24` class on the title layer so
// the measured title position and the panel peek agree.
const TITLE_PT = 96;
// Gap kept between the resting title and the top of the peeking panel (px).
const PEEK_GAP = 24;
// The panel must show at least this much (px) for the overlap to be worth it;
// otherwise (short/landscape viewports) we stack instead.
const MIN_PEEK = 120;

/* ── pieces ──────────────────────────────────────────────────── */

function TitleStack({
  eyebrow,
  title,
  description,
  actions,
}: Pick<ScrollOverHeroProps, "eyebrow" | "title" | "description" | "actions">) {
  return (
    <div className="flex flex-col items-center px-6 text-center">
      {eyebrow && <div className="mb-5">{eyebrow}</div>}
      <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:mt-6 md:text-lg">
          {description}
        </p>
      )}
      {actions && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

function MediaFrame({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_40px_120px_-30px_rgba(0,0,0,0.45)] ring-1 ring-border/40">
      {children ?? (
        <div className="flex aspect-video w-full items-center justify-center bg-muted">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
            Replace media
          </span>
        </div>
      )}
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function ScrollOverHero({
  eyebrow,
  title,
  description,
  actions,
  media,
  scrollLength = "220vh",
  className,
}: ScrollOverHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // Scroll progress (0 → 1) of the section through its *own* scroll context.
  // We compute it by hand against the section's owner window rather than
  // motion's `useScroll`, because that always binds to the global `window`.
  // When this component is portaled into another document (e.g. the docs
  // preview iframe) that global is the *outer* page — so the effect would
  // never respond to the container it actually lives in. Reading the owner
  // window makes it work in the top page and inside the iframe alike.
  const scrollYProgress = useMotionValue(0);

  // Measure the real title height so the panel starts *just below it* on every
  // viewport — that's what keeps the CTAs clear of the panel at rest and lets
  // the overlap run on phones too (not just desktop). We stack only when the
  // title nearly fills the viewport (landscape / tiny screens) or for
  // reduced-motion. Starts "stacked" so SSR + first paint match; the layout
  // effect upgrades before paint, so no hydration mismatch and no flash.
  const [state, setState] = React.useState<{
    mode: "stacked" | "overlap";
    peek: number;
  }>({ mode: "stacked", peek: 0 });

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) {
      setState({ mode: "stacked", peek: 0 });
      return;
    }
    const win = sectionRef.current?.ownerDocument.defaultView ?? window;
    const measure = () => {
      const el = titleRef.current;
      if (!el) return;
      const titleBottom = TITLE_PT + el.offsetHeight;
      if (titleBottom > win.innerHeight - MIN_PEEK) {
        setState((s) =>
          s.mode === "stacked" ? s : { mode: "stacked", peek: 0 },
        );
      } else {
        const peek = Math.round(titleBottom + PEEK_GAP);
        setState((s) =>
          s.mode === "overlap" && s.peek === peek
            ? s
            : { mode: "overlap", peek },
        );
      }
    };
    measure();
    win.addEventListener("resize", measure);
    return () => win.removeEventListener("resize", measure);
  }, [prefersReducedMotion]);

  // Drive `scrollYProgress` from the section's owner window. Mirrors motion's
  // ["start start", "end start"] offset: 0 when the section top hits the
  // viewport top, 1 when its bottom does (rect.top === -height).
  useIsomorphicLayoutEffect(() => {
    if (state.mode !== "overlap") return;
    const el = sectionRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const denom = rect.height || 1;
      scrollYProgress.set(Math.min(1, Math.max(0, -rect.top / denom)));
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
  }, [state.mode, scrollYProgress]);

  // The title fades and lifts away early; the media rises from its peek to fully
  // cover it. Both finish before the pin releases, so nothing snaps.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.92]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -48]);
  const mediaY = useTransform(
    scrollYProgress,
    [0, 0.5],
    [`${state.peek}px`, "0px"],
  );
  const mediaScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className={cn("relative w-full bg-background", className)}
      style={state.mode === "overlap" ? { height: scrollLength } : undefined}
    >
      {state.mode === "overlap" ? (
        // Soft bottom fade so the rising panel dissolves into the page instead
        // of ending on a hard clip line at the viewport edge.
        <div className="sticky top-0 h-screen overflow-hidden [mask-image:linear-gradient(to_bottom,black_82%,transparent)]">
          {/* Pinned title — fades and lifts as the media rises over it. */}
          <motion.div
            style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
            className="absolute inset-x-0 top-0 z-0 pt-24"
          >
            <div ref={titleRef}>
              <TitleStack
                eyebrow={eyebrow}
                title={title}
                description={description}
                actions={actions}
              />
            </div>
          </motion.div>

          {/* Rising media — higher z-index, so it overlaps the title. */}
          <motion.div
            style={{ y: mediaY, scale: mediaScale }}
            className="absolute inset-x-0 top-0 z-10 mx-auto h-full w-full max-w-5xl px-4 sm:px-6 lg:max-w-6xl"
          >
            <MediaFrame>{media}</MediaFrame>
          </motion.div>
        </div>
      ) : (
        // Stacked layout — reduced-motion, landscape/tiny viewports, no-JS.
        <div className="py-20 md:py-28">
          <div ref={titleRef}>
            <TitleStack
              eyebrow={eyebrow}
              title={title}
              description={description}
              actions={actions}
            />
          </div>
          <div className="mx-auto mt-12 w-full max-w-5xl px-4 sm:px-6 md:mt-14 lg:max-w-6xl">
            <MediaFrame>{media}</MediaFrame>
          </div>
        </div>
      )}
    </section>
  );
}

export default ScrollOverHero;
