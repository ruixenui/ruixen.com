"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  subtitle?: string;
  supportText?: string;
  supportLink?: string;
  supportLinkText?: string;
  faqItems: FAQItem[];
  className?: string;
  hideSupport?: boolean;
  /** If true, renders FAQPage JSON-LD for SEO rich results */
  enableStructuredData?: boolean;
}

/**
 * StaggeredFAQSection – Ruixen UI specific, SEO-friendly
 *
 * Key improvements:
 * 1) Top-level <h1> for the section (better semantics + SEO).
 * 2) Copy rewritten for real product value: features, installation, theming, licensing, performance.
 * 3) Optional JSON-LD (FAQPage) to qualify for rich results in search.
 * 4) Accessible accordion triggers, sensible heading hierarchy (h1 → h2), and balanced keyword usage.
 */
export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "A practical guide to getting productive with Ruixen UI: components, theming, performance, accessibility, pricing, and integrations.",
  supportText = "Can’t find what you need? Reach out to our",
  supportLink = "mailto:support@ruixen.com",
  supportLinkText = "Ruixen UI support team",
  faqItems,
  className,
  hideSupport = false,
  enableStructuredData = true,
}: FAQProps) {
  // Build FAQPage JSON-LD for rich results
  const faqJsonLd = useMemo(() => {
    if (!enableStructuredData) return null;
    const mainEntity = faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    }));
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
    } as const;
  }, [faqItems, enableStructuredData]);

  return (
    <section className={cn("bg-background py-16 md:py-24", className)}>
      {/* Primary heading on top for SEO and screen readers */}
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-foreground text-balance text-4xl font-semibold md:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-4 text-balance text-lg md:text-xl">
            {subtitle}
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          {/* Left column: product-context content */}
          <div className="md:col-span-2">
            <h2 className="text-foreground text-2xl font-semibold">
              About Ruixen UI
            </h2>
            <div className="text-muted-foreground mt-4 space-y-4 leading-relaxed">
              <p>
                Ruixen UI is a production‑ready React component system designed
                for rapid app development. It pairs a modern design language
                with type‑safe APIs, keyboard‑first accessibility, and flexible
                theming. Whether you’re building dashboards, marketing sites, or
                SaaS admin tools, Ruixen UI helps teams ship consistent,
                high‑quality interfaces faster.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>DX you’ll enjoy:</strong> headless primitives,
                  composable props, and predictable overrides.
                </li>
                <li>
                  <strong>Design tokens & theming:</strong> switch light/dark,
                  brand palettes, and radii in minutes.
                </li>
                <li>
                  <strong>Accessibility:</strong> focus rings, ARIA, and
                  reduced‑motion built in by default.
                </li>
                <li>
                  <strong>Performance:</strong> tree‑shakeable, zero‑runtime CSS
                  where possible, and minimal re‑renders.
                </li>
                <li>
                  <strong>Integration‑ready:</strong> works with Next.js,
                  TanStack, React Hook Form, and more.
                </li>
              </ul>
              {!hideSupport && (
                <p>
                  {supportText}{" "}
                  <Link
                    href={supportLink}
                    className="text-primary font-medium hover:underline"
                  >
                    {supportLinkText}
                  </Link>{" "}
                  for assistance.
                </p>
              )}
            </div>
          </div>

          {/* Right column: FAQ */}
          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="cursor-pointer text-left text-base font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Mobile support footer */}
            {!hideSupport && (
              <p className="text-muted-foreground mt-6 md:hidden">
                {supportText}{" "}
                <Link
                  href={supportLink}
                  className="text-primary font-medium hover:underline"
                >
                  {supportLinkText}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* JSON-LD for SEO rich results */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </section>
  );
}
