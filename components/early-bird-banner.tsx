"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  POST_EARLY_BIRD_PRICE,
  formatRemaining,
  getActivePrice,
  getNextStep,
  isEarlyBirdActive,
  nextStepAt,
} from "@/lib/early-bird";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

/* ── rolling odometer digit (0–9) ──────────────────────────────────
 * Same fluid-numeral motion as the BannerCountdown component, reusing
 * the global `digit-in` / `digit-out` keyframes in styles/globals.css.
 */
function Digit({ value }: { value: number }) {
  const [cur, setCur] = React.useState(value);
  const [prev, setPrev] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (value !== cur) {
      setPrev(cur);
      setCur(value);
      const id = setTimeout(() => setPrev(null), 400);
      return () => clearTimeout(id);
    }
  }, [value, cur]);

  return (
    <span className="relative inline-flex h-[1.2em] w-[0.62em] items-center justify-center overflow-hidden">
      {prev !== null && (
        <span className="absolute inset-0 flex items-center justify-center animate-[digit-out_0.35s_ease-in_forwards]">
          {prev}
        </span>
      )}
      <span
        key={cur}
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          prev !== null &&
            "animate-[digit-in_0.35s_cubic-bezier(0.16,1,0.3,1)]",
        )}
      >
        {cur}
      </span>
    </span>
  );
}

/** A two-digit pill with a trailing unit, e.g. `05h`. */
function Pair({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-md bg-white/15 px-1.5 py-1 font-mono text-sm font-semibold leading-none tabular-nums text-white">
      <span className="inline-flex leading-none">
        <Digit value={Math.floor(value / 10)} />
        <Digit value={value % 10} />
      </span>
      <span className="text-[10px] font-medium leading-none text-white/55">
        {unit}
      </span>
    </span>
  );
}

/**
 * Top-of-page early-bird banner. Blue brand bar (as before) with the
 * rolling-digit countdown design. The price-ladder brain lives here:
 *
 *  - self-hides once the campaign ends (`isEarlyBirdActive`);
 *  - re-evaluates the live price rung every second and counts down to the
 *    *next* price rise (then to the campaign end on the final rung), so the
 *    banner self-advances $59 → $69 → $79 on schedule with no redeploy.
 */
export function EarlyBirdBanner() {
  const [now, setNow] = React.useState<Date>(() => new Date());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Fire one impression per page load the first second the banner is live,
  // so `oss_pro_cta_clicked` clicks have a denominator (view → click CTR).
  // Guarded by a ref because the 1s `setNow` tick re-renders this component.
  const impressionFired = React.useRef(false);
  React.useEffect(() => {
    if (impressionFired.current || !isEarlyBirdActive(now)) return;
    impressionFired.current = true;
    trackEvent({
      name: "early_bird_banner_viewed",
      properties: {
        surface: "early_bird_banner",
        price: getActivePrice(now).display,
      },
    });
  }, [now]);

  if (!isEarlyBirdActive(now)) return null;

  const current = getActivePrice(now);
  const next = getNextStep(now);
  const { days, hours, minutes, seconds } = formatRemaining(
    Math.max(0, nextStepAt(now).getTime() - now.getTime()),
  );

  return (
    <div className="group relative bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white">
      <div className="container flex flex-col items-center justify-center gap-x-4 gap-y-1.5 py-2.5 text-sm md:h-12 md:flex-row md:py-0">
        <span className="font-semibold">
          {next
            ? `Ruixen Pro early-bird — ${current.display} lifetime, then ${POST_EARLY_BIRD_PRICE.display}`
            : `Final hours — Ruixen Pro ${current.display} lifetime`}
        </span>

        <span
          aria-hidden
          className="hidden h-4 w-px bg-white/30 md:inline-block"
        />

        <span className="flex items-center gap-1.5">
          {days > 0 && <Pair value={days} unit="d" />}
          <Pair value={hours} unit="h" />
          <Pair value={minutes} unit="m" />
          <Pair value={seconds} unit="s" />
        </span>

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
                price: current.display,
              },
            })
          }
          className="group/cta inline-flex items-center gap-1 text-sm font-medium text-white/95 hover:text-white"
        >
          <span>
            {next ? (
              <>
                Lock in <span className="font-bold">{current.display}</span>
              </>
            ) : (
              "Claim now"
            )}
          </span>
          <ChevronRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
        </Link>
      </div>

      {/* one-shot golden light sweep on load — draws the eye to the banner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-y-0 -left-1/4 w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-amber-100/80 to-transparent opacity-0 blur-[1px] animate-[banner-shine_1.5s_ease-in-out_0.6s_1_both] motion-reduce:hidden" />
      </div>

      <hr className="absolute bottom-0 m-0 h-px w-full bg-white/20" />
    </div>
  );
}
