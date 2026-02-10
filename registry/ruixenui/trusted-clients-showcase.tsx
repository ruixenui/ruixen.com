"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Trusted Clients Showcase — Spotlight logo grid.

   Logos enter with a staggered blur-up reveal triggered by
   IntersectionObserver. At rest, all logos sit at 40% opacity
   — quiet, confident. Hover any logo and it lifts to full
   opacity while the rest dim to 20%, creating a theatrical
   spotlight effect. No framer-motion, no next/image — pure
   CSS transitions with React state for collective dim.

   Entrance: blur(4px) + translateY(8px) + opacity(0) → clear,
   staggered 60ms per item, cubic-bezier(0.16, 1, 0.3, 1).
   After entrance completes, transitions shorten to 250ms
   for snappy hover feedback.
   ═══════════════════════════════════════════════════════════ */

export interface LogoItem {
  name: string;
  logo?: React.ReactNode;
  href?: string;
}

export interface TrustedClientsShowcaseProps {
  title?: string;
  clients?: LogoItem[];
  className?: string;
}

const defaultClients: LogoItem[] = [
  { name: "Vercel" },
  { name: "Linear" },
  { name: "Stripe" },
  { name: "Notion" },
  { name: "Figma" },
  { name: "Raycast" },
  { name: "Loom" },
  { name: "Pitch" },
];

export function TrustedClientsShowcase({
  title = "Trusted by industry leaders",
  clients = defaultClients,
  className,
}: TrustedClientsShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [inView, setInView] = React.useState(false);
  const [entranceDone, setEntranceDone] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  // Scroll-triggered entrance via IntersectionObserver
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Switch to snappy hover transitions after entrance stagger completes
  React.useEffect(() => {
    if (inView && !entranceDone) {
      const timer = setTimeout(
        () => setEntranceDone(true),
        clients.length * 60 + 600,
      );
      return () => clearTimeout(timer);
    }
  }, [inView, entranceDone, clients.length]);

  const anyHovered = hoveredIndex !== null;

  return (
    <section ref={sectionRef} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        {title && (
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        )}
        <div
          className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 md:grid-cols-4 md:gap-12"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {clients.map((client, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={i}
                className="flex h-12 cursor-default items-center justify-center"
                onMouseEnter={() => setHoveredIndex(i)}
                style={{
                  opacity: inView
                    ? anyHovered
                      ? isHovered
                        ? 1
                        : 0.2
                      : 0.4
                    : 0,
                  transform: inView
                    ? isHovered
                      ? "translateY(-2px)"
                      : "translateY(0)"
                    : "translateY(8px)",
                  filter: inView ? "blur(0px)" : "blur(4px)",
                  transition: entranceDone
                    ? "opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                    : "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: !entranceDone ? `${i * 60}ms` : "0ms",
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
                      <span className="select-none text-xl font-semibold tracking-tight text-foreground">
                        {client.name}
                      </span>
                    )}
                  </a>
                ) : (
                  <span className="inline-flex items-center">
                    {client.logo || (
                      <span className="select-none text-xl font-semibold tracking-tight text-foreground">
                        {client.name}
                      </span>
                    )}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
