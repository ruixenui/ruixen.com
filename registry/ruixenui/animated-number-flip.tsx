"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedNumberFlipProps {
  value: number;
  className?: string;
}

export default function AnimatedNumberFlip({
  value,
  className,
}: AnimatedNumberFlipProps) {
  const [displayValue, setDisplayValue] = React.useState(value);

  React.useEffect(() => {
    if (value !== displayValue) {
      const timeout = setTimeout(() => setDisplayValue(value), 300);
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue]);

  return (
    <Card
      className={cn("w-24 h-24 flex items-center justify-center", className)}
    >
      <CardContent className="flex items-center justify-center p-0 text-4xl font-bold">
        <div className="relative overflow-hidden h-12 w-10">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ y: -40, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 40, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
