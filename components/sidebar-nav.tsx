"use client";

import { SidebarNavItem } from "@/types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

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

        // If item has children but no href, render as collapsible dropdown
        if (hasChildren && !item.href) {
          return (
            <CollapsibleCategory key={index} item={item} pathname={pathname} />
          );
        }

        // Regular item with href
        if (item.href && !item.disabled) {
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group relative flex h-8 w-full items-center justify-between rounded-lg px-2 font-normal text-foreground/70",
                "transition-all duration-150 hover:bg-accent hover:text-accent-foreground",
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

// Collapsible category with dropdown behavior
function CollapsibleCategory({
  item,
  pathname,
}: {
  item: SidebarNavItem;
  pathname: string | null;
}) {
  const categorySlug = generateSlug(item.title);
  const categoryHref = `/docs/components/${categorySlug}`;
  const isExactActive = pathname === categoryHref;
  const containsActive =
    isExactActive ||
    (pathname !== null &&
      categoryContainsComponent(item.items || [], pathname));
  const [isOpen, setIsOpen] = React.useState(containsActive);
  const count = countComponents(item.items || []);

  // Auto-expand when navigating to a child component or category page
  React.useEffect(() => {
    if (containsActive && !isOpen) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containsActive]);

  return (
    <div>
      {/* Category toggle row — chevron toggles, title links to category page */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex shrink-0 items-center justify-center size-7 rounded-md hover:bg-accent/50"
        >
          <ChevronRight
            className={cn(
              "size-3 text-muted-foreground/70 transition-transform duration-200",
              isOpen && "rotate-90",
            )}
          />
        </button>
        <Link
          href={categoryHref}
          className={cn(
            "flex h-9 flex-1 items-center justify-between rounded-lg px-1 font-normal text-foreground",
            "transition-all duration-150 hover:text-accent-foreground",
            containsActive && "font-medium text-accent-foreground",
          )}
        >
          <span className="flex items-center gap-1.5">
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
      </div>

      {/* Dropdown content with CSS grid animation */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative ml-[17px] border-l border-foreground/[0.08] pl-2.5 pt-0.5 pb-1">
            {(item.items || []).map((child, idx) => {
              const childHasChildren =
                child.items && child.items.length > 0 && !child.href;

              // Nested subcategory - recurse
              if (childHasChildren) {
                return (
                  <CollapsibleCategory
                    key={idx}
                    item={child}
                    pathname={pathname}
                  />
                );
              }

              // Direct link item
              if (child.href && !child.disabled) {
                const isActive = pathname === child.href;
                return (
                  <Link
                    key={idx}
                    href={child.href}
                    className={cn(
                      "group relative flex h-8 w-full items-center justify-between rounded-lg px-2 font-normal text-foreground/55",
                      "transition-all duration-150 hover:bg-accent hover:text-accent-foreground",
                      isActive &&
                        "bg-accent font-medium text-foreground before:absolute before:-left-[11px] before:top-1.5 before:h-5 before:w-[2px] before:rounded-full before:bg-foreground",
                    )}
                    target={child.external ? "_blank" : ""}
                    rel={child.external ? "noreferrer" : ""}
                  >
                    <span className="relative shrink-0 truncate text-[13px]">
                      {child.title}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {child.label && (
                        <span className="rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)]">
                          {child.label}
                        </span>
                      )}
                      {child.paid && (
                        <span className="rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)]">
                          Pro
                        </span>
                      )}
                      {child.external && (
                        <ExternalLinkIcon className="size-3" />
                      )}
                    </div>
                  </Link>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
