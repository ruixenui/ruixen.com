"use client";

import { useEffect, useState } from "react";
import { PRICE_DEADLINE } from "@/lib/early-bird";
import { cn } from "@/lib/utils";

const DEADLINE_MS = Date.parse(PRICE_DEADLINE.at);

function remaining(now: number) {
  const ms = DEADLINE_MS - now;
  if (!Number.isFinite(ms) || ms <= 0) return null;
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Ticking countdown to `PRICE_DEADLINE.at`.
 *
 * Renders nothing until mounted. The server's `now` is not the browser's, so
 * rendering the clock during SSR is a guaranteed hydration mismatch — and
 * worse here than on most sites, because ruixen.com's HTML is edge-cached for
 * 7 days, which would freeze a server-rendered countdown at build time. The
 * surrounding copy names the date on its own, so the banner still reads
 * correctly before the timer appears and after the deadline passes.
 */
export function PriceCountdown({ className }: { className?: string }) {
  const [left, setLeft] = useState<ReturnType<typeof remaining>>(null);

  useEffect(() => {
    const tick = () => setLeft(remaining(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!left) return null;

  return (
    <span
      className={cn("tabular-nums", className)}
      suppressHydrationWarning
      aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes left`}
    >
      {left.days > 0 ? `${left.days}d ` : ""}
      {pad(left.hours)}h {pad(left.minutes)}m {pad(left.seconds)}s
    </span>
  );
}
