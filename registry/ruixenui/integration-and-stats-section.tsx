"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const DOWN_INDICES = new Set([9, 10, 21, 22, 23, 31]);
const BAR_COUNT = 38;

/* ── spring presets ─────────────────────────────────────────────── */
const SPRING_CARD = { type: "spring" as const, stiffness: 280, damping: 32 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 220, damping: 28 };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

/* ── marks ── geometric, monochrome, one shape per concept ─────── */
function CanvasMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mb-4 size-4"
      aria-hidden="true"
    >
      <circle cx="6" cy="8" r="5.5" className="fill-foreground/[0.10]" />
      <circle cx="10" cy="8" r="5.5" className="fill-foreground/[0.06]" />
    </svg>
  );
}

function PulseMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mb-4 size-4"
      aria-hidden="true"
    >
      <path
        d="M0.5 8H4L6 3L8 13L10 5L12 8H15.5"
        className="stroke-foreground/[0.14]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mb-4 size-4"
      aria-hidden="true"
    >
      <path
        d="M8 1L9.2 6.8L15 8L9.2 9.2L8 15L6.8 9.2L1 8L6.8 6.8Z"
        className="fill-foreground/[0.10]"
      />
    </svg>
  );
}

/* ── card shell — invisible container, content speaks ────────── */
function FeatureCard({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_CARD, delay: index * 0.12 }}
      className={cn(
        "border border-foreground/[0.06] bg-background p-5 sm:p-6",
        "grid grid-rows-[auto_1fr] gap-8 overflow-hidden sm:gap-10",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ── main ───────────────────────────────────────────────────────── */
export default function IntegrationAndStatsSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* ── Live Canvas ──────────────────────────────────────── */}
        <FeatureCard index={0} className="col-span-1 sm:col-span-2">
          <div>
            <CanvasMark />
            <p className="text-base leading-snug tracking-tight sm:text-lg">
              <span className="font-semibold text-foreground">
                Create in unison.
              </span>{" "}
              <span className="text-muted-foreground">
                See every cursor in real-time, resolve conflicts instantly, and
                co-author interfaces — without ever leaving the canvas.
              </span>
            </p>
          </div>

          <div
            className="-m-5 flex flex-col justify-end p-5 sm:-m-6 sm:p-6"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_SOFT, delay: 0.25 }}
              className="mask-b-from-90% w-full"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...SPRING_SOFT, delay: 0.35 }}
                className="mb-4 text-xl font-medium text-foreground"
              >
                Design System
              </motion.div>

              <div className="space-y-3 text-base/6 text-muted-foreground">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...SPRING_SOFT, delay: 0.45 }}
                >
                  Docu
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...SPRING_SOFT, delay: 0.55 }}
                    className="relative select-none rounded-sm bg-blue-500/[0.08] px-0.5 text-foreground/80 dark:bg-blue-400/[0.10] dark:text-foreground/75"
                  >
                    ment component
                  </motion.span>{" "}
                  <span className="relative inline-block">
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...SPRING_SNAPPY, delay: 0.65 }}
                      className="before:h-9.5 absolute top-0.5 flex -translate-x-0.5 -translate-y-full select-none items-center gap-1.5 rounded-r-md rounded-tl-md bg-blue-600 px-1.5 py-1 text-white shadow-md shadow-black/[0.065] before:absolute before:left-0 before:top-2 before:w-0.5 before:rounded before:bg-blue-600"
                    >
                      <div className="before:border-foreground/20 relative size-4 overflow-hidden rounded-full bg-blue-500 before:absolute before:inset-0 before:rounded-full before:border">
                        <span className="flex size-full items-center justify-center text-[7px] font-bold text-white">
                          E
                        </span>
                      </div>
                      <span className="text-xs font-medium">Elena</span>
                    </motion.div>
                    variants
                  </span>{" "}
                  and tokens.
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...SPRING_SOFT, delay: 0.55 }}
                >
                  Standardize patterns, review accessibility, and ship{" "}
                  <span className="relative inline-block">
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...SPRING_SNAPPY, delay: 0.8 }}
                      className="before:h-9.5 absolute top-0.5 flex -translate-x-0.5 -translate-y-full select-none items-center gap-1.5 rounded-r-md rounded-tl-md bg-emerald-600 px-1.5 py-1 text-white shadow-md before:absolute before:left-0 before:top-2 before:w-0.5 before:rounded before:bg-emerald-600"
                    >
                      <div className="before:border-foreground/20 relative size-4 overflow-hidden rounded-full bg-emerald-400 before:absolute before:inset-0 before:rounded-full before:border">
                        <span className="flex size-full items-center justify-center text-[7px] font-bold text-white">
                          J
                        </span>
                      </div>
                      <span className="truncate text-xs font-medium">
                        James K.
                      </span>
                    </motion.div>
                    consistent
                  </span>{" "}
                  interfaces across every surface.
                </motion.div>
              </div>
            </motion.div>
          </div>
        </FeatureCard>

        {/* ── System Pulse ─────────────────────────────────────── */}
        <FeatureCard index={1}>
          <div>
            <PulseMark />
            <p className="text-base leading-snug tracking-tight sm:text-lg">
              <span className="font-semibold text-foreground">
                Monitor at a glance.
              </span>{" "}
              <span className="text-muted-foreground">
                Track throughput, catch latency spikes, and surface errors
                across your entire stack — the moment they happen.
              </span>
            </p>
          </div>

          <div className="-m-5 flex flex-col justify-end p-5 sm:-m-6 sm:p-6">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_SOFT, delay: 0.3 }}
                aria-hidden="true"
                className="space-y-3 p-3 sm:p-4"
              >
                {/* hero metric */}
                <div>
                  <span className="text-[11px] text-foreground/40">
                    Throughput
                  </span>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ...SPRING_SOFT, delay: 0.4 }}
                      className="text-xl font-semibold tracking-tight tabular-nums text-foreground sm:text-2xl"
                    >
                      14.2k
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...SPRING_SOFT, delay: 0.55 }}
                      className="text-[11px] font-medium text-blue-500/70"
                    >
                      +8.7%
                    </motion.span>
                  </div>
                </div>

                {/* bars cascade from bottom, staggered left → right */}
                <div className="flex gap-px">
                  {Array.from({ length: BAR_COUNT }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        ...SPRING_SNAPPY,
                        delay: 0.5 + i * 0.018,
                      }}
                      style={{ transformOrigin: "bottom" }}
                      className={cn(
                        "h-6 flex-1",
                        DOWN_INDICES.has(i)
                          ? "bg-foreground/25"
                          : "bg-blue-500",
                      )}
                    />
                  ))}
                </div>

                {/* secondary metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...SPRING_SOFT, delay: 0.95 }}
                  className="flex gap-4 border-t border-foreground/[0.06] pt-2.5"
                >
                  <div>
                    <span className="text-[10px] text-foreground/30">
                      Latency
                    </span>
                    <div className="text-xs font-medium tabular-nums text-foreground/55">
                      23ms
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-foreground/30">P99</span>
                    <div className="text-xs font-medium tabular-nums text-foreground/55">
                      89ms
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-foreground/30">
                      Errors
                    </span>
                    <div className="text-xs font-medium tabular-nums text-foreground/55">
                      0.02%
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </FeatureCard>

        {/* ── AI Copilot ───────────────────────────────────────── */}
        <FeatureCard index={2} className="">
          <div>
            <SparkleMark />
            <p className="text-base leading-snug tracking-tight sm:text-lg">
              <span className="font-semibold text-foreground">
                Ship with a prompt.
              </span>{" "}
              <span className="text-muted-foreground">
                Generate components, refine edge cases, and push to production —
                let AI handle the heavy lifting.
              </span>
            </p>
          </div>

          <div
            className="-m-5 flex flex-col justify-end p-5 sm:-m-6 sm:p-6"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_SOFT, delay: 0.3 }}
              className="space-y-3"
            >
              {/* input */}
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...SPRING_SNAPPY, delay: 0.45 }}
                className="overflow-hidden rounded-xl border border-foreground/[0.08]"
              >
                <div className="px-4 py-3">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...SPRING_SOFT, delay: 0.6 }}
                    className="text-sm text-muted-foreground/40"
                  >
                    Build a settings page with dark mode toggle
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="ml-0.5 inline-block h-[14px] w-[1.5px] translate-y-[2px] bg-foreground/25"
                  />
                </div>
                <div className="flex items-center justify-end border-t border-foreground/[0.05] px-3 py-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...SPRING_SNAPPY, delay: 0.7 }}
                    className="flex size-6 items-center justify-center rounded-lg bg-foreground"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-background"
                    >
                      <path d="m5 12 7-7 7 7" />
                      <path d="M12 19V5" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* skeleton response */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...SPRING_SOFT, delay: 0.9 }}
                className="space-y-2 px-1"
              >
                <div className="h-1.5 w-4/5 rounded-full bg-foreground/[0.04]" />
                <div className="h-1.5 w-3/5 rounded-full bg-foreground/[0.03]" />
                <div className="h-1.5 w-2/3 rounded-full bg-foreground/[0.025]" />
              </motion.div>
            </motion.div>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
}
