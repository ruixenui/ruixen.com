"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface CategoryItem {
  title: string;
  href: string;
  image?: string;
  count: number;
}

const categories: CategoryItem[] = [
  { title: "Hero Sections", href: "/docs/components/hero-sections", count: 7 },
  { title: "Buttons", href: "/docs/components/buttons", count: 31 },
  { title: "Forms", href: "/docs/components/forms", count: 18 },
  { title: "Cards", href: "/docs/components/cards", count: 19 },
  { title: "Tables", href: "/docs/components/tables", count: 11 },
  { title: "Inputs", href: "/docs/components/inputs", count: 20 },
  { title: "Navbars", href: "/docs/components/navbars", count: 15 },
  { title: "Tabs", href: "/docs/components/tabs", count: 9 },
  {
    title: "Event Calendars",
    href: "/docs/components/event-calendars",
    count: 22,
  },
  { title: "Notifications", href: "/docs/components/notifications", count: 12 },
];

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

function CategoryCard({ cat }: { cat: CategoryItem }) {
  return (
    <Link
      href={cat.href}
      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] transition-colors duration-200 hover:border-foreground/[0.12]"
    >
      {/* Image / GIF area — replace image prop with actual GIF per category */}
      <div className="relative flex-1 min-h-[140px] overflow-hidden bg-foreground/[0.03]">
        {cat.image ? (
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground/[0.06] text-xs font-medium uppercase tracking-wider select-none">
              Preview
            </span>
          </div>
        )}
      </div>

      {/* Label bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-[13px] font-medium text-foreground/60 group-hover:text-foreground transition-colors duration-150">
          {cat.title}
        </span>
        <span className="text-[11px] tabular-nums text-foreground/25">
          {cat.count}
        </span>
      </div>
    </Link>
  );
}

export function ComponentCategories() {
  /* Arch row: outer boxes tall, inner boxes pushed down → concave silhouette */
  const archItems = [
    { cat: categories[0], isCenter: false }, // Hero Sections — tall left
    { cat: categories[1], isCenter: true }, // Buttons — center-left (lower)
    { cat: categories[2], isCenter: true }, // Forms — center-right (lower)
    { cat: categories[3], isCenter: false }, // Cards — tall right
  ];

  const midRow = [categories[4], categories[5], categories[6], categories[7]];
  const botRow = [categories[8], categories[9]];

  const [archRef, archInView] = useInView({ rootMargin: "-60px" });
  const [midRef, midInView] = useInView({ rootMargin: "-60px" });
  const [botRef, botInView] = useInView({ rootMargin: "-60px" });

  return (
    <section className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 -mt-16 md:-mt-24 lg:-mt-36 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading — mobile/tablet: above grid; desktop: hidden (placed inside arch) */}
        <div className="flex justify-center mb-6 md:mb-10 lg:hidden">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/35">
            Components
          </span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {/* ── Arch row ── */}
          <div
            ref={archRef}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {/* "COMPONENTS" label in the arch gap — desktop only */}
            <span className="hidden lg:block absolute top-8 left-1/2 -translate-x-1/2 z-10 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/35">
              Components
            </span>

            {archItems.map(({ cat, isCenter }, i) => (
              <div
                key={cat.title}
                className={isCenter ? "lg:mt-24" : ""}
                style={{
                  opacity: archInView ? 1 : 0,
                  transform: `translateY(${archInView ? 0 : 24}px)`,
                  transition: `opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 60}ms, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 60}ms`,
                }}
              >
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>

          {/* ── Middle row — 4 equal ── */}
          <div
            ref={midRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {midRow.map((cat, i) => (
              <div
                key={cat.title}
                style={{
                  opacity: midInView ? 1 : 0,
                  transform: `translateY(${midInView ? 0 : 20}px)`,
                  transition: `opacity 0.45s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 40}ms, transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 40}ms`,
                }}
              >
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>

          {/* ── Bottom row — 2 wide ── */}
          <div
            ref={botRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
          >
            {botRow.map((cat, i) => (
              <div
                key={cat.title}
                style={{
                  opacity: botInView ? 1 : 0,
                  transform: `translateY(${botInView ? 0 : 20}px)`,
                  transition: `opacity 0.45s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 40}ms, transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 40}ms`,
                }}
              >
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
