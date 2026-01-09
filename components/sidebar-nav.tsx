"use client";

import { SidebarNavItem } from "@/types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

// Generate URL-safe slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Helper to count all components in a category (including nested)
function countComponents(items: SidebarNavItem[]): number {
  return items.reduce((count, item) => {
    if (item.href) return count + 1;
    if (item.items) return count + countComponents(item.items);
    return count;
  }, 0);
}

// Helper to check if category contains a specific component
function categoryContainsComponent(
  items: SidebarNavItem[],
  pathname: string,
): boolean {
  for (const item of items) {
    if (item.href === pathname) return true;
    if (item.items && categoryContainsComponent(item.items, pathname))
      return true;
  }
  return false;
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-semibold text-muted-foreground">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="relative grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) => {
        const hasChildren = item.items && item.items.length > 0;

        // If item has children but no href, it's a category - show with count and link to category page
        if (hasChildren && !item.href) {
          const count = countComponents(item.items || []);
          const categorySlug = generateSlug(item.title);
          const categoryPath = `/docs/components/category/${categorySlug}`;
          const isActive =
            pathname === categoryPath ||
            (pathname && categoryContainsComponent(item.items || [], pathname));
          return (
            <Link
              key={index}
              href={categoryPath}
              className={cn(
                "group relative flex h-9 w-full items-center justify-between rounded-lg px-2 font-normal text-foreground",
                "transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent font-medium text-accent-foreground",
              )}
            >
              <span className="relative shrink-0 flex items-center gap-1.5">
                {item.title}
                {item.label && (
                  <span className="rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)]">
                    {item.label}
                  </span>
                )}
              </span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {count}
              </span>
            </Link>
          );
        }

        // Regular item with href
        if (item.href && !item.disabled) {
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group relative flex h-8 w-full items-center justify-between rounded-lg px-2 font-normal text-foreground",
                "transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href &&
                  "bg-accent font-medium text-accent-foreground",
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              <span className="relative shrink-0">{item.title}</span>
              <div className="flex items-center gap-1">
                {item.label && (
                  <span className="rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.7rem] leading-none text-[var(--color-sidebar-label-foreground)]">
                    {item.label}
                  </span>
                )}
                {item.paid && (
                  <span className="rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)]">
                    Pro
                  </span>
                )}
                {item.external && <ExternalLinkIcon className="size-3" />}
              </div>
            </Link>
          );
        }

        // Disabled item
        return (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
          </span>
        );
      })}
    </div>
  ) : null;
}
