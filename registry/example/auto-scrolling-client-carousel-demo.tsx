"use client";

import { AutoScrollingClientCarousel } from "@/registry/ruixenui/auto-scrolling-client-carousel";
import type { AutoScrollingCarouselItem } from "@/registry/ruixenui/auto-scrolling-client-carousel";

const clients: AutoScrollingCarouselItem[] = [
  {
    name: "React",
    logo: <img src="/icons/react.svg" alt="" className="h-8 w-auto" />,
  },
  {
    name: "Next.js",
    logo: (
      <img src="/icons/nextjs.svg" alt="" className="h-8 w-auto dark:invert" />
    ),
  },
  {
    name: "TypeScript",
    logo: <img src="/icons/typescript.svg" alt="" className="h-8 w-auto" />,
  },
  {
    name: "Tailwind CSS",
    logo: <img src="/icons/tailwindcss.svg" alt="" className="h-6 w-auto" />,
  },
  {
    name: "Framer Motion",
    logo: (
      <img
        src="/icons/framer-motion.svg"
        alt=""
        className="h-8 w-auto dark:invert"
      />
    ),
  },
  {
    name: "Figma",
    logo: <img src="/icons/figma.svg" alt="" className="h-8 w-auto" />,
  },
  {
    name: "Radix UI",
    logo: (
      <img
        src="/icons/radix-ui.svg"
        alt=""
        className="h-8 w-auto dark:invert"
      />
    ),
  },
  {
    name: "shadcn/ui",
    logo: (
      <img
        src="/icons/shadcn-ui.svg"
        alt=""
        className="h-8 w-auto dark:invert"
      />
    ),
  },
];

export default function AutoScrollingClientCarouselDemo() {
  return (
    <AutoScrollingClientCarousel
      clients={clients}
      title="Our stack"
      className="py-0 md:py-0"
    />
  );
}
