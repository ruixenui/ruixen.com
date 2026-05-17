import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { ThemeGeneratorEditor } from "@/components/tools/theme-generator/editor";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shadcn Theme Generator — Ruixen Tools",
  description:
    "Free in-browser shadcn theme generator. Pick a primary color and base hue, get a complete light + dark theme with all shadcn CSS variables. Outputs HSL (v1) or OKLCH (v2+).",
};

const pageUrl = `${siteConfig.url}/tools/theme-generator`;

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shadcn Theme Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  description:
    "A free in-browser tool that generates a complete shadcn UI theme — all 19 CSS variables in light and dark modes — from a primary color and base hue. Supports both HSL and OKLCH output formats.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: pageUrl,
  publisher: {
    "@type": "Organization",
    name: "Ruixen UI",
    url: siteConfig.url,
  },
};

export default function ThemeGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">Theme Generator</span>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Shadcn Theme Generator
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Pick a primary color and base hue — get a complete shadcn theme with
            all 19 CSS variables for both light and dark modes. Live preview,
            HSL or OKLCH output, paste straight into your{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              app/globals.css
            </code>
            .
          </p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
          <ThemeGeneratorEditor />
        </div>
        <div className="mt-6 rounded-xl border bg-card/40 p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">A few things to know</p>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-4">
            <li>
              Destructive stays red across all themes — colorblind users depend
              on its hue stability for danger affordances.
            </li>
            <li>
              The primary-foreground is auto-inverted for contrast: a dark
              primary gets a light foreground, and vice versa.
            </li>
            <li>
              HSL output uses bare values (e.g., <code>0 0% 100%</code>) wrapped
              at usage with <code>hsl(var(--token))</code> — matches shadcn
              v0/v1 convention. OKLCH outputs full <code>oklch(...)</code>{" "}
              functions used directly via <code>var(--token)</code> — matches
              shadcn v2+.
            </li>
            <li>
              Runs entirely in your browser. No telemetry, no server
              round-trips.
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
