"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressiveFluxPhase {
  at: number;
  label: string;
}

export interface ProgressiveFluxLoaderProps {
  value?: number;
  phases?: ProgressiveFluxPhase[];
  duration?: number;
  loop?: boolean;
  className?: string;
  barClassName?: string;
  textClassName?: string;
  onComplete?: () => void;
}

const DEFAULT_PHASES: ProgressiveFluxPhase[] = [
  { at: 0, label: "starting up" },
  { at: 25, label: "loading assets" },
  { at: 55, label: "preparing magic" },
  { at: 80, label: "almost there" },
  { at: 100, label: "all done" },
];

const FLUX_GRADIENT =
  "linear-gradient(90deg,#1d6ffb 0%,#3aa3ff 35%,#74e1ff 55%,#3aa3ff 78%,#1d6ffb 100%)";

const Z_TRANSITION: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

const LETTER_TRANSITION: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

function pickLabel(value: number, phases: ProgressiveFluxPhase[]) {
  const sorted = [...phases].sort((a, b) => a.at - b.at);
  let active = sorted[0]?.label ?? "";
  for (const phase of sorted) {
    if (value >= phase.at) active = phase.label;
  }
  return active;
}

export function ProgressiveFluxLoader({
  value,
  phases = DEFAULT_PHASES,
  duration = 12,
  loop = true,
  className,
  barClassName,
  textClassName,
  onComplete,
}: ProgressiveFluxLoaderProps) {
  const isControlled = typeof value === "number";
  const [internal, setInternal] = React.useState(0);
  const completedRef = React.useRef(false);

  React.useEffect(() => {
    if (isControlled) return;
    let raf = 0;
    let start: number | null = null;
    const totalMs = Math.max(500, duration * 1000);

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, (elapsed / totalMs) * 100);
      setInternal(pct);
      if (pct >= 100) {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
        if (loop) {
          start = null;
          completedRef.current = false;
          setTimeout(() => {
            setInternal(0);
            raf = requestAnimationFrame(tick);
          }, 700);
          return;
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isControlled, duration, loop, onComplete]);

  const current = isControlled ? Math.min(100, Math.max(0, value!)) : internal;
  const label = pickLabel(current, phases);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-md flex-col items-center gap-8",
        className,
      )}
    >
      <div
        className="relative h-16 w-full select-none"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={label}
            className={cn(
              "absolute inset-0 flex items-center justify-center text-center text-3xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-500 sm:text-4xl",
              textClassName,
            )}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            initial={{
              opacity: 0,
              z: -380,
              scale: 0.65,
              filter: "blur(14px)",
            }}
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
                  transition={{
                    ...LETTER_TRANSITION,
                    delay: 0.18 + index * 0.035,
                  }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={cn(
          "relative h-5 w-full overflow-hidden rounded-full bg-neutral-200/80 shadow-[inset_0_2px_3px_rgba(0,0,0,0.09),inset_0_-1px_2px_rgba(255,255,255,0.7)] dark:bg-neutral-800/80 dark:shadow-[inset_0_2px_3px_rgba(0,0,0,0.45),inset_0_-1px_2px_rgba(255,255,255,0.05)]",
          barClassName,
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(current)}
        aria-label={label}
      >
        <motion.div
          className="relative h-full rounded-full"
          style={{
            background: FLUX_GRADIENT,
            boxShadow:
              "0 0 18px rgba(58,163,255,0.6),0 0 34px rgba(116,225,255,0.4),inset 0 1.5px 0 rgba(255,255,255,0.55),inset 0 -2px 3px rgba(0,40,120,0.35)",
          }}
          initial={false}
          animate={{ width: `${current}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.55) 50%,transparent 100%)",
              mixBlendMode: "screen",
            }}
            animate={{ x: ["-110%", "210%"] }}
            transition={{
              duration: 1.6,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ProgressiveFluxLoader;
