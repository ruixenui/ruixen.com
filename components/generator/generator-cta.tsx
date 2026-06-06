"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { trackEvent } from "@/lib/events";

/**
 * GeneratorCta — funnels free-tool visitors into the product.
 *
 * Generator pages are the site's biggest organic entry point but were a
 * dead end (no path to the component library or Pro). This callout bridges
 * tool-seekers to the OSS component library (primary, low friction) with a
 * Pro upsell (secondary). Both clicks are tracked with a generator-specific
 * `surface` so the tool→product funnel can be measured on its own.
 */
export function GeneratorCta({ tool }: { tool: string }) {
  const surface = `generator_${tool}`;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <div className="overflow-hidden rounded-2xl border border-blue-300/60 bg-blue-50/50 p-6 dark:border-blue-500/30 dark:bg-blue-950/20 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              <Sparkles className="size-3.5" />
              Ruixen UI
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Skip the boilerplate — ship UI faster
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              You came for the tool. Stay for 240+ copy-paste components for
              shadcn — hero sections, pricing tables, navbars and more. Free and
              open source, with Pro templates when you need them.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link
              href="/docs/components"
              onClick={() =>
                trackEvent({
                  name: "cta_click",
                  properties: { surface, target: "component_library" },
                })
              }
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Browse components
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={`https://pro.ruixen.com/pricing?ref=oss_${surface}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  name: "oss_pro_cta_clicked",
                  properties: { surface, slug: null },
                })
              }
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              See Ruixen Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
