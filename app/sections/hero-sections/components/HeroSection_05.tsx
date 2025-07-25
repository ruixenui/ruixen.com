"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const codeStringHero_05 = `\"use client\";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection_05() {
  const gradientRef = useRef<HTMLDivElement>(null);

  const transitionVariants = {
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };

  useEffect(() => {
    if (!gradientRef.current) return;
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="p-6 overflow-hidden rounded-xl">
      <div className="relative w-full">
        <div
          ref={gradientRef}
          className="absolute inset-0 -z-10 transition-colors duration-700 dark:bg-black max-h-[90vh] rounded-2xl"
          style={{
            backgroundImage: \`
              linear-gradient(180deg, #ffffff 0%, #FFEDD5 25%, #FFDAB9 50%, #FFB6C1 70%, #E0BBE4 85%, #F3E5F5 100%),
              radial-gradient(at 20% 30%, #ffffff33 0%, transparent 60%),
              radial-gradient(at 80% 70%, #f3e5f533 0%, transparent 70%)
            \`,
            backgroundBlendMode: "overlay, screen",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        />

        <div className="pt-4 pb-10 sm:pt-6 sm:pb-12 text-center">
          <div className="relative max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-gray-800 dark:text-gray-200 font-bold tracking-tight">
              Ruixen: Design Systems for the Visionary Web
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Whether you're designing interfaces or building full-scale apps, our tools empower creators to move fast, stay consistent, and ship beautiful products — every time.
            </p>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
            >
              <div key={1} className="bg-foreground/10 rounded-[14px] border p-0.5">
                <Button asChild size="lg" className="rounded-xl px-5 text-base">
                  <span className="text-nowrap">Start Building</span>
                </Button>
              </div>
              <div
                key={2}
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-[14px] border p-0.5"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl px-5 text-base bg-white text-black hover:bg-black hover:text-white"
                >
                  <span className="text-nowrap">Request a demo</span>
                </Button>
              </div>
            </AnimatedGroup>
          </div>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className="relative overflow-hidden px-2">
            <div
              aria-hidden
              className="bg-gradient-to-b from-background to-background absolute inset-0 z-10 from-transparent from-35%"
            />
            <div className="inset-shadow-2xs max-h-[40vh] ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-t-2xl border border-gray-50 border-b-0 p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=hero_section_05&utm_campaign=ruixen" target="_blank">
                <Image
                  className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                  src="https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75"
                  alt="app screen"
                  width={2700}
                  height={1440}
                  unoptimized
                />
                <Image
                  className="z-2 border-border/25 aspect-15/8 relative rounded-2xl dark:hidden"
                  src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                  alt="app screen"
                  width={2700}
                  height={1440}
                  unoptimized
                />
              </Link>
            </div>
          </div>
        </AnimatedGroup>
      </div>
      <BrandsGrid />
    </div>
  );
}

export const BrandsGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const brands = [
      {
        name: "loops",
        logo: "https://assets.rapidui.dev/brands/loops.svg",
      },
      {
        name: "pwc",
        logo: "https://assets.rapidui.dev/brands/pwc.svg",
      },
      {
        name: "resend",
        logo: "https://assets.rapidui.dev/brands/resend.svg",
      },
      {
        name: "udio",
        logo: "https://assets.rapidui.dev/brands/udio.svg",
      },
      {
        name: "krea",
        logo: "https://assets.rapidui.dev/brands/krea.svg",
      },
      {
        name: "gopuff",
        logo: "https://assets.rapidui.dev/brands/gopuff.svg",
      },
    ];

    return (
      <div ref={ref} className={cn("py-8", className)} {...props}>
        <div className="max-w-5xl mx-auto px-4">  
          <div className="max-w-xs mx-auto grid grid-cols-2 items-center md:grid-cols-3 md:max-w-lg lg:grid-cols-6 lg:max-w-3xl">
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-center p-4">
                <div className="relative h-[76px] w-full">
                  <Image
                    src={brand.logo}
                    alt={\`\${brand.name} logo\`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

BrandsGrid.displayName = "BrandsGrid";
`;


export default function HeroSection_05() {
  const gradientRef = useRef<HTMLDivElement>(null);

  const transitionVariants = {
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };

  useEffect(() => {
    if (!gradientRef.current) return;
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="p-6 overflow-hidden rounded-xl">
        <div className="relative w-full">
        <div
            ref={gradientRef}
            className="absolute inset-0 -z-10 transition-colors duration-700 dark:bg-black max-h-[90vh] rounded-2xl"
            style={{
            backgroundImage: `
                linear-gradient(180deg, #ffffff 0%, #FFEDD5 25%, #FFDAB9 50%, #FFB6C1 70%, #E0BBE4 85%, #F3E5F5 100%),
                radial-gradient(at 20% 30%, #ffffff33 0%, transparent 60%),
                radial-gradient(at 80% 70%, #f3e5f533 0%, transparent 70%)
            `,
            backgroundBlendMode: "overlay, screen",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            }}
        />

        <div className="pt-4 pb-10 sm:pt-6 sm:pb-12 text-center">
            <div className="relative max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-gray-800 dark:text-gray-200 font-bold tracking-tight">
                Ruixen: Design Systems for the Visionary Web
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Whether you&apos;re designing interfaces or building full-scale apps, our tools empower creators to move fast, stay consistent, and ship beautiful products — every time.
            </p>
            <AnimatedGroup
                variants={{
                container: {
                    visible: {
                    transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                    },
                    },
                },
                ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
            >
                <div key={1} className="bg-foreground/10 rounded-[14px] border p-0.5">
                <Button asChild size="lg" className="rounded-xl px-5 text-base">
                    <span className="text-nowrap">Start Building</span>
                </Button>
                </div>
                <div
                key={2}
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-[14px] border p-0.5"
                >
                <Button
                    asChild
                    size="lg"
                    className="rounded-xl px-5 text-base bg-white text-black hover:bg-black hover:text-white"
                >
                    <span className="text-nowrap">Request a demo</span>
                </Button>
                </div>
            </AnimatedGroup>
            </div>
        </div>

        <AnimatedGroup
            variants={{
            container: {
                visible: {
                transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                },
                },
            },
            ...transitionVariants,
            }}
        >
            <div className="relative overflow-hidden px-2">
            <div
                aria-hidden
                className="bg-gradient-to-b from-background to-background absolute inset-0 z-10 from-transparent from-35%"
            />
            <div className="inset-shadow-2xs max-h-[40vh] ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-t-2xl border border-gray-50 border-b-0 p-4 shadow-lg shadow-zinc-950/15 ring-1">
                <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=hero_section_05&utm_campaign=ruixen" target="_blank">
                    <Image
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75"
                    alt="app screen"
                    width={2700}
                    height={1440}
                    unoptimized
                    />
                    <Image
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl dark:hidden"
                    src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                    alt="app screen"
                    width={2700}
                    height={1440}
                    unoptimized
                    />
                </Link>
            </div>
            </div>
        </AnimatedGroup>
        </div>    
        <BrandsGrid />
    </div>
  );
}


export const BrandsGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
      const brands = [
        {
          name: "loops",
          logo: "https://assets.rapidui.dev/brands/loops.svg",
        },
        {
          name: "pwc",
          logo: "https://assets.rapidui.dev/brands/pwc.svg",
        },
        {
          name: "resend",
          logo: "https://assets.rapidui.dev/brands/resend.svg",
        },
        {
          name: "udio",
          logo: "https://assets.rapidui.dev/brands/udio.svg",
        },
        {
          name: "krea",
          logo: "https://assets.rapidui.dev/brands/krea.svg",
        },
        {
          name: "gopuff",
          logo: "https://assets.rapidui.dev/brands/gopuff.svg",
        },
      ];
  
      return (
        <div ref={ref} className={cn("py-8", className)} {...props}>
          <div className="max-w-5xl mx-auto px-4">  
            <div className="max-w-xs mx-auto grid grid-cols-2 items-center md:grid-cols-3 md:max-w-lg lg:grid-cols-6 lg:max-w-3xl">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center justify-center p-4">
                  <div className="relative h-[76px] w-full">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  );

  BrandsGrid.displayName = "BrandsGrid";