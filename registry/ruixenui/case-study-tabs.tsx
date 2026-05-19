"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface CaseStudyTabsBrand {
  /** Unique tab id. */
  id: string;
  /** Accessible label for screen readers. */
  name: string;
  /** Logo node — typically an inline SVG. */
  logo: React.ReactNode;
  /** CSS color string used for the animated underline indicator. Defaults to `currentColor`. */
  accentColor?: string;
}

export interface CaseStudyAuthor {
  name: string;
  role: string;
  /** Image URL for the avatar. */
  avatarUrl?: string;
  /** Initials/letter fallback when `avatarUrl` is omitted. */
  avatarFallback?: string;
}

export interface CaseStudy {
  brand: CaseStudyTabsBrand;
  /** Featured headline paragraph rendered in large type. Omit to render testimonial-only. */
  headline?: React.ReactNode;
  /** Optional "Read case study" CTA. */
  cta?: { label: string; href: string };
  /** Pull-quote rendered with curly-quote pseudo-elements. */
  quote: React.ReactNode;
  author: CaseStudyAuthor;
}

export interface CaseStudyTabsProps {
  cases: CaseStudy[];
  defaultCaseId?: string;
  /** Decorative embossed stars rendered above the tab bar. Set to 0 to hide. */
  starCount?: number;
  className?: string;
}

/* ── stars row ───────────────────────────────────────────────── */

function StarsRow({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className="size-5 fill-background stroke-background drop-shadow"
        />
      ))}
    </div>
  );
}

/* ── avatar ──────────────────────────────────────────────────── */

function AuthorAvatar({ author }: { author: CaseStudyAuthor }) {
  const frame =
    "aspect-square size-10 overflow-hidden rounded-lg border border-transparent shadow-md shadow-black/15 ring-1 ring-foreground/10";

  if (author.avatarUrl) {
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatarUrl}
          alt={`${author.name}'s avatar`}
          loading="lazy"
          width={80}
          height={80}
          className="size-full object-cover"
        />
      </div>
    );
  }

  const fallback =
    author.avatarFallback ?? author.name.trim().charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        frame,
        "flex items-center justify-center bg-muted text-sm font-semibold text-muted-foreground",
      )}
    >
      {fallback}
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function CaseStudyTabs({
  cases,
  defaultCaseId,
  starCount = 5,
  className,
}: CaseStudyTabsProps) {
  const firstId = cases[0]?.brand.id ?? "";
  const [activeId, setActiveId] = React.useState(defaultCaseId ?? firstId);

  const allTestimonialOnly = cases.every((c) => !c.headline && !c.cta);

  const tabBarRef = React.useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState<{
    x: number;
    w: number;
  } | null>(null);

  const activeCase = cases.find((c) => c.brand.id === activeId) ?? cases[0];

  React.useLayoutEffect(() => {
    const container = tabBarRef.current;
    if (!container) return;

    const measure = () => {
      const activeBtn = container.querySelector<HTMLElement>(
        '[data-state="active"]',
      );
      if (activeBtn) {
        setIndicator({
          x: activeBtn.offsetLeft,
          w: activeBtn.offsetWidth,
        });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [activeId]);

  if (!activeCase) return null;

  return (
    <section
      className={cn("w-full bg-background py-16 lg:py-24", className)}
      aria-label="Customer case studies"
    >
      <div className="mx-auto max-w-3xl px-4">
        {starCount > 0 && (
          <div className={cn(allTestimonialOnly && "flex justify-center")}>
            <StarsRow count={starCount} />
          </div>
        )}

        <Tabs value={activeId} onValueChange={setActiveId} className="gap-0">
          <div
            ref={tabBarRef}
            className={cn(
              "relative my-12 w-fit p-0.5",
              allTestimonialOnly ? "mx-auto" : "-ml-6",
            )}
          >
            {/* fading top + bottom border */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -inset-y-px border-y border-foreground/10",
                allTestimonialOnly
                  ? "-inset-x-8 [mask-image:linear-gradient(to_right,_transparent_0%,_black_20%,_black_80%,_transparent_100%)]"
                  : "-left-2 -right-8 [mask-image:linear-gradient(to_right,_transparent_0%,_black_5%,_black_80%,_transparent_100%)]",
              )}
            />

            {/* animated underline indicator */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 h-px rounded-full transition-[transform,width,background-color,opacity] duration-300 ease-out"
              style={{
                transform: indicator
                  ? `translateX(${indicator.x}px)`
                  : "translateX(0px)",
                width: indicator ? `${indicator.w}px` : "0px",
                opacity: indicator ? 1 : 0,
                backgroundColor: activeCase.brand.accentColor ?? "currentColor",
              }}
            />

            <TabsList className="flex h-auto items-center gap-1 rounded-none bg-transparent p-0 text-foreground">
              {cases.map((c) => (
                <TabsTrigger
                  key={c.brand.id}
                  value={c.brand.id}
                  aria-label={c.brand.name}
                  className={cn(
                    "relative flex h-10 items-center rounded px-6",
                    "border-transparent bg-transparent text-foreground shadow-none",
                    "transition-all duration-200 hover:bg-foreground/5",
                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    "not-last:before:absolute not-last:before:-right-[2.5px] not-last:before:inset-y-0.5 not-last:before:w-px not-last:before:bg-foreground/10",
                  )}
                >
                  {c.brand.logo}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {cases.map((c) => {
            const hasTopBlock = Boolean(c.headline || c.cta);
            return (
              <TabsContent key={c.brand.id} value={c.brand.id} className="mt-0">
                {hasTopBlock && (
                  <div className="space-y-8 border-b pb-12">
                    {c.headline && (
                      <p className="text-balance text-xl font-medium text-foreground md:text-2xl md:leading-9">
                        {c.headline}
                      </p>
                    )}
                    {c.cta && (
                      <Link
                        href={c.cta.href}
                        className={cn(
                          "inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-card pl-3 pr-1.5 text-xs font-medium text-foreground shadow-sm shadow-black/10 ring-1 ring-foreground/10",
                          "transition-all duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50",
                        )}
                      >
                        {c.cta.label}
                        <ChevronRight
                          className="size-4 scale-90 opacity-50"
                          strokeWidth={2.5}
                        />
                      </Link>
                    )}
                  </div>
                )}

                <div className={cn(hasTopBlock && "pt-12")}>
                  <p
                    className={cn(
                      "text-balance text-lg text-foreground before:mr-1 before:content-['“'] after:ml-1 after:content-['”']",
                      allTestimonialOnly && "text-center",
                    )}
                  >
                    {c.quote}
                  </p>
                  <div
                    className={cn(
                      "mt-6 flex items-center gap-3",
                      allTestimonialOnly && "justify-center",
                    )}
                  >
                    <AuthorAvatar author={c.author} />
                    <div className="space-y-px">
                      <p className="text-sm font-medium text-foreground">
                        {c.author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.author.role}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

export default CaseStudyTabs;
