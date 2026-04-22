import type { SidebarNavItem } from "@/types";

import { docsConfig } from "@/config/docs";
import { proTemplatesApi } from "@/lib/pro-api";

const TEMPLATES_SECTION_TITLE = "Templates";

/**
 * Trim the marketing subtitle from a Pro template name so it fits the
 * narrow docs sidebar. The Pro catalog stores names like
 * "Nguyen – AI Workspace SaaS Landing Page"; the sidebar only needs
 * "Nguyen". We split on em-dash, en-dash, spaced hyphen, or colon.
 */
function shortenTemplateTitle(name: string): string {
  const match = name.match(/\s+[–—-]\s+|:\s+/);
  if (match && match.index !== undefined && match.index > 0) {
    return name.slice(0, match.index).trim();
  }
  return name.trim();
}

/**
 * Returns the docs sidebar config with Pro catalog entries merged into the
 * "Templates" section. Each Pro template renders as an internal docs link
 * to `/docs/templates/<slug>` (served by the unified dynamic route) with
 * a "Pro" pill badge.
 *
 * Called from server components only. Multiple call sites in the same
 * request share Next.js's fetch cache, so the catalog is fetched at most
 * once per render.
 *
 * Failure mode: if the Pro backend is unreachable, the static config is
 * returned unchanged so the sidebar never breaks.
 */
export async function getDocsSidebarNav(): Promise<SidebarNavItem[]> {
  let proItems: SidebarNavItem[] = [];

  try {
    const response = await proTemplatesApi.getAll({
      page_size: 50,
      sort_by: "is_featured",
      sort_order: "desc",
    });
    proItems = (response.items ?? [])
      .filter((template) => template.is_active)
      .map<SidebarNavItem>((template) => ({
        title: shortenTemplateTitle(template.name),
        href: `/docs/templates/${template.slug}`,
        items: [],
        paid: true,
        event: "pro_nav_clicked",
      }));
  } catch (error) {
    console.error("[docs-nav] failed to fetch Pro catalog:", error);
  }

  if (proItems.length === 0) return docsConfig.sidebarNav;

  return docsConfig.sidebarNav.map((section) => {
    if (section.title !== TEMPLATES_SECTION_TITLE) return section;
    return {
      ...section,
      items: [...(section.items ?? []), ...proItems],
    };
  });
}
