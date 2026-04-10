"use client";

import Link from "next/link";
import { Sparkles, ChevronRight, Check } from "lucide-react";

import { trackEvent } from "@/lib/events";

const FEATURES = [
  "50+ premium components with motion and theming",
  "2 production-ready templates (Intellune, Nguyen)",
  "Lifetime updates — no subscription",
  "Commercial license included",
  "Shadcn-compatible CLI install",
  "Priority support on Discord",
];

/**
 * Homepage Pro section. Introduced as part of the OSS → Pro bridge so
 * ruixen.com visitors encounter a dedicated upgrade surface inline (not
 * buried in nav, footer, or FAQ). Links to the new /pricing mirror and
 * also to pro.ruixen.com directly.
 */
export function ProSection() {
  const handleCta = (surface: string) =>
    trackEvent({
      name: "oss_pro_cta_clicked",
      properties: { surface },
    });

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/60 bg-blue-50/40 dark:bg-blue-950/20 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            <Sparkles className="size-3" />
            <span>Ruixen Pro</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            When the free library isn&apos;t enough
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pro adds 50+ premium components, full page templates, and lifetime
            updates. One payment. No subscription. Everything you ship looks
            like it was made by a team.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-2 rounded-lg border border-border/60 bg-card p-3"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href="https://pro.ruixen.com/pricing?ref=oss_homepage_section"
            target="_blank"
            onClick={() => handleCta("homepage_section")}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
          >
            Get Lifetime — $59
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/pricing"
            onClick={() => handleCta("homepage_section_compare")}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Compare Free vs Pro →
          </Link>
        </div>
      </div>
    </section>
  );
}
