"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  try {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;
    const apiHost =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (!apiKey) {
      console.warn("PostHog API key not found");
    } else if (!apiKey.startsWith("phc_")) {
      console.error(
        "PostHog API key format is invalid. It should start with 'phc_'",
      );
    } else {
      posthog.init(apiKey, {
        api_host: apiHost,
        capture_pageview: false, // We handle this manually
        session_recording: {
          maskAllInputs: false,
        },
        // Enable debug mode in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log("PostHog initialized successfully");
            posthog.debug();
          }
        },
        // Disable autocapture to reduce network requests
        autocapture: false,
        // Gracefully handle network errors
        persistence: "localStorage+cookie",
      });
    }
  } catch (error) {
    console.warn("PostHog initialization failed:", error);
  }
}

export function PostHogPageview(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      try {
        let url = window.origin + pathname;
        if (searchParams && searchParams.toString()) {
          url = url + `?${searchParams.toString()}`;
        }
        posthog.capture("$pageview", {
          $current_url: url,
        });
      } catch (error) {
        console.warn("PostHog pageview capture failed:", error);
      }
    }
  }, [pathname, searchParams]);

  return <></>;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
