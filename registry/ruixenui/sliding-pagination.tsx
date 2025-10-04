"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number; // max number of page buttons to show before adding dots
}

export default function SlidingPagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
  maxVisiblePages = 7,
}: PaginationProps) {
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = React.useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });

  // Update underline position whenever current page changes
  React.useEffect(() => {
    const currentBtn = buttonRefs.current[currentPage - 1];
    if (currentBtn) {
      const rect = currentBtn.getBoundingClientRect();
      const parentRect = currentBtn.parentElement!.getBoundingClientRect();
      setUnderlineStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  }, [currentPage, totalPages]);

  // Generate pages array with ellipsis if needed
  const generatePages = () => {
    if (totalPages <= maxVisiblePages)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | -1)[] = [];
    const first = 1;
    const last = totalPages;
    const sideCount = 1;
    const middleCount = maxVisiblePages - 2 * sideCount - 2;

    pages.push(first);

    // left/right bounds around current page
    let left = Math.max(
      currentPage - Math.floor(middleCount / 2),
      sideCount + 1,
    );
    let right = Math.min(
      currentPage + Math.floor(middleCount / 2),
      totalPages - sideCount,
    );

    // Add first ellipsis if needed
    if (left > sideCount + 1) pages.push(-1);
    else left = sideCount + 1; // include pages after first if no dots

    // Add middle pages
    for (let i = left; i <= right; i++) pages.push(i);

    // Add last ellipsis if needed
    if (right < totalPages - sideCount) pages.push(-1);

    pages.push(last);

    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <div className={cn("relative inline-flex items-center gap-2", className)}>
      {pagesToShow.map((pageNum, i) =>
        pageNum === -1 ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <Button
            key={pageNum}
            variant="ghost"
            ref={(el) => (buttonRefs.current[pageNum - 1] = el)}
            onClick={() => onPageChange(pageNum)}
            className={cn(
              "relative px-4 py-2 text-sm",
              pageNum === currentPage ? "font-semibold" : "",
            )}
          >
            {pageNum}
          </Button>
        ),
      )}

      {/* Sliding underline */}
      <motion.div
        layout
        initial={false}
        animate={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-0 h-0.5 bg-primary rounded"
      />
    </div>
  );
}
