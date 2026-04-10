"use client";

import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

import { trackEvent } from "@/lib/events";
import { PRO_COMPONENT_MAP } from "@/data/pro-component-map";

interface ProInlineCalloutProps {
  /**
   * The free component slug. If a Pro counterpart exists in
   * `PRO_COMPONENT_MAP`, the callout deep-links there; otherwise it falls
   * through to /pricing.
   */
  slug?: string;
}

/**
 * Inline Pro upsell rendered under every `<ComponentSource>` on the OSS
 * docs site. Injected via a single wrap in `components/mdx-components.tsx`
 * so no individual MDX file needs to change.
 */
export function ProInlineCallout({ slug }: ProInlineCalloutProps) {
  const proSlug = slug ? PRO_COMPONENT_MAP[slug] : undefined;
  const href = proSlug
    ? `https://pro.ruixen.com/docs/components/${proSlug}?ref=oss_docs_inline`
    : `https://pro.ruixen.com/pricing?ref=oss_docs_inline`;

  return (
    <div className="my-6 rounded-xl border border-blue-300/60 bg-blue-50/40 dark:border-blue-500/30 dark:bg-blue-950/20 p-4">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {proSlug
              ? "Want the Pro version of this component?"
              : "Need more than this?"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ruixen Pro adds 50+ components with advanced motion and theming,
            plus full page templates. One payment, lifetime updates.
          </p>
        </div>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent({
              name: "oss_pro_cta_clicked",
              properties: {
                surface: "inline_docs_upsell",
                slug: slug ?? null,
              },
            })
          }
          className="shrink-0 inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          {proSlug ? "See Pro" : "Get Pro"}
          <ChevronRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
