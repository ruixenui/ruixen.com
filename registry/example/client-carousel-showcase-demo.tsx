"use client";

import React from "react";
import {
  ClientCarouselShowcase,
  LogoItem,
} from "../ruixenui/client-carousel-showcase";

export default function ClientCarouselDemo() {
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
    <main className="bg-background min-h-screen py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Client Carousel Showcase
      </h1>

      {/* Default logos */}
      <ClientCarouselShowcase />

      {/* Custom logos with slower autoplay */}
      <div className="mt-20">
        <ClientCarouselShowcase logos={customLogos} autoPlayInterval={2500} />
      </div>
    </main>
  );
}
