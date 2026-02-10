"use client";

import { TrustedClientsShowcase } from "@/registry/ruixenui/trusted-clients-showcase";
import type { LogoItem } from "@/registry/ruixenui/trusted-clients-showcase";

const clients: LogoItem[] = [
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

export default function TrustedClientsShowcaseDemo() {
  return (
    <TrustedClientsShowcase
      clients={clients}
      title="Powered by"
      className="py-0 md:py-0"
    />
  );
}
