"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Gate initialization on production + API key so local dev never fires
// events into the production PostHog project. Mirrors the pro.ruixen.com
// pattern at components/posthog-provider.tsx.
const isProduction = process.env.NODE_ENV === "production";

// PostHog project key. `phc_` keys are PUBLIC by design — PostHog ships them
// in the client bundle of every instrumented site (pro.ruixen.com already
// exposes this exact key), so a hard fallback leaks nothing. This exists
// because ruixen.com analytics silently died for ~6 weeks (Apr 22 → Jun 2026):
// `.env` is gitignored, the production build env was missing
// NEXT_PUBLIC_POSTHOG_API_KEY, so `hasApiKey` was false and posthog.init()
// never ran. The fallback makes ingestion resilient to env/deploy
// misconfiguration on any host (Vercel or the VPS Docker build). The env var
// still overrides it for other deployments/projects.
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_API_KEY ||
  "phc_lL6RqVBsJG75nnpYsu0208iEr2IRcCq8zi5NgQY6lj2";
const hasApiKey = Boolean(POSTHOG_KEY);

// `cross_subdomain_cookie: true` with `localStorage+cookie` persistence
// writes the anonymous distinct_id into a `.ruixen.com` domain cookie so
// a visitor who clicks from ruixen.com/docs/components → pro.ruixen.com
// keeps the same identity. Without this, the OSS → Pro funnel is
// invisible in PostHog. Both sites must use the SAME project API key.
if (typeof window !== "undefined" && isProduction && hasApiKey) {
  // Always proxy through /ingest in production. If NEXT_PUBLIC_POSTHOG_HOST
  // is still set to a direct PostHog cloud host (a relic from before the
  // proxy was wired), we ignore it — the whole point of the proxy is to
  // bypass ad blockers, which a direct host defeats. The env var can still
  // be used to point at a custom non-cloud ingest route if ever needed.
  const envHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  const envHostIsDirectCloud = !!envHost?.match(/\.i\.posthog\.com/);
  const apiHost = !envHost || envHostIsDirectCloud ? "/ingest" : envHost;

  posthog.init(POSTHOG_KEY, {
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    capture_pageview: false, // We capture manually below
    capture_pageleave: true, // Unlock real bounce rate + session duration
    capture_performance: {
      web_vitals: true, // LCP, INP, CLS — Real User Monitoring
    },
    // Anon visitors don't create Person profiles; only post-`identify` users
    // do. Keeps the quota clean and "Persons" view = real, addressable users.
    person_profiles: "identified_only",
    persistence: "localStorage+cookie",
    cross_subdomain_cookie: true,
    disable_session_recording: true,
    advanced_disable_decide: true,
  });
}

function PostHogPageviewInner(): React.ReactNode {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && isProduction && hasApiKey) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
      // Manual $pageleave on SPA navigation. PostHog SDK auto-fires this
      // on pagehide/beforeunload (tab close), but its History-API listener
      // doesn't always catch Next.js App Router pushState transitions.
      // Capturing here in the cleanup guarantees one pageleave per pageview.
      return () => {
        posthog.capture("$pageleave", { $current_url: url });
      };
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Pageview tracker. Wrapped in `<Suspense>` so `useSearchParams()` does
 * not force a CSR bailout during static prerender in Next 15.
 */
export function PostHogPageview(): React.ReactNode {
  return (
    <Suspense fallback={null}>
      <PostHogPageviewInner />
    </Suspense>
  );
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  // In dev or without an API key we pass through — `trackEvent` gates
  // the same way in lib/events.ts so nothing fires.
  if (!isProduction || !hasApiKey) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PostHogProvider>
  );
}
