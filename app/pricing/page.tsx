import type { Metadata } from "next";
import Script from "next/script";

import { PricingLanding } from "@/components/sections/pricing-landing";

export const metadata: Metadata = {
  title: "Pricing — Ruixen UI Pro",
  description:
    "Lifetime access to 50+ premium React components and production templates. $59 once. No subscription.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Ruixen UI Pro — $59 Lifetime",
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
    price: "59.00",
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
