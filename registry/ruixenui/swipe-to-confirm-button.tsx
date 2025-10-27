"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface SwipeToConfirmButtonProps {
  label?: string;
  onConfirm?: () => void;
  width?: number;
  height?: number;
  className?: string;
}

export default function SwipeToConfirmButton({
  label = "Swipe to Confirm",
  onConfirm,
  width = 300,
  height = 50,
  className,
}: SwipeToConfirmButtonProps) {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [0, width - height],
    ["#e5e7eb", "#4ade80"],
  );

  const handleDragEnd = (event: any, info: any) => {
    if (info.point.x >= width - height - 5) {
      onConfirm?.();
      x.set(width - height); // snap to end
    } else {
      x.set(0); // reset
    }
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Swipe background */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full z-0 bg-green-400 dark:bg-green-600"
        style={{ width: x }}
      />

      {/* Swipe button */}
      <Button
        asChild
        variant="default"
        className="absolute top-0 left-0 z-10 p-0 rounded-full w-full h-full
                   bg-white text-gray-900 dark:bg-black dark:text-white
                   border border-gray-300 dark:border-black
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <motion.div
          className="flex items-center justify-center h-full w-full cursor-pointer select-none"
          drag="x"
          dragConstraints={{ left: 0, right: width - height }}
          dragElastic={0.2}
          style={{ x }}
          onDragEnd={handleDragEnd}
        >
          <motion.span className="px-4 text-sm font-medium">
            {label}
          </motion.span>
        </motion.div>
      </Button>
    </div>
  );
}
