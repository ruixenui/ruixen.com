"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface GooeyDockProps {
  className?: string;
  items: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }[];
}

export default function GooeyDock({ items, className }: GooeyDockProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div
      className={cn("flex items-center justify-center w-full py-20", className)}
    >
      {/* SVG goo filter */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <TooltipProvider delayDuration={100}>
        <div className="relative flex gap-6 px-6 py-4">
          {items.map((item, i) => {
            const isHovered = hovered === i;

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative"
                  >
                    {/* Liquid blob background with goo filter */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/40"
                      style={{ filter: "url(#goo)" }}
                      animate={{
                        scale: isHovered ? 1.8 : 1,
                        opacity: isHovered ? 1 : 0.6,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                    />

                    {/* Icon button (not filtered) */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full bg-background/80 backdrop-blur-xl"
                      onClick={item.onClick}
                    >
                      <div className="h-6 w-6 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
