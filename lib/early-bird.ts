/**
 * Ruixen Pro price — single source of truth.
 *
 * The launch early-bird price ladder ($59 → $69 → $79 with a live
 * countdown) has been retired in favour of a permanent flat $69 lifetime
 * price. The top banner, the /pricing page card, and the JSON-LD Product
 * schema all read the single price below, so there's nothing left to
 * "expire" and no schedule that can drift the displayed number.
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
