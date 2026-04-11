"use client";

import * as React from "react";
import Link from "next/link";
import { Battery, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type Action = { href: string; label: string };

interface PriceBlock {
  /** Current price, e.g. "$850" */
  current: string;
  /** Original price shown with strike-through, e.g. "$2,000" */
  original?: string;
}

interface TrustedBySection {
  heading?: string;
  logos: React.ReactNode[];
}

interface PhoneSheetItem {
  title: string;
  description: string;
}

interface PhoneMockupProps {
  /** Time shown in the status bar. */
  time?: string;
  /**
   * Items to cycle through inside the sheet. When more than one is provided
   * they crossfade automatically every `cycleMs` milliseconds.
   */
  items?: PhoneSheetItem[];
  /** Interval between item transitions (ms). */
  cycleMs?: number;
}

export interface PricingLandingHeroProps {
  /** Main headline */
  title: React.ReactNode;
  /** Subtitle / description text */
  description?: string;
  /** Phone mockup shown above the headline */
  phone?: PhoneMockupProps;
  /** Price block shown between description and CTAs */
  price?: PriceBlock;
  /** Small availability / scarcity line above the CTAs */
  availability?: string;
  /** Primary CTA button (filled) */
  primaryAction?: Action;
  /** Secondary CTA button (outlined) */
  secondaryAction?: Action;
  /** Trusted-by logo strip */
  trustedBy?: TrustedBySection;
  className?: string;
}

/* ── phone mockup ────────────────────────────────────────────── */

const DEFAULT_ITEMS: PhoneSheetItem[] = [
  { title: "Add a Title...", description: "Add a description..." },
];

const SPRING = "cubic-bezier(0.22, 1, 0.36, 1)";

function SheetCardContent({ item }: { item: PhoneSheetItem }) {
  return (
    <>
      {/* Drag handle bar — part of each card, slides with it */}
      <div className="mx-auto h-1 w-12 rounded-full bg-foreground/15" />
      <div className="mt-6 text-center text-2xl font-black text-foreground/50">
        {item.title}
      </div>
      <div className="mt-3 text-center text-sm text-foreground/50">
        {item.description}
      </div>
    </>
  );
}

/**
 * A sheet card that mounts at translateY(100%) and springs to 0 — used as
 * the "top" layer that slides over the previous card. Remounted via `key`
 * each tick so the animation replays.
 */
function IncomingSheetCard({ item }: { item: PhoneSheetItem }) {
  const [raised, setRaised] = React.useState(false);

  React.useEffect(() => {
    // Double rAF ensures the initial translateY(100%) paint lands before
    // we flip to translateY(0) — otherwise the browser skips the transition.
    let cancelled = false;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      if (cancelled) return;
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) setRaised(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 bg-background px-6 pt-3"
      style={{
        zIndex: 20,
        transform: raised ? "translateY(0)" : "translateY(100%)",
        transition: `transform 0.95s ${SPRING}`,
        willChange: "transform",
      }}
    >
      <SheetCardContent item={item} />
    </div>
  );
}

function AnimatedPhoneMockup({
  time = "9:41",
  items = DEFAULT_ITEMS,
  cycleMs = 2800,
}: PhoneMockupProps) {
  const [idx, setIdx] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  // Sheet rise on mount
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Cycle items
  React.useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      cycleMs,
    );
    return () => clearInterval(id);
  }, [items.length, cycleMs]);

  const prevIdx = idx === 0 ? items.length - 1 : idx - 1;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[23rem] max-w-full px-4 pt-2 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
    >
      {/* Outer bezel */}
      <div className="mx-auto overflow-hidden rounded-t-[2.5rem] border border-transparent bg-background/75 px-2 pt-2 shadow-md shadow-black/[0.06] ring-1 ring-foreground/10">
        {/* Screen */}
        <div className="overflow-hidden rounded-t-[2rem] bg-foreground/[0.04] px-6 shadow shadow-black/[0.06] ring-1 ring-foreground/10 dark:bg-black">
          {/* Status bar */}
          <div className="flex items-center justify-between py-2 pl-4 text-xs">
            <span className="font-semibold">{time}</span>
            <div className="flex items-end gap-1">
              <Signal aria-hidden className="size-4" />
              <Wifi aria-hidden className="size-[18px]" />
              <Battery aria-hidden className="-mb-px size-5" />
            </div>
          </div>

          {/* Sheet backdrop */}
          <div className="relative mt-2 before:absolute before:-inset-x-3 before:-top-2 before:bottom-0 before:rounded-t-[1.5rem] before:bg-background/60 dark:before:bg-background/30">
            {/* Rising sheet */}
            <div
              className="relative -mx-6 overflow-hidden rounded-t-[2rem] bg-background pb-32 shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.08)]"
              style={{
                transform: mounted ? "translateY(0)" : "translateY(38%)",
                opacity: mounted ? 1 : 0,
                transition: `transform 1.1s ${SPRING}, opacity 0.7s ease-out`,
              }}
            >
              {/* Stacked sheet cards — new card slides up over previous,
                  drag-handle bar slides as part of each card */}
              <div className="relative h-[160px] overflow-hidden">
                {/* Backdrop: the previous card, static at rest */}
                <div
                  className="absolute inset-0 bg-background px-6 pt-3"
                  style={{ zIndex: 10 }}
                >
                  <SheetCardContent item={items[prevIdx]} />
                </div>
                {/* Incoming: current card, slides up from below on each tick */}
                <IncomingSheetCard key={idx} item={items[idx]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function PricingLandingHero({
  title,
  description,
  phone,
  price,
  availability,
  primaryAction,
  secondaryAction,
  trustedBy,
  className,
}: PricingLandingHeroProps) {
  return (
    <section
      className={cn("relative w-full bg-background", className)}
      aria-label="Pricing hero"
    >
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-20 text-center md:pt-28 lg:px-8">
        {/* ── phone mockup ─────────────────────────────────── */}
        <div className="mb-10 md:mb-14">
          <AnimatedPhoneMockup
            time={phone?.time}
            items={phone?.items}
            cycleMs={phone?.cycleMs}
          />
        </div>

        {/* ── heading + description ────────────────────────── */}
        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl lg:leading-[1.05]">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        )}

        {/* ── price block ──────────────────────────────────── */}
        {price && (
          <div className="mt-12 flex items-baseline justify-center gap-3 md:mt-16">
            <span className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
              {price.current}
            </span>
            {price.original && (
              <span className="text-3xl font-medium text-muted-foreground/70 line-through md:text-4xl">
                {price.original}
              </span>
            )}
          </div>
        )}

        {/* ── availability ─────────────────────────────────── */}
        {availability && (
          <p className="mt-6 text-sm text-muted-foreground">{availability}</p>
        )}

        {/* ── CTAs ─────────────────────────────────────────── */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-md shadow-black/10 transition-colors hover:bg-foreground/90"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}

        {/* ── trusted-by strip ─────────────────────────────── */}
        {trustedBy && trustedBy.logos.length > 0 && (
          <div className="mt-20 md:mt-24">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {trustedBy.heading || "Trusted by"}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-foreground/40 md:gap-16 [&_svg]:fill-foreground/40">
              {trustedBy.logos.map((logo, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
