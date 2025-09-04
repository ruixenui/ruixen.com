"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
}

export interface ClientCarouselShowcaseProps {
  logos?: LogoItem[];
  autoPlayInterval?: number;
}

export const ClientCarouselShowcase: React.FC<ClientCarouselShowcaseProps> = ({
  logos = [
    {
      src: "/slack.svg",
      alt: "Slack Logo",
      href: "https://slack.com",
      width: 46,
      height: 24,
    },
    {
      src: "/amazon.svg",
      alt: "Amazon Logo",
      href: "https://amazon.com",
      width: 100,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "GitHub Logo",
      href: "https://github.com",
      width: 54,
      height: 24,
    },
    {
      src: "/playstation.svg",
      alt: "PlayStation Logo",
      href: "https://playstation.com",
      width: 64,
      height: 24,
    },
    {
      src: "/ibm.svg",
      alt: "IBM Logo",
      href: "https://ibm.com",
      width: 80,
      height: 24,
    },
    {
      src: "/ebay.svg",
      alt: "Ebay Logo",
      href: "https://ebay.com",
      width: 80,
      height: 24,
    },
    {
      src: "/meta.svg",
      alt: "Meta Logo",
      href: "https://meta.com",
      width: 60,
      height: 24,
    },
    {
      src: "/adobe.svg",
      alt: "Adobe Logo",
      href: "https://adobe.com",
      width: 46,
      height: 10,
    },
  ],
  autoPlayInterval = 1500,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        api.scrollTo(0);
        setCurrent(0);
      } else {
        api.scrollNext();
        setCurrent((prev) => prev + 1);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, autoPlayInterval]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-regular text-left flex flex-wrap items-center gap-2">
            Empowering
            <br /> global teams to innovate with{" "}
            <span className="relative inline-flex items-center gap-2">
              <Image
                src="/ruixen_dark.png"
                alt="Ruixen Logo"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden animate-spin-slow"
              />
              <Image
                src="/ruixen_light.png"
                alt="Ruixen Logo"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block animate-spin-slow"
              />
            </span>
          </h2>

          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="relative basis-1/4 lg:basis-1/6 border border-dashed border-zinc-400 dark:border-zinc-700 p-2 m-2"
                >
                  <div className="dark:border-zinc-200 border-zinc-700 size-2 absolute -top-0.5 -left-0.5 border-l-2 border-t-2" />
                  <div className="dark:border-zinc-200 border-zinc-700 size-2 absolute -top-0.5 -right-0.5 border-r-2 border-t-2" />
                  <div className="dark:border-zinc-200 border-zinc-700 size-2 absolute -bottom-0.5 -left-0.5 border-l-2 border-b-2" />
                  <div className="dark:border-zinc-200 border-zinc-700 size-2 absolute -bottom-0.5 -right-0.5 border-r-2 border-b-2" />

                  <div className="flex items-center justify-center h-16 md:h-28 bg-muted border border-gray-200">
                    <Link
                      href={logo.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="mx-auto"
                      />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
