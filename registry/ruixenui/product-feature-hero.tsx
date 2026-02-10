"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Search,
  FileText,
  ArrowUpRight,
  GitPullRequest,
} from "lucide-react";

const S = { type: "spring" as const, stiffness: 300, damping: 28 };
const S_SOFT = { type: "spring" as const, stiffness: 260, damping: 24 };

export interface ProductFeatureHeroProps {
  title?: string;
  description?: string;
  secondaryText?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  features?: {
    title: string;
    description: string;
  }[];
  className?: string;
}

const COMMANDS = [
  { label: "Open command bar", shortcut: "⌘K" },
  { label: "Quick open file", shortcut: "⌘P" },
];

const RECENT_FILES = ["dashboard.tsx", "api/auth.ts", "lib/utils.ts"];

const ACTIONS = [
  { icon: ArrowUpRight, label: "Deploy to production" },
  { icon: GitPullRequest, label: "Create pull request" },
];

const DEFAULT_FEATURES = [
  {
    title: "Instant",
    description: "Sub-50ms completions, zero spinners.",
  },
  {
    title: "Context-aware",
    description: "Reads your full codebase, not just open files.",
  },
  {
    title: "Private",
    description: "Code stays on your machine. Always.",
  },
  {
    title: "Extensible",
    description: "Every language, every framework.",
  },
];

export function ProductFeatureHero({
  title = "Built for how you think",
  description = "An intelligent editor that understands your intent. Completions, refactors, and explanations surface exactly when you need them.",
  secondaryText,
  ctaText = "Get started",
  ctaHref = "#",
  features = DEFAULT_FEATURES,
  className,
}: ProductFeatureHeroProps) {
  return (
    <section className={cn("", className)}>
      <div className="mx-auto w-full max-w-5xl p-6">
        <div className="grid items-center gap-12 pb-14 md:grid-cols-2">
          {/* ── Left ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...S, delay: 0 }}
          >
            <div className="max-w-md">
              <h2 className="text-balance text-4xl font-semibold text-foreground">
                {title}
              </h2>
              <p className="my-6 text-balance text-lg">{description}</p>
              {secondaryText ?? (
                <p className="text-muted-foreground">
                  We obsessed over every interaction to make it feel invisible.{" "}
                  <span className="font-medium text-foreground">
                    No config, no context switching.
                  </span>{" "}
                  Just write.
                </p>
              )}
              <a
                href={ctaHref}
                className="mt-8 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-transparent bg-card px-4 py-2 pr-2 text-sm font-medium shadow-sm shadow-black/10 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
              >
                {ctaText}
                <ChevronRight className="size-4 opacity-50" />
              </a>
            </div>
          </motion.div>

          {/* ── Right ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...S_SOFT, delay: 0.12 }}
            className="relative flex items-start justify-center overflow-hidden rounded-2xl border border-border bg-muted/30 px-8 pt-10 dark:bg-muted/20"
          >
            <div className="mask-b-from-75%">
              <div className="w-[18rem] rounded-xl bg-card p-1.5 shadow-lg border shadow-black/[0.06] ring-1 ring-border/50 dark:shadow-black/20">
                {/* Search */}
                <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2">
                  <Search
                    className="size-3.5 text-foreground/30"
                    strokeWidth={1.5}
                  />
                  <span className="text-[13px] text-foreground/30">
                    Search...
                  </span>
                </div>

                <div className="mt-1.5">
                  {/* Suggestions */}
                  <div className="px-3 pb-1 pt-2">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/25">
                      Suggestions
                    </span>
                  </div>
                  {COMMANDS.map((cmd) => (
                    <div
                      key={cmd.label}
                      className="flex cursor-default items-center justify-between rounded-lg px-3 py-1.5 transition-colors duration-150 hover:bg-muted/60"
                    >
                      <span className="text-[13px] tracking-tight text-foreground">
                        {cmd.label}
                      </span>
                      <kbd className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] text-foreground/35">
                        {cmd.shortcut}
                      </kbd>
                    </div>
                  ))}

                  <div className="mx-3 my-1.5 h-px bg-border/50" />

                  {/* Recent */}
                  <div className="px-3 pb-1 pt-1">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/25">
                      Recent
                    </span>
                  </div>
                  {RECENT_FILES.map((file) => (
                    <div
                      key={file}
                      className="flex cursor-default items-center gap-2.5 rounded-lg px-3 py-1.5 transition-colors duration-150 hover:bg-muted/60"
                    >
                      <FileText
                        className="size-3.5 text-foreground/20"
                        strokeWidth={1.5}
                      />
                      <span className="font-mono text-[12px] text-foreground/60">
                        {file}
                      </span>
                    </div>
                  ))}

                  <div className="mx-3 my-1.5 h-px bg-border/50" />

                  {/* Actions */}
                  <div className="px-3 pb-1 pt-1">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/25">
                      Actions
                    </span>
                  </div>
                  {ACTIONS.map((action) => (
                    <div
                      key={action.label}
                      className="flex cursor-default items-center gap-2.5 rounded-lg px-3 py-1.5 transition-colors duration-150 hover:bg-muted/60"
                    >
                      <action.icon
                        className="size-3.5 text-foreground/20"
                        strokeWidth={1.5}
                      />
                      <span className="text-[13px] tracking-tight text-foreground">
                        {action.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Features ──────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-6 border-t border-border/40 pt-8 lg:grid-cols-4 lg:gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...S, delay: 0.2 + i * 0.08 }}
              className="space-y-1"
            >
              <p className="text-sm font-medium text-foreground">
                {feature.title}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
