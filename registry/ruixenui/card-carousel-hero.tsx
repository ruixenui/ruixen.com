"use client";

import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export interface CardItem {
  src?: string;
  alt?: string;
}

export interface CardCarouselHeroProps {
  category?: string;
  title?: string;
  subtitle?: string;
  cards?: CardItem[];
}

export default function CardCarouselHero({
  category = "Innovation Meets Simplicity",
  title = "Build Exceptional Interfaces",
  subtitle = "Use our component library powered by Shadcn UI & Tailwind CSS to craft beautiful, fast, and accessible UIs.",
  cards = [],
}: CardCarouselHeroProps) {
  const totalCards = cards.length || 5;
  const placeholders = Array.from({ length: totalCards }).map(() => ({
    src: undefined,
    alt: "",
  }));
  const data = cards.length > 0 ? cards : placeholders;

  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const animateCards = () => {
    const middleIndex = Math.floor(data.length / 2);

    gsap.set(cardRefs.current, {
      x: 0,
      scale: 0.5,
      opacity: 0,
      transformOrigin: "center bottom",
    });

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
    });

    tl.to(cardRefs.current[middleIndex], { x: 0, scale: 1, opacity: 1 });

    for (let offset = 1; offset <= middleIndex; offset++) {
      const leftIndex = middleIndex - offset;
      const rightIndex = middleIndex + offset;

      const animations: gsap.TweenTarget[] = [];
      if (leftIndex >= 0) animations.push(cardRefs.current[leftIndex]);
      if (rightIndex < data.length)
        animations.push(cardRefs.current[rightIndex]);

      tl.to(
        animations,
        {
          x: (i, target) => {
            const idx = cardRefs.current.indexOf(target as HTMLDivElement);
            return (idx - middleIndex) * 120;
          },
          scale: (i, target) => {
            const idx = cardRefs.current.indexOf(target as HTMLDivElement);
            return 1 - Math.abs(idx - middleIndex) * 0.1;
          },
          opacity: 1,
        },
        "+=0.1",
      );
    }
  };

  useEffect(() => {
    animateCards();
  }, [activeIndex]);

  return (
    <section className="py-20 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-5">
        {/* Category */}
        <Button className="text-sm font-medium shadow-none text-white dark:text-white transition-colors duration-300 group relative inline-flex h-9 animate-rainbow cursor-pointer items-center justify-center rounded-3xl px-4">
          {category}
        </Button>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          {subtitle}
        </p>

        {/* Card Carousel */}
        <div className="flex justify-center items-center relative h-[30vw] min-h-[15rem]">
          {data.map((card, idx) => {
            const middleIndex = Math.floor(data.length / 2);
            const distance = Math.abs(idx - middleIndex);

            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="absolute"
                style={{ zIndex: data.length - distance }}
              >
                <Card className="w-[90vw] sm:w-80 md:w-[50vw] h-60 sm:h-64 md:h-[30vw] bg-white dark:bg-black overflow-hidden transition-colors duration-300 border-4 dark:border-gray-700">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                    {card.src && (
                      <Image
                        src={card.src}
                        alt={card.alt || `Card ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
