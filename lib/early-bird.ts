/**
 * Ruixen Pro price — single source of truth.
 *
 * The launch early-bird ladder ($59 → $69 → $79) was retired for a flat $69
 * lifetime price. A dated rise is back as of Sep 2026, but only as ONE step
 * with one instant (`PRICE_DEADLINE`), not a ladder — the top banner, the
 * docs sidebar CTA, the /pricing card and the JSON-LD Product schema all read
 * the constants below, so nothing can drift out of sync.
 */
export interface PriceSnapshot {
  amountCents: number;
  display: string;
  currency: string;
}

/** The one and only Ruixen Pro price. */
export const PRO_PRICE: PriceSnapshot = {
  amountCents: 6900,
  display: "$69",
  currency: "USD",
};

/**
 * The dated price rise the banner and sidebar CTA count down to.
 *
 * `at` is anchored in UTC on purpose: a bare "September 3" is five different
 * moments to a buyer in Bangalore, Berlin and California, and the countdown
 * has to agree with whenever the price actually changes. The offer runs
 * *through* Sep 3, so this is the end of Sep 3 IST (18:30 UTC) and the copy
 * reads "after September 3" — a buyer on Sep 3 still gets $69.
 */
export const PRICE_DEADLINE = {
  at: "2026-09-03T18:30:00Z",
  /** Compact form for badges, e.g. "Sep 3". */
  short: "Sep 3",
  /** Prose form for the banner, e.g. "September 3". */
  long: "September 3",
  /** What Pro costs once `at` passes. */
  nextPrice: "$99",
} as const;
