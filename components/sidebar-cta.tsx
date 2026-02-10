"use client";

import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

// Showcase videos - each has light/dark variants
const SHOWCASE_VIDEOS = [
  "accordion-with-image-tooltip",
  "apple-mega-nav",
  "bloom-text",
  "cta-meteor",
  "flicker-footer",
  "hero-bars",
  "hero-mobile-showcase",
  "instagram-stories",
  "map-location-picker",
  "models-carousel",
  "project-title-morph",
  "scroll-fx",
  "scroll-fx-timeline",
  "scroll-split-video-gallery",
  "testimonials-split-tabs",
];

function VideoSlideshow() {
  const { resolvedTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_VIDEOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reset video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  if (!mounted) {
    return (
      <div className="aspect-[16/10] w-full rounded-md bg-muted animate-pulse" />
    );
  }

  const themeSuffix = resolvedTheme === "dark" ? "dark" : "light";
  const videoSrc = `/showcase/${SHOWCASE_VIDEOS[currentIndex]}-${themeSuffix}.mp4`;

  return (
    <div className="relative w-full overflow-hidden rounded-md">
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        loop
        playsInline
        muted
        src={videoSrc}
        className="w-full aspect-[16/10] object-cover"
      />
      {/* Progress bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / SHOWCASE_VIDEOS.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export function ProCTA() {
  return (
    <Link
      href="https://pro.ruixen.com"
      target="_blank"
      className="group my-6 flex w-full flex-col overflow-hidden rounded-xl bg-card border border-blue-300 dark:border-blue-600/50 cursor-pointer transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
    >
      {/* Video Slideshow */}
      <div className="p-2 pb-0">
        <VideoSlideshow />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Limited Time Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            Limited Time Offer
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground leading-tight">
          Build{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            stunning UIs
          </span>{" "}
          in minutes
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-2 mb-3 leading-relaxed">
          Get{" "}
          <span className="font-semibold text-foreground">
            50+ premium components
          </span>
          , <span className="font-semibold text-foreground">templates</span>,
          and <span className="font-semibold text-foreground">blocks</span> with
          lifetime updates.
        </p>

        {/* Features - compact */}
        <ul className="space-y-1 mb-3">
          <li className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-blue-500 shrink-0" />
            <span>Next.js 15 + TypeScript ready</span>
          </li>
          <li className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-blue-500 shrink-0" />
            <span>Tailwind CSS v4 + Framer Motion</span>
          </li>
          <li className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-blue-500 shrink-0" />
            <span>Copy, paste, ship in minutes</span>
          </li>
          <li className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-blue-500 shrink-0" />
            <span>Lifetime updates included</span>
          </li>
        </ul>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-2xl font-bold text-foreground">$59</span>
          <span className="text-xs text-muted-foreground">once</span>
        </div>

        {/* CTA Button */}
        <div className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all group-hover:bg-primary/90">
          Get Lifetime Access
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export function ProductHuntCTA() {
  return (
    <Link
      href="https://www.producthunt.com/posts/ruixen-ui-2?utm_source=sidebar-cta&utm_medium=sidebar-cta&utm_campaign=product-hunt-sidebar-cta"
      target="_blank"
      className="group my-20 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#ff6154] p-4 text-center text-lg font-medium leading-tight text-white"
    >
      <video
        autoPlay
        loop
        playsInline
        muted
        src="/agent-demo.mp4"
        className="w-full overflow-hidden rounded-xl shadow-2xl"
      />
    </Link>
  );
}

export function SidebarCTA() {
  return <ProCTA />;
}
