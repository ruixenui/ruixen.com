"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export type StatusType = "live" | "idle" | "offline" | string;

interface StatusButtonProps {
  label?: string;
  status?: StatusType;
  onClick?: () => void;
  colors?: Record<StatusType, string>;
  size?: number;
  pulseDuration?: number;
  className?: string;
}

export default function StatusButton({
  label = "Go Live",
  status = "offline",
  onClick,
  colors = {
    live: "bg-green-500",
    idle: "bg-yellow-400",
    offline: "bg-red-500",
  },
  size = 12,
  pulseDuration = 1,
  className,
}: StatusButtonProps) {
  const dotColor = colors[status] || "bg-gray-400";

  return (
    <Button
      variant="default"
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          className={`rounded-full ${dotColor}`}
          style={{ width: size, height: size }}
          layout
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: pulseDuration }}
        />
      </AnimatePresence>
      {label}
    </Button>
  );
}
