import type { SidebarNavItem } from "@/types";

import { docsConfig } from "@/config/docs";
import { COMING_SOON_CATALOG, getProTemplates } from "@/data/pro-catalog";

const TEMPLATES_SECTION_TITLE = "Templates";

function shortenTemplateTitle(name: string): string {
  const match = name.match(/\s+[–—-]\s+|:\s+/);
  if (match && match.index !== undefined && match.index > 0) {
    return name.slice(0, match.index).trim();
  }
  return name.trim();
}

export function getDocsSidebarNav(): SidebarNavItem[] {
  const activeItems: SidebarNavItem[] = getProTemplates()
    .slice()
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
    .map<SidebarNavItem>((template) => ({
      title: shortenTemplateTitle(template.name),
      href: `/docs/templates/${template.slug}`,
      items: [],
      paid: true,
      event: "pro_nav_clicked",
    }));

  const comingSoonItems: SidebarNavItem[] = COMING_SOON_CATALOG.map(
    (template) => ({
      title: template.name,
      href: "#",
      items: [],
      disabled: true,
      label: "Soon",
    }),
  );

  const placeholder: SidebarNavItem = {
    title: "10+ more coming soon",
    href: "#",
    items: [],
    disabled: true,
  };

  const extraItems = [...activeItems, ...comingSoonItems, placeholder];
  if (extraItems.length === 0) return docsConfig.sidebarNav;

  return docsConfig.sidebarNav.map((section) => {
    if (section.title !== TEMPLATES_SECTION_TITLE) return section;
    return {
      ...section,
      items: [...(section.items ?? []), ...extraItems],
    };
  });
}
