import { siteConfig } from "../config/site";

const CATEGORY_KEYWORDS: ReadonlyArray<readonly [string, string]> = [
  ["faq", "faq"],
  ["pricing", "pricing"],
  ["hero", "hero"],
  ["navbar", "navbar"],
  ["footer", "footer"],
  ["featured", "featured"],
  ["client", "client"],
];

/**
 * Resolve a doc slug fragment to a Tier 1 SEO category for OG image styling.
 * Uses rightmost-keyword-wins so `pricing-landing-hero` maps to `hero` (its
 * actual nav category) rather than `pricing`. Returns undefined for slugs
 * that don't match any Tier 1 keyword so the OG render falls through to the
 * generic template.
 */
export function getCategoryFromSlug(
  slug: string | null | undefined,
): string | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();
  let bestCategory: string | undefined;
  let bestPosition = -1;
  for (const [kw, cat] of CATEGORY_KEYWORDS) {
    const pos = s.lastIndexOf(kw);
    if (pos > bestPosition) {
      bestPosition = pos;
      bestCategory = cat;
    }
  }
  return bestCategory;
}

/**
 * Build an absolute URL pointing at the dynamic OG image generator
 * at /og. Always returns an absolute URL on the production origin so
 * social crawlers (Twitter, LinkedIn, Slack, Discord) can reach it.
 *
 * The OG route renders title at 80px and description at 40px on a
 * 1200×628 canvas. Inputs are trimmed to keep the render readable.
 */
export function buildOgImageUrl({
  title,
  description,
  category,
}: {
  title?: string | null;
  description?: string | null;
  category?: string | null;
} = {}): string {
  const params = new URLSearchParams();
  if (title) params.set("title", title.trim().slice(0, 80));
  if (description) params.set("description", description.trim().slice(0, 150));
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `${siteConfig.url}/og?${query}` : `${siteConfig.url}/og`;
}
