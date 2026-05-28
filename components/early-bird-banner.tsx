"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";

import { EarlyBirdTimer } from "@/components/early-bird-timer";
import {
  EARLY_BIRD_PRICE,
  POST_EARLY_BIRD_PRICE,
  isEarlyBirdActive,
  msRemaining,
} from "@/lib/early-bird";
import { trackEvent } from "@/lib/events";

/**
 * Top-of-page sticky banner shown during the early-bird window.
 *
 * Behaviour:
 *  - SSR + first render: visible if `isEarlyBirdActive()` was true at
 *    build / request time.
 *  - Client: an interval ticks every second; once the deadline crosses,
 *    the banner unmounts itself. Caller falls back to whatever else
 *    `<SiteBanner>` decides to render.
 *  - CTA click fires `oss_pro_cta_clicked` with `surface: "early_bird_banner"`
 *    so we can attribute Pro purchases during the campaign window.
 */
export function EarlyBirdBanner() {
  const [active, setActive] = React.useState<boolean>(() =>
    isEarlyBirdActive(),
  );

  React.useEffect(() => {
    // If we're already past the deadline at mount, nothing to do.
    if (!active) return;
    const id = window.setInterval(() => {
      if (msRemaining() <= 0) {
        setActive(false);
        window.clearInterval(id);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div className="group relative top-0 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white">
      <div className="container flex flex-col items-center justify-center gap-2 md:h-12 md:flex-row md:gap-4">
        <div className="flex items-center gap-2 text-sm md:text-[15px]">
          <Zap
            className="size-4 shrink-0 fill-yellow-300 text-yellow-300"
            strokeWidth={0}
          />
          <span className="font-semibold">Early-bird ends in</span>
          <EarlyBirdTimer
            size="sm"
            variant="compact"
            className="text-white/95"
          />
        </div>

        <span
          aria-hidden
          className="hidden h-4 w-px bg-white/30 md:inline-block"
        />

        <Link
          href="https://pro.ruixen.com/pricing?ref=early_bird_banner"
          target="_blank"
          onClick={() =>
            trackEvent({
              name: "oss_pro_cta_clicked",
              properties: {
                surface: "early_bird_banner",
                price: EARLY_BIRD_PRICE.display,
              },
            })
          }
          className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-white/95 hover:text-white"
        >
          <span>
            Lock in{" "}
            <span className="font-bold">{EARLY_BIRD_PRICE.display}</span>{" "}
            lifetime — going to{" "}
            <span className="line-through opacity-70">
              {POST_EARLY_BIRD_PRICE.display}
            </span>
          </span>
          <ChevronRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-white/20" />
    </div>
  );
}
