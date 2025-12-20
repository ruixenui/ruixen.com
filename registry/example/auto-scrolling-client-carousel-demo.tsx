"use client";

import React from "react";
import {
  AutoScrollingClientCarousel,
  LogoItem,
} from "../ruixenui/auto-scrolling-client-carousel";

export default function AutoScrollingClientCarouselDemo() {
  const customLogos: LogoItem[] = [
    {
      src: "/google.svg",
      alt: "Google",
      href: "https://google.com",
      width: 80,
      height: 24,
    },
    {
      src: "/microsoft.svg",
      alt: "Microsoft",
      href: "https://microsoft.com",
      width: 90,
      height: 24,
    },
    {
      src: "/apple.svg",
      alt: "Apple",
      href: "https://apple.com",
      width: 60,
      height: 24,
    },
    {
      src: "/netflix.svg",
      alt: "Netflix",
      href: "https://netflix.com",
      width: 80,
      height: 24,
    },
  ];

  return (
    <main className="bg-background min-h-screen py-20">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Auto-Scrolling Client Carousel
      </h1>

      {/* Default logos */}
      <AutoScrollingClientCarousel />

      {/* Custom logos with slower speed */}
      <div className="mt-20">
        <AutoScrollingClientCarousel
          heading="Our Premium Clients"
          logos={customLogos}
          speed={1.5}
        />
      </div>
    </main>
  );
}
