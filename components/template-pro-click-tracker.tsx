"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/events";

/**
 * Delegated click tracker for the /templates page. Hoisted into its own
 * client component so app/templates/page.tsx can stay a server component.
 *
 * Fires:
 *  - `oss_template_preview_clicked` on any `[data-pro-template-preview]` click
 *  - `oss_pro_cta_clicked` with `surface: template_preview` on the same click
 *  - `oss_pro_cta_clicked` with `surface: template_get_pro` on "Get Pro" clicks
 */
export function TemplateProClickTracker() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      const previewLink = target?.closest<HTMLElement>(
        "[data-pro-template-preview]",
      );
      if (previewLink) {
        const slug = previewLink.dataset.proTemplatePreview ?? null;
        trackEvent({
          name: "oss_template_preview_clicked",
          properties: { slug },
        });
        trackEvent({
          name: "oss_pro_cta_clicked",
          properties: { surface: "template_preview", slug },
        });
        return;
      }

      const getProLink = target?.closest<HTMLElement>(
        "[data-pro-template-get-pro]",
      );
      if (getProLink) {
        const slug = getProLink.dataset.proTemplateGetPro ?? null;
        trackEvent({
          name: "oss_pro_cta_clicked",
          properties: {
            surface:
              slug === "__footer__" ? "template_footer" : "template_get_pro",
            slug: slug === "__footer__" ? null : slug,
          },
        });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
