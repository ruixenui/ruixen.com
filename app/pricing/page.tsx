import type { Metadata } from "next";
import Script from "next/script";

import { PricingLanding } from "@/components/sections/pricing-landing";
import { PRO_PRICE } from "@/lib/early-bird";

// Flat lifetime price — SSR'd metadata + JSON-LD match the visible card.
const headlinePrice = PRO_PRICE.display;
const productPriceNumeric = (PRO_PRICE.amountCents / 100).toFixed(2);

export const metadata: Metadata = {
  title: "Pricing — Ruixen UI Pro",
  description: `Lifetime access to 50+ premium React components and production templates. ${headlinePrice} once. No subscription.`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Ruixen UI Pro — ${headlinePrice} Lifetime`,
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
