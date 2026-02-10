"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Split Feature Showcase — Rauno-minimal.

   Two cells in a sharp-cornered container, no border chrome:
     Left:  Conversation thread (sender + reply bubbles, online pulse)
     Right: Bare text list — even hierarchy, subtle stagger animation

   Dependencies: motion.
   ═══════════════════════════════════════════════════════════ */

const S = { type: "spring" as const, stiffness: 300, damping: 28 };
const S_SNAP = { type: "spring" as const, stiffness: 440, damping: 26 };
const S_SOFT = { type: "spring" as const, stiffness: 260, damping: 24 };
const S_MICRO = { type: "spring" as const, stiffness: 500, damping: 30 };

export interface SplitFeatureShowcaseProps {
  leftTitle?: string;
  leftDescription?: string;
  rightTitle?: string;
  rightDescription?: string;
  className?: string;
}

const WORKFLOW_ITEMS = [
  "Alerts",
  "Lead routing",
  "Re-engage cold leads",
  "New Deal email campaign flow",
  "Lead form submissions",
  "Health scoring",
  "Upsell",
];

export function SplitFeatureShowcase({
  leftTitle = "Conversations that convert.",
  leftDescription = "Collaborate in real time with threaded messages, presence indicators, and instant reactions every exchange captured in context.",
  rightTitle = "Automate your entire pipeline.",
  rightDescription = "From lead capture to customer success, every workflow runs on autopilot, so your team can focus on closing deals.",
  className,
}: SplitFeatureShowcaseProps) {
  return (
    <section className={cn("", className)}>
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="relative grid overflow-hidden bg-card/50 divide-y divide-border/40 md:grid-cols-2 md:divide-x md:divide-y-0">
          {/* ── Left cell ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...S, delay: 0 }}
            className="row-span-2 grid grid-rows-subgrid gap-8 p-8"
          >
            <div className="mx-auto max-w-xs self-center">
              <div aria-hidden="true" className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...S_SNAP, delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="relative">
                    <img
                      src="/avatar-images/avatar-01.jpg"
                      alt=""
                      className="size-7 shrink-0 rounded-full object-cover ring-2 ring-background"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 block size-2 rounded-full bg-foreground/40 ring-2 ring-background" />
                  </div>
                  <span className="text-[13px] font-medium tracking-tight">
                    Irung
                  </span>
                  <span className="text-muted-foreground/60 text-[10px]">
                    2m ago
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...S_SOFT, delay: 0.35 }}
                  whileHover={{ scale: 1.02, y: -1, transition: S_MICRO }}
                  className="relative ml-9 w-fit"
                >
                  <div className="cursor-default rounded-2xl rounded-tl-[4px] bg-muted px-3.5 py-2 text-[13px] leading-relaxed shadow-sm shadow-black/5 ring-1 ring-border/60">
                    Hey{" "}
                    <span className="font-medium text-foreground">
                      @bernard
                    </span>
                    , I&apos;ve updated the dashboard metrics.
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...S_SNAP, delay: 0.75 }}
                    className="absolute -bottom-2 right-3 flex h-[22px] items-center rounded-full bg-card px-1.5 text-[10px] shadow-sm shadow-black/5 ring-1 ring-border/40"
                  >
                    🔥
                  </motion.div>
                </motion.div>

                <div className="flex items-end justify-end gap-2 pt-1">
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...S_SOFT, delay: 0.55 }}
                    whileHover={{ scale: 1.02, y: -1, transition: S_MICRO }}
                    className="w-fit cursor-default rounded-2xl rounded-tr-[4px] bg-foreground px-3.5 py-2 text-[13px] leading-relaxed text-background shadow-sm shadow-black/10"
                  >
                    The conversion rate looks great
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...S_SNAP, delay: 0.5 }}
                    className="shrink-0"
                  >
                    <img
                      src="/avatar-images/avatar-02.jpg"
                      alt=""
                      className="size-7 rounded-full object-cover ring-2 ring-background"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="flex items-center justify-end gap-1 pr-9"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3 text-foreground/40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[10px] text-muted-foreground/50">
                    Read
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...S_SOFT, delay: 0.9 }}
                  className="ml-9 w-fit"
                >
                  <div className="flex items-center gap-[3px] rounded-2xl rounded-tl-[4px] bg-muted px-3 py-2.5 shadow-sm shadow-black/5 ring-1 ring-border/60">
                    <span
                      className="block size-[5px] rounded-full bg-foreground/25"
                      style={{
                        animation: "bentoTypingDot 1.4s ease-in-out infinite",
                      }}
                    />
                    <span
                      className="block size-[5px] rounded-full bg-foreground/25"
                      style={{
                        animation:
                          "bentoTypingDot 1.4s ease-in-out 0.15s infinite",
                      }}
                    />
                    <span
                      className="block size-[5px] rounded-full bg-foreground/25"
                      style={{
                        animation:
                          "bentoTypingDot 1.4s ease-in-out 0.3s infinite",
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...S, delay: 0.5 }}
              className="mx-auto max-w-sm text-center"
            >
              <p className="text-base leading-relaxed text-balance">
                <strong className="font-semibold text-foreground">
                  {leftTitle}
                </strong>{" "}
                <span className="text-muted-foreground">{leftDescription}</span>
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right cell: Bare text, even hierarchy ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...S, delay: 0.12 }}
            className="row-span-2 grid grid-rows-subgrid gap-8 p-8"
          >
            <div className="flex items-center justify-center self-center">
              <div
                aria-hidden="true"
                className="flex flex-col items-center gap-3"
              >
                {WORKFLOW_ITEMS.map((label, i) => {
                  const center = Math.floor(WORKFLOW_ITEMS.length / 2);
                  const dist = Math.abs(i - center);

                  return (
                    <motion.span
                      key={label}
                      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        ...S_SOFT,
                        delay: 0.2 + i * 0.07,
                      }}
                      className={cn(
                        "block text-[15px] tracking-tight transition-opacity duration-300",
                        dist === 0
                          ? "font-medium text-foreground"
                          : dist === 1
                            ? "text-foreground/70"
                            : dist === 2
                              ? "text-foreground/45"
                              : "text-foreground/25",
                      )}
                    >
                      {label}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...S, delay: 0.5 }}
              className="relative z-10 mx-auto max-w-sm text-center"
            >
              <p className="text-base leading-relaxed text-balance">
                <strong className="font-semibold text-foreground">
                  {rightTitle}
                </strong>{" "}
                <span className="text-muted-foreground">
                  {rightDescription}
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes bentoTypingDot{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-3px);opacity:1}}`,
        }}
      />
    </section>
  );
}
