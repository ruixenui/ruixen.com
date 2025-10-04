"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface IconPaginationProps {
  totalPages?: number;
  className?: string;
  maxVisible?: number; // max icons to show around active
  onChange?: (page: number) => void; // callback for active page
}

export default function IconPagination({
  totalPages = 200,
  className,
  maxVisible = 5,
  onChange,
}: IconPaginationProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const prevPage = () => setActive((p) => Math.max(p - 1, 0));
  const nextPage = () => setActive((p) => Math.min(p + 1, totalPages - 1));

  // Generate default icons (colored squares for demo)
  const getIconItem = (id: number) => ({
    id,
    icon: () => (
      <div
        className={cn(
          "w-5 h-5 rounded",
          id % 5 === 0
            ? "bg-red-400"
            : id % 5 === 1
              ? "bg-green-400"
              : id % 5 === 2
                ? "bg-blue-400"
                : id % 5 === 3
                  ? "bg-yellow-400"
                  : "bg-purple-400",
        )}
      />
    ),
    label: `Page ${id + 1}`,
  });

  // Determine visible pages
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(active - half, 1);
    let end = Math.min(active + half, totalPages - 2);

    if (active - half <= 1) end = maxVisible - 1;
    if (active + half >= totalPages - 2) start = totalPages - maxVisible;

    start = Math.max(start, 1);
    end = Math.min(end, totalPages - 2);

    pages.push(0); // first page
    if (start > 1) pages.push(-1); // ellipsis

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 2) pages.push(-1); // ellipsis
    if (totalPages > 1) pages.push(totalPages - 1); // last page

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex items-center gap-2 p-4 flex-wrap", className)}>
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

      <TooltipProvider delayDuration={100}>
        {visiblePages.map((p, idx) =>
          p === -1 ? (
            <div
              key={`dots-${idx}`}
              className="w-6 h-6 flex items-center justify-center text-gray-400 select-none"
            >
              ...
            </div>
          ) : (
            <Tooltip key={p}>
              <TooltipTrigger asChild>
                <Button
                  variant={active === p ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActive(p)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-transform",
                    active === p
                      ? "scale-110 bg-primary text-white border border-primary"
                      : "bg-gray-200 dark:bg-gray-700",
                  )}
                >
                  {getIconItem(p).icon()}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {getIconItem(p).label}
              </TooltipContent>
            </Tooltip>
          ),
        )}
      </TooltipProvider>

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
