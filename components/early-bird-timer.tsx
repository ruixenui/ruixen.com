"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EARLY_BIRD_END, formatRemaining, msRemaining } from "@/lib/early-bird";

/* ── types ───────────────────────────────────────────────────── */

export interface EarlyBirdTimerProps {
  /** Visual size. `sm` = banner-inline. `lg` = pricing-page hero. */
  size?: "sm" | "lg";
  /** Show "days" label and friends, or just numbers + colons. */
  variant?: "labelled" | "compact";
  /** Render this when the timer hits zero. Default: nothing. */
  expiredFallback?: React.ReactNode;
  className?: string;
}

/* ── component ───────────────────────────────────────────────── */

export function EarlyBirdTimer({
  size = "sm",
  variant = "labelled",
  expiredFallback = null,
  className,
}: EarlyBirdTimerProps) {
  // Start with the deterministic deadline diff so SSR + first client render
  // agree (avoids hydration mismatch). The interval below then keeps the
  // value live once we're in the browser.
  const [ms, setMs] = React.useState<number>(() =>
    typeof window === "undefined" ? msRemaining() : msRemaining(),
  );

  React.useEffect(() => {
    const tick = () => setMs(msRemaining());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (ms <= 0) return <>{expiredFallback}</>;

  const { days, hours, minutes, seconds } = formatRemaining(ms);

  if (variant === "compact") {
    return (
      <time
        dateTime={EARLY_BIRD_END.toISOString()}
        className={cn(
          "font-mono tabular-nums tracking-tight",
          size === "lg" ? "text-2xl md:text-3xl" : "text-sm",
          className,
        )}
        aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
      >
        {String(days).padStart(2, "0")}d {String(hours).padStart(2, "0")}h{" "}
        {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
      </time>
    );
  }

  // Labelled variant — split blocks for the pricing page hero.
  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div
      role="timer"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
      className={cn("flex items-center gap-2 md:gap-3", className)}
    >
      {blocks.map((b, i) => (
        <React.Fragment key={b.label}>
          <div
            className={cn(
              "flex flex-col items-center rounded-md border border-border bg-background/80 backdrop-blur-sm",
              size === "lg" ? "px-3 py-2 md:px-4 md:py-2.5" : "px-2 py-1",
            )}
          >
            <span
              className={cn(
                "font-mono font-semibold tabular-nums tracking-tight",
                size === "lg" ? "text-2xl md:text-3xl" : "text-sm",
              )}
            >
              {String(b.value).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider text-muted-foreground",
                size === "lg" ? "md:text-xs" : "",
              )}
            >
              {b.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span
              aria-hidden
              className={cn(
                "font-mono font-semibold text-muted-foreground/60",
                size === "lg" ? "text-2xl md:text-3xl" : "text-sm",
              )}
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
