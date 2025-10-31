"use client";

import { SidebarNavItem } from "@/types";
import {
  ExternalLinkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}{" "}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-normal leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  return items?.length ? (
    <div className="relative grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) => {
        const hasChildren = item.items && item.items.length > 0;
        const isExpanded = expandedItems[item.title] ?? false;

        // If item has children but no href, it's a category dropdown
        if (hasChildren && !item.href) {
          return (
            <div key={index}>
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  "group relative flex h-8 w-full items-center justify-between rounded-lg px-2 font-normal text-foreground",
                  "transition-transform duration-200 hover:translate-x-px hover:text-accent-foreground",
                  "cursor-pointer",
                )}
              >
                <span className="relative shrink-0">{item.title}</span>
                <div className="flex items-center">
                  {item.label && (
                    <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.85rem] leading-none text-[var(--color-sidebar-label-foreground)] no-underline">
                      {item.label}
                    </span>
                  )}
                  {item.paid && (
                    <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)] no-underline">
                      Pro
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDownIcon className="ml-2 size-4" />
                  ) : (
                    <ChevronRightIcon className="ml-2 size-4" />
                  )}
                </div>
              </button>
              {isExpanded && item.items && (
                <div className="ml-4 mt-1 space-y-0.5">
                  <DocsSidebarNavItems items={item.items} pathname={pathname} />
                </div>
              )}
            </div>
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
                "transition-transform duration-200 hover:translate-x-px hover:text-accent-foreground",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href &&
                  "bg-accent font-medium text-accent-foreground",
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              <span className="relative shrink-0">{item.title}</span>
              <div>
                {item.label && (
                  <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.85rem] leading-none text-[var(--color-sidebar-label-foreground)] no-underline">
                    {item.label}
                  </span>
                )}
                {item.paid && (
                  <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)] no-underline">
                    Pro
                  </span>
                )}
                {item.external && <ExternalLinkIcon className="ml-2 size-4" />}
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
            {item.label && (
              <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.85rem] leading-none text-[var(--color-sidebar-label-foreground)] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
            {item.paid && (
              <span className="ml-2 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.65rem] leading-none text-[var(--color-sidebar-label-foreground)] no-underline group-hover:no-underline">
                Pro
              </span>
            )}
          </span>
        );
      })}
    </div>
  ) : null;
}
