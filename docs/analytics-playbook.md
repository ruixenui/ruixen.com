# Ruixen analytics playbook

> Internal doc. Not published. Lives next to the codebase so the events it
> describes stay in sync with `lib/events.ts`.

This playbook turns the captured events into business questions and the
PostHog filters / Insights that answer them. Every section is **one
question → one Insight**. Build them once in PostHog; they're the
permanent dashboard.

---

## 0. Foundation

| | Status |
|---|---|
| Reverse proxy (`/ingest/*` → PostHog Cloud) | ✅ wired in `next.config.mjs` |
| `capture_pageleave` | ✅ unlocks bounce + session duration |
| `capture_performance.web_vitals` | ✅ LCP / INP / CLS recorded |
| `person_profiles: "identified_only"` | ✅ anon visitors don't create profiles |
| Cross-subdomain cookie | ✅ default, identity shared with `pro.ruixen.com` |
| Shared PostHog project for OSS + Pro | ✅ confirmed |

Verification after deploy: open DevTools → Network → filter `ingest` →
should see requests to `ruixen.com/ingest/...`, never `i.posthog.com`
directly. If you see the latter, an ad blocker still gets a clean shot.

---

## 1. Acquisition — "Where do visitors come from?"

**Insight: Daily pageviews by initial referrer**

- Event: `$pageview`
- Breakdown: `$initial_referrer_url` (use the `domain of` extractor for
  cleaner buckets)
- Aggregation: Unique users
- Date range: Last 30 days

What this tells you: which domains drive the most net-new visitors over
time, and which spike during specific days. Save and pin.

**Insight: Top 20 entry paths**

- Event: `$pageview`
- Filter: `$session_entry_url is_set`
- Breakdown: `$session_entry_pathname`
- Aggregation: Unique users

What this tells you: which docs pages are the door — usually one or two
"viral" component pages dominate.

---

## 2. Engagement — "What do they actually read?"

**Insight: Median time on page by component**

- Event: `$pageview`
- Property filter: `$pathname contains /docs/components/`
- Aggregation: `median($session_duration)` (only meaningful now that
  `capture_pageleave` is on)
- Breakdown: `$pathname`

What this tells you: which component pages get *read* vs *skimmed*.
Anything under 8s is a glance. 30–90s is a "scrolled and looked at the
preview." 90s+ is "tried to install."

**Insight: Bounce rate per traffic source**

- Insight type: Trends
- Event: `$pageview` (single events only)
- Filter: `total_pageviews_in_session = 1`
- Breakdown: `$initial_referrer`

The lower the bar, the higher-quality the traffic.

---

## 3. Intent — "Who's trying to install?"

**Insight: Top components by install copy**

- Event: `copy_npm_command`
- Filter: `properties.command icontains ruixen.com/r/`
- Breakdown: `properties.component`
- Aggregation: Total count

The single most actionable chart on the dashboard. The bar at the top of
this list is the component your audience actually wants — and reveals
the gap between "what we built" and "what people copy."

**Insight: TW v3 vs v4 split**

- Event: `copy_npm_command`
- Breakdown: `properties.tw_version`

Same for `properties.ui_library`. If v3 is >30%, prioritise v3
correctness in releases. If `baseui` is climbing, surface it more in
docs.

**Insight: v0 export adoption**

- Event: `v0_export_clicked`
- Breakdown: `properties.component`

A v0 click is a *very* high-intent action — someone wanted to drop your
component into a v0 chat. Tracking which components draw v0 traffic
tells you which are AI-friendly building blocks.

---

## 4. OSS → Pro funnel — "Do we convert?"

**Funnel: Reader → Pro CTA → Checkout → Purchase**

In PostHog: Insights → Funnels → New funnel. Steps:

```
1. $pageview            (on $pathname contains /docs/components/)
2. oss_pro_cta_clicked  (any)
3. pro_checkout_started (fires from pro.ruixen.com)
4. pro_purchase_completed (server-side from Stripe webhook)
```

Settings: Conversion window 14 days, "First touchpoint" attribution.

The numbers at each step are your conversion rate. The drop-off between
2 → 3 is your pricing-page abandonment. The drop-off between 3 → 4 is
your checkout friction.

**Insight: Which components drive the most Pro clicks?**

- Event: `oss_pro_cta_clicked`
- Breakdown: `properties.slug`

The component name attached to a Pro CTA click tells you *why* people
upgrade — if `dashboard-pro` and `pricing-comparison` dominate, your Pro
positioning should lean into those use cases on the pricing page.

**Insight: Revenue attribution by entry referrer**

- Event: `pro_purchase_completed`
- Property: `properties.amount_cents` (use `sum` aggregation, divide by 100 for $)
- Breakdown: Person property `$initial_referrer`

This is the answer to "which traffic source actually pays."

---

## 5. Performance — "Is the site slow?"

PostHog auto-collects Web Vitals once `capture_performance.web_vitals`
is on. Build:

**Insight: P75 LCP by page**

- Event: `$web_vitals`
- Filter: `properties.$web_vitals_LCP_value is_set`
- Aggregation: `percentile_75(properties.$web_vitals_LCP_value)`
- Breakdown: `$pathname`

Google ranks pages on P75 LCP. Anything > 2500ms hurts SEO. Anything >
4000ms hurts SEO badly. Anything < 1800ms is "good."

Same chart for INP (interaction latency, replaces FID; > 200ms is "needs
improvement") and CLS (layout shift, > 0.1 is bad).

**Action filter:** if P75 LCP on a specific component page is > 2500ms,
that page's hero / above-the-fold media is too heavy. Usually a video
poster missing, or a font block.

---

## 6. Audience profile

PostHog auto-captures geo, browser, OS via the IP-to-location lookup. To
build a one-shot snapshot:

**Insight: Visitors by country (rolling 30d)**

- Event: `$pageview`
- Aggregation: Unique users
- Breakdown: `$geoip_country_code`

**Insight: Device type split**

- Event: `$pageview`
- Aggregation: Unique users
- Breakdown: `$device_type` (desktop / mobile / tablet)

If mobile > 25% on a dev-tooling site that's surprising — surface a
mobile-friendlier docs view.

---

## 7. Sanity / hygiene

**Insight: Identify rate**

- Event: `$identify`
- Aggregation: Unique users

Compare to total weekly active users. If identify rate is < 1%,
identify is broken on pro.ruixen.com (most likely the auth callback
wasn't wired).

**Insight: Server-side capture rate**

- Event: `pro_purchase_completed`
- Property: `$lib` (PostHog injects this — `posthog-node` for server)
- Breakdown: `properties.$lib`

100% of purchase events should be `posthog-node`, not `web`. If you see
`web`, the Stripe webhook isn't firing the server-side event and you're
double-counting / under-counting purchases.

---

## 8. Suggested PostHog Dashboard layout

```
Row 1 (acquisition)
  ├ Pageviews by referrer (30d)        │ Top 10 entry paths (30d)
Row 2 (engagement)
  ├ Median time on docs component pages │ Bounce rate by source
Row 3 (intent)
  ├ Top components by install copy      │ TW v3 vs v4 split (pie)
Row 4 (funnel)
  ├ OSS → Pro funnel (4-step)           │ Revenue by referrer
Row 5 (perf)
  ├ P75 LCP by page (table)             │ P75 INP by page (table)
```

That's the operational dashboard. Anything beyond it is exploration.

---

## 9. Events catalog (current)

The source of truth is `lib/events.ts` (Zod-validated enum). Snapshot:

| Event | Properties | Fired from |
|---|---|---|
| `$pageview` | auto | manual capture in `posthog-provider.tsx` |
| `$pageleave` | auto | PostHog SDK |
| `$web_vitals` | auto | PostHog SDK |
| `copy_npm_command` | `command`, `pm`, `tw_version`, `ui_library`, `component` | `code-block-command.tsx` |
| `copy_source_code` | `component`, `surface`, `chars` | `component-preview.tsx` toolbar |
| `copy_usage_code`, `copy_command`, `component_code_copy` | varies | MDX code blocks |
| `preview_code_viewed` | `component` | `component-preview.tsx` tab |
| `preview_replayed` | `component` | `component-preview.tsx` replay |
| `v0_export_clicked` | `component` | `component-preview.tsx` v0 button |
| `package_manager_changed` | `from`, `to` | `code-block-command.tsx` |
| `tw_version_changed` | `from`, `to` | `code-block-command.tsx` |
| `ui_library_changed` | `from`, `to` | `code-block-command.tsx` |
| `oss_pro_cta_clicked` | `surface`, `slug` | `pro-inline-callout.tsx` |
| `pro_checkout_started` | `plan`, `amount_cents`, `currency`, `source_path` | pro.ruixen.com Stripe init |
| `pro_purchase_completed` | `amount_cents`, `currency`, `plan`, `stripe_session_id` | Stripe webhook (server-side) |

When you add a new event: append to the enum in `lib/events.ts`, then
add a row here. Zod validation will catch drift.
