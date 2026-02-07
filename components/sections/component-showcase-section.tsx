"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ComponentShowcaseSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full bg-background">
      {/* Floating Components - Light Mode */}
      <div className="relative z-0 h-[900px] md:h-[1000px] lg:h-[1100px] flex items-center justify-center dark:hidden">
        <div className="relative h-full w-full min-w-[640px] md:min-w-[768px] lg:min-w-0 max-w-7xl px-6">
          {/* Central Component - Globe */}
          <Link
            href="/docs/components/globe"
            className="absolute left-1/2 top-[35%] h-[160px] w-[240px] md:h-[200px] md:w-[300px] lg:h-[220px] lg:w-[330px] z-20 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "0s",
              transform: `translate(calc(-50% + ${mousePosition.x * 0.5}px), calc(-50% + ${mousePosition.y * 0.5}px))`,
            }}
          >
            <Image
              src="/landing-page-images/globe-light.webp"
              alt="Globe Component"
              fill
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 300px, 330px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* 3D Calendar - Top Right (extends into hero) */}
          <Link
            href="/docs/components/three-dwall-calendar"
            className="absolute right-[0%] md:-right-[5%] lg:-right-[6%] top-[-12%] md:top-[-10%] lg:top-[-8%] h-[100px] w-[150px] md:h-[120px] md:w-[180px] lg:h-[130px] lg:w-48 z-15 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-2.5s",
              transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * 0.8}px)`,
            }}
          >
            <Image
              src="/landing-page-images/three-dwall-calendar-light.webp"
              alt="3D Wall Calendar"
              fill
              sizes="(max-width: 768px) 150px, (max-width: 1200px) 180px, 192px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Elite Plan Card - Right Side (fills gap) */}
          <Link
            href="/docs/components/elite-plan-card"
            className="absolute right-[0%] md:right-[0%] lg:right-[-10%] top-[15%] md:top-[20%] lg:top-[25%] h-[130px] w-[185px] md:h-[150px] md:w-[225px] lg:h-[160px] lg:w-60 z-25 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.5s",
              transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * 0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/elite-plan-card-light.webp"
              alt="Elite Plan Card"
              fill
              sizes="(max-width: 768px) 185px, (max-width: 1200px) 225px, 240px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Credit Card Hero - Bottom Right */}
          <Link
            href="/docs/components/credit-card-hero"
            className="absolute right-[0%] md:right-[2%] lg:right-[6%] bottom-[5%] md:bottom-[8%] lg:bottom-[12%] h-[120px] w-[175px] md:h-[140px] md:w-[210px] lg:h-[150px] lg:w-56 z-30 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-5.2s",
              transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/credit-card-hero-light.webp"
              alt="Credit Card Hero"
              fill
              sizes="(max-width: 768px) 175px, (max-width: 1200px) 210px, 224px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Input With Select - Left Side */}
          <Link
            href="/docs/components/input-with-select"
            className="absolute left-[-6%] md:left-[-10%] lg:left-[-12%] top-[25%] md:top-[30%] lg:top-[35%] h-[100px] w-[145px] md:h-[120px] md:w-[175px] lg:h-[130px] lg:w-48 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-6s",
              transform: `translate(${mousePosition.x * 0.9}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/input-with-select-light.webp"
              alt="Input With Select"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 175px, 192px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Health Stats Card - Bottom Left */}
          <Link
            href="/docs/components/health-stat-card"
            className="absolute left-[0%] md:left-[-4%] lg:left-[-8%] bottom-[8%] md:bottom-[10%] lg:bottom-[15%] h-[110px] w-[165px] md:h-[130px] md:w-[195px] lg:h-[140px] lg:w-52 z-25 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-4.2s",
              transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * -0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/health-stats-card-light.webp"
              alt="Health Stats Card"
              fill
              sizes="(max-width: 768px) 165px, (max-width: 1200px) 195px, 208px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Tag Cloud - Top Center Right */}
          <Link
            href="/docs/components/tag-cloud-select"
            className="absolute right-[22%] md:right-[23%] lg:right-[26%] top-[0%] md:top-[0%] lg:top-[8%] h-[90px] w-[130px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-44 z-12 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-1.8s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/tag-cloud-select-light.webp"
              alt="Tag Cloud Select"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 160px, 176px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Shirt Parallax Card - Far Right */}
          <Link
            href="/docs/components/shirt-parallax-card"
            className="absolute right-[-6%] top-[50%] md:top-[58%] lg:top-[60%] h-[110px] w-[165px] md:h-[130px] md:w-[195px] lg:h-[140px] lg:w-52 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-4.8s",
              transform: `translate(${mousePosition.x * -0.9}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/shirt-parallax-card-light.webp"
              alt="Shirt Parallax Card"
              fill
              sizes="(max-width: 768px) 165px, (max-width: 1200px) 195px, 52px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* URL Input - Right Center */}
          <Link
            href="/docs/components/url-input"
            className="absolute right-[6%] md:right-[8%] lg:right-[12%] top-[0%] md:top-[2%] lg:top-[2%] h-[100px] w-[145px] md:h-[115px] md:w-[170px] lg:h-[125px] lg:w-[185px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-2.8s",
              transform: `translate(${mousePosition.x * -0.7}px, ${mousePosition.y * 0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/url-input-light.webp"
              alt="URL Input"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 170px, 185px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Multi Month Calendar - NEW */}
          <Link
            href="/docs/components/multi-month-calendar"
            className="absolute left-[12%] md:left-[14%] lg:left-[18%] bottom-[58%] md:bottom-[60%] lg:bottom-[62%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-9.2s",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/multi-month-calendar-light.webp"
              alt="Multi Month Calendar"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Task Orbit Calendar - NEW */}
          <Link
            href="/docs/components/task-orbit-calendar"
            className="absolute right-[10%] md:right-[12%] lg:right-[16%] bottom-[60%] md:bottom-[62%] lg:bottom-[64%] h-[100px] w-[145px] md:h-[115px] md:w-[170px] lg:h-[125px] lg:w-[185px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-9.8s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/task-orbit-calendar-light.webp"
              alt="Task Orbit Calendar"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 170px, 185px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Feature Carousel - NEW */}
          <Link
            href="/docs/components/feature-carousel"
            className="absolute left-[8%] md:left-[10%] lg:left-[12%] top-[68%] md:top-[70%] lg:top-[72%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-10.5s",
              transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/feature-carousel-light.webp"
              alt="Feature Carousel"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Ripple Distortion - Far Left */}
          <Link
            href="/docs/components/ripple-distortion"
            className="absolute left-[0%] md:-left-[2%] lg:-left-[3%] top-[10%] md:top-[12%] lg:top-[15%] h-[90px] w-[130px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-44 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.8s",
              transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/ripple-distortion-light.webp"
              alt="Ripple Distortion"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Icon Grid Button - Left Center */}
          <Link
            href="/docs/components/icon-grid-button"
            className="absolute left-[6%] md:left-[8%] lg:left-[10%] top-[5%] md:top-[8%] lg:top-[12%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.2s",
              transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/icon-grid-button-light.webp"
              alt="Icon Grid Button"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Calendar - Bottom Center Right */}
          <Link
            href="/docs/components/event-constellation-calendar"
            className="absolute right-[38%] md:right-[42%] lg:right-[44%] bottom-[15%] md:bottom-[18%] lg:bottom-[22%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-4.5s",
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/calendar-light.webp"
              alt="Calendar"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Feature Section 08 - Bottom Center Left */}
          <Link
            href="/docs/components/feature-slide-showcase"
            className="absolute left-[20%] md:left-[22%] lg:left-[28%] bottom-[5%] md:bottom-[8%] lg:bottom-[12%] h-[90px] w-[135px] md:h-[105px] md:w-[155px] lg:h-[115px] lg:w-[165px] z-22 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-5.8s",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/feature-08-light.webp"
              alt="Feature Section 08"
              fill
              sizes="(max-width: 768px) 135px, (max-width: 1200px) 155px, 165px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Integration Section - Top Left Lower */}
          <Link
            href="/docs/components/multi-orbit-semi-circle"
            className="absolute left-[0%] md:left-[3%] lg:left-[6%] top-[45%] md:top-[48%] lg:top-[52%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-6.5s",
              transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/integration-light.webp"
              alt="Integration Section"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Feature Section 06 - Right Mid */}
          <Link
            href="/docs/components/rotating-gradient-right"
            className="absolute right-[16%] md:right-[18%] lg:right-[24%] top-[52%] md:top-[55%] lg:top-[58%] h-[100px] w-[145px] md:h-[115px] md:w-[170px] lg:h-[125px] lg:w-[185px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-7.2s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/feature-06-light.webp"
              alt="Feature Section 06"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 170px, 185px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Glass Wall Hero - Far Right Lower */}
          <Link
            href="/docs/components/glass-wall-hero"
            className="absolute right-[0%] md:right-[2%] lg:right-[6%] bottom-[30%] md:bottom-[32%] lg:bottom-[38%] h-[110px] w-[165px] md:h-[130px] md:w-[195px] lg:h-[140px] lg:w-52 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-7.8s",
              transform: `translate(${mousePosition.x * -0.7}px, ${mousePosition.y * -0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/glass-wall-light.webp"
              alt="Glass Wall Hero"
              fill
              sizes="(max-width: 768px) 165px, (max-width: 1200px) 195px, 52px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Lumina Text - Left Lower */}
          <Link
            href="/docs/components/rising-glow"
            className="absolute left-[4%] md:left-[6%] lg:left-[10%] bottom-[48%] md:bottom-[50%] lg:bottom-[52%] h-[90px] w-[130px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-44 z-12 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-8.5s",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/lumina-light.webp"
              alt="Lumina Text"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 160px, 44px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Pricing With User Section - NEW TOP */}
          <Link
            href="/docs/components/pricing-with-user-scaling"
            className="absolute left-[28%] md:left-[30%] lg:left-[34%] top-[0%] md:top-[0%] lg:top-[-2%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-11.2s",
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/pricing-with-user-section-light.webp"
              alt="Pricing With User Section"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Event Aquarium Calendar - NEW */}
          <Link
            href="/docs/components/event-aquarium-calendar"
            className="absolute right-[26%] md:right-[28%] lg:right-[32%] top-[78%] md:top-[80%] lg:top-[82%] h-[90px] w-[130px] md:h-[105px] md:w-[150px] lg:h-[115px] lg:w-[165px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-11.8s",
              transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/event-aquarium-calendar-light.webp"
              alt="Event Aquarium Calendar"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 150px, 165px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Sliding Pagination - NEW */}
          <Link
            href="/docs/components/sliding-pagination"
            className="absolute left-[32%] md:left-[34%] lg:left-[38%] top-[78%] md:top-[80%] lg:top-[82%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-12.4s",
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * -0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/sliding-pagination-light.webp"
              alt="Sliding Pagination"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Stack Pagination - NEW */}
          <Link
            href="/docs/components/stack-pagination"
            className="absolute right-[32%] md:right-[34%] lg:right-[38%] top-[12%] md:top-[14%] lg:top-[16%] h-[90px] w-[130px] md:h-[105px] md:w-[150px] lg:h-[115px] lg:w-[165px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-13s",
              transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/stack-pagination-light.webp"
              alt="Stack Pagination"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 150px, 165px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Gooey Pagination - NEW */}
          <Link
            href="/docs/components/gooey-pagination"
            className="absolute left-[26%] md:left-[30%] lg:left-[31%] bottom-[28%] md:bottom-[30%] lg:bottom-[32%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-13.6s",
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * -0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/gooey-pagination-light.webp"
              alt="Gooey Pagination"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Confetti Button - NEW */}
          <Link
            href="/docs/components/confetti-button"
            className="absolute right-[9%] md:right-[11%] lg:right-[15%] top-[38%] md:top-[40%] lg:top-[42%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-14.2s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/confetti-button-light.webp"
              alt="Confetti Button"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Countdown Button - NEW */}
          <Link
            href="/docs/components/countdown-button"
            className="absolute left-[9%] md:left-[30%] lg:left-[35%] top-[8%] md:top-[10%] lg:top-[12%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-14.8s",
              transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/countdown-button-light.webp"
              alt="Countdown Button"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Checklist Button - NEW */}
          <Link
            href="/docs/components/checklist-button"
            className="absolute right-[36%] md:right-[38%] lg:right-[42%] bottom-[38%] md:bottom-[40%] lg:bottom-[42%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-15.4s",
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/checklist-button-light.webp"
              alt="Checklist Button"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>
        </div>
      </div>

      {/* Floating Components - Dark Mode */}
      <div className="relative z-0 h-[900px] md:h-[1000px] lg:h-[1100px] flex items-center justify-center hidden dark:flex">
        <div className="relative h-full w-full min-w-[640px] md:min-w-[768px] lg:min-w-0 max-w-7xl px-6">
          {/* Central Component - Globe Dark */}
          <Link
            href="/docs/components/globe"
            className="absolute left-1/2 top-[35%] h-[160px] w-[240px] md:h-[200px] md:w-[300px] lg:h-[220px] lg:w-[330px] z-20 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "0s",
              transform: `translate(calc(-50% + ${mousePosition.x * 0.5}px), calc(-50% + ${mousePosition.y * 0.5}px))`,
            }}
          >
            <Image
              src="/landing-page-images/globe-dark.webp"
              alt="Globe Component"
              fill
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 300px, 330px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* 3D Calendar - Top Right (extends into hero) */}
          <Link
            href="/docs/components/three-dwall-calendar"
            className="absolute right-[0%] md:-right-[5%] lg:-right-[6%] top-[-12%] md:top-[-10%] lg:top-[-8%] h-[100px] w-[150px] md:h-[120px] md:w-[180px] lg:h-[130px] lg:w-48 z-15 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-2.5s",
              transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * 0.8}px)`,
            }}
          >
            <Image
              src="/landing-page-images/three-dwall-calendar-dark.webp"
              alt="3D Wall Calendar"
              fill
              sizes="(max-width: 768px) 150px, (max-width: 1200px) 180px, 48px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Elite Plan Card - Right Side (fills gap) */}
          <Link
            href="/docs/components/elite-plan-card"
            className="absolute right-[0%] md:-right-[13%] lg:-right-[16%] top-[15%] md:top-[20%] lg:top-[25%] h-[130px] w-[185px] md:h-[150px] md:w-[225px] lg:h-[160px] lg:w-60 z-25 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.5s",
              transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * 0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/elite-plan-card-dark.webp"
              alt="Elite Plan Card"
              fill
              sizes="(max-width: 768px) 185px, (max-width: 1200px) 225px, 60px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Credit Card Hero - Bottom Right */}
          <Link
            href="/docs/components/credit-card-hero"
            className="absolute right-[0%] md:right-[2%] lg:right-[6%] bottom-[5%] md:bottom-[8%] lg:bottom-[12%] h-[120px] w-[175px] md:h-[140px] md:w-[210px] lg:h-[150px] lg:w-56 z-30 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-5.2s",
              transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/credit-card-hero-dark.webp"
              alt="Credit Card Hero"
              fill
              sizes="(max-width: 768px) 175px, (max-width: 1200px) 210px, 56px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Input With Select - Left Side */}
          <Link
            href="/docs/components/input-with-select"
            className="absolute left-[0%] md:left-[0%] lg:left-[0%] top-[25%] md:top-[30%] lg:top-[35%] h-[100px] w-[145px] md:h-[120px] md:w-[175px] lg:h-[130px] lg:w-48 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-6s",
              transform: `translate(${mousePosition.x * 0.9}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/input-with-select-dark.webp"
              alt="Input With Select"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 175px, 48px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Health Stats Card - Bottom Left */}
          <Link
            href="/docs/components/health-stat-card"
            className="absolute left-[-6%] md:left-[-8%] lg:left-[-10%] bottom-[8%] md:bottom-[10%] lg:bottom-[15%] h-[110px] w-[165px] md:h-[130px] md:w-[195px] lg:h-[140px] lg:w-52 z-25 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-4.2s",
              transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * -0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/health-stats-card-dark.webp"
              alt="Health Stats Card"
              fill
              sizes="(max-width: 768px) 165px, (max-width: 1200px) 195px, 52px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Tag Cloud - Top Center Right */}
          <Link
            href="/docs/components/tag-cloud-select"
            className="absolute right-[14%] md:right-[18%] lg:right-[20%] top-[10%] md:top-[10%] lg:top-[10%] h-[90px] w-[130px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-44 z-12 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-1.8s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/tag-cloud-select-dark.webp"
              alt="Tag Cloud Select"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 160px, 44px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Shirt Parallax Card - Far Right */}
          <Link
            href="/docs/components/shirt-parallax-card"
            className="absolute right-[0%] md:-right-[3%] lg:-right-[5%] top-[40%] md:top-[42%] lg:top-[45%] h-[110px] w-[165px] md:h-[130px] md:w-[195px] lg:h-[140px] lg:w-52 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.5s",
              transform: `translate(${mousePosition.x * -0.9}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/shirt-parallax-card-light.webp"
              alt="Shirt Parallax Card"
              fill
              sizes="(max-width: 768px) 165px, (max-width: 1200px) 195px, 208px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* URL Input - Right Center */}
          <Link
            href="/docs/components/url-input"
            className="absolute right-[6%] md:right-[8%] lg:right-[12%] top-[5%] md:top-[8%] lg:top-[12%] h-[100px] w-[145px] md:h-[115px] md:w-[170px] lg:h-[125px] lg:w-[185px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-2.8s",
              transform: `translate(${mousePosition.x * -0.7}px, ${mousePosition.y * 0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/url-input-dark.webp"
              alt="URL Input"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 175px, 48px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Multi Month Calendar - NEW DARK */}
          <Link
            href="/docs/components/multi-month-calendar"
            className="absolute left-[12%] md:left-[14%] lg:left-[18%] bottom-[58%] md:bottom-[60%] lg:bottom-[62%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-9.2s",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/multi-month-calendar-dark.webp"
              alt="Multi Month Calendar"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Task Orbit Calendar - NEW DARK */}
          <Link
            href="/docs/components/task-orbit-calendar"
            className="absolute right-[10%] md:right-[12%] lg:right-[16%] bottom-[60%] md:bottom-[62%] lg:bottom-[64%] h-[100px] w-[145px] md:h-[115px] md:w-[170px] lg:h-[125px] lg:w-[185px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-9.8s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/task-orbit-calendar-dark.webp"
              alt="Task Orbit Calendar"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 175px, 48px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Feature Carousel - NEW DARK */}
          <Link
            href="/docs/components/feature-carousel"
            className="absolute left-[8%] md:left-[10%] lg:left-[12%] top-[68%] md:top-[70%] lg:top-[72%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-10.5s",
              transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/feature-carousel-dark.webp"
              alt="Feature Carousel"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Ripple Distortion - Far Left */}
          <Link
            href="/docs/components/ripple-distortion"
            className="absolute left-[0%] md:-left-[2%] lg:-left-[3%] top-[10%] md:top-[12%] lg:top-[15%] h-[90px] w-[130px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-44 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.8s",
              transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/ripple-distortion-dark.webp"
              alt="Ripple Distortion"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 160px, 44px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Icon Grid Button - Left Center */}
          <Link
            href="/docs/components/icon-grid-button"
            className="absolute left-[8%] md:left-[12%] lg:left-[16%] top-[5%] md:top-[8%] lg:top-[12%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-3.2s",
              transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/icon-grid-button-dark.webp"
              alt="Icon Grid Button"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Calendar - Bottom Center Right */}
          <Link
            href="/docs/components/event-constellation-calendar"
            className="absolute right-[24%] md:right-[26%] lg:right-[30%] bottom-[68%] md:bottom-[70%] lg:bottom-[72%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-4.5s",
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/calendar-dark.webp"
              alt="Calendar"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Feature Section 08 - Bottom Center Left */}
          <Link
            href="/docs/components/feature-slide-showcase"
            className="absolute left-[20%] md:left-[22%] lg:left-[28%] bottom-[5%] md:bottom-[8%] lg:bottom-[12%] h-[90px] w-[135px] md:h-[105px] md:w-[155px] lg:h-[115px] lg:w-[165px] z-22 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-5.8s",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.6}px)`,
            }}
          >
            <Image
              src="/landing-page-images/feature-08-dark.webp"
              alt="Feature Section 08"
              fill
              sizes="(max-width: 768px) 135px, (max-width: 1200px) 155px, 165px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Integration Section - Top Left Lower */}
          <Link
            href="/docs/components/multi-orbit-semi-circle"
            className="absolute left-[2%] md:left-[4%] lg:left-[8%] top-[58%] md:top-[60%] lg:top-[62%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-6.5s",
              transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/integration-dark.webp"
              alt="Integration Section"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Feature Section 06 - Right Mid */}
          <Link
            href="/docs/components/rotating-gradient-right"
            className="absolute right-[10%] md:right-[12%] lg:right-[16%] top-[68%] md:top-[70%] lg:top-[72%] h-[100px] w-[145px] md:h-[115px] md:w-[170px] lg:h-[125px] lg:w-[185px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-7.2s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/feature-06-dark.webp"
              alt="Feature Section 06"
              fill
              sizes="(max-width: 768px) 145px, (max-width: 1200px) 175px, 185px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Glass Wall Hero - Far Right Lower */}
          <Link
            href="/docs/components/glass-wall-hero"
            className="absolute right-[0%] md:right-[0%] lg:right-[2%] bottom-[45%] md:bottom-[46%] lg:bottom-[52%] h-[110px] w-[165px] md:h-[130px] md:w-[195px] lg:h-[140px] lg:w-52 z-10 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-7.8s",
              transform: `translate(${mousePosition.x * -0.7}px, ${mousePosition.y * -0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/glass-wall-dark.webp"
              alt="Glass Wall Hero"
              fill
              sizes="(max-width: 768px) 165px, (max-width: 1200px) 195px, 52px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Lumina Text - Left Lower */}
          <Link
            href="/docs/components/rising-glow"
            className="absolute left-[0%] md:left-[2%] lg:left-[4%] bottom-[72%] md:bottom-[74%] lg:bottom-[76%] h-[90px] w-[130px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-44 z-12 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-8.5s",
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * -0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/lumina-dark.webp"
              alt="Lumina Text"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 160px, 44px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Pricing With User Section - NEW TOP DARK */}
          <Link
            href="/docs/components/pricing-with-user-scaling"
            className="absolute left-[28%] md:left-[30%] lg:left-[34%] top-[0%] md:top-[0%] lg:top-[-2%] h-[95px] w-[140px] md:h-[110px] md:w-[160px] lg:h-[120px] lg:w-[175px] z-14 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-11.2s",
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.7}px)`,
            }}
          >
            <Image
              src="/landing-page-images/pricing-with-user-section-dark.webp"
              alt="Pricing With User Section"
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 175px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Event Aquarium Calendar - NEW DARK */}
          <Link
            href="/docs/components/event-aquarium-calendar"
            className="absolute right-[26%] md:right-[28%] lg:right-[32%] top-[78%] md:top-[80%] lg:top-[86%] h-[90px] w-[130px] md:h-[105px] md:w-[150px] lg:h-[115px] lg:w-[165px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-11.8s",
              transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/event-aquarium-calendar-dark.webp"
              alt="Event Aquarium Calendar"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 150px, 165px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Sliding Pagination - NEW DARK */}
          <Link
            href="/docs/components/sliding-pagination"
            className="absolute left-[32%] md:left-[34%] lg:left-[38%] top-[78%] md:top-[80%] lg:top-[82%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-12.4s",
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * -0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/sliding-pagination-dark.webp"
              alt="Sliding Pagination"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Stack Pagination - NEW DARK */}
          <Link
            href="/docs/components/stack-pagination"
            className="absolute right-[42%] md:right-[44%] lg:right-[48%] top-[12%] md:top-[14%] lg:top-[16%] h-[90px] w-[130px] md:h-[105px] md:w-[150px] lg:h-[115px] lg:w-[165px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-13s",
              transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            <Image
              src="/landing-page-images/stack-pagination-dark.webp"
              alt="Stack Pagination"
              fill
              sizes="(max-width: 768px) 130px, (max-width: 1200px) 150px, 165px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Gooey Pagination - NEW DARK */}
          <Link
            href="/docs/components/gooey-pagination"
            className="absolute left-[26%] md:left-[30%] lg:left-[31%] bottom-[28%] md:bottom-[30%] lg:bottom-[32%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-18 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-13.6s",
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * -0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/gooey-pagination-dark.webp"
              alt="Gooey Pagination"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Confetti Button - NEW DARK */}
          <Link
            href="/docs/components/confetti-button"
            className="absolute right-[9%] md:right-[11%] lg:right-[15%] top-[38%] md:top-[40%] lg:top-[42%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-14.2s",
              transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * 0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/confetti-button-dark.webp"
              alt="Confetti Button"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Countdown Button - NEW DARK */}
          <Link
            href="/docs/components/countdown-button"
            className="absolute left-[9%] md:left-[11%] lg:left-[15%] top-[28%] md:top-[30%] lg:top-[32%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-14.8s",
              transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.4}px)`,
            }}
          >
            <Image
              src="/landing-page-images/countdown-button-dark.webp"
              alt="Countdown Button"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>

          {/* Checklist Button - NEW DARK */}
          <Link
            href="/docs/components/checklist-button"
            className="absolute right-[36%] md:right-[48%] lg:right-[42%] bottom-[38%] md:bottom-[40%] lg:bottom-[42%] h-[85px] w-[125px] md:h-[100px] md:w-[145px] lg:h-[110px] lg:w-[155px] z-16 rounded-xl shadow-lg animate-float-up overflow-hidden cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300"
            style={{
              animationDelay: "-15.4s",
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.3}px)`,
            }}
          >
            <Image
              src="/landing-page-images/checklist-button-dark.webp"
              alt="Checklist Button"
              fill
              sizes="(max-width: 768px) 125px, (max-width: 1200px) 145px, 155px"
              className="object-cover rounded-xl"
              loading="lazy"
              unoptimized
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
