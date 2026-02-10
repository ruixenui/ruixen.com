"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Client Carousel Showcase — Proximity Ribbon.

   A continuous horizontal drift with a cursor-proximity field.
   Unlike binary hover (hovered vs not), the cursor creates a
   gaussian field of influence — logos NEAR your cursor brighten
   and lift proportionally, creating a smooth wave that follows
   your movement along the track.

   Fundamentally different from trusted-clients-showcase:
     • trusted-clients: STATIC grid, entrance stagger, binary
       collective dim (one bright, all others dark)
     • client-carousel: CONTINUOUS motion, proximity gradient
       (smooth distance-based falloff, no binary state)

   Proximity math:
     distance = |cursorX - logoCenterX|
     t = clamp(1 - distance/200, 0, 1)
     eased = t² × (3 - 2t)                      ← smoothstep
     scale  = 1 + eased × 0.12                   ← up to 1.12
     opacity = 0.35 + eased × 0.65               ← 0.35 → 1.0
     translateY = -eased × 4px                    ← lift toward cursor

   The smoothstep function has zero derivative at both ends —
   the glow fades in AND out smoothly, no hard cutoff.

   Track: CSS @keyframes translateX(0 → -33.333%) on a tripled set.
   Three copies ensure the track always exceeds viewport + one
   full copy, eliminating gaps on wide screens.
   Pause: animation-play-state toggled via mouseover/leave.
   Masks: linear-gradient edge fade, 8%–92% visibility window.
   Curve: cubic-bezier(0.22, 1, 0.36, 1) on individual items
   for smooth settling when the proximity field moves away.

   Zero dependencies. No embla, no framer-motion, no next/image.
   ═══════════════════════════════════════════════════════════ */

export interface ClientCarouselItem {
  name: string;
  logo?: React.ReactNode;
  href?: string;
}

export interface ClientCarouselShowcaseProps {
  title?: string;
  clients?: ClientCarouselItem[];
  /** Seconds for one full scroll cycle. Lower = faster. */
  speed?: number;
  /** Reverse scroll direction. */
  reverse?: boolean;
  className?: string;
}

const defaultClients: ClientCarouselItem[] = [
  { name: "Vercel" },
  { name: "Linear" },
  { name: "Stripe" },
  { name: "Notion" },
  { name: "Figma" },
  { name: "Raycast" },
  { name: "Loom" },
  { name: "Pitch" },
];

export function ClientCarouselShowcase({
  title = "Trusted by leading teams",
  clients = defaultClients,
  speed = 30,
  reverse = false,
  className,
}: ClientCarouselShowcaseProps) {
  // Triple for viewport coverage — at any scroll offset,
  // at least 2 copies fill the visible area.
  const tripled = React.useMemo(
    () => [...clients, ...clients, ...clients],
    [clients],
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [paused, setPaused] = React.useState(false);

  // Proximity field: cursor position drives a smooth gaussian
  // falloff on each logo's scale, opacity, and Y-offset.
  // Direct DOM manipulation for 60fps — no React re-renders.
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - containerRect.left;
        const distance = Math.abs(mouseX - centerX);
        const maxInfluence = 200;
        const t = Math.max(0, 1 - distance / maxInfluence);

        // Smoothstep: zero derivative at both ends for natural falloff
        const eased = t * t * (3 - 2 * t);

        const scale = 1 + eased * 0.12;
        const opacity = 0.35 + eased * 0.65;
        const y = -eased * 4;

        el.style.transform = `scale(${scale}) translateY(${y}px)`;
        el.style.opacity = String(opacity);
      }
    },
    [],
  );

  const resetItems = React.useCallback(() => {
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      el.style.transform = "scale(1) translateY(0)";
      el.style.opacity = "0.35";
    }
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    setPaused(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setPaused(false);
    resetItems();
  }, [resetItems]);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-5xl px-6">
        {title && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        )}

        {/* Marquee container — gradient edge masks + vertical breathing room */}
        <div
          ref={containerRef}
          className="relative overflow-hidden py-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Scrolling track */}
          <div
            className="flex w-max items-center"
            style={{
              animation: `client-carousel-drift ${speed}s linear infinite`,
              animationDirection: reverse ? "reverse" : "normal",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {tripled.map((client, i) => (
              <div
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="flex shrink-0 items-center justify-center pl-14 sm:pl-16"
                style={{
                  opacity: 0.35,
                  transition:
                    "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
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
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes client-carousel-drift {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% / 3)); }
}`,
        }}
      />
    </section>
  );
}
