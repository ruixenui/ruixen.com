"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ScrollableTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface CapsuleTabsProps {
  items?: ScrollableTabItem[];
  defaultValue?: string;
  className?: string;
  visibleCount?: number; // number of tabs per page
}

export default function CapsuleTabs({
  items = Array.from({ length: 20 }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: `Content for Tab ${i + 1}`,
  })),
  defaultValue,
  className,
  visibleCount = 5,
}: CapsuleTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);
  const [page, setPage] = React.useState(0);

  const totalPages = Math.ceil(items.length / visibleCount);

  const currentPageTabs = React.useMemo(() => {
    const start = page * visibleCount;
    return items.slice(start, start + visibleCount);
  }, [page, items, visibleCount]);

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 0));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex gap-2 my-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => setPage(idx)}
              className={cn(
                "w-3 h-3 rounded-full cursor-pointer transition-colors",
                idx === page ? "bg-primary" : "bg-foreground/30",
              )}
            />
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 w-full max-w-lg">
        {/* Left arrow */}
        <Button
          variant="ghost"
          onClick={handlePrevPage}
          disabled={page === 0}
          className="p-2 rounded-full bg-background/50 hover:bg-background/70 disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Tabs
          value={active}
          onValueChange={setActive}
          className="flex-1 flex   flex-col"
        >
          <TabsList className="flex gap-2 w-fit mx-auto justify-center">
            {currentPageTabs.map((item) => {
              const isActive = item.value === active;
              return (
                <TabsTrigger key={item.value} value={item.value} asChild>
                  <motion.button
                    className={cn(
                      "px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "bg-background/50 text-foreground/70",
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.button>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div className="p-4 bg-card">{item.content}</div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Right arrow */}
        <Button
          variant="ghost"
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className="p-2 rounded-full bg-background/50 hover:bg-background/70 disabled:opacity-40"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
