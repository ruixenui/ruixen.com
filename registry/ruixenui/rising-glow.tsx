"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type RisingGlowProps = {
  width?: number | string;
  height?: number | string;
  particleCount?: number;
  particleColor?: string;
  className?: string;
};

export const RisingGlow: React.FC<RisingGlowProps> = ({
  width = "100%",
  height = 120,
  particleCount = 20,
  particleColor = "#00f7ff",
  className,
}) => {
  const [particles, setParticles] = useState<
    { left: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: particleCount }, () => ({
      left: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(arr);
  }, [particleCount]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: particleColor,
          }}
          animate={{ y: [-10, -height, -10], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
