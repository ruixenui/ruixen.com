"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

interface Announcement {
  label: string;
  href?: string;
  /** Override the default lightning glyph */
  icon?: React.ReactNode;
}

interface LogoItem {
  name: string;
  /** Optional src for an <img> rendering. Omit to render `name` as text mark. */
  src?: string;
  /** Or supply fully custom JSX (e.g. an inline SVG wordmark) */
  logo?: React.ReactNode;
  href?: string;
}

interface TrustedBy {
  /** Headline text, supports inline markup via `highlight` slot below. */
  prefix?: string;
  /** Optional highlighted segment rendered bold next to `prefix`. */
  highlight?: string;
  /** Trailing text after the highlighted segment. */
  suffix?: string;
  logos: LogoItem[];
}

export interface SalesAiHeroProps {
  announcement?: Announcement;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Content for the left (square) media tile. Falls back to a placeholder. */
  leftMedia?: React.ReactNode;
  /** Content for the right (landscape) media tile. Falls back to a placeholder. */
  rightMedia?: React.ReactNode;
  /** Trusted-by strip rendered below the media. Pass `false` to hide. */
  trustedBy?: TrustedBy | false;
  className?: string;
}

/* ── pieces ──────────────────────────────────────────────────── */

function AnnouncementPill({ announcement }: { announcement: Announcement }) {
  const body = (
    <>
      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-foreground">
        {announcement.icon ?? (
          <Zap className="size-4 fill-foreground" strokeWidth={0} />
        )}
      </span>
      <span className="truncate">{announcement.label}</span>
      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
        <ArrowRight className="size-3.5" strokeWidth={2.5} />
      </span>
    </>
  );

  const className = cn(
    "inline-flex h-11 max-w-full items-center gap-2.5 rounded-full bg-card pl-4 pr-1.5 text-sm font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)] ring-1 ring-border/60 transition-colors",
    "hover:bg-muted/60",
  );

  return announcement.href ? (
    <Link href={announcement.href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

function MediaTile({
  children,
  aspect,
  tone = "muted",
  className,
}: {
  children?: React.ReactNode;
  aspect: string;
  tone?: "muted" | "accent";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl ring-1 ring-border/60",
        tone === "muted" ? "bg-muted" : "bg-card",
        aspect,
        className,
      )}
    >
      {children ?? <DefaultPlaceholder tone={tone} />}
    </div>
  );
}

function DefaultPlaceholder({ tone }: { tone: "muted" | "accent" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        tone === "accent" &&
          "bg-[radial-gradient(120%_80%_at_20%_0%,#ffd6e8_0%,transparent_55%),radial-gradient(120%_80%_at_85%_30%,#f7b8d4_0%,transparent_60%),radial-gradient(140%_90%_at_50%_100%,#fef3f7_0%,transparent_70%)]",
      )}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground/70">
        <div className="size-8 rounded-full bg-foreground/10" />
        <span className="text-xs font-medium uppercase tracking-wider">
          Replace media
        </span>
      </div>
    </div>
  );
}

function LogoMark({ item }: { item: LogoItem }) {
  if (item.logo) return <>{item.logo}</>;
  if (item.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.src}
        alt={item.name}
        className="h-6 w-auto opacity-80 [filter:brightness(0)_saturate(0)] dark:[filter:brightness(0)_invert(1)] md:h-7"
      />
    );
  }
  return (
    <span className="select-none whitespace-nowrap text-base font-semibold tracking-tight text-foreground/80 md:text-lg">
      {item.name}
    </span>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function SalesAiHero({
  announcement,
  title,
  description,
  leftMedia,
  rightMedia,
  trustedBy,
  className,
}: SalesAiHeroProps) {
  return (
    <section
      aria-label="Hero"
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-16 md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
        {/* ── announcement pill ─────────────────────────── */}
        {announcement && (
          <div className="flex justify-center">
            <AnnouncementPill announcement={announcement} />
          </div>
        )}

        {/* ── title ─────────────────────────────────────── */}
        <h1
          className={cn(
            "mx-auto max-w-5xl text-balance text-center font-semibold tracking-[-0.035em] text-foreground",
            "text-[40px] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px]",
            announcement ? "mt-8 md:mt-10" : "mt-0",
          )}
        >
          {title}
        </h1>

        {/* ── description ───────────────────────────────── */}
        {description && (
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-base text-muted-foreground md:mt-6 md:text-lg">
            {description}
          </p>
        )}

        {/* ── media row ─────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-16 md:gap-6">
          <MediaTile
            aspect="aspect-[4/5] sm:aspect-auto sm:h-full"
            tone="muted"
          >
            {leftMedia}
          </MediaTile>
          <MediaTile
            aspect="aspect-[5/3] sm:col-span-2 sm:aspect-[5/3]"
            tone="accent"
          >
            {rightMedia}
          </MediaTile>
        </div>

        {/* ── trusted-by ────────────────────────────────── */}
        {trustedBy !== false && trustedBy && (
          <div className="mt-14 md:mt-20">
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-border" />
              <p className="text-center text-sm text-muted-foreground md:text-base">
                {trustedBy.prefix ?? "Trusted By "}
                {trustedBy.highlight && (
                  <span className="font-semibold text-foreground">
                    {trustedBy.highlight}
                  </span>
                )}
                {trustedBy.suffix ?? ""}
              </p>
              <div className="h-px flex-1 bg-border" />
            </div>

            {trustedBy.logos.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-6 md:mt-10 md:gap-x-0">
                {trustedBy.logos.map((item, idx) => (
                  <React.Fragment key={`${item.name}-${idx}`}>
                    <div className="flex items-center justify-center md:px-10">
                      {item.href ? (
                        <Link
                          href={item.href}
                          aria-label={item.name}
                          className="inline-flex items-center"
                        >
                          <LogoMark item={item} />
                        </Link>
                      ) : (
                        <LogoMark item={item} />
                      )}
                    </div>
                    {idx < trustedBy.logos.length - 1 && (
                      <span
                        aria-hidden
                        className="hidden h-6 w-px bg-border md:inline-block"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SalesAiHero;
