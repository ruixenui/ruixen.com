"use client";

import * as React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(4px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  "blur-slide": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(4px)", y: 20 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
  },
  zoom: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
  },
  flip: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: {
        opacity: 1,
        rotateX: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
  },
  bounce: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      },
    },
  },
  rotate: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotate: -180 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 },
      },
    },
  },
  swing: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotate: -10 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 8 },
      },
    },
  },
};

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
}: AnimatedGroupProps) {
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export { AnimatedGroup };

const images = [
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg",
];

export default function HeroTitleSlide() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center px-6 py-20">
      {/* Background */}
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center -z-20"
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center text-center z-10">
        {/* Top Badge */}
        <div className="mb-6">
          <Card className="rounded-full bg-white/20 border-none px-4 py-1 text-sm text-white">
            Designed for Visionaries
          </Card>
        </div>
        <h1 className="text-6xl md:text-7xl font-semibold leading-tight mb-6 text-center max-w-3xl mx-auto tracking-tight">
          Modern Solutions for{" "}
          <span className="inline-block w-28 h-12 md:w-40 md:h-16 rounded-full overflow-hidden bg-white/10 backdrop-blur-md align-middle">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
          </span>{" "}
          Into Visuals
        </h1>

        {/* Subtext */}
        <p className="max-w-3xl text-base md:text-lg text-gray-200">
          Unlock the power of creativity with high-resolution textures, vibrant
          color palettes, and celestial-inspired visuals.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="text-xl border-4 border-white/30 text-white p-5 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
          >
            Explore More
          </Button>

          <Button
            variant="outline"
            className="text-xl border-4 border-white/30 text-white p-5 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
          >
            Get Started
          </Button>
        </div>

        <div className="relative -mr-56 mt-6 overflow-hidden px-2 sm:mr-0 sm:mt-8 md:mt-16">
          <div
            aria-hidden
            className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
          />
          <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
            <img
              className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border"
              src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png"
              alt="app screen"
              width="2700"
              height="1440"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
