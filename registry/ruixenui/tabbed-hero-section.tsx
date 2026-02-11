"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type Action = { href: string; label: string };

interface Tab {
  icon?: React.ReactNode;
  label: string;
}

interface TrustedBySection {
  description?: React.ReactNode;
  logos: React.ReactNode[];
}

export interface TabbedHeroSectionProps {
  /** Main headline — left-aligned */
  title: React.ReactNode;
  /** Subtitle / description text */
  description?: string;
  /** Primary CTA button */
  primaryAction?: Action;
  /** Secondary CTA button */
  secondaryAction?: Action;
  /** Tab buttons shown above the showcase */
  tabs?: Tab[];
  /** Index of the active tab (0-based) */
  activeTab?: number;
  /** Background gradient image for light mode */
  backgroundSrcLight?: string;
  /** Background gradient image for dark mode */
  backgroundSrcDark?: string;
  /** Trusted-by / logo strip section */
  trustedBy?: TrustedBySection;
  className?: string;
}

/* ── component ───────────────────────────────────────────────── */

export function TabbedHeroSection({
  title,
  description,
  primaryAction,
  secondaryAction,
  tabs,
  activeTab = 0,
  backgroundSrcLight,
  backgroundSrcDark,
  trustedBy,
  className,
}: TabbedHeroSectionProps) {
  const [currentTab, setCurrentTab] = React.useState(activeTab);

  return (
    <section
      className={cn("relative w-full bg-background", className)}
      aria-label="Hero"
    >
      {/* ── background gradient images ──────────────────── */}
      {(backgroundSrcLight || backgroundSrcDark) && (
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 35%, black 55%, transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 35%, black 55%, transparent 75%)",
          }}
        >
          {backgroundSrcDark && (
            <img
              alt=""
              loading="lazy"
              className="hidden size-full object-cover object-bottom dark:block"
              src={backgroundSrcDark}
            />
          )}
          {backgroundSrcLight && (
            <img
              alt=""
              loading="lazy"
              className="size-full object-cover object-bottom dark:hidden"
              src={backgroundSrcLight}
            />
          )}
        </div>
      )}

      <div className="pb-20 pt-24 md:pt-32 lg:pt-40">
        {/* ── heading + description + CTAs ────────────────── */}
        <div className="relative z-10 mx-auto grid max-w-5xl items-end gap-4 px-6">
          <h1 className="text-balance text-4xl font-semibold sm:text-5xl md:max-w-4xl lg:text-6xl">
            {title}
          </h1>

          {(description || primaryAction || secondaryAction) && (
            <div className="max-w-lg">
              {description && (
                <p className="mb-6 text-balance text-lg text-muted-foreground lg:text-xl">
                  {description}
                </p>
              )}

              {(primaryAction || secondaryAction) && (
                <div className="flex flex-wrap gap-3">
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

        {/* ── tabbed showcase ────────────────────────────── */}
        {tabs && tabs.length > 0 && (
          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12 lg:pt-20">
            <div
              className="grid divide-x divide-foreground/10 border border-foreground/10"
              style={{
                gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
              }}
            >
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTab(idx)}
                  className={cn(
                    "flex h-12 cursor-pointer items-center justify-center gap-2 px-3 text-sm transition-colors duration-150 [&>svg]:size-4",
                    idx === currentTab
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                  )}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="aspect-[16/9] border-x border-b border-foreground/10 bg-muted sm:aspect-[2/1]" />
          </div>
        )}
      </div>

      {/* ── trusted-by section ──────────────────────────── */}
      {trustedBy && (
        <div className="pb-16">
          <div className="mx-auto max-w-5xl px-6">
            {trustedBy.description && (
              <div className="mx-auto mb-12 max-w-xl text-balance text-center md:mb-16">
                <div className="text-lg text-muted-foreground">
                  {trustedBy.description}
                </div>
              </div>
            )}
            <div className="mx-auto grid max-w-5xl grid-cols-3 items-center gap-8 text-foreground/60 md:grid-cols-5 [&_svg]:fill-foreground/60">
              {trustedBy.logos.map((logo, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
