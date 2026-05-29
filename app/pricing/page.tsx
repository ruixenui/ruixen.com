import type { Metadata } from "next";
import Script from "next/script";

import { PricingLanding } from "@/components/sections/pricing-landing";
import {
  EARLY_BIRD_END,
  EARLY_BIRD_PRICE,
  POST_EARLY_BIRD_PRICE,
  isEarlyBirdActive,
} from "@/lib/early-bird";

// Server-side: pick the headline price for the active window so SSR'd
// metadata + JSON-LD match the visible price card.
const active = isEarlyBirdActive();
const headlinePrice = active
  ? EARLY_BIRD_PRICE.display
  : POST_EARLY_BIRD_PRICE.display;
const productPriceNumeric = active
  ? (EARLY_BIRD_PRICE.amountCents / 100).toFixed(2)
  : (POST_EARLY_BIRD_PRICE.amountCents / 100).toFixed(2);

export const metadata: Metadata = {
  title: active
    ? `Pricing — Ruixen UI Pro · ${headlinePrice} early-bird`
    : "Pricing — Ruixen UI Pro",
  description: active
    ? `Lifetime access to 50+ premium React components and production templates. ${headlinePrice} early-bird (going to ${POST_EARLY_BIRD_PRICE.display}). No subscription.`
    : `Lifetime access to 50+ premium React components and production templates. ${headlinePrice} once. No subscription.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: active
      ? `Ruixen UI Pro — ${headlinePrice} Lifetime (early-bird ends ${EARLY_BIRD_END.toDateString()})`
      : `Ruixen UI Pro — ${headlinePrice} Lifetime`,
    description:
      "50+ premium components, production templates, lifetime updates. One payment.",
    url: "/pricing",
    type: "website",
  },
};

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Ruixen UI Pro — Lifetime Membership",
  description:
    "50+ premium React components and production templates with lifetime updates.",
  brand: { "@type": "Brand", name: "Ruixen UI" },
  offers: {
    "@type": "Offer",
    price: productPriceNumeric,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://ruixen.com/pricing",
    ...(active && {
      // Tells Google Shopping / AI Overviews that this is a limited-time
      // sale price. `priceValidUntil` is the deadline; rich-result eligible.
      priceValidUntil: EARLY_BIRD_END.toISOString().slice(0, 10),
    }),
  },
};

export default function PricingPage() {
  return (
    <>
      <Script
        id="pricing-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }}
      />
      <PricingLanding />
    </>
  );
}
