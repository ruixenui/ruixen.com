"use client";

import AnimatedGradientBackground from "@/components/AnimatedBackground";
import { AnimatedGroup } from "@/components/animated-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type GradientHeroShowcaseProps = {
  title?: string;
  description?: string;
  buttons?: {
    label: string;
    href?: string;
    variant?: "default" | "gradient";
  }[];
  images?: { src: string; alt: string }[];
};

export default function GradientHeroShowcase({
  title = "Innovation Meets Simplicity",
  description = "Discover cutting-edge solutions designed for the modern digital landscape.",
  buttons = [
    { label: "Start Building", href: "#", variant: "default" },
    { label: "Request a demo", href: "#", variant: "gradient" },
  ],
  images = [
    {
      src: "https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75",
      alt: "App screen dark",
    },
    {
      src: "https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75",
      alt: "App screen light",
    },
  ],
}: GradientHeroShowcaseProps) {
  const transitionVariants = {
    item: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
      },
    },
  };

  return (
    <div className="relative w-full">
      <AnimatedGradientBackground />

      <div className="pt-4 pb-10 sm:pt-6 sm:pb-12 text-center">
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg text-white">{description}</p>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            {buttons.map((btn, idx) => (
              <div
                key={idx}
                className={`rounded-[14px] border p-0.5 ${
                  btn.variant === "gradient"
                    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    : "bg-foreground/10"
                }`}
              >
                <Button
                  asChild
                  size="lg"
                  className={`rounded-xl px-5 text-base ${
                    btn.variant === "gradient"
                      ? "bg-white text-black hover:bg-black hover:text-white"
                      : ""
                  }`}
                >
                  <a href={btn.href || "#"}>{btn.label}</a>
                </Button>
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </div>

      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: { staggerChildren: 0.05, delayChildren: 0.75 },
            },
          },
          ...transitionVariants,
        }}
      >
        <div className="relative -mr-56 overflow-hidden px-2 sm:mr-0">
          <div
            aria-hidden
            className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
          />
          <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
            {images.map((img, idx) => (
              <Image
                key={idx}
                className={`${
                  idx === 0
                    ? "hidden dark:block"
                    : "z-2 border-border/25 dark:hidden"
                } bg-background aspect-15/8 relative rounded-2xl`}
                src={img.src}
                alt={img.alt}
                width={2700}
                height={1440}
                unoptimized
              />
            ))}
          </div>
        </div>
      </AnimatedGroup>
    </div>
  );
}
