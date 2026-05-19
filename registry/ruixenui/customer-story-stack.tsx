"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface CustomerStoryAuthor {
  name: string;
  role: string;
  /** Image URL for the avatar. */
  avatarUrl?: string;
  /** Initials/letter fallback when `avatarUrl` is omitted. */
  avatarFallback?: string;
}

export interface CustomerStoryMetric {
  /** Single icon rendered above the metric label. */
  icon: React.ReactNode;
  /** Label rendered below the icon. */
  label: React.ReactNode;
}

export interface CustomerStoryCase {
  /** Unique id used as the React key when cycling cards. */
  id: string;
  /** Brand logo — typically an inline SVG. */
  logo: React.ReactNode;
  /** Pull-quote rendered with serif curly-quote pseudo-elements. */
  quote: React.ReactNode;
  author: CustomerStoryAuthor;
  /** Two metrics shown inside the same frame, below the testimonial. Omit to hide. */
  metrics?: [CustomerStoryMetric, CustomerStoryMetric];
}

export interface CustomerStoryStackProps {
  cases: CustomerStoryCase[];
  /** Optional "Read more customer stories" link rendered below the frame. */
  readMoreLink?: { label: string; href: string };
  /** Horizontal swipe threshold in pixels for touch-based prev/next. */
  swipeThreshold?: number;
  className?: string;
}

/* ── primitives ──────────────────────────────────────────────── */

function Crosshair({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 size-3",
        "[mask-image:radial-gradient(circle_at_center,_black_15%,_transparent_75%)]",
        "before:absolute before:inset-0 before:m-auto before:h-px before:bg-foreground/25",
        "after:absolute after:inset-0 after:m-auto after:w-px after:bg-foreground/25",
        className,
      )}
    />
  );
}

function FrameLines() {
  const lineH =
    "pointer-events-none absolute left-0 h-px w-full bg-[linear-gradient(to_right,_transparent_0%,_var(--color-border)_6.5%,_var(--color-border)_93.5%,_transparent_100%)]";
  const lineV =
    "pointer-events-none absolute top-0 h-full w-px bg-[linear-gradient(to_bottom,_transparent_0%,_var(--color-border)_6.5%,_var(--color-border)_93.5%,_transparent_100%)]";
  return (
    <>
      <div aria-hidden className={cn(lineH, "-top-3 -translate-y-1/2")} />
      <div aria-hidden className={cn(lineH, "-bottom-3 translate-y-1/2")} />
      <div aria-hidden className={cn(lineV, "-left-3 -translate-x-1/2")} />
      <div aria-hidden className={cn(lineV, "-right-3 translate-x-1/2")} />
      <Crosshair className="-left-3 -top-3 -translate-x-1/2 -translate-y-1/2" />
      <Crosshair className="-right-3 -top-3 translate-x-1/2 -translate-y-1/2" />
      <Crosshair className="-right-3 -bottom-3 translate-x-1/2 translate-y-1/2" />
      <Crosshair className="-left-3 -bottom-3 -translate-x-1/2 translate-y-1/2" />
    </>
  );
}

function AuthorAvatar({ author }: { author: CustomerStoryAuthor }) {
  const frame =
    "aspect-square size-11 overflow-hidden rounded-xl border border-transparent shadow-sm shadow-black/15 ring-1 ring-foreground/10";

  if (author.avatarUrl) {
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatarUrl}
          alt={`Avatar of ${author.name}`}
          loading="lazy"
          width={96}
          height={96}
          className="size-full object-cover"
        />
      </div>
    );
  }

  const initials =
    author.avatarFallback ?? author.name.trim().charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        frame,
        "flex items-center justify-center bg-muted text-sm font-semibold text-muted-foreground",
      )}
    >
      {initials}
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function CustomerStoryStack({
  cases,
  readMoreLink,
  swipeThreshold = 50,
  className,
}: CustomerStoryStackProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = cases.length;
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const touchStartX = React.useRef<number | null>(null);

  const goNext = React.useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = React.useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  React.useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const onStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0]?.clientX ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start == null) return;
      const end = e.changedTouches[0]?.clientX ?? start;
      const dx = end - start;
      if (Math.abs(dx) <= swipeThreshold) return;
      if (dx > 0) goPrev();
      else goNext();
    };

    surface.addEventListener("touchstart", onStart, { passive: true });
    surface.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      surface.removeEventListener("touchstart", onStart);
      surface.removeEventListener("touchend", onEnd);
    };
  }, [goNext, goPrev, swipeThreshold]);

  if (total === 0) return null;
  const activeCase = cases[activeIndex];
  if (!activeCase) return null;

  const navBtn =
    "inline-flex size-9 items-center justify-center rounded-full border border-transparent bg-card shadow-sm shadow-black/10 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-50 dark:ring-foreground/15 dark:hover:bg-muted/50";

  return (
    <section
      className={cn("mx-auto w-full max-w-3xl px-6 py-16 lg:py-24", className)}
      aria-label="Customer stories"
    >
      <div
        ref={surfaceRef}
        className="relative mx-auto max-w-xl"
        style={{ touchAction: "pan-y" }}
      >
        <FrameLines />

        <div
          key={activeCase.id}
          className="relative bg-card animate-in fade-in duration-500"
        >
          <div className="flex flex-col items-center px-8 pb-10 pt-12 lg:px-12 lg:pt-16">
            <div aria-hidden className="text-foreground">
              {activeCase.logo}
            </div>

            <p className="mt-10 min-h-32 text-balance text-center text-lg text-foreground before:mr-1 before:font-serif before:content-['“'] after:ml-1 after:font-serif after:content-['”'] md:min-h-28">
              {activeCase.quote}
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <AuthorAvatar author={activeCase.author} />
              <div className="space-y-0.5 text-left">
                <p className="text-sm font-medium text-foreground">
                  {activeCase.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeCase.author.role}
                </p>
              </div>
            </div>
          </div>

          {activeCase.metrics && (
            <div className="grid grid-cols-1 border-t border-border/60 sm:grid-cols-2">
              {activeCase.metrics.map((metric, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col items-center gap-3 px-6 py-8 text-center",
                    i === 1 &&
                      "border-t border-border/60 sm:border-l sm:border-t-0",
                  )}
                >
                  <div
                    aria-hidden
                    className="text-muted-foreground [&_svg]:size-5"
                  >
                    {metric.icon}
                  </div>
                  <p className="text-balance text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous story"
          className={navBtn}
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2 px-1">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show story ${idx + 1}`}
              aria-current={idx === activeIndex ? "true" : undefined}
              className={cn(
                "size-2 rounded-full transition-colors",
                idx === activeIndex
                  ? "bg-foreground"
                  : "bg-foreground/25 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next story"
          className={navBtn}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {readMoreLink && (
        <Link
          href={readMoreLink.href}
          className="mx-auto mt-6 flex h-9 w-fit items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        >
          {readMoreLink.label}
          <ChevronRight className="size-4 opacity-70" />
        </Link>
      )}
    </section>
  );
}

export default CustomerStoryStack;
