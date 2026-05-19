import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { UseCaseShowcase } from "@/components/all-components-showcase";
import { siteConfig } from "@/config/site";
import {
  USE_CASE_ENTRIES,
  getEntry,
  type SectionType,
} from "@/lib/use-case-content";

type Params = { type: string; useCase: string };

export function generateStaticParams(): Params[] {
  return USE_CASE_ENTRIES.map((e) => ({
    type: e.type,
    useCase: `for-${e.useCase}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { type, useCase } = await params;
  const entry = getEntry(type, useCase);
  if (!entry) return {};
  const canonical = `${siteConfig.url}/sections/${entry.type}/for-${entry.useCase}`;
  return {
    title: `${entry.title} — Ruixen UI`,
    description: entry.description,
    alternates: { canonical },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: canonical,
      type: "article",
    },
  };
}

const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero Sections",
  pricing: "Pricing",
  navbar: "Navbars",
  footer: "Footers",
  featured: "Featured Sections",
  faq: "FAQs",
  client: "Client Logos",
};

const SECTION_CATEGORY_SLUGS: Record<SectionType, string> = {
  hero: "hero-sections",
  pricing: "pricing-section",
  navbar: "navbars",
  footer: "footer-section",
  featured: "featured-section",
  faq: "faqs",
  client: "client-section",
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { type, useCase } = await params;
  const entry = getEntry(type, useCase);
  if (!entry) notFound();

  const sectionLabel = SECTION_LABELS[entry.type];
  const categorySlug = SECTION_CATEGORY_SLUGS[entry.type];

  const installCmd = `npx shadcn@latest add ${siteConfig.url}/r/${entry.primaryComponent}`;

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-8 text-center md:pt-20 md:pb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{sectionLabel}</span>
          <span aria-hidden>·</span>
          <span className="text-foreground">For {entry.useCase}</span>
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {entry.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {entry.lead}
        </p>

        <div className="mx-auto mt-8 max-w-2xl text-left">
          <div className="flex items-center justify-between rounded-t-lg border border-b-0 bg-muted/40 px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Quick install
          </div>
          <pre className="overflow-x-auto rounded-b-lg border bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
            {installCmd}
          </pre>
          <p className="mt-2 text-xs text-muted-foreground">
            For Tailwind v3 or Base UI, swap the URL prefix — see{" "}
            <Link
              href="/tailwind-v3-shadcn"
              className="underline underline-offset-4"
            >
              /tailwind-v3-shadcn
            </Link>{" "}
            or{" "}
            <Link
              href="/base-ui-shadcn"
              className="underline underline-offset-4"
            >
              /base-ui-shadcn
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8 text-center md:py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Why this differs for {entry.useCase}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {entry.context}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Recommended components
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Curated picks from the Ruixen registry that fit this use case. Click
            any preview to open its docs page.
          </p>
        </div>
        <div className="mt-8 text-left">
          <UseCaseShowcase slugs={entry.components} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8 md:py-12">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground">
          Frequently asked questions
        </h2>
        <div className="mx-auto mt-6 flex max-w-3xl flex-col divide-y">
          {entry.faqs.map((f, i) => (
            <details
              key={i}
              className="group py-4"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-medium text-foreground">
                <span>{f.q}</span>
                <span
                  aria-hidden
                  className="mt-1 text-muted-foreground group-open:rotate-180 transition-transform"
                >
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <div className="rounded-2xl border border-border bg-card/40 p-8 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            Browse all {sectionLabel.toLowerCase()}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            The {sectionLabel} category page has every Ruixen{" "}
            {sectionLabel.toLowerCase()} variant — not just the curated picks
            for {entry.useCase}.
          </p>
          <Link
            href={`/docs/components/${categorySlug}`}
            className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            See all {sectionLabel.toLowerCase()} →
          </Link>
        </div>
      </section>
    </>
  );
}
