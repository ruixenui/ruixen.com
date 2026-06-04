"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/events";

/**
 * Inline Pro upgrade callout shown at the bottom of component and section
 * docs pages. Complements the sidebar CTA (which is desktop-only) so mobile
 * and tablet visitors also encounter the Free → Pro funnel.
 */
export function ProInlineCTA() {
  return (
    <aside className="my-12 overflow-hidden rounded-xl border border-blue-300/40 bg-gradient-to-br from-blue-50/60 to-transparent dark:border-blue-900/40 dark:from-blue-950/30">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-blue-500/10 p-2">
            <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              Need polished landing-page templates?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ruixen Pro adds 50+ premium components and full templates with
              lifetime updates —{" "}
              <span className="font-medium text-foreground">
                $69 once, no subscription.
              </span>
            </p>
          </div>
        </div>
        <Link
          href="https://pro.ruixen.com/pricing?ref=oss_docs_inline"
          target="_blank"
          onClick={() =>
            trackEvent({
              name: "oss_pro_cta_clicked",
              properties: { surface: "docs_inline" },
            })
          }
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          View Pro Templates
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </aside>
  );
}
