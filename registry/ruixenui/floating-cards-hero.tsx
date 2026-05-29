"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  MoreVertical,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type Action = { href: string; label: string };

export interface FloatingCardsHeroProps {
  /** Text shown inside the announcement pill */
  announcement?: string;
  /** Optional link for the announcement pill */
  announcementHref?: string;
  /** Main headline */
  title: React.ReactNode;
  /** Subtitle / description text */
  description?: string;
  /** Primary CTA button (filled) */
  primaryAction?: Action;
  /** Secondary CTA button (outline) */
  secondaryAction?: Action;
  /** Override the default scattered decorations. Pass `false` to hide. */
  decorations?: React.ReactNode | false;
  className?: string;
}

/* ── decorations ──────────────────────────────────────────────── */

function LogoCard({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute flex items-center justify-center rounded-xl border border-border bg-card shadow-md",
        "h-12 w-24 px-3",
        "sm:h-14 sm:w-28 sm:rounded-2xl sm:px-4",
        "md:h-16 md:w-32 md:px-5",
        "lg:h-20 lg:w-40 lg:rounded-3xl lg:px-6",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-4 w-auto opacity-90 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] md:h-5 lg:h-6"
      />
    </div>
  );
}

const MEETING_ITEMS: ReadonlyArray<{ title: string; time: string }> = [
  { title: "Hero block installed", time: "10:30 | shadcn CLI" },
  { title: "Pricing section added", time: "14:30 | shadcn CLI" },
  { title: "Theme tokens applied", time: "18:30 | manual" },
];

function MeetingCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute w-[180px] origin-top-left overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border md:w-[220px]",
        className,
      )}
    >
      <div className="flex h-10 items-center bg-muted px-4 text-sm text-foreground/70">
        Activity
      </div>
      <div className="space-y-2 p-2">
        <p className="p-1 text-xs text-muted-foreground">Recent installs</p>
        {MEETING_ITEMS.map((item) => (
          <div key={item.title} className="px-1">
            <p className="text-sm text-foreground md:text-base">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SOCIAL_ICONS: ReadonlyArray<{
  Icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number | string;
  }>;
  rotation: string;
}> = [
  { Icon: MessageCircle, rotation: "-rotate-[16deg]" },
  { Icon: Instagram, rotation: "rotate-[7deg] -ml-3" },
  { Icon: Facebook, rotation: "-rotate-[10deg] -ml-3" },
  { Icon: Linkedin, rotation: "rotate-[12deg] -ml-3" },
];

function SocialStackCard({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute origin-top-left", className)}>
      <div className="relative h-[220px] w-[280px] md:h-[260px] md:w-[320px]">
        <div className="absolute left-8 top-0 h-5 w-24 rounded-t-lg bg-card ring-1 ring-border" />
        <div className="absolute inset-x-0 top-4 h-[200px] rounded-2xl bg-card shadow-md ring-1 ring-border md:h-[240px]">
          <p className="px-6 pt-5 text-sm font-medium text-foreground md:pt-6 md:text-base">
            Community Channels
          </p>
          <div className="mt-5 flex items-center px-6 md:mt-8">
            {SOCIAL_ICONS.map(({ Icon, rotation }, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground shadow-sm ring-1 ring-border md:size-16",
                  rotation,
                )}
              >
                <Icon className="size-5 md:size-7" strokeWidth={2} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const INTERVIEW_REVIEWS: ReadonlyArray<{
  name: string;
  caption: string;
  avatarUrl: string;
}> = [
  {
    name: "Sara",
    caption: "Shipped in a weekend.",
    avatarUrl: "/avatar-images/avatar-01.jpg",
  },
  {
    name: "Theo",
    caption: "Tokens just worked.",
    avatarUrl: "/avatar-images/avatar-03.jpg",
  },
];

function InterviewNoteCard({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute origin-top-left", className)}>
      <div className="relative w-[260px] md:w-[300px]">
        <Paperclip
          className="absolute -top-4 left-5 z-10 size-8 -rotate-12 fill-muted stroke-muted-foreground drop-shadow md:size-10"
          strokeWidth={1.25}
        />
        <div className="space-y-3">
          {INTERVIEW_REVIEWS.map((r, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl bg-card p-3 shadow-md ring-1 ring-border md:p-4"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.avatarUrl}
                  alt={r.name}
                  className="size-10 rounded-full object-cover ring-2 ring-card md:size-11"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-foreground">
                    {r.name}&apos;s Review
                  </p>
                  <p className="text-xs text-muted-foreground">{r.caption}</p>
                </div>
              </div>
              <MoreVertical className="size-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultDecorations() {
  return (
    <>
      {/* Top corners — brand logos, always visible, anchored to top */}
      <LogoCard
        src="/logos/cosmos.svg"
        alt="Cosmos"
        className="-rotate-[12deg] left-3 top-3 sm:left-6 sm:top-6 md:left-12 md:top-10 lg:left-24 lg:top-16"
      />
      <LogoCard
        src="/logos/geckoboard.svg"
        alt="Geckoboard"
        className="right-3 top-3 rotate-[12deg] sm:right-6 sm:top-6 md:right-12 md:top-10 lg:right-24 lg:top-16"
      />

      {/* Mid-edge cards — hidden on mobile, bleed below the section so the
          tops appear at the bottom edge of the visible area regardless of
          section height. */}
      <MeetingCard className="-bottom-16 -left-5 hidden rotate-[12deg] scale-90 md:block lg:-bottom-12" />
      <MeetingCard className="-bottom-14 right-2 hidden -rotate-[14deg] scale-90 md:block lg:right-16" />

      {/* Bottom corners — large UI specimens bleeding below */}
      <SocialStackCard className="-bottom-32 -left-20 rotate-[20deg] scale-50 sm:-bottom-36 sm:-left-16 sm:scale-75 md:-bottom-40 md:scale-90 lg:scale-100" />
      <InterviewNoteCard className="-bottom-36 -right-12 hidden -rotate-[12deg] scale-90 md:block lg:-right-4 lg:scale-100" />
    </>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function FloatingCardsHero({
  announcement,
  announcementHref,
  title,
  description,
  primaryAction,
  secondaryAction,
  decorations,
  className,
}: FloatingCardsHeroProps) {
  const decorationsNode =
    decorations === false ? null : (decorations ?? <DefaultDecorations />);

  return (
    <section
      className={cn(
        "relative mx-auto mt-5 w-full overflow-hidden rounded-3xl border border-border bg-background p-4",
        "min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[560px]",
        className,
      )}
      aria-label="Hero"
    >
      {decorationsNode}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-2 py-10 text-center sm:py-12 md:py-14 lg:py-16">
        {announcement && (
          <Link
            href={announcementHref ?? "#"}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-muted/70 px-4 text-xs font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted md:h-10 md:px-6 md:text-sm"
          >
            <CircleDot
              className="size-3.5 fill-primary/20 text-primary md:size-4"
              strokeWidth={2}
            />
            {announcement}
          </Link>
        )}

        <h1 className="mt-6 max-w-full text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:max-w-2xl md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-4 max-w-xl text-balance text-sm text-muted-foreground md:mt-6 md:text-base">
            {description}
          </p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-8">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-11 sm:px-6 md:h-12 md:px-7"
              >
                {primaryAction.label}
                <ArrowRight className="size-4" />
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-11 sm:px-6 md:h-12 md:px-7"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default FloatingCardsHero;
