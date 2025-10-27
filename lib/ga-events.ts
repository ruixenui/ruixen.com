/**
 * Google Analytics 4 Event Tracking Utilities
 *
 * This file provides type-safe event tracking functions for GA4.
 * All events should be marked as "Key Events" in GA4 Admin → Events
 */

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

// Event parameter types for better type safety
interface BaseEventParams {
  label?: string;
  value?: number;
  category?: string;
}

interface CTAClickParams extends BaseEventParams {
  location: string; // e.g., "Hero", "Navbar", "Footer"
  cta_text?: string; // Button text
}

interface CopyCommandParams extends BaseEventParams {
  command: string; // The command that was copied
  component_name?: string; // Component name if applicable
  component_type?: "component" | "section" | "block" | "template";
}

interface ViewGitHubParams extends BaseEventParams {
  repo?: string;
  component_name?: string;
}

interface ViewDocsParams extends BaseEventParams {
  section: string;
  component_name?: string;
}

interface ComponentInteractionParams extends BaseEventParams {
  component_name: string;
  action: "view" | "preview" | "sandbox" | "download" | "favorite";
  component_category?: string;
}

interface SearchParams extends BaseEventParams {
  search_term: string;
  results_count?: number;
}

interface NavigationParams extends BaseEventParams {
  from_page: string;
  to_page: string;
  link_text?: string;
}

/**
 * Core function to send events to GA4
 */
export function sendGAEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", eventName, {
        ...params,
        timestamp: new Date().toISOString(),
      });

      // Optional: Log in development
      if (process.env.NODE_ENV === "development") {
        console.log("📊 GA Event:", eventName, params);
      }
    } catch (error) {
      console.error("GA Event Error:", error);
    }
  }
}

/**
 * Track CTA button clicks
 * @example trackCTAClick({ location: 'Hero', cta_text: 'Get Started' })
 */
export function trackCTAClick(params: CTAClickParams): void {
  sendGAEvent("cta_click", {
    event_category: "engagement",
    ...params,
  });
}

/**
 * Track command copy actions (install commands, component code, etc.)
 * @example trackCopyCommand({ command: 'npm i ruixen-ui', component_name: 'Button' })
 */
export function trackCopyCommand(params: CopyCommandParams): void {
  sendGAEvent("copy_command", {
    event_category: "code_interaction",
    ...params,
  });
}

/**
 * Track GitHub repository views
 * @example trackViewGitHub({ repo: 'ruixen-ui', component_name: 'Button' })
 */
export function trackViewGitHub(params: ViewGitHubParams): void {
  sendGAEvent("view_github", {
    event_category: "external_link",
    ...params,
  });
}

/**
 * Track documentation views
 * @example trackViewDocs({ section: 'Button component', component_name: 'Button' })
 */
export function trackViewDocs(params: ViewDocsParams): void {
  sendGAEvent("view_docs", {
    event_category: "documentation",
    ...params,
  });
}

/**
 * Track component interactions (preview, sandbox, download, etc.)
 * @example trackComponentInteraction({ component_name: 'Button', action: 'sandbox' })
 */
export function trackComponentInteraction(
  params: ComponentInteractionParams,
): void {
  sendGAEvent("component_interaction", {
    event_category: "component",
    ...params,
  });
}

/**
 * Track search queries
 * @example trackSearch({ search_term: 'button component', results_count: 5 })
 */
export function trackSearch(params: SearchParams): void {
  sendGAEvent("search", {
    event_category: "search",
    ...params,
  });
}

/**
 * Track navigation between pages
 * @example trackNavigation({ from_page: '/', to_page: '/docs/button' })
 */
export function trackNavigation(params: NavigationParams): void {
  sendGAEvent("navigation", {
    event_category: "navigation",
    ...params,
  });
}

/**
 * Track template downloads
 * @example trackTemplateDownload({ template_name: 'Dashboard', template_type: 'admin' })
 */
export function trackTemplateDownload(params: {
  template_name: string;
  template_type?: string;
  label?: string;
}): void {
  sendGAEvent("template_download", {
    event_category: "template",
    ...params,
  });
}

/**
 * Track component code copy (specific to component code blocks)
 * @example trackComponentCodeCopy({ component_name: 'Button', language: 'tsx' })
 */
export function trackComponentCodeCopy(params: {
  component_name: string;
  language?: string;
  code_type?: "component" | "usage" | "installation";
}): void {
  sendGAEvent("component_code_copy", {
    event_category: "code_interaction",
    ...params,
  });
}

/**
 * Track social media shares
 * @example trackShare({ platform: 'twitter', content_type: 'component', content_name: 'Button' })
 */
export function trackShare(params: {
  platform: "twitter" | "linkedin" | "facebook" | "other";
  content_type: "component" | "template" | "page";
  content_name?: string;
}): void {
  sendGAEvent("share", {
    event_category: "social",
    ...params,
  });
}

/**
 * Track newsletter signups
 * @example trackNewsletterSignup({ source: 'footer' })
 */
export function trackNewsletterSignup(params: {
  source: string;
  email_provided?: boolean;
}): void {
  sendGAEvent("newsletter_signup", {
    event_category: "conversion",
    ...params,
  });
}

/**
 * Track filter usage on component/template pages
 * @example trackFilterUsage({ filter_type: 'category', filter_value: 'buttons' })
 */
export function trackFilterUsage(params: {
  filter_type: string;
  filter_value: string;
  page: string;
}): void {
  sendGAEvent("filter_usage", {
    event_category: "interaction",
    ...params,
  });
}

/**
 * Track theme changes
 * @example trackThemeChange({ theme: 'dark', method: 'toggle' })
 */
export function trackThemeChange(params: {
  theme: "light" | "dark";
  method: "toggle" | "system";
}): void {
  sendGAEvent("theme_change", {
    event_category: "settings",
    ...params,
  });
}

/**
 * Track component favorites/bookmarks
 * @example trackComponentFavorite({ component_name: 'Button', action: 'add' })
 */
export function trackComponentFavorite(params: {
  component_name: string;
  action: "add" | "remove";
}): void {
  sendGAEvent("component_favorite", {
    event_category: "engagement",
    ...params,
  });
}

/**
 * Track outbound links
 * @example trackOutboundLink({ url: 'https://github.com/...', link_text: 'View on GitHub' })
 */
export function trackOutboundLink(params: {
  url: string;
  link_text?: string;
  location?: string;
}): void {
  sendGAEvent("outbound_link", {
    event_category: "external_link",
    ...params,
  });
}
