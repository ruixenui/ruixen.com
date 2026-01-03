"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WheelPaginationProps {
  totalPages?: number;
  className?: string;
  visibleCount?: number; // Number of pages visible at once
  onChange?: (page: number) => void;
}

export default function WheelPagination({
  totalPages = 50,
  visibleCount = 5,
  className,
  onChange,
}: WheelPaginationProps) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const prevPage = () => setActive((p) => Math.max(p - 1, 0));
  const nextPage = () => setActive((p) => Math.min(p + 1, totalPages - 1));

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) setActive((p) => Math.max(p - 1, 0));
    else if (e.deltaY > 0) setActive((p) => Math.min(p + 1, totalPages - 1));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Determine visible pages based on active
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(visibleCount / 2);
    let start = active - half;
    let end = active + half;

    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end > totalPages - 1) {
      start -= end - (totalPages - 1);
      end = totalPages - 1;
      if (start < 0) start = 0;
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-2 p-4 select-none cursor-pointer",
        className,
      )}
    >
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

      {/* Page numbers carousel */}
      <div className="flex gap-2">
        {visiblePages.map((p) => (
          <motion.div
            key={p}
            layout
            animate={{ scale: active === p ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full font-medium min-h-[40px]",
              active === p
                ? "bg-background text-foreground border border-primary"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
            )}
            onClick={() => setActive(p)}
          >
            {p + 1}
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
