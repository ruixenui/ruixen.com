"use client";

import { Index } from "@/__registry__";
import { docsConfig } from "@/config/docs";
import { SidebarNavItem } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface FlatItem {
  name: string;
  title: string;
  href: string;
  label?: string;
}

function flattenItems(items: SidebarNavItem[]): FlatItem[] {
  const result: FlatItem[] = [];
  for (const item of items) {
    if (item.href) {
      const name = item.href.split("/").pop() || "";
      result.push({
        name,
        title: item.title,
        href: item.href,
        label: item.label,
      });
    }
    if (item.items) {
      result.push(...flattenItems(item.items));
    }
  }
  return result;
}

interface Category {
  title: string;
  slug: string;
  items: FlatItem[];
}

function getCategories(): Category[] {
  const categories: Category[] = [];

  for (const section of docsConfig.sidebarNav) {
    if (!section.items) continue;
    for (const category of section.items) {
      if (category.items && category.items.length > 0 && !category.href) {
        const items = flattenItems(category.items);
        if (items.length > 0) {
          categories.push({
            title: category.title,
            slug: generateSlug(category.title),
            items,
          });
        }
      }
    }
  }

  return categories;
}

// Build flat list of all components; first item per category gets its slug for scroll targeting
interface FlatEntry {
  item: FlatItem;
  categorySlug?: string;
}

function buildFlatList(categories: Category[]): FlatEntry[] {
  const list: FlatEntry[] = [];
  for (const cat of categories) {
    cat.items.forEach((item, i) => {
      list.push({ item, categorySlug: i === 0 ? cat.slug : undefined });
    });
  }
  return list;
}

// ---------------------------------------------------------------------------
// Responsive column count (matches lg:2, 2xl:3 breakpoints)
// ---------------------------------------------------------------------------

function useColumnCount(): number {
  const [cols, setCols] = React.useState(1);

  React.useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1536) setCols(3);
      else if (window.innerWidth >= 1024) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cols;
}

// Round-robin distribute items into columns for left-to-right reading order
function distributeColumns(
  items: FlatEntry[],
  colCount: number,
): FlatEntry[][] {
  const cols: FlatEntry[][] = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => {
    cols[i % colCount].push(item);
  });
  return cols;
}

// ---------------------------------------------------------------------------
// Active category tracker (IntersectionObserver on markers)
// ---------------------------------------------------------------------------

function useActiveCategory(slugs: string[]): string | null {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    for (const slug of slugs) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [slugs]);

  return active;
}

// ---------------------------------------------------------------------------
// Skeleton placeholder for preview cards
// ---------------------------------------------------------------------------

function PreviewSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="space-y-2.5">
        <div className="h-3 w-3/5 rounded bg-muted" />
        <div className="h-3 w-2/5 rounded bg-muted" />
      </div>
      <div className="h-[72px] w-full rounded-lg bg-muted" />
      <div className="flex gap-3">
        <div className="h-7 w-24 rounded-md bg-muted" />
        <div className="h-7 w-16 rounded-md bg-muted" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lazy preview card
// ---------------------------------------------------------------------------

const SCALE = 0.6;

function LazyPreview({
  item,
  categorySlug,
}: {
  item: FlatItem;
  categorySlug?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const roRef = React.useRef<ResizeObserver | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [scaledH, setScaledH] = React.useState<number | null>(null);

  // Lazy-load trigger
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cleanup ResizeObserver on unmount
  React.useEffect(() => {
    return () => {
      roRef.current?.disconnect();
    };
  }, []);

  // Callback ref — fires when the Suspense-resolved div actually mounts
  const contentCallbackRef = React.useCallback((el: HTMLDivElement | null) => {
    // Cleanup previous observer
    roRef.current?.disconnect();
    roRef.current = null;

    if (!el) return;

    const measure = () => {
      const h = el.scrollHeight;
      if (h > 0) setScaledH(Math.ceil(h * SCALE));
    };

    // Measure after paint
    requestAnimationFrame(measure);

    // Keep measuring on resize (fonts, images, animations)
    roRef.current = new ResizeObserver(measure);
    roRef.current.observe(el);
  }, []);

  const demoName = `${item.name}-demo`;
  const Component = isVisible ? Index[demoName]?.component : null;
  const ready = scaledH !== null;

  return (
    <div
      ref={ref}
      id={categorySlug}
      className={cn(
        "group relative flex flex-col mb-5",
        categorySlug && "scroll-mt-24",
      )}
    >
      <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background">
        {/* Skeleton — visible until component is measured */}
        {!ready && <PreviewSkeleton />}

        {/* Actual component — rendered invisible for measurement, fades in once ready */}
        {Component && (
          <div
            className={cn(
              "overflow-hidden",
              ready
                ? "opacity-100 transition-opacity duration-300"
                : "absolute inset-x-0 top-0 opacity-0 pointer-events-none",
            )}
            style={ready ? { height: scaledH! } : undefined}
          >
            <React.Suspense fallback={null}>
              <div
                ref={contentCallbackRef}
                className="origin-top-left px-6 py-8"
                style={{
                  width: `${100 / SCALE}%`,
                  transform: `scale(${SCALE})`,
                }}
              >
                <Component />
              </div>
            </React.Suspense>
          </div>
        )}
      </div>

      {/* Title + link below preview */}
      <div className="mt-2.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[13px] font-medium text-foreground truncate">
            {item.title}
          </h3>
          {item.label && (
            <span className="shrink-0 rounded-md bg-[var(--color-sidebar-label)] px-1.5 py-0.5 text-[0.6rem] leading-none text-[var(--color-sidebar-label-foreground)]">
              {item.label}
            </span>
          )}
        </div>
        <Link
          href={item.href}
          className="shrink-0 flex items-center gap-0.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          View
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Right sidebar TOC (portaled into #dynamic-toc)
// ---------------------------------------------------------------------------

function SidebarToc({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug: string | null;
}) {
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
    null,
  );
  const itemRefs = React.useRef<Map<string, HTMLAnchorElement>>(new Map());

  React.useEffect(() => {
    const el = document.getElementById("dynamic-toc");
    if (el) setPortalTarget(el);
  }, []);

  // Auto-scroll active item into center of the TOC list
  React.useEffect(() => {
    if (!activeSlug) return;
    const el = itemRefs.current.get(activeSlug);
    if (el) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [activeSlug]);

  if (!portalTarget) return null;

  return createPortal(
    <div className="flex flex-col max-h-[calc(100vh-14rem)]">
      <p className="font-medium mb-2 shrink-0">On This Page</p>
      <ul className="m-0 list-none flex-1 overflow-y-auto no-scrollbar">
        {categories.map((cat) => (
          <li key={cat.slug} className="mt-0 pt-1">
            <a
              ref={(el) => {
                if (el) itemRefs.current.set(cat.slug, el);
                else itemRefs.current.delete(cat.slug);
              }}
              href={`#${cat.slug}`}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground text-[13px]",
                activeSlug === cat.slug
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {cat.title}
            </a>
          </li>
        ))}
      </ul>
    </div>,
    portalTarget,
  );
}

// ---------------------------------------------------------------------------
// Main showcase (all categories)
// ---------------------------------------------------------------------------

export function AllComponentsShowcase() {
  const categories = React.useMemo(() => getCategories(), []);
  const flatList = React.useMemo(() => buildFlatList(categories), [categories]);
  const slugs = React.useMemo(
    () => categories.map((c) => c.slug),
    [categories],
  );
  const activeSlug = useActiveCategory(slugs);
  const colCount = useColumnCount();
  const columns = React.useMemo(
    () => distributeColumns(flatList, colCount),
    [flatList, colCount],
  );

  return (
    <div>
      {/* Right sidebar TOC (portaled) */}
      <SidebarToc categories={categories} activeSlug={activeSlug} />

      {/* Sticky quick-nav pills — visible on mobile/tablet, hidden on xl where sidebar TOC takes over */}
      <div className="sticky top-14 z-30 -mx-1 mb-10 overflow-x-auto bg-background/80 backdrop-blur-sm py-3 xl:hidden">
        <div className="flex gap-1.5 px-1 no-scrollbar">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeSlug === cat.slug
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border/60 bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {cat.title}
              <span className="ml-1.5 opacity-60">{cat.items.length}</span>
            </a>
          ))}
        </div>
      </div>

      {/* JS masonry — round-robin columns for L→R order, no row-height gaps */}
      <div className="flex gap-5">
        {columns.map((colItems, colIdx) => (
          <div key={colIdx} className="flex-1 min-w-0">
            {colItems.map((entry) => (
              <LazyPreview
                key={entry.item.name}
                item={entry.item}
                categorySlug={entry.categorySlug}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single-category showcase (used on category pages)
// ---------------------------------------------------------------------------

export function CategoryShowcase({ category }: { category: string }) {
  const categories = React.useMemo(() => getCategories(), []);
  const cat = categories.find((c) => c.title === category);

  const flatList: FlatEntry[] = React.useMemo(() => {
    if (!cat) return [];
    return cat.items.map((item) => ({ item }));
  }, [cat]);

  const colCount = useColumnCount();
  const columns = React.useMemo(
    () => distributeColumns(flatList, colCount),
    [flatList, colCount],
  );

  if (!cat) return null;

  return (
    <div className="flex gap-5">
      {columns.map((colItems, colIdx) => (
        <div key={colIdx} className="flex-1 min-w-0">
          {colItems.map((entry) => (
            <LazyPreview key={entry.item.name} item={entry.item} />
          ))}
        </div>
      ))}
    </div>
  );
}
