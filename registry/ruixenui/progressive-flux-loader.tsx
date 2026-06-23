"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface ProgressiveFluxPhase {
  /** Progress threshold (`0`–`100`) at or past which `label` is shown. */
  at: number;
  /** Text revealed once this threshold is reached. */
  label: string;
}

export interface ProgressiveFluxLoaderProps {
  /**
   * Controlled progress, `0`–`100`. When set, the loader follows this value and
   * the phase label switches at the configured thresholds. Omit it to let the
   * loader run its own looping sweep.
   */
  value?: number;
  /** Phase thresholds and their labels. Each `at` is a `0`–`100` mark. */
  phases?: ProgressiveFluxPhase[];
  /** Seconds for one full sweep when uncontrolled. Default `12`. */
  duration?: number;
  /** Restart from `0` after reaching `100` (uncontrolled only). Default `true`. */
  loop?: boolean;
  /** Show the animated phase label above the bar. Default `true`. */
  showLabel?: boolean;
  /**
   * CSS background for the bar fill. Defaults to the signature vivid blue → cyan
   * flux gradient. Pass any CSS background to replace it, or recolor the default
   * via the `--flux-from` / `--flux-to` CSS variables (e.g. set them to
   * `hsl(var(--primary))` to follow the theme).
   */
  gradient?: string;
  /** Fires once when progress reaches `100` — in both controlled and uncontrolled modes. */
  onComplete?: () => void;
  /** Classes for the root wrapper. */
  className?: string;
  /** Classes for the bar track. */
  barClassName?: string;
  /** Classes for the phase label. */
  textClassName?: string;
}

/* ── constants ───────────────────────────────────────────────── */

const DEFAULT_PHASES: ProgressiveFluxPhase[] = [
  { at: 0, label: "starting up" },
  { at: 25, label: "loading assets" },
  { at: 55, label: "preparing magic" },
  { at: 80, label: "almost there" },
  { at: 100, label: "all done" },
];

// Signature "flux" palette — a vivid blue → cyan → blue fill. The two end
// colors are read from CSS variables with built-in defaults, so the bar can be
// recolored per instance without touching the component: set `--flux-from` /
// `--flux-to` (e.g. to `hsl(var(--primary))` to follow the theme), or override
// the whole fill with the `gradient` prop. The surrounding track and label stay
// on shadcn theme tokens, so the loader still adapts to light and dark. These
// are component-level custom properties, so the v3 build leaves them untouched
// and the fill renders identically on Tailwind v3 and v4.
const FLUX_FROM = "var(--flux-from, #1d6ffb)";
const FLUX_TO = "var(--flux-to, #74e1ff)";
const FLUX_MID = `color-mix(in oklab, ${FLUX_FROM}, ${FLUX_TO})`;

const DEFAULT_GRADIENT = `linear-gradient(90deg, ${FLUX_FROM} 0%, ${FLUX_MID} 35%, ${FLUX_TO} 55%, ${FLUX_MID} 78%, ${FLUX_FROM} 100%)`;

// Colored glow drawn from the same flux palette, a white top-edge highlight,
// and a deep-blue inset for depth.
const BAR_SHADOW = `0 0 18px color-mix(in oklab, ${FLUX_FROM} 55%, transparent), 0 0 32px color-mix(in oklab, ${FLUX_TO} 40%, transparent), inset 0 1.5px 0 rgba(255, 255, 255, 0.5), inset 0 -2px 3px rgba(0, 40, 120, 0.35)`;

// White sweep over the colored fill (blended with `screen`), so the highlight
// reads as a bright glide regardless of theme.
const SHEEN_GRADIENT =
  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.55) 50%, transparent 100%)";

const Z_TRANSITION: Transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
const LETTER_TRANSITION: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

/* ── helpers ─────────────────────────────────────────────────── */

/** Latest label whose threshold has been crossed. Expects pre-sorted phases. */
function pickLabel(value: number, sortedPhases: ProgressiveFluxPhase[]) {
  let active = sortedPhases[0]?.label ?? "";
  for (const phase of sortedPhases) {
    if (value >= phase.at) active = phase.label;
  }
  return active;
}

/* ── label ───────────────────────────────────────────────────── */

interface FluxLabelProps {
  label: string;
  /** Render plain, static text instead of the 3D fly-in (reduced motion). */
  reduced: boolean;
  className?: string;
}

// The label is decorative and `aria-hidden`; the progressbar carries the spoken
// progress via `aria-valuetext`. Under reduced motion it is plain static text.
function FluxLabel({ label, reduced, className }: FluxLabelProps) {
  const base = cn(
    "absolute inset-0 flex items-center justify-center text-center text-3xl font-semibold tracking-tight text-muted-foreground sm:text-4xl",
    className,
  );

  if (reduced) {
    return (
      <div aria-hidden className={base}>
        {label}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={label}
        aria-hidden
        className={base}
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, z: -380, scale: 0.65, filter: "blur(14px)" }}
        animate={{
          opacity: [0, 1, 1, 1],
          z: [-380, 60, -8, 0],
          scale: [0.65, 1.08, 0.985, 1],
          filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(0px)"],
        }}
        exit={{
          opacity: 0,
          z: 220,
          scale: 1.35,
          filter: "blur(10px)",
          transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
        }}
        transition={Z_TRANSITION}
      >
        <span className="inline-flex">
          {label.split("").map((char, index) => (
            <motion.span
              key={`${label}-${index}`}
              className="inline-block"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...LETTER_TRANSITION, delay: 0.18 + index * 0.035 }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function ProgressiveFluxLoader({
  value,
  phases = DEFAULT_PHASES,
  duration = 12,
  loop = true,
  showLabel = true,
  gradient = DEFAULT_GRADIENT,
  onComplete,
  className,
  barClassName,
  textClassName,
}: ProgressiveFluxLoaderProps) {
  const reduced = !!useReducedMotion();
  const isControlled = typeof value === "number";
  const [internal, setInternal] = React.useState(0);

  // Keep the latest `onComplete` in a ref so a fresh inline callback on every
  // parent render never tears down and restarts the sweep below.
  const onCompleteRef = React.useRef(onComplete);
  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const completedRef = React.useRef(false);

  // Uncontrolled self-run sweep.
  React.useEffect(() => {
    if (isControlled) return;
    let raf = 0;
    let timer = 0;
    let start: number | null = null;
    const totalMs = Math.max(500, duration * 1000);

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const pct = Math.min(100, ((ts - start) / totalMs) * 100);
      setInternal(pct);
      if (pct >= 100) {
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
        if (loop) {
          start = null;
          completedRef.current = false;
          timer = window.setTimeout(() => {
            setInternal(0);
            raf = requestAnimationFrame(tick);
          }, 700);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [isControlled, duration, loop]);

  const raw = isControlled ? value! : internal;
  const current = Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) : 0;

  // Controlled completion: fire once when `value` crosses 100, re-arm below it.
  React.useEffect(() => {
    if (!isControlled) return;
    if (current >= 100 && !completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current?.();
    } else if (current < 100) {
      completedRef.current = false;
    }
  }, [isControlled, current]);

  const sortedPhases = React.useMemo(
    () => [...phases].sort((a, b) => a.at - b.at),
    [phases],
  );
  const label = React.useMemo(
    () => pickLabel(current, sortedPhases),
    [current, sortedPhases],
  );
  const rounded = Math.round(current);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-md flex-col items-center gap-8",
        className,
      )}
    >
      {showLabel && (
        <div
          className="relative h-16 w-full select-none"
          style={reduced ? undefined : { perspective: "1000px" }}
        >
          <FluxLabel
            label={label}
            reduced={reduced}
            className={textClassName}
          />
        </div>
      )}

      <div
        className={cn(
          "relative h-5 w-full overflow-hidden rounded-full bg-muted shadow-[inset_0_2px_3px_rgba(0,0,0,0.09),inset_0_-1px_2px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_2px_3px_rgba(0,0,0,0.45),inset_0_-1px_2px_rgba(255,255,255,0.05)]",
          barClassName,
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={label ? `${rounded}% – ${label}` : `${rounded}%`}
        aria-label="Loading"
      >
        <motion.div
          className="relative h-full rounded-full"
          style={{ background: gradient, boxShadow: BAR_SHADOW }}
          initial={false}
          animate={{ width: `${current}%` }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {!reduced && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-full"
              style={{ background: SHEEN_GRADIENT, mixBlendMode: "screen" }}
              animate={{ x: ["-110%", "210%"] }}
              transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ProgressiveFluxLoader;
