"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Grouped FAQ Section — A FAQ block organized into named
   categories. Each item collapses with a thin bottom border
   when closed; on open it lifts to a card-style state with
   ring, shadow, rounded corners, and tinted background.

   Typical use: marketing pages where FAQs span multiple
   topics (e.g., Installation, Pricing, Support). Each group
   gets its own subheading and accordion stack.
   ═══════════════════════════════════════════════════════════ */

export interface GroupedFAQItem {
  question: string;
  answer: string;
}

export interface GroupedFAQGroup {
  title: string;
  items: GroupedFAQItem[];
}

export interface GroupedFAQSectionProps {
  title?: string;
  description?: string;
  groups?: GroupedFAQGroup[];
  /** Text leading into the contact link (e.g., "Can't find what you're looking for? Contact our"). */
  contactPrompt?: string;
  /** Anchor text for the contact link. */
  contactCTA?: string;
  contactHref?: string;
  className?: string;
}

const DEFAULT_GROUPS: GroupedFAQGroup[] = [
  {
    title: "Installation",
    items: [
      {
        question: "How do I add a component to my project?",
        answer:
          'Run the shadcn CLI with the component URL — for example: `npx shadcn@latest add "https://ruixen.com/r/staggered-faq-section"`. The CLI copies the source file into your project with dependencies resolved.',
      },
      {
        question: "Do I need to install a package or wrap a provider?",
        answer:
          "No. Each component is copied directly into your project as source code. There's no npm package, no provider to wrap, and no global CSS to import. The source is yours once you add it.",
      },
      {
        question: "Can I use this in an existing shadcn project?",
        answer:
          "Yes. Ruixen UI components install via the shadcn CLI and use the same `@/components/ui/*` import paths shadcn uses. They drop into existing shadcn projects without conflict.",
      },
    ],
  },
  {
    title: "Stack Support",
    items: [
      {
        question: "Which Tailwind version is supported?",
        answer:
          'Both Tailwind v3 and v4 are first-class targets. Components default to v4. For v3, swap the registry prefix: `npx shadcn@latest add "https://ruixen.com/r/tw3/<component>"`. Your selection persists across the docs sidebar.',
      },
      {
        question: "Can I use Base UI primitives instead of Radix?",
        answer:
          "Yes. Every component ships in four registry variants — Tailwind v4 + Radix, Tailwind v3 + Radix, Tailwind v4 + Base UI, Tailwind v3 + Base UI — generated from one source codebase at build time. Pick the variant that matches your stack.",
      },
      {
        question: "Does it work with Next.js, Vite, Remix, or Astro?",
        answer:
          "Yes. All major React frameworks are supported. Installation guides are available for Next.js, Vite, Remix, Astro, Laravel, and Gatsby in the docs.",
      },
    ],
  },
  {
    title: "Pricing & License",
    items: [
      {
        question: "Is Ruixen UI free?",
        answer:
          "Yes. The 240+ open-source components are MIT licensed. Use them in personal, commercial, or client projects without restriction.",
      },
      {
        question: "What does Ruixen Pro include?",
        answer:
          "Pro adds 50+ premium components and full landing-page templates with lifetime updates. One-time purchase — $59, no subscription. Available at pro.ruixen.com.",
      },
      {
        question: "Can I use components in commercial projects?",
        answer:
          "Yes. The free open-source catalog is MIT licensed. Pro components include a commercial license with unlimited projects.",
      },
    ],
  },
];

export default function GroupedFAQSection({
  title = "Frequently Asked Questions",
  description = "Discover quick and comprehensive answers to common questions about installation, stack support, and licensing.",
  groups = DEFAULT_GROUPS,
  contactPrompt = "Can't find what you're looking for? Contact our",
  contactCTA = "support team",
  contactHref = "#",
  className,
}: GroupedFAQSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-3xl px-1 md:px-6">
        <div className="max-w-lg max-md:px-6">
          <h2 className="text-foreground text-4xl font-semibold">{title}</h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            {description}
          </p>
        </div>

        <div className="my-12 space-y-12 md:-ml-6">
          {groups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-foreground pl-6 text-lg font-semibold">
                {group.title}
              </h3>
              <Accordion type="single" collapsible className="-space-y-1">
                {group.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${group.title}-${idx}`}
                    className="peer rounded-xl border-none px-6 py-1 data-[state=open]:border-none data-[state=open]:bg-card data-[state=open]:shadow-sm data-[state=open]:shadow-black/[0.065] data-[state=open]:ring-1 data-[state=open]:ring-border"
                  >
                    <AccordionTrigger className="cursor-pointer rounded-none border-b text-base transition-none hover:no-underline data-[state=open]:border-transparent">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2 text-sm leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground max-md:px-6">
          {contactPrompt}{" "}
          <a
            className="text-primary font-medium hover:underline"
            href={contactHref}
          >
            {contactCTA}
          </a>
        </p>
      </div>
    </section>
  );
}
