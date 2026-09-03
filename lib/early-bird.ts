/**
 * Ruixen Pro price — single source of truth.
 *
 * The launch early-bird ladder ($59 → $69 → $79) was retired for a flat
 * lifetime price, which rose to $99 on 3 September 2026. The dated rise and
 * its countdown are gone now that the deadline has passed; the top banner was
 * removed with them. The docs sidebar CTA, the /pricing card and the JSON-LD
 * Product schema all read the constant below, so nothing can drift out of sync.
 */
export interface PriceSnapshot {
  amountCents: number;
  display: string;
  currency: string;
}

/** The one and only Ruixen Pro price. */
export const PRO_PRICE: PriceSnapshot = {
  amountCents: 9900,
  display: "$99",
  currency: "USD",
};
