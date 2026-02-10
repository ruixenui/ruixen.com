"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Auto Scrolling Client Carousel — Dual Ribbon, Grayscale Bloom.

   Two rows of logos scrolling in opposite directions at
   slightly offset speeds. Unlike the other two client
   showcases, this one keeps FULL OPACITY at all times —
   logos are always clearly visible. The "muted" state is
   achieved through CSS grayscale, not opacity dimming:
   monochrome at rest, color blooms on hover.

   Three paradigms, zero overlap:
     • trusted-clients:  STATIC grid, binary OPACITY dim
     • client-carousel:  SINGLE drift, proximity OPACITY field
     • auto-scrolling:   DUAL ribbon, GRAYSCALE bloom (no opacity)

   Rows scroll continuously — they never pause, never stop.
   The interaction is purely visual: grayscale(1) → grayscale(0)
   with a spring-bounce scale lift. The motion stays constant.

   Dual-ribbon rhythm:
     Row 1: clients in order, scrolling left, speed N
     Row 2: clients reversed, scrolling right, speed N × 1.15
   The slight speed offset creates a visual polyrhythm —
   logos phase in and out of vertical alignment.

   Scale lift: cubic-bezier(0.34, 1.56, 0.64, 1) — spring with
   slight overshoot. Different from trusted-clients' deceleration
   and client-carousel's exponential ease.

   Seamless loop: three copies of items (not two). With only 2×,
   the track can be shorter than the viewport at the loop point,
   creating a visible gap. With 3×, the track always exceeds
   viewport + one full copy. Per-item padding-left (not flex gap)
   ensures -33.333% lands exactly at one copy boundary.

   Zero dependencies. No embla, no framer-motion, no next/image.
   ═══════════════════════════════════════════════════════════ */

export interface AutoScrollingCarouselItem {
  name: string;
  logo?: React.ReactNode;
  href?: string;
}

export interface AutoScrollingClientCarouselProps {
  title?: string;
  clients?: AutoScrollingCarouselItem[];
  /** Seconds for one full scroll cycle. Lower = faster. */
  speed?: number;
  className?: string;
}

const defaultClients: AutoScrollingCarouselItem[] = [
  { name: "Vercel" },
  { name: "Linear" },
  { name: "Stripe" },
  { name: "Notion" },
  { name: "Figma" },
  { name: "Raycast" },
  { name: "Loom" },
  { name: "Pitch" },
];

/* ── Single ribbon row ─────────────────────────────────── */

function Ribbon({
  items,
  speed,
  reverse,
}: {
  items: AutoScrollingCarouselItem[];
  speed: number;
  reverse: boolean;
}) {
  // Triple for viewport coverage — at any scroll offset,
  // at least 2 copies fill the visible area.
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center"
        style={{
          animation: `auto-scroll-ribbon ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {tripled.map((client, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center justify-center pl-14 sm:pl-16"
            style={{
              filter: "grayscale(1)",
              transition:
                "filter 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0)";
              e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(1)";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
            }}
          >
            {client.href ? (
              <a
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                aria-label={client.name}
              >
                {client.logo || (
                  <span className="select-none whitespace-nowrap text-xl font-semibold tracking-tight text-foreground">
                    {client.name}
                  </span>
                )}
              </a>
            ) : (
              <span className="inline-flex items-center">
                {client.logo || (
                  <span className="select-none whitespace-nowrap text-xl font-semibold tracking-tight text-foreground">
                    {client.name}
                  </span>
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────── */

export function AutoScrollingClientCarousel({
  title = "Trusted by leading teams",
  clients = defaultClients,
  speed = 35,
  className,
}: AutoScrollingClientCarouselProps) {
  const reversed = React.useMemo(() => [...clients].reverse(), [clients]);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-5xl px-6">
        {title && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        )}

        <div className="space-y-2">
          <Ribbon items={clients} speed={speed} reverse={false} />
          <Ribbon items={reversed} speed={speed * 1.15} reverse={true} />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes auto-scroll-ribbon {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% / 3)); }
}`,
        }}
      />
    </section>
  );
}
