import { siteConfig } from "@/config/site";

interface ToolJsonLdProps {
  /** Tool display name, e.g. "Glassmorphism Generator". */
  name: string;
  /** One-line description used for the rich-result snippet. */
  description: string;
  /** Path beginning with a slash, e.g. "/generator/glass-morphism". */
  path: string;
}

/**
 * SoftwareApplication JSON-LD for the free generator tools. Declaring each
 * tool as a free SoftwareApplication makes the page eligible for richer
 * search results (app/price chips), which lifts CTR on pages that already
 * rank — the proven bottleneck for Ruixen's tool pages (high impressions,
 * ~1% CTR). Server component, so it can be rendered either from a server
 * page (glass, shadow) or from a layout that wraps a "use client" page
 * (css-generator, gradients).
 */
export function ToolJsonLd({ name, description, path }: ToolJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description,
    url: `${siteConfig.url}${path}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "Ruixen UI",
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
