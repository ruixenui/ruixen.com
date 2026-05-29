"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface ServiceEntry {
  /** Short tag/code shown in the tab (e.g. "S01", "Strategy"). */
  code: string;
  /** Small metadata shown next to the code — duration, pricing tier, etc. */
  meta?: string;
  /** Main service title */
  title: string;
  /** Service summary */
  description: string;
  /** Deliverables / what's included */
  items?: string[];
  /** Optional preview image src */
  image?: string;
  /** Optional preview video src — takes priority over `image` when both are provided */
  video?: string;
  /** Optional poster image shown before the video plays */
  poster?: string;
  /** Optional CTA — rendered as an inline arrow link below the entry */
  cta?: {
    href: string;
    label: string;
  };
}

export interface ServiceLedgerProps {
  title?: string;
  description?: string;
  entries?: ServiceEntry[];
  className?: string;
}

/* ── defaults ────────────────────────────────────────────────── */

const defaultServices: ServiceEntry[] = [
  {
    code: "S01",
    meta: "4–6 weeks",
    title: "Brand Foundation Sprint",
    description:
      "Discovery, positioning, and a tight brand system to anchor every surface — from the homepage to the next funding deck.",
    items: [
      "Stakeholder & audience interviews",
      "Positioning, voice, and messaging matrix",
      "Logo system, type stack, and core color tokens",
      "Brand guidelines doc + Figma library",
    ],
    cta: { href: "#", label: "See the playbook" },
  },
  {
    code: "S02",
    meta: "8–12 weeks",
    title: "Design System Engineering",
    description:
      "A token-driven, accessibility-audited component library your engineers can actually ship with — built on shadcn primitives.",
    items: [
      "Foundations: tokens, spacing scale, type ramp",
      "Primitive + composite component coverage",
      "Theming hooks for light/dark and brand variants",
      "Storybook + MDX docs your team can search",
    ],
  },
  {
    code: "S03",
    meta: "12–16 weeks",
    title: "Product Build-Out",
    description:
      "Full-stack delivery for the first slice of your product — designed, built, instrumented, and live in a quarter.",
    items: [
      "Next.js app router + edge-ready deploys",
      "Auth, billing, and data layer wiring",
      "Analytics, error tracking, and feature flags",
      "Two-week launch checklist + handoff",
    ],
    cta: { href: "#", label: "Read a case study" },
  },
  {
    code: "S04",
    meta: "Ongoing",
    title: "Growth & Optimization",
    description:
      "Embedded design + engineering capacity for the months after launch — landing pages, experiments, and lifecycle UI.",
    items: [
      "Quarterly site refreshes and net-new pages",
      "Experiment briefs and A/B test scaffolding",
      "Onboarding, pricing, and upgrade flows",
      "Weekly working sessions with your team",
    ],
  },
];

/* ── component ───────────────────────────────────────────────── */

export function ServiceLedger({
  title = "How we work with you",
  description = "Four ways our team plugs into your roadmap — from a single sprint to a year-long partnership.",
  entries = defaultServices,
  className,
}: ServiceLedgerProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const entryRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const tabsRef = React.useRef<HTMLDivElement | null>(null);

  /* Scroll-spy. Two things to get right here:

     1. WHICH document scrolls. When the component is portaled into an
        iframe (docs previews use IFramePortal), the React effect runs in
        the OUTER JS context but the DOM lives in the iframe. The global
        `document` is the wrong target — we have to resolve the actual
        document via the section's ownerDocument. We then listen in the
        capture phase so scroll events from any nested scroll container
        inside that document are caught (scroll events don't bubble but
        they DO traverse capture).

     2. WHERE the reference line is. We derive it from the strip's actual
        rendered bottom (getBoundingClientRect().bottom + 20). That makes
        the spy robust against in-page navbars, CSS-variable sticky
        offsets, and varying strip heights — no hardcoded magic number. */
  React.useEffect(() => {
    let raf: number | null = null;
    const GAP = 20;
    const FALLBACK_REFERENCE_Y = 100;

    const compute = () => {
      raf = null;
      const strip = tabsRef.current;
      const stripBottom = strip?.getBoundingClientRect().bottom ?? 0;
      const referenceY =
        stripBottom > 0 ? stripBottom + GAP : FALLBACK_REFERENCE_Y;

      // Publish the live strip height so the panels' scroll-margin-top (used by
      // tab clicks and #hash navigation) lands an entry's top on this exact
      // same reference line. If the two drift, the clicked tab isn't the one
      // that ends up highlighted.
      if (strip && sectionRef.current) {
        sectionRef.current.style.setProperty(
          "--ledger-strip-h",
          `${strip.offsetHeight}px`,
        );
      }

      let next = 0;
      for (let i = 0; i < entryRefs.current.length; i++) {
        const el = entryRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - referenceY <= 1) {
          next = i;
        } else {
          break;
        }
      }

      // Near the bottom of the scroll range the last entry's top may never
      // reach the reference line (not enough content below it), so force the
      // final tab once we've effectively bottomed out.
      const doc = sectionRef.current?.ownerDocument ?? document;
      const scroller = doc.scrollingElement ?? doc.documentElement;
      if (
        scroller &&
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
      ) {
        next = entryRefs.current.length - 1;
      }

      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(compute);
    };

    compute();

    const ownerDoc = sectionRef.current?.ownerDocument ?? document;
    const ownerWindow = ownerDoc.defaultView ?? window;

    ownerDoc.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    ownerWindow.addEventListener("resize", onScroll, { passive: true });

    return () => {
      ownerDoc.removeEventListener("scroll", onScroll, true);
      ownerWindow.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [entries.length]);

  /* Keep the active tab visible inside the horizontal scroller. Scroll the
     strip horizontally only — scrollIntoView can nudge the page vertically and
     fight the click/scroll-spy, landing the reader on the wrong panel. */
  React.useEffect(() => {
    const container = tabsRef.current;
    const tab = container?.children[activeIndex] as HTMLElement | undefined;
    if (!container || !tab) return;
    const cRect = container.getBoundingClientRect();
    const tRect = tab.getBoundingClientRect();
    const delta =
      tRect.left - cRect.left - (container.clientWidth - tab.clientWidth) / 2;
    container.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeIndex]);

  const handleTabClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    event.preventDefault();
    const target = entryRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={sectionRef} className={cn("py-16 md:py-32", className)}>
      {/* ── header ──────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:mb-4 md:text-5xl">
            {title}
          </h2>
          <p className="mb-6 text-balance text-sm text-muted-foreground sm:text-base md:text-lg">
            {description}
          </p>
        </div>
      </div>

      {/* ── sticky tab strip ────────────────────────────── */}
      <nav
        aria-label="Service navigation"
        style={{ top: "var(--ledger-sticky-top, 0px)" }}
        className="sticky z-20 mt-8 border-b border-border bg-background/90 backdrop-blur-sm md:mt-16"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div
              ref={tabsRef}
              className="flex items-center gap-0 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {entries.map((entry, i) => {
                const isActive = activeIndex === i;
                return (
                  <a
                    key={`tab-${entry.code}-${i}`}
                    href={`#service-ledger-${i}`}
                    onClick={(event) => handleTabClick(event, i)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "-mb-px inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:py-4",
                      isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="font-semibold">{entry.code}</span>
                    {entry.meta && (
                      <span
                        className={cn(
                          "hidden text-xs sm:inline",
                          isActive
                            ? "text-muted-foreground"
                            : "text-muted-foreground/70",
                        )}
                      >
                        {entry.meta}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* ── content panels ──────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mx-auto mt-10 flex max-w-3xl flex-col space-y-14 md:mt-16 md:space-y-24">
          {entries.map((entry, index) => (
            <div
              key={`${entry.code}-${index}`}
              id={`service-ledger-${index}`}
              ref={(el) => {
                entryRefs.current[index] = el;
              }}
              style={{
                scrollMarginTop:
                  "calc(var(--ledger-sticky-top, 0px) + var(--ledger-strip-h, 4rem) + 20px)",
              }}
              className="flex flex-col"
            >
              <h3 className="mb-3 text-balance text-xl font-bold leading-tight text-foreground/90 sm:text-2xl md:text-3xl">
                {entry.title}
              </h3>
              <p className="text-balance text-sm text-muted-foreground sm:text-base md:text-lg">
                {entry.description}
              </p>

              {entry.items && entry.items.length > 0 && (
                <ul className="ml-4 mt-4 space-y-1.5 text-sm text-muted-foreground sm:text-base">
                  {entry.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {entry.video ? (
                <video
                  src={entry.video}
                  poster={entry.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`${entry.title} preview`}
                  className="mt-6 aspect-video w-full rounded-lg bg-muted object-cover ring-1 ring-border/60 md:mt-8"
                />
              ) : entry.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={entry.image}
                  alt={`${entry.title} visual`}
                  className="mt-6 aspect-video w-full rounded-lg bg-muted object-cover ring-1 ring-border/60 md:mt-8"
                />
              ) : null}

              {entry.cta && (
                <Link
                  href={entry.cta.href}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-foreground underline-offset-4 hover:underline sm:text-base md:mt-6"
                >
                  {entry.cta.label}
                  <ArrowUpRight className="size-4 md:size-5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceLedger;
