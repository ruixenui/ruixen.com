"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GooeyPaginationProps {
  totalPages?: number;
  className?: string;
}

export default function GooeyPagination({
  totalPages = 7,
  className,
}: GooeyPaginationProps) {
  const [active, setActive] = useState(0);

  const prevPage = () => setActive((prev) => (prev > 0 ? prev - 1 : prev));
  const nextPage = () =>
    setActive((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-6 p-4 relative",
        className,
      )}
    >
      {/* SVG gooey filter */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Previous arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevPage}
        disabled={active === 0}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Page dots */}
      <div className="flex gap-4 relative" style={{ filter: "url(#goo)" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActive(i)}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <AnimatePresence>
              {active === i && (
                <motion.div
                  layoutId="active-dot"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute w-6 h-6 rounded-full bg-primary/70"
                />
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 transition-colors"
            />
          </motion.div>
        ))}
      </div>

      {/* Next arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={nextPage}
        disabled={active === totalPages - 1}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
