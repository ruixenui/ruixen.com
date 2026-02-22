"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
  simple?: boolean;
}

const Container = ({
  children,
  className,
  delay = 0.2,
  reverse,
  simple,
}: Props) => {
  return (
    <motion.div
      className={cn("w-full h-full", className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: delay,
        duration: simple ? 0.2 : 0.4,
        type: simple ? "keyframes" : "spring",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
