import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hostnames
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pro",
        destination: "https://pro.ruixen.com",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/j9fVZm2D",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/r/:path([^.]*)",
        destination: "/r/:path.json",
        permanent: true,
      },
    ];
  },
  rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // PostHog JS is bundled, but the hosted config endpoint
              // lives on us-assets.i.posthog.com. GA4 keeps its existing
              // allow list.
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://us-assets.i.posthog.com",
              // connect-src must allow both the PostHog ingestion host
              // (us.i.posthog.com) and the assets host for remote
              // config fetches. Without us.i.posthog.com every
              // posthog.capture() call is blocked by the browser.
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://us.i.posthog.com https://us-assets.i.posthog.com",
              "img-src 'self' data: blob: https:",
              // Pro template previews (r2.dev) need media-src to load.
              // Without this, media falls back to default-src 'self'.
              "media-src 'self' blob: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "frame-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withContentCollections(nextConfig);
