"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MorphingPageDotsProps {
  total: number;
  initialPage?: number;
  onPageChange: (page: number) => void;
}

export default function MorphingPageDots({
  total,
  initialPage = 0,
  onPageChange,
}: MorphingPageDotsProps) {
  const [page, setPage] = useState(initialPage);

  const goPrev = () => setPage((p) => (p > 0 ? p - 1 : p));
  const goNext = () => setPage((p) => (p < total - 1 ? p + 1 : p));

  return (
    <div className="flex items-center justify-center gap-6 py-6">
      {/* Left Arrow */}
      <ChevronLeft
        onClick={goPrev}
        className={`h-6 w-6 cursor-pointer text-muted-foreground transition hover:text-foreground ${
          page === 0 ? "opacity-30 pointer-events-none" : ""
        }`}
      />

      {/* Dots */}
      <div className="flex items-center gap-3">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === page;
          return (
            <motion.div
              key={i}
              className={`relative cursor-pointer ${
                isActive ? "bg-primary" : "bg-muted-foreground/40"
              }`}
              onClick={() => onPageChange(i)}
              animate={{
                width: isActive ? 28 : 10,
                height: 10,
                borderRadius: 9999,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {/* Ripple effect for active dot */}
              {isActive && (
                <AnimatePresence>
                  <motion.span
                    key="ripple"
                    className="absolute inset-0 rounded-full bg-primary/30"
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <ChevronRight
        onClick={goNext}
        className={`h-6 w-6 cursor-pointer text-muted-foreground transition hover:text-foreground ${
          page === total - 1 ? "opacity-30 pointer-events-none" : ""
        }`}
      />
    </div>
  );
}
