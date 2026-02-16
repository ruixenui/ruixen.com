"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface PreviewItem {
  id: string;
  title: string;
  href: string;
  media: "video" | "image";
  basePath: string;
}

const previewItems: PreviewItem[] = [
  {
    id: "split-feature-showcase",
    title: "Split Feature Showcase",
    href: "/docs/components/split-feature-showcase",
    media: "video",
    basePath: "split-feature-showcase",
  },
  {
    id: "structured-hero-section",
    title: "Structured Hero Section",
    href: "/docs/components/structured-hero-section",
    media: "image",
    basePath: "structured-hero-section",
  },
  {
    id: "comment-thread",
    title: "Comment Thread",
    href: "/docs/components/comment-thread",
    media: "video",
    basePath: "comment-thread",
  },
  {
    id: "wordmark-footer",
    title: "Wordmark Footer",
    href: "/docs/components/wordmark-footer",
    media: "video",
    basePath: "wordmark-footer",
  },
  {
    id: "faq-chat-accordion",
    title: "FAQ Chat Accordion",
    href: "/docs/sections/faq-chat-accordion",
    media: "video",
    basePath: "faq-chat-accordion",
  },
  {
    id: "rising-glow",
    title: "Rising Glow",
    href: "/docs/components/rising-glow",
    media: "video",
    basePath: "rising-glow",
  },
  {
    id: "badge-morph",
    title: "Badge Morph",
    href: "/docs/components/badge-morph",
    media: "video",
    basePath: "badge-morph",
  },
  {
    id: "split-hero-section",
    title: "Split Hero Section",
    href: "/docs/components/split-hero-section",
    media: "image",
    basePath: "split-hero-section",
  },
  {
    id: "banner-countdown",
    title: "Banner Countdown",
    href: "/docs/components/banner-countdown",
    media: "video",
    basePath: "banner-countdown",
  },
  {
    id: "integration-and-stats-section",
    title: "Integration & Stats Section",
    href: "/docs/components/integration-and-stats-section",
    media: "video",
    basePath: "integration-and-stats-section",
  },
  {
    id: "breadcrumb-dropdown",
    title: "Breadcrumb Dropdown",
    href: "/docs/components/breadcrumb-dropdown",
    media: "video",
    basePath: "breadcrumb-dropdown",
  },
];

function VideoCard({
  item,
  theme,
}: {
  item: PreviewItem;
  theme: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const src = `/landing-page-previews/${item.basePath}-${theme}.mp4`;

  return (
    <div ref={cardRef} className="group break-inside-avoid mb-3 md:mb-4">
      <Link
        href={item.href}
        className="block overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] transition-colors duration-200 hover:border-foreground/[0.12]"
      >
        <div className="relative w-full overflow-hidden bg-foreground/[0.03]">
          <video
            ref={videoRef}
            key={src}
            src={src}
            className="w-full h-auto block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[13px] font-medium text-foreground/60 group-hover:text-foreground transition-colors duration-150">
            {item.title}
          </span>
          <svg
            className="size-3.5 text-foreground/20 group-hover:text-foreground/50 transition-all duration-150 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}

function ImageCard({
  item,
  theme,
}: {
  item: PreviewItem;
  theme: string;
}) {
  const src = `/landing-page-previews/${item.basePath}-${theme}.png`;

  return (
    <div className="group break-inside-avoid mb-3 md:mb-4">
      <Link
        href={item.href}
        className="block overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] transition-colors duration-200 hover:border-foreground/[0.12]"
      >
        <div className="relative w-full overflow-hidden bg-foreground/[0.03]">
          <Image
            src={src}
            alt={item.title}
            width={600}
            height={400}
            loading="lazy"
            className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[13px] font-medium text-foreground/60 group-hover:text-foreground transition-colors duration-150">
            {item.title}
          </span>
          <svg
            className="size-3.5 text-foreground/20 group-hover:text-foreground/50 transition-all duration-150 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export function ComponentCategories() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const theme = mounted ? (resolvedTheme ?? "light") : "light";

  return (
    <section className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 -mt-16 md:-mt-24 lg:-mt-36 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex justify-center mb-6 md:mb-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/35">
            Components
          </span>
        </div>

        {/* Grid + bottom fade wrapper */}
        <div className="relative">
          {/* Masonry grid */}
          <div
            ref={sectionRef}
            className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 [column-fill:balance]"
          >
            {previewItems.map((item, i) => (
              <div
                key={item.id}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: `translateY(${inView ? 0 : 20}px)`,
                  transition: `opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 60}ms, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 60}ms`,
                }}
              >
                {item.media === "video" ? (
                  <VideoCard item={item} theme={theme} />
                ) : (
                  <ImageCard item={item} theme={theme} />
                )}
              </div>
            ))}
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Explore more */}
        <div className="relative z-10 flex justify-center -mt-6">
          <Link
            href="/docs/components"
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-2 text-[12px] font-medium text-foreground/50 transition-colors duration-150 hover:border-foreground/[0.15] hover:text-foreground/70"
          >
            Explore more
            <svg
              className="size-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
