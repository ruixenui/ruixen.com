"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreditCardHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subtext: string;
  cta: string;
  onCtaClick?: () => void;
  primaryCardImage?: string;
  secondaryCardImage?: string;
}

export const CreditCardHero = React.forwardRef<
  HTMLDivElement,
  CreditCardHeroProps
>(
  (
    {
      className,
      headline,
      subtext,
      cta,
      onCtaClick,
      primaryCardImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
      secondaryCardImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg",
      ...props
    },
    ref,
  ) => {
    // Track mouse movement for tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({
      clientX,
      clientY,
      currentTarget,
    }: React.MouseEvent) => {
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 400], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 600], [-8, 8]);
    const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(300);
          mouseY.set(200);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative flex flex-col items-center justify-center text-center border-12 px-6 py-20 bg-background rounded-3xl shadow-lg",
          className,
        )}
      >
        {/* Text */}
        <div className="relative z-20">
          <h2 className="text-4xl font-bold text-card-foreground max-w-xl">
            {headline}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-md">
            {subtext}
          </p>
          <button
            onClick={onCtaClick}
            className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            {cta}
          </button>
        </div>

        {/* Floating Cards OUTSIDE the content */}

        {/* Bigger Card - bottom left */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="absolute -bottom-20 -left-28 h-44 w-80 rounded-xl bg-cover bg-center shadow-2xl z-10"
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `url(${primaryCardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl" />
          <div className="relative z-10 p-5 text-white">
            <p className="text-base font-semibold tracking-widest">**** 4590</p>
            <div className="flex justify-between text-xs mt-2">
              <span>JANE DOE</span>
              <span>11/29</span>
            </div>
          </div>
        </motion.div>

        {/* Smaller Card - top right */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -top-12 -right-24 h-32 w-60 rounded-xl bg-cover bg-center shadow-xl z-10"
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `url(${secondaryCardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl" />
          <div className="relative z-10 p-3 text-white">
            <p className="text-sm font-semibold tracking-widest">**** 7421</p>
            <div className="flex justify-between text-[11px] mt-1">
              <span>JOHN DOE</span>
              <span>07/31</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  },
);

CreditCardHero.displayName = "CreditCardHero";
