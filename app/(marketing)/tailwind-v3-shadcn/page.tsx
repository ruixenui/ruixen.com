import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { siteConfig } from "@/config/site";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INSTALL_COMMAND =
  "pnpm dlx shadcn@latest add https://ruixen.com/r/tw3/gradient-hero-showcase.json";

const SHOWCASE = [
  {
    name: "Gradient Hero Showcase",
    href: "/docs/components/gradient-hero-showcase",
    category: "Hero",
  },
  {
    name: "Structured Hero Section",
    href: "/docs/components/structured-hero-section",
    category: "Hero",
  },
  {
    name: "Pricing Plans",
    href: "/docs/components/pricing-plans",
    category: "Pricing",
  },
  {
    name: "Pricing Comparison",
    href: "/docs/components/pricing-comparison",
    category: "Pricing",
  },
  {
    name: "Trusted Clients Showcase",
    href: "/docs/components/trusted-clients-showcase",
    category: "Clients",
  },
  {
    name: "Footer Pro",
    href: "/docs/components/footer-pro",
    category: "Footer",
  },
  {
    name: "Wordmark Footer",
    href: "/docs/components/wordmark-footer",
    category: "Footer",
  },
  {
    name: "Navbar Centered",
    href: "/docs/sections/navbar-centered",
    category: "Navbar",
  },
];

const FAQS = [
  {
    q: "Does Ruixen UI really work with Tailwind CSS v3?",
    a: "Yes. Every component in the catalog is generated into both a Tailwind v3 and a Tailwind v4 variant at build time. The v3 variant is published at /r/tw3/<component>.json and uses HSL-based shadcn theme tokens, which v3 understands natively. No manual porting required.",
  },
  {
    q: "Why ship a Tailwind v3 build at all in 2026?",
    a: "Tailwind v4 rewrote the CSS engine and shipped December 2024. Many production codebases stay on v3 because they have pinned dependencies, paid migration risk, or design systems already tuned to v3's behavior. Most shadcn-style libraries now assume v4. Ruixen is the registry that meets v3 users where they are.",
  },
  {
    q: "Are v3 users getting the same components as v4 users?",
    a: "Yes — identical components. The source code lives once in /registry. A build-time transform produces the v3 variant by rewriting v4-only patterns (var(--color-TOKEN) becomes hsl(var(--TOKEN)), inset-shadow utilities are dropped). The visual output is the same.",
  },
  {
    q: "What's the migration path when I eventually move to v4?",
    a: "Swap your install URL from https://ruixen.com/r/tw3/<name>.json to https://ruixen.com/r/<name>.json and re-run the shadcn CLI. The component source you already have can stay — v3 and v4 share the same JSX. The transform only rewrites Tailwind class strings.",
  },
  {
    q: "Do I need extra config beyond shadcn's standard Tailwind v3 setup?",
    a: "No. If your project already builds with Tailwind v3 and has the standard shadcn theme variables in globals.css, the v3 components drop in unchanged. The shadcn CLI handles dependencies, file placement, and registry resolution.",
  },
  {
    q: "Is Tailwind v3 support free?",
    a: "Yes. The full 240+ component catalog is MIT-licensed and free across all four stack variants (Tailwind v3 or v4, Radix or Base UI). Ruixen Pro is a separate one-time $69 purchase for premium components and landing-page templates.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const PAGE_URL = `${siteConfig.url}/tailwind-v3-shadcn`;

export const metadata: Metadata = {
  title: "Shadcn Components for Tailwind v3 — Ruixen UI",
  description:
    "240+ React sections and components for shadcn projects that ship with full Tailwind v3 support. Copy-paste via the shadcn CLI. Free + MIT.",
  alternates: { canonical: "/tailwind-v3-shadcn" },
  openGraph: {
    title: "Shadcn Components for Tailwind v3",
    description:
      "240+ React sections and components for shadcn projects, built to work with Tailwind v3. One CLI command. No upgrade required.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Components for Tailwind v3",
    description:
      "240+ React sections and components for shadcn projects, built to work with Tailwind v3.",
  },
};

export default function TailwindV3ShadcnPage() {
  return (
    <>
      <Script
        id="tailwind-v3-shadcn-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      <section className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="text-center">
          <p className="text-muted-foreground mb-4 text-sm font-medium uppercase tracking-wider">
            Multi-stack shadcn registry
          </p>
          <h1 className="text-foreground text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Shadcn Components for Tailwind v3
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-balance text-lg md:text-xl">
            240+ React sections and components for shadcn projects, built to
            work seamlessly with Tailwind v3. One CLI command. No upgrade
            required.
          </p>
        </div>

        <div className="bg-muted/40 mx-auto mt-10 flex max-w-3xl items-center gap-2 rounded-md border p-2 pl-4 text-sm shadow-sm">
          <code className="text-foreground flex-1 overflow-x-auto whitespace-nowrap font-mono">
            {INSTALL_COMMAND}
          </code>
          <CopyButton
            value={INSTALL_COMMAND}
            src="tailwind-v3-shadcn-install"
            className="text-foreground hover:bg-background"
          />
        </div>
        <p className="text-muted-foreground mt-3 text-center text-xs">
          Example installs the Gradient Hero Showcase. Same{" "}
          <code className="font-mono">/r/tw3/</code> prefix works for every
          component.
        </p>
      </section>

      <section className="border-y bg-muted/20 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Why a Tailwind v3 build still matters
          </h2>
          <div className="text-muted-foreground mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-foreground font-medium">
                v3 is still production
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                Tailwind v4 rewrote the CSS engine in December 2024. Most large
                codebases stay on v3 for pinned dependencies, design-system
                stability, and managed migration risk.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-medium">
                Identical components
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                One source codebase. A build-time transform produces v3 and v4
                variants automatically — v4-only patterns are rewritten to v3
                equivalents. The JSX and behavior are the same.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-medium">
                Drop-in via shadcn CLI
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                Use the same shadcn CLI you already use. Point it at the{" "}
                <code className="font-mono">/r/tw3/</code> registry endpoint and
                the v3 variant lands in your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          A sample of what ships in Tailwind v3
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Every component in the catalog is available in v3. Browse the full
          docs for the rest of the 240+ sections and primitives.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group bg-card hover:bg-accent flex flex-col justify-between rounded-md border p-4 transition-colors",
              )}
            >
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  {item.category}
                </p>
                <p className="text-foreground mt-2 font-medium">{item.name}</p>
              </div>
              <ArrowRightIcon className="text-muted-foreground mt-6 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/docs/components">Browse all components</Link>
          </Button>
        </div>
      </section>

      <section className="border-y bg-muted/20 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y border-y">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="text-foreground hover:text-foreground/80 flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left text-base font-medium">
                  <span>{item.q}</span>
                  <span className="text-muted-foreground mt-1 shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground pb-5 pr-8 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="bg-card flex flex-col items-start justify-between gap-6 rounded-lg border p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-foreground text-balance text-2xl font-semibold md:text-3xl">
              Need polished landing-page templates?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Ruixen Pro ships 50+ premium components and full landing-page
              templates that work in Tailwind v3 and v4. One payment, lifetime
              updates.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={siteConfig.links.pro}>
              Explore Ruixen Pro
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
