/**
 * Free OSS component slug → Pro counterpart slug.
 *
 * Keyed on the `<ComponentSource name="...">` value on the free site.
 * When a mapping exists, the inline docs callout deep-links to the Pro
 * equivalent. Unknown slugs fall through to /pricing.
 *
 * Keep this list small and curated — every entry ships traffic to pro.ruixen
 * and the destination must exist there. Add a row only after confirming the
 * Pro component is live.
 */
export const PRO_COMPONENT_MAP: Record<string, string> = {
  "accordion-editorial": "accordion-with-image-tooltip",
  "hero-sections": "hero-bars",
  "split-hero-section": "hero-mobile-showcase",
  "card-carousel-hero": "hero-cursor-cards",
  "gradient-hero-showcase": "hero-dot-pattern",
  "video-hero-showcase": "hero-tabs-dashboard",
  "footer-section": "flicker-footer",
  "footer-pro": "footer-reveal",
  testimonials: "testimonials-map",
  "stats-counter": "star-counter-wheel",
  "services-bento-grid": "services-bento-grid",
  "feature-bento-grid": "feature-bento-grid",
};
