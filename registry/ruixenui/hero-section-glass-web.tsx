// components/hero-section.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Action = { href: string; label: string };

export type HeroSectionProps = {
  imageSrc: string;
  imageAlt?: string;
  kicker?: string;
  title: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  coordinates?: string; // e.g. "34°N 118°W\nLos Angeles, US"
  metaLeft?: string;
  metaCenter?: string;
  metaRight?: string;
  className?: string;
};

export function HeroSection({
  imageSrc,
  imageAlt = "",
  kicker = "Category: Experimental Design",
  title,
  description,
  primaryAction,
  secondaryAction,
  coordinates,
  metaLeft,
  metaCenter,
  metaRight,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate min-h-[92svh] w-full overflow-hidden text-white",
        className,
      )}
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center opacity-90 scale-105"
          loading="eager"
        />
        {/* dark vignette + subtle color cast */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_35%,rgba(9,9,11,0.25)_0%,rgba(9,9,11,0.65)_60%,rgba(9,9,11,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />
        {/* soft glow accent */}
        <div className="pointer-events-none absolute -left-48 top-1/2 h-[50rem] w-[50rem] -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* top-right coordinates */}
      {coordinates ? (
        <div className="pointer-events-none absolute right-6 top-6 hidden text-right text-xs tracking-widest text-white/70 md:block">
          {coordinates.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ) : null}

      {/* Content */}
      <div className="container relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-24 lg:py-28">
        <div className="col-span-1 mt-1 md:col-span-7 lg:col-span-7">
          <Badge
            variant="outline"
            className="mb-6 border-white/25 bg-white/10 text-white backdrop-blur rounded-none p-1"
          >
            {kicker}
          </Badge>

          <h1 className="text-balance text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-4">
            {primaryAction ? (
              <Button asChild size="lg" className="font-medium rounded-none">
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            ) : null}

            {secondaryAction ? (
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white/10 rounded-none text-white hover:bg-white/20 border border-white/20"
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="col-span-1 md:col-span-5 lg:col-span-5">
          {description ? (
            <p className="max-w-prose text-base leading-relaxed text-white/85 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* bottom meta row */}
      {(metaLeft || metaCenter || metaRight) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 px-6">
          <div className="container mx-auto flex w-full max-w-7xl items-center justify-between text-xs text-white/70">
            <span className="hidden sm:block">{metaLeft}</span>
            <span className="truncate text-center">{metaCenter}</span>
            <span className="hidden sm:block">{metaRight}</span>
          </div>
        </div>
      )}
    </section>
  );
}
