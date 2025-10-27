"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const dashboardTabs = [
  {
    id: 1,
    title: "Analytics",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75",
    alt: "Dashboard Analytics Overview",
  },
  {
    id: 2,
    title: "Users Management",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75",
    alt: "Dashboard User Management",
  },
  {
    id: 3,
    title: "Insights & Reports",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75",
    alt: "Dashboard Reports",
  },
  {
    id: 4,
    title: "Activity",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75",
    alt: "Dashboard Activity",
  },
  {
    id: 5,
    title: "Trends",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75",
    alt: "Dashboard Trends",
  },
];

export default function FeatureCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardTabs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations
  useEffect(() => {
    gsap.to(".hero-blur", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div ref={sectionRef} className="py-8 md:py-16">
      <div className="container mx-auto text-left">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Not everything powerful <br /> has to look complicated
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore the key features that make our platform a game-changer for
          businesses of all sizes.
        </p>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="relative h-[40vh] md:h-[60vh] overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {dashboardTabs.map((tab, index) => {
              const position = index - currentSlide;
              const isActive = position === 0;
              const translateX = position * 100;
              const scale = isActive ? 1 : 0.9;

              return (
                <div
                  key={tab.id}
                  className={`absolute transition-all duration-500 ease-in-out rounded-2xl overflow-hidden ${isActive ? "shadow-2xl border-4 border-gray-200" : "shadow-md border-2 border-gray-100"}`}
                  style={{
                    transform: `translateX(${translateX}%) scale(${scale})`,
                    zIndex: isActive ? 30 : 20 - Math.abs(position),
                  }}
                >
                  <div className="relative w-[70vw] aspect-[16/9]">
                    <Link href="https://ruixen.com/" target="_blank">
                      <Image
                        src={tab.src}
                        alt={tab.alt}
                        fill
                        className="object-cover"
                        priority={tab.id === 1}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-black/5"></div>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mt-6">
          {dashboardTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => goToSlide(index)}
              className={`p-2 font-medium transition-colors ${
                currentSlide === index
                  ? "text-gray-600 dark:text-gray-200"
                  : "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
