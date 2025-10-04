"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type ButtonStatus = {
  label: string;
  icon: React.ReactNode;
  color?: string; // button background
  textColor?: string; // text/icon color
};

interface DynamicStatusButtonProps {
  statuses: ButtonStatus[];
  currentIndex?: number;
  onClick?: (status: ButtonStatus, index: number) => void;
  className?: string;
  width?: number;
}

export default function DynamicStatusButton({
  statuses,
  currentIndex = 0,
  onClick,
  className,
  width = 150,
}: DynamicStatusButtonProps) {
  const [activeIndex, setActiveIndex] = React.useState(currentIndex);
  const activeStatus = statuses[activeIndex];

  const handleClick = () => {
    const nextIndex = (activeIndex + 1) % statuses.length;
    setActiveIndex(nextIndex);
    onClick?.(statuses[nextIndex], nextIndex);
  };

  return (
    <Button
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-colors duration-300",
        className,
      )}
      style={{
        width,
        backgroundColor: activeStatus.color || "#2563eb", // default modern blue
      }}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStatus.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center gap-2 font-medium",
            activeStatus.textColor || "#ffffff",
          )}
        >
          {activeStatus.icon}
          {activeStatus.label}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
