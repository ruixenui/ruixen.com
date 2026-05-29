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
 * 10-day window starting 2026-05-30 ends 2026-06-09 00:00 UTC
 * (= 2026-06-09 05:30 IST). Push the deadline a few hours later if you
 * want IST midnight-clean: "2026-06-09T18:30:00Z".
 */
export const EARLY_BIRD_END = new Date("2026-06-09T00:00:00Z");

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

/** Mid rung of the price ladder. */
export const MID_EARLY_BIRD_PRICE: PriceSnapshot = {
  amountCents: 6900,
  display: "$69",
  currency: "USD",
};

export const POST_EARLY_BIRD_PRICE: PriceSnapshot = {
  amountCents: 7900,
  display: "$79",
  currency: "USD",
};

/** Campaign start — the first ladder rung. */
export const EARLY_BIRD_START = new Date("2026-05-30T00:00:00Z");

export interface PriceStep {
  /** Instant (UTC) this rung's price takes effect. */
  start: Date;
  price: PriceSnapshot;
}

/**
 * Price ladder. Windows shrink toward the deadline so urgency accelerates:
 *   $59 — 30 May → 04 Jun  (5 days)
 *   $69 — 04 Jun → 07 Jun  (3 days)
 *   $79 — 07 Jun → 09 Jun  (2 days, final) then standard $79
 *
 * Each rung's `start` must sit between `EARLY_BIRD_START` and `EARLY_BIRD_END`
 * and stay in ascending order.
 */
export const PRICE_LADDER: ReadonlyArray<PriceStep> = [
  { start: EARLY_BIRD_START, price: EARLY_BIRD_PRICE },
  { start: new Date("2026-06-04T00:00:00Z"), price: MID_EARLY_BIRD_PRICE },
  { start: new Date("2026-06-07T00:00:00Z"), price: POST_EARLY_BIRD_PRICE },
];

/** Returns true if the early-bird campaign is still live at `now`. */
export function isEarlyBirdActive(now: Date = new Date()): boolean {
  return now.getTime() < EARLY_BIRD_END.getTime();
}

/** Index of the ladder rung in effect at `now` (clamped to the first rung). */
function activeStepIndex(now: Date): number {
  const t = now.getTime();
  let idx = 0;
  for (let i = 1; i < PRICE_LADDER.length; i++) {
    if (t >= PRICE_LADDER[i].start.getTime()) idx = i;
  }
  return idx;
}

/** The ladder rung in effect at `now`. */
export function getCurrentStep(now: Date = new Date()): PriceStep {
  return PRICE_LADDER[activeStepIndex(now)];
}

/** The next rung after `now`, or `null` if already on the final rung. */
export function getNextStep(now: Date = new Date()): PriceStep | null {
  const i = activeStepIndex(now);
  return i < PRICE_LADDER.length - 1 ? PRICE_LADDER[i + 1] : null;
}

/** When the price next changes: the next rung's start, else the campaign end. */
export function nextStepAt(now: Date = new Date()): Date {
  return getNextStep(now)?.start ?? EARLY_BIRD_END;
}

/** Remaining ms until the next price change (clamped at 0). */
export function msUntilNextStep(now: Date = new Date()): number {
  return Math.max(0, nextStepAt(now).getTime() - now.getTime());
}

/** Returns the active price snapshot for `now` (current rung, or post). */
export function getActivePrice(now: Date = new Date()): PriceSnapshot {
  return isEarlyBirdActive(now)
    ? getCurrentStep(now).price
    : POST_EARLY_BIRD_PRICE;
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
