"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type Action = { href: string; label: string };

interface Stat {
  /** Numeric / main value, e.g. "99.9" */
  value: string;
  /** Unit or suffix shown beside the value, e.g. "%", "X" */
  unit?: string;
  /** Label text rendered below the value */
  label: React.ReactNode;
}

interface TrustedBySection {
  logos: React.ReactNode[];
}

export interface SplitHeroSectionProps {
  /** Main headline — left-aligned */
  title: React.ReactNode;
  /** Subtitle / description text */
  description?: string;
  /** Primary CTA button */
  primaryAction?: Action;
  /** Secondary CTA button */
  secondaryAction?: Action;
  /** Key metrics displayed below the CTAs */
  stats?: Stat[];
  /** Trusted-by logo strip */
  trustedBy?: TrustedBySection;
  className?: string;
}

/* ── component ───────────────────────────────────────────────── */

export function SplitHeroSection({
  title,
  description,
  primaryAction,
  secondaryAction,
  stats,
  trustedBy,
  className,
}: SplitHeroSectionProps) {
  return (
    <section
      className={cn("relative w-full bg-background", className)}
      aria-label="Hero"
    >
      <div className="mx-auto w-full px-6 lg:max-w-5xl">
        <div className="grid items-center pt-24 max-lg:gap-12 md:pt-32 lg:grid-cols-2 lg:pt-40">
          {/* ── left column ──────────────────────────── */}
          <div>
            <div className="lg:max-w-sm">
              <h1 className="text-balance text-4xl font-semibold md:text-5xl">
                {title}
              </h1>

              {description && (
                <p className="mb-6 mt-4 text-balance text-lg text-muted-foreground">
                  {description}
                </p>
              )}

              {(primaryAction || secondaryAction) && (
                <div className="flex items-center gap-3">
                  {primaryAction && (
                    <Link
                      href={primaryAction.href}
                      className="inline-flex h-8 items-center justify-center rounded-md border-[0.5px] border-white/10 bg-primary px-3 text-xs font-medium text-primary-foreground shadow-md shadow-black/15 ring-1 ring-[--ring-color] transition-colors hover:bg-primary/90 [--ring-color:color-mix(in_oklab,black_15%,var(--color-primary))] dark:border-transparent dark:[--ring-color:color-mix(in_oklab,white_15%,var(--color-primary))]"
                    >
                      {primaryAction.label}
                    </Link>
                  )}
                  {secondaryAction && (
                    <Link
                      href={secondaryAction.href}
                      className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-card px-3 text-xs font-medium shadow-sm shadow-black/10 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
                    >
                      {secondaryAction.label}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* ── stats ──────────────────────────── */}
            {stats && stats.length > 0 && (
              <div className="mt-12 grid max-w-sm grid-cols-2">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-2 *:block">
                    <span className="text-lg font-semibold">
                      {stat.value}{" "}
                      {stat.unit && (
                        <span className="text-lg text-muted-foreground">
                          {stat.unit}
                        </span>
                      )}
                    </span>
                    <p className="text-balance text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── right column: stacked overlapping skeleton cards ── */}
          <div
            aria-hidden="true"
            className="relative min-w-xs max-lg:max-w-[calc(100vw-3rem)]"
            style={{ perspective: "800px" }}
          >
            <div
              className="relative flex flex-col"
              style={{
                maskImage:
                  "radial-gradient(100% 100% at top left, black 75%, transparent)",
                WebkitMaskImage:
                  "radial-gradient(100% 100% at top left, black 75%, transparent)",
                transform: "rotateX(5deg) rotateZ(6deg) rotate(-4deg)",
              }}
            >
              {/* ── Card 1 (back) — analytics skeleton ── */}
              <div className="relative z-[1] pl-6 pt-1">
                <div className="rounded-2xl bg-background/75 p-2 shadow-lg ring-1 ring-border shadow-black/[0.065]">
                  {/* header */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <div className="h-3 w-20 rounded-full bg-foreground/10" />
                    <div className="ml-auto h-5 w-14 rounded-full bg-primary/10" />
                  </div>
                  {/* body */}
                  <div className="rounded-xl bg-card p-4 ring-1 ring-border">
                    {/* progress bar */}
                    <div className="space-y-3">
                      <div className="h-2.5 w-16 rounded bg-muted-foreground/10" />
                      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                        <div className="absolute inset-y-0 left-0 w-[30%] rounded-full bg-primary/30" />
                        <div className="absolute inset-y-0 left-[30%] w-[45%] rounded-full bg-primary/60" />
                      </div>
                    </div>
                    {/* skeleton rows */}
                    <div className="mt-4 space-y-3">
                      <div className="h-2.5 w-24 rounded bg-muted-foreground/10" />
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 p-2 ring-1 ring-purple-500/20">
                          <div className="size-3.5 shrink-0 rounded bg-purple-500/30" />
                          <div className="h-2 flex-1 rounded bg-purple-500/15" />
                          <div className="h-2 w-5 rounded bg-muted-foreground/10" />
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 p-2 ring-1 ring-blue-500/20">
                          <div className="size-3.5 shrink-0 rounded bg-blue-500/30" />
                          <div className="h-2 w-3/4 rounded bg-blue-500/15" />
                          <div className="h-2 w-5 rounded bg-muted-foreground/10" />
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 p-2 ring-1 ring-cyan-500/20">
                          <div className="size-3.5 shrink-0 rounded bg-cyan-500/30" />
                          <div className="h-2 w-4/5 rounded bg-cyan-500/15" />
                          <div className="h-2 w-5 rounded bg-muted-foreground/10" />
                        </div>
                      </div>
                    </div>
                    {/* footer */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="h-2 w-28 rounded bg-muted-foreground/10" />
                      <div className="h-2 w-8 rounded bg-primary/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Card 2 (front) — metrics skeleton, overlapping ── */}
              <div className="relative z-[2] -mt-16 ml-2 mr-6">
                <div className="rounded-2xl bg-background/75 p-2 shadow-lg ring-1 ring-border shadow-black/[0.065]">
                  {/* header */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <div className="h-3 w-16 rounded-full bg-foreground/10" />
                    <div className="ml-auto size-2 rounded-full bg-emerald-500" />
                    <div className="h-2.5 w-10 rounded bg-muted-foreground/10" />
                  </div>
                  {/* body */}
                  <div className="rounded-xl bg-card p-4 ring-1 ring-border">
                    {/* metric columns */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <div className="h-5 w-10 rounded bg-foreground/8" />
                        <div className="h-2 w-full rounded bg-muted-foreground/10" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-5 w-12 rounded bg-foreground/8" />
                        <div className="h-2 w-4/5 rounded bg-muted-foreground/10" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-5 w-8 rounded bg-foreground/8" />
                        <div className="h-2 w-3/4 rounded bg-muted-foreground/10" />
                      </div>
                    </div>
                    {/* divider */}
                    <div className="my-3 h-px bg-border" />
                    {/* list items */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="size-6 shrink-0 rounded-md bg-muted ring-1 ring-border" />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 w-3/5 rounded bg-foreground/8" />
                          <div className="h-1.5 w-2/5 rounded bg-muted-foreground/8" />
                        </div>
                        <div className="h-2 w-6 rounded bg-muted-foreground/10" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="size-6 shrink-0 rounded-md bg-muted ring-1 ring-border" />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 w-2/5 rounded bg-foreground/8" />
                          <div className="h-1.5 w-1/3 rounded bg-muted-foreground/8" />
                        </div>
                        <div className="h-2 w-6 rounded bg-muted-foreground/10" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="size-6 shrink-0 rounded-md bg-muted ring-1 ring-border" />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 w-1/2 rounded bg-foreground/8" />
                          <div className="h-1.5 w-1/4 rounded bg-muted-foreground/8" />
                        </div>
                        <div className="h-2 w-6 rounded bg-muted-foreground/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── trusted-by logo strip ──────────────────── */}
      {trustedBy && trustedBy.logos.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pt-20">
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 text-foreground/60 [&_svg]:fill-foreground/60">
            {trustedBy.logos.map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {logo}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
