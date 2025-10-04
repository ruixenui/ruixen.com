"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollPaginationProps {
  totalPages?: number;
  className?: string;
  onChange?: (page: number) => void;
}

export default function ScrollPagination({
  totalPages = 20,
  className,
  onChange,
}: ScrollPaginationProps) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const changePage = (delta: number) => {
    setActive((prev) => Math.max(0, Math.min(totalPages - 1, prev + delta)));
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    // throttle wheel events: only allow one page change per 150ms
    if (scrollTimeout.current) return;

    if (e.deltaY < 0) changePage(-1);
    else if (e.deltaY > 0) changePage(1);

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 150);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const prevPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-4 p-4 select-none cursor-pointer",
        className,
      )}
    >
      {/* Previous Arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevPage}
        disabled={active === 0}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Number Carousel */}
      <div className="relative w-16 h-10 overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute text-lg font-semibold w-full text-center"
          >
            {active + 1}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Arrow */}
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
