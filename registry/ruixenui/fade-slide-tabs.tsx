"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FadeSlideTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface FadeSlideTabsProps {
  items?: FadeSlideTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function FadeSlideTabs({
  items = [
    {
      value: "overview",
      label: "Overview",
      content: "Overview content goes here.",
    },
    {
      value: "activity",
      label: "Activity",
      content: "Activity content goes here.",
    },
    {
      value: "settings",
      label: "Settings",
      content: "Settings content goes here.",
    },
    { value: "faq", label: "FAQ", content: "Frequently asked questions." },
  ],
  defaultValue = "overview",
  className,
}: FadeSlideTabsProps) {
  const [active, setActive] = React.useState(defaultValue);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[70vh]",
        className,
      )}
    >
      <Tabs
        defaultValue={defaultValue}
        onValueChange={setActive}
        className="w-full max-w-lg"
      >
        <TabsList className="flex justify-center gap-2 bg-background/60 backdrop-blur-md p-2 rounded-xl border">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                "px-3 py-2 rounded-lg transition-colors hover:bg-background/30",
                "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4 relative w-full max-w-lg min-h-[120px]">
          <AnimatePresence mode="wait">
            {items.map(
              (item) =>
                item.value === active && (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute inset-0 p-4 bg-card"
                  >
                    {item.content}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
