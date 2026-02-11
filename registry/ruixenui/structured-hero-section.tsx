"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type Action = { href: string; label: string };

interface ShowcaseCard {
  label?: string;
  imageSrcLight?: string;
  imageSrcDark?: string;
}

interface TrustedBySection {
  heading?: string;
  action?: Action;
  logos: React.ReactNode[];
}

export interface StructuredHeroSectionProps {
  /** Text shown inside the announcement pill */
  announcement?: string;
  /** Optional link rendered beside the announcement */
  announcementAction?: Action;
  /** Main headline */
  title: React.ReactNode;
  /** Subtitle / description text */
  description?: string;
  /** Primary CTA button */
  primaryAction?: Action;
  /** Secondary CTA button */
  secondaryAction?: Action;
  /** Showcase cards (up to 3) — simple gray placeholders */
  cards?: ShowcaseCard[];
  /** Trusted-by logo strip */
  trustedBy?: TrustedBySection;
  className?: string;
}

/* ── component ───────────────────────────────────────────────── */

const cardPositions = [
  "left-0 z-[1]",
  "left-1/2 -translate-x-1/2 z-[2]",
  "right-0 z-[3]",
] as const;

export function StructuredHeroSection({
  announcement = "New release available",
  announcementAction,
  title,
  description,
  primaryAction,
  secondaryAction,
  cards,
  trustedBy,
  className,
}: StructuredHeroSectionProps) {
  return (
    <section
      className={cn("relative w-full bg-background", className)}
      aria-label="Hero"
    >
      <div className="pt-20 md:pt-28">
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ── announcement pill ────────────────────────────── */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-card/75 px-3 py-1 shadow ring-1 ring-foreground/10">
              <span className="text-sm text-foreground">{announcement}</span>
              {announcementAction && (
                <>
                  <span className="block h-3 w-px bg-foreground/10" />
                  <Link
                    href={announcementAction.href}
                    className="text-sm text-primary"
                  >
                    {announcementAction.label}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* ── heading + description + CTAs ────────────────── */}
          <div className="mt-6 px-6 text-center *:mx-auto md:mt-10 lg:px-12">
            <h1 className="mb-4 max-w-4xl text-balance text-5xl font-medium lg:text-7xl lg:tracking-tight">
              {title}
            </h1>

            {(description || primaryAction || secondaryAction) && (
              <div className="max-w-2xl">
                {description && (
                  <p className="mb-8 text-balance text-lg text-muted-foreground">
                    {description}
                  </p>
                )}

                {(primaryAction || secondaryAction) && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {primaryAction && (
                      <Link
                        href={primaryAction.href}
                        className="inline-flex h-9 items-center justify-center rounded-md border-[0.5px] border-white/10 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md shadow-black/15 ring-1 ring-[--ring-color] transition-colors hover:bg-primary/90 [--ring-color:color-mix(in_oklab,black_15%,var(--color-primary))] dark:border-transparent dark:[--ring-color:color-mix(in_oklab,white_15%,var(--color-primary))]"
                      >
                        {primaryAction.label}
                      </Link>
                    )}
                    {secondaryAction && (
                      <Link
                        href={secondaryAction.href}
                        className="inline-flex h-9 items-center justify-center rounded-md border border-transparent bg-card px-4 py-2 text-sm font-medium shadow-sm shadow-black/10 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
                      >
                        {secondaryAction.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── overlapping showcase cards ──────────────────── */}
        {cards && cards.length > 0 && (
          <div className="relative mx-auto mt-16 max-w-5xl md:mt-24">
            <div className="relative h-[360px] sm:h-[440px] md:h-[500px] lg:h-[560px] overflow-hidden">
              {cards.slice(0, 3).map((card, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute top-0 w-[75%] sm:w-[55%] md:w-[45%]",
                    cardPositions[idx],
                  )}
                >
                  <div className="overflow-hidden rounded-xl bg-muted shadow-2xl shadow-black/15 ring-1 ring-foreground/[0.06]">
                    <div className="aspect-[3/4]">
                      {card.imageSrcLight || card.imageSrcDark ? (
                        <div className="relative size-full overflow-hidden">
                          {card.imageSrcDark && (
                            <img
                              alt={card.label || ""}
                              loading="lazy"
                              className="hidden size-full object-cover object-left-top dark:block"
                              src={card.imageSrcDark}
                            />
                          )}
                          {card.imageSrcLight && (
                            <img
                              alt={card.label || ""}
                              loading="lazy"
                              className="size-full object-cover object-left-top dark:hidden"
                              src={card.imageSrcLight}
                            />
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {card.label && (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      {card.label}
                    </p>
                  )}
                </div>
              ))}

              {/* ── fade overlays ── */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-full bg-gradient-to-t from-background from-15% to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-gradient-to-l from-background from-5% to-transparent" />
            </div>
          </div>
        )}

        {/* ── trusted-by logo strip ──────────────────────── */}
        {trustedBy && (
          <div className="relative py-6 md:py-10">
            <div className="mx-auto max-w-6xl px-6 lg:px-12">
              <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-6">
                <div className="space-y-4 max-lg:text-center">
                  <p className="w-fit max-w-sm text-balance text-xl text-foreground max-lg:mx-auto">
                    {trustedBy.heading ||
                      "Trusted by fast-growing companies around the world"}
                  </p>
                  {trustedBy.action && (
                    <Link
                      href={trustedBy.action.href}
                      className="text-sm text-primary underline"
                    >
                      {trustedBy.action.label}
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-3 items-center gap-y-12 text-foreground/60 sm:grid-cols-4 [&_svg]:fill-foreground/60">
                  {trustedBy.logos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center px-2"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
