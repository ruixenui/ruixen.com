/**
 * Early-bird campaign — single source of truth.
 *
 * Ruixen Pro's $59 lifetime price expires on the deadline below, after
 * which the catalog price flips to $79. The banner, pricing page card,
 * JSON-LD Product schema, and any CTA copy all read from here so the
 * cut-over is atomic (no half-updated surfaces).
 *
 * Editing the deadline:
 *   - The constant is an ISO timestamp parsed in UTC.
 *   - Set it to the exact moment you want the new price to go live.
 *   - On the next request the timer reads `> Date.now()` and self-hides.
 *
 * 10-day window starting 2026-05-27 ends 2026-06-06 00:00 UTC
 * (= 2026-06-06 05:30 IST). Push the deadline a few hours later if you
 * want IST midnight-clean: "2026-06-06T18:30:00Z".
 */
export const EARLY_BIRD_END = new Date("2026-06-06T00:00:00Z");

export interface PriceSnapshot {
  amountCents: number;
  display: string;
  currency: string;
}

export const EARLY_BIRD_PRICE: PriceSnapshot = {
  amountCents: 5900,
  display: "$59",
  currency: "USD",
};

export const POST_EARLY_BIRD_PRICE: PriceSnapshot = {
  amountCents: 7900,
  display: "$79",
  currency: "USD",
};

/** Returns true if the early-bird campaign is still live at `now`. */
export function isEarlyBirdActive(now: Date = new Date()): boolean {
  return now.getTime() < EARLY_BIRD_END.getTime();
}

/** Returns the active price snapshot for `now` (early or post). */
export function getActivePrice(now: Date = new Date()): PriceSnapshot {
  return isEarlyBirdActive(now) ? EARLY_BIRD_PRICE : POST_EARLY_BIRD_PRICE;
}

/** Remaining ms until the early-bird deadline (clamped at 0). */
export function msRemaining(now: Date = new Date()): number {
  return Math.max(0, EARLY_BIRD_END.getTime() - now.getTime());
}

/** Break `ms` into days/hours/minutes/seconds for display. */
export function formatRemaining(ms: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}
