"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Bordered Clients Grid — A 5-column wordmark grid with subtle
   dividers, hover-tinted cells, and decorative cross markers
   at the four outer corners.

   Wordmarks render as typography (not images) — each brand has
   distinct font weight, letter-spacing, case, and style to
   capture its character. No external CDN dependency, fully
   theme-aware via `currentColor`.

   Override the `logos` prop with your own entries — either
   styled text (matching the default API) or full ReactNodes
   for SVG wordmarks if you want pixel-perfect brand typography.

   Grid collapses 5 → 4 → 3 columns at lg → md → sm breakpoints.
   ═══════════════════════════════════════════════════════════ */

export interface ClientLogo {
  /** Display name; used as alt/key. */
  name: string;
  /** Override the rendered text (e.g., "tailwindcss" for Tailwind CSS). Defaults to `name`. */
  label?: string;
  /** Custom font family. Falls back to inherited sans. */
  fontFamily?: string;
  /** Font weight (100–900). Defaults to 600. */
  fontWeight?: number;
  /** Font size in pixels. Defaults to 18. */
  fontSize?: number;
  /** CSS letter-spacing (e.g., "-0.04em" or "0.06em"). */
  letterSpacing?: string;
  /** Italic typography. */
  italic?: boolean;
  /** Uppercase transform. */
  uppercase?: boolean;
  /** Optional anchor href. */
  href?: string;
  /** Escape hatch — render a custom node (e.g., an SVG) instead of styled text. */
  node?: React.ReactNode;
}

export interface BorderedClientsGridProps {
  logos?: ClientLogo[];
  className?: string;
}

const DEFAULT_LOGOS: ClientLogo[] = [
  {
    name: "NVIDIA",
    fontWeight: 900,
    fontSize: 18,
    letterSpacing: "0.06em",
    uppercase: true,
  },
  {
    name: "OpenAI",
    fontWeight: 600,
    fontSize: 22,
    letterSpacing: "-0.01em",
    fontFamily:
      '"Times New Roman", ui-serif, Georgia, "Liberation Serif", serif',
  },
  {
    name: "GitHub",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: "-0.025em",
  },
  {
    name: "Tailwind CSS",
    label: "tailwindcss",
    fontWeight: 600,
    fontSize: 22,
    letterSpacing: "-0.04em",
  },
  {
    name: "Vercel",
    fontWeight: 800,
    fontSize: 24,
    letterSpacing: "-0.05em",
  },
  {
    name: "Stripe",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: "-0.025em",
  },
  {
    name: "Linear",
    fontWeight: 600,
    fontSize: 22,
    letterSpacing: "-0.04em",
  },
  {
    name: "Cloudflare",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: "-0.025em",
  },
  {
    name: "Zapier",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: "-0.025em",
  },
  {
    name: "Laravel",
    fontWeight: 700,
    fontSize: 22,
    italic: true,
    letterSpacing: "-0.025em",
  },
];

export default function BorderedClientsGrid({
  logos = DEFAULT_LOGOS,
  className,
}: BorderedClientsGridProps) {
  return (
    <section
      className={cn("bg-background py-16 md:py-24", className)}
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative">
          {/* Decorative cross markers at the four corners */}
          <CornerCross className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <CornerCross className="right-0 top-0 -translate-y-1/2 translate-x-1/2" />
          <CornerCross className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <CornerCross className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

          <div className="grid grid-cols-2 divide-x divide-y border border-foreground/15 md:grid-cols-5">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center px-4 py-7 transition-colors hover:bg-foreground/5"
              >
                <Wordmark logo={logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Wordmark({ logo }: { logo: ClientLogo }) {
  if (logo.node) {
    return <>{logo.node}</>;
  }

  const text = logo.label ?? logo.name;
  const style: React.CSSProperties = {
    fontFamily: logo.fontFamily,
    fontWeight: logo.fontWeight ?? 600,
    fontStyle: logo.italic ? "italic" : "normal",
    fontSize: `${logo.fontSize ?? 18}px`,
    letterSpacing: logo.letterSpacing,
    textTransform: logo.uppercase ? "uppercase" : "none",
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  const inner = (
    <span
      className="text-foreground/65 transition-colors hover:text-foreground"
      style={style}
    >
      {text}
    </span>
  );

  return logo.href ? (
    <a href={logo.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

function CornerCross({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute size-3", className)}
    >
      <span className="absolute inset-0 m-auto block h-px w-full bg-foreground/30" />
      <span className="absolute inset-0 m-auto block h-full w-px bg-foreground/30" />
    </div>
  );
}
