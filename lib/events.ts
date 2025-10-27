import posthog from "posthog-js";
import { z } from "zod";
import { sendGAEvent } from "./ga-events";

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
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

/**
 * Track an event to both PostHog and Google Analytics 4
 */
export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (event) {
    // Send to PostHog
    posthog.capture(event.name, event.properties);

    // Send to GA4
    sendGAEvent(event.name, event.properties || {});
  }
}
