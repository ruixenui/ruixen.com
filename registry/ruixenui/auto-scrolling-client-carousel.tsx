"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
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

export interface AutoScrollingClientCarouselProps {
  heading?: string;
  logos?: LogoItem[];
  speed?: number; // speed of auto-scroll
}

export const AutoScrollingClientCarousel: React.FC<
  AutoScrollingClientCarouselProps
> = ({
  heading = "Trusted by global leaders",
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
  speed = 2,
}) => {
  return (
    <section className="py-20">
      <div className="container flex flex-col items-center text-center px-4">
        <h2 className="my-6 text-2xl font-medium text-pretty md:text-3xl lg:text-4xl">
          {heading}
        </h2>
      </div>

      <div className="pt-8 md:pt-12 lg:pt-16">
        <div className="relative mx-auto flex items-center justify-center max-w-7xl px-4">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              AutoScroll({ playOnInit: true, speed, stopOnInteraction: false }),
            ]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center pl-0 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="mx-4 flex shrink-0 items-center justify-center">
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
                        className=""
                      />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Gradient fades */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};
