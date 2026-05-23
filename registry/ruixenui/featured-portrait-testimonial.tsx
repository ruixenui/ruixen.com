"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface FeaturedPortraitFavorite {
  icon: React.ReactNode;
  label: React.ReactNode;
}

export interface FeaturedPortraitAuthor {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface FeaturedPortraitCompany {
  /** Subtitle rendered under the name in the inactive card footer. */
  name?: string;
  /** Tiny logo bubble drawn to the left of the avatar in the inactive footer. */
  logo?: React.ReactNode;
}

export interface FeaturedPortraitItem {
  id: string;
  /** Pull-quote shown in the active (left-half) card. */
  quote: React.ReactNode;
  author: FeaturedPortraitAuthor;
  /** Portrait image used in the inactive card. */
  portraitUrl: string;
  /** Optional company subtitle + tiny logo bubble for the inactive footer. */
  company?: FeaturedPortraitCompany;
  /** Optional favorite-feature tags rendered under the dashed divider in the active card. */
  favorites?: FeaturedPortraitFavorite[];
  /** Tailwind classes overriding the active-card background. */
  accentClassName?: string;
  /** Tailwind classes overriding the inactive portrait container background tint. */
  portraitBgClassName?: string;
}

export interface FeaturedPortraitTestimonialProps {
  items: FeaturedPortraitItem[];
  /** Small pill rendered above the heading. */
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  /** Caption rendered above the favorites tag row in the active card. */
  favoritesLabel?: React.ReactNode;
  /** Initial active index. Default 0. */
  defaultIndex?: number;
  /** Width of each inactive portrait card in px. Default 240. */
  inactiveCardWidth?: number;
  className?: string;
}

/* ── motion constants ────────────────────────────────────────── */

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const SLIDE_MS = 650;
const FADE_MS = 450;
const GAP_PX = 16;

/* ── component ───────────────────────────────────────────────── */

export function FeaturedPortraitTestimonial({
  items,
  eyebrow,
  heading,
  description,
  favoritesLabel = "Favorites Feature",
  defaultIndex = 0,
  inactiveCardWidth = 240,
  className,
}: FeaturedPortraitTestimonialProps) {
  const total = items.length;
  const [activeIndex, setActiveIndex] = React.useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(0, total - 1)),
  );

  const activeItem = items[activeIndex];

  const goNext = React.useCallback(() => {
    if (total === 0) return;
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = React.useCallback(() => {
    if (total === 0) return;
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const onKey = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  if (total === 0 || !activeItem) return null;

  return (
    <section
      className={cn("px-6 py-16 lg:py-24", className)}
      aria-roledescription="carousel"
      aria-label="Featured testimonials"
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || heading || description) && (
          <div className="mb-12 text-center lg:mb-16">
            {eyebrow && (
              <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-medium text-foreground/80 shadow-sm shadow-black/[0.03]">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          tabIndex={0}
          onKeyDown={onKey}
          className="grid grid-cols-1 gap-6 focus-visible:outline-none lg:grid-cols-2 lg:gap-8"
          aria-live="polite"
        >
          <ActiveColumn
            activeItem={activeItem}
            favoritesLabel={favoritesLabel}
          />
          <InactivesColumn
            items={items}
            activeIndex={activeIndex}
            width={inactiveCardWidth}
            onSelect={setActiveIndex}
            goPrev={goPrev}
            goNext={goNext}
          />
        </div>
      </div>
    </section>
  );
}

/* ── left half — active card with two-layer crossfade ────────── */

function ActiveColumn({
  activeItem,
  favoritesLabel,
}: {
  activeItem: FeaturedPortraitItem;
  favoritesLabel: React.ReactNode;
}) {
  const [state, setState] = React.useState<{
    current: FeaturedPortraitItem;
    outgoing: FeaturedPortraitItem | null;
  }>({ current: activeItem, outgoing: null });

  React.useEffect(() => {
    if (state.current.id !== activeItem.id) {
      setState({ current: activeItem, outgoing: state.current });
      const t = setTimeout(() => {
        setState((prev) => ({ ...prev, outgoing: null }));
      }, FADE_MS + 60);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem.id]);

  return (
    <div className="relative h-full">
      {/* Current — fades 0 → 1, drives the column height. */}
      <div
        key={`in-${state.current.id}`}
        className="relative h-full animate-in fade-in-0"
        style={{
          animationDuration: `${FADE_MS}ms`,
          animationTimingFunction: EASE,
          animationFillMode: "both",
        }}
      >
        <ActiveCard item={state.current} favoritesLabel={favoritesLabel} />
      </div>

      {/* Outgoing — overlays inset-0 and fades 1 → 0. */}
      {state.outgoing && (
        <div
          key={`out-${state.outgoing.id}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-out fade-out-0"
          style={{
            animationDuration: `${FADE_MS}ms`,
            animationTimingFunction: EASE,
            animationFillMode: "forwards",
          }}
        >
          <ActiveCard item={state.outgoing} favoritesLabel={favoritesLabel} />
        </div>
      )}
    </div>
  );
}

/* ── right half — inactive cards (persistent DOM) + arrows ───── */

function InactivesColumn({
  items,
  activeIndex,
  width,
  onSelect,
  goPrev,
  goNext,
}: {
  items: FeaturedPortraitItem[];
  activeIndex: number;
  width: number;
  onSelect: (i: number) => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  const total = items.length;
  const step = width + GAP_PX;

  // Card height derivation: outer p-2 (16) + image (aspect-[5/6]) + footer (~60).
  const imageInner = width - 16;
  const imageHeight = imageInner * (6 / 5);
  const containerHeight = Math.round(16 + imageHeight + 60 + 4);

  // Track the item that just stopped being active so we can teleport-and-fade
  // it into the rightmost slot instead of letting its transform slide all the
  // way across the row.
  const [justInactiveId, setJustInactiveId] = React.useState<string | null>(
    null,
  );
  const prevActiveIdRef = React.useRef<string | undefined>(
    items[activeIndex]?.id,
  );

  React.useEffect(() => {
    const currentId = items[activeIndex]?.id;
    const prevId = prevActiveIdRef.current;
    if (prevId && prevId !== currentId) {
      setJustInactiveId(prevId);
      prevActiveIdRef.current = currentId;
      const t = setTimeout(() => setJustInactiveId(null), SLIDE_MS + 60);
      return () => clearTimeout(t);
    }
  }, [activeIndex, items]);

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative overflow-hidden"
        style={{ height: containerHeight }}
      >
        {items.map((item, i) => {
          const pos = (i - activeIndex + total) % total;
          const isActive = pos === 0;
          const isJustInactive = item.id === justInactiveId;

          // pos 0 (active) parks at translateX(0) — same slot as pos 1. It's
          // hidden via opacity, so the overlap is invisible. Parking there
          // makes "becoming active" a pure fade-out in place, no jitter.
          const x = isActive ? 0 : (pos - 1) * step;

          // - Just-became-inactive: skip the transform transition so the card
          //   jumps to the rightmost slot invisibly (it was already opacity 0
          //   there) and only fades in. No sliding across the visible row.
          // - Active: only opacity transitions matter; no visible motion.
          // - Everyone else: smooth transform slide + light opacity blend.
          const transition = isJustInactive
            ? `opacity ${FADE_MS}ms ${EASE}`
            : `transform ${SLIDE_MS}ms ${EASE}, opacity ${FADE_MS}ms ${EASE}`;

          return (
            <div
              key={item.id}
              className="absolute left-0 top-0"
              style={{
                transform: `translate3d(${x}px, 0, 0)`,
                opacity: isActive ? 0 : 1,
                pointerEvents: isActive ? "none" : "auto",
                transition,
                willChange: "transform, opacity",
              }}
            >
              <InactiveCard
                item={item}
                width={width}
                onClick={() => onSelect(i)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <NavButton onClick={goPrev} direction="prev" />
        <NavButton onClick={goNext} direction="next" />
      </div>
    </div>
  );
}

/* ── active card ─────────────────────────────────────────────── */

function ActiveCard({
  item,
  favoritesLabel,
}: {
  item: FeaturedPortraitItem;
  favoritesLabel: React.ReactNode;
}) {
  const hasFavorites = !!item.favorites && item.favorites.length > 0;
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/40 p-7 sm:p-9 lg:p-10",
        "shadow-sm shadow-black/[0.04]",
        item.accentClassName ??
          "bg-[hsl(245_55%_96%)] dark:bg-[hsl(245_30%_18%)]",
      )}
    >
      <p
        className={cn(
          "text-[1.5rem] font-medium leading-[1.3] tracking-tight text-foreground",
          "sm:text-[1.65rem] lg:text-[1.85rem]",
        )}
      >
        {item.quote}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Avatar className="size-11 ring-1 ring-foreground/10">
          {item.author.avatarUrl && (
            <AvatarImage src={item.author.avatarUrl} alt={item.author.name} />
          )}
          <AvatarFallback>
            {item.author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {item.author.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {item.author.role}
          </p>
        </div>
      </div>

      {hasFavorites && (
        <>
          <div
            aria-hidden
            className="my-6 border-t border-dashed border-foreground/20"
          />
          <p className="mb-4 text-xs text-muted-foreground">{favoritesLabel}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {item.favorites!.map((fav, i) => (
              <li
                key={i}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/85"
              >
                <span
                  aria-hidden
                  className="flex size-6 items-center justify-center text-foreground/70 [&_svg]:size-6"
                >
                  {fav.icon}
                </span>
                <span>{fav.label}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

/* ── inactive card ───────────────────────────────────────────── */

function InactiveCard({
  item,
  width,
  onClick,
}: {
  item: FeaturedPortraitItem;
  width: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show testimonial from ${item.author.name}`}
      style={{ width: `${width}px` }}
      className={cn(
        "group flex shrink-0 flex-col rounded-2xl border border-border/40 bg-card p-2 text-left",
        "shadow-sm shadow-black/[0.04] transition-shadow duration-200",
        "hover:shadow-md hover:shadow-black/[0.06]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div
        className={cn(
          "relative aspect-[5/6] w-full overflow-hidden rounded-xl",
          item.portraitBgClassName ?? "bg-muted/40",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.portraitUrl}
          alt={item.author.name}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex items-center gap-2.5 px-2 py-3">
        {item.company?.logo && (
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground [&_svg]:size-5"
          >
            {item.company.logo}
          </span>
        )}
        <Avatar className="size-9 ring-1 ring-foreground/10">
          {item.author.avatarUrl && (
            <AvatarImage src={item.author.avatarUrl} alt={item.author.name} />
          )}
          <AvatarFallback>
            {item.author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {item.author.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {item.company?.name ?? item.author.role}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ── nav button ──────────────────────────────────────────────── */

function NavButton({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "prev" ? "Previous testimonial" : "Next testimonial"
      }
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full",
        "border border-border/60 bg-card text-foreground/70",
        "shadow-sm shadow-black/[0.04] transition-all duration-200",
        "hover:bg-muted/50 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}

export default FeaturedPortraitTestimonial;
