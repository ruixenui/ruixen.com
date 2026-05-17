import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { siteConfig } from "@/config/site";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INSTALL_COMMAND =
  "pnpm dlx shadcn@latest add https://ruixen.com/r/baseui/gradient-hero-showcase.json";

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
    name: "Pricing Comparison",
    href: "/docs/components/pricing-comparison",
    category: "Pricing",
  },
  {
    name: "Subscription Plans",
    href: "/docs/components/subscription-plans",
    category: "Pricing",
  },
  {
    name: "FAQ Scroll Accordion",
    href: "/docs/sections/faq-scroll-accordion",
    category: "FAQ",
  },
  {
    name: "Navbar With Search",
    href: "/docs/sections/navbar-with-search",
    category: "Navbar",
  },
  {
    name: "Footer Enterprise",
    href: "/docs/components/footer-enterprise",
    category: "Footer",
  },
  {
    name: "Trusted Clients Showcase",
    href: "/docs/components/trusted-clients-showcase",
    category: "Clients",
  },
];

const FAQS = [
  {
    q: "What is Base UI and why use it instead of Radix?",
    a: "Base UI is an accessible, unstyled React primitive library maintained by the MUI team. It's a fresh alternative to Radix with a cleaner API surface, more permissive licensing, and active development from a larger sponsor. Teams choose Base UI for accessibility-first projects, design-system work, or when they want primitives without Radix's specific opinions.",
  },
  {
    q: "Does Ruixen really run on Base UI instead of Radix?",
    a: "Yes. The component source code is identical across both — only the wrapper layer at components/ui/* differs. Ruixen ships 25 Base UI wrappers that mirror the shadcn primitive API surface (Dialog, DropdownMenu, Accordion, Tabs, etc.), so any of the 240+ components can install with Base UI primitives in place of Radix.",
  },
  {
    q: "Which package do I install — @base-ui/react or @base-ui-components/react?",
    a: "@base-ui/react. The package was renamed in December 2025 (v1 release) — older docs may reference @base-ui-components/react. The shadcn CLI handles the install automatically when you use the /r/baseui/ registry endpoint.",
  },
  {
    q: "How does the install differ from the Radix flow?",
    a: "Same shadcn CLI, different registry URL. Point it at https://ruixen.com/r/baseui/<component>.json. The CLI fetches a manifest where the component's primitive dependencies are mapped to Base UI wrappers instead of Radix's @radix-ui/* packages.",
  },
  {
    q: "What about Tailwind state selectors — does data-[state=open] still work?",
    a: "Base UI uses a slightly different attribute convention: data-[open] instead of data-[state=open]. The Ruixen wrappers handle this automatically — class strings in the component source are written to work with the Base UI attribute convention when you install from the baseui registry.",
  },
  {
    q: "Can I mix Base UI and Radix in the same project?",
    a: "Technically yes, but it adds bundle size and creates two parallel primitive systems. The recommended path is to commit to one. Ruixen lets you stay consistent across the whole catalog by always installing from one registry prefix.",
  },
  {
    q: "Is Base UI support free?",
    a: "Yes. The full 240+ component catalog is MIT-licensed and free across all four stack variants (Tailwind v3 or v4, Radix or Base UI). Ruixen Pro is a separate one-time $59 purchase for premium components and templates — all available in Base UI variants too.",
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

const PAGE_URL = `${siteConfig.url}/base-ui-shadcn`;

export const metadata: Metadata = {
  title: "Base UI Components for Shadcn Projects — Ruixen UI",
  description:
    "240+ React sections and components that install with Base UI primitives instead of Radix. Same shadcn CLI, accessibility-first stack. Free + MIT.",
  alternates: { canonical: "/base-ui-shadcn" },
  openGraph: {
    title: "Base UI Components for Shadcn Projects",
    description:
      "240+ React sections and components built to install with Base UI primitives instead of Radix. One CLI command.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base UI Components for Shadcn Projects",
    description:
      "240+ React sections and components that install with Base UI primitives instead of Radix.",
  },
};

export default function BaseUiShadcnPage() {
  return (
    <>
      <Script
        id="base-ui-shadcn-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      <section className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="text-center">
          <p className="text-muted-foreground mb-4 text-sm font-medium uppercase tracking-wider">
            Multi-stack shadcn registry
          </p>
          <h1 className="text-foreground text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Base UI Components for Shadcn Projects
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-balance text-lg md:text-xl">
            240+ React sections and components that install with Base UI
            primitives instead of Radix. Same shadcn CLI, same components,
            different primitive layer.
          </p>
        </div>

        <div className="bg-muted/40 mx-auto mt-10 flex max-w-3xl items-center gap-2 rounded-md border p-2 pl-4 text-sm shadow-sm">
          <code className="text-foreground flex-1 overflow-x-auto whitespace-nowrap font-mono">
            {INSTALL_COMMAND}
          </code>
          <CopyButton
            value={INSTALL_COMMAND}
            src="base-ui-shadcn-install"
            className="text-foreground hover:bg-background"
          />
        </div>
        <p className="text-muted-foreground mt-3 text-center text-xs">
          Example installs the Gradient Hero Showcase. Same{" "}
          <code className="font-mono">/r/baseui/</code> prefix works for every
          component.
        </p>
      </section>

      <section className="border-y bg-muted/20 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Why Base UI primitives
          </h2>
          <div className="text-muted-foreground mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-foreground font-medium">
                Accessibility-first
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                Base UI is maintained by the MUI team with a strong
                accessibility track record — keyboard nav, ARIA, focus
                management built in. Reasonable default for design systems that
                need to clear an accessibility audit.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-medium">
                Cleaner API surface
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                A modern, opinionated primitive layer designed in 2024–25 with
                hindsight on what Radix got right and where the API surface can
                be tightened. Smaller bundle, simpler prop contracts.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-medium">
                Same Ruixen catalog
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                Every Ruixen component installs via the same shadcn CLI, just
                pointed at the <code className="font-mono">/r/baseui/</code>{" "}
                registry. 25 wrapper files map shadcn&apos;s primitive surface
                onto Base UI under the hood.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2 className="text-foreground text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          A sample of what ships in Base UI
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Every component in the catalog is available with Base UI primitives.
          Browse the full docs for the rest of the 240+ sections and primitives.
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
              templates with Base UI variants. One payment, lifetime updates.
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
