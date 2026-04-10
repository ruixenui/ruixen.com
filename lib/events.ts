import { z } from "zod";
import posthog from "posthog-js";
import { sendGAEvent } from "./ga-events";

// Gate PostHog capture on the same conditions as the provider so local
// dev never pollutes the production project and `trackEvent` stays a
// no-op when the key isn't set.
const POSTHOG_ENABLED =
  process.env.NODE_ENV === "production" &&
  Boolean(process.env.NEXT_PUBLIC_POSTHOG_API_KEY);

const eventSchema = z.object({
  name: z.enum([
    // Copy events
    "copy_npm_command",
    "copy_usage_code",
    "copy_source_code",
    "copy_command",
    "component_code_copy",

    // Component interactions
    "component_interaction",
    "component_favorite",

    // CTA events
    "cta_click",

    // Navigation
    "navigation",
    "view_docs",
    "view_github",
    "outbound_link",

    // Search
    "search",
    "filter_usage",

    // Templates
    "template_download",

    // Social
    "share",
    "newsletter_signup",

    // Settings
    "theme_change",

    // OSS → Pro funnel (added by funnel-correction plan)
    "oss_pro_cta_clicked",
    "oss_pricing_page_viewed",
    "oss_template_preview_clicked",
    "pro_nav_clicked",

    // Header/nav CTA events referenced in config/docs.ts
    "header_cta_clicked",
    "gradients_clicked",
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

/**
 * Track an event to both Google Analytics 4 and PostHog.
 *
 * GA4 stays wired for historical continuity; PostHog is the
 * product-analytics source of truth for the funnel-correction plan
 * (OSS → Pro bridge, price consistency audit, etc.). Using the same
 * project key as pro.ruixen.com plus cross-subdomain cookies means a
 * visitor who crosses domains is a single PostHog identity.
 */
export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (!event) return;

  // GA4 (legacy)
  sendGAEvent(event.name, event.properties || {});

  // PostHog (funnel source of truth)
  if (POSTHOG_ENABLED) {
    try {
      posthog.capture(event.name, event.properties);
    } catch {
      // Never let an analytics failure break a user interaction
    }
  }
}
