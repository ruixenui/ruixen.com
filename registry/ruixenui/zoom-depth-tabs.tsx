"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DepthTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface ZoomDepthTabsProps {
  items?: DepthTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function ZoomDepthTabs({
  items = [
    {
      value: "overview",
      label: "Overview",
      content: "Overview with rich info and stats.",
    },
    {
      value: "activity",
      label: "Activity",
      content: "Activity with graphs and timelines.",
    },
    {
      value: "settings",
      label: "Settings",
      content: "Settings with controls and toggles.",
    },
    {
      value: "faq",
      label: "FAQ",
      content: "Common questions and helpful answers.",
    },
  ],
  defaultValue,
  className,
}: ZoomDepthTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[60vh]",
        className,
      )}
    >
      <Tabs
        value={active}
        onValueChange={setActive}
        className="w-full max-w-3xl"
      >
        {/* Tab List */}
        <TabsList className="flex gap-4 p-2 overflow-x-auto rounded-xl scrollbar-none">
          {items.map((item) => {
            const isActive = item.value === active;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="px-6 py-3 rounded-xl text-sm font-medium shadow-md relative"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.1 : 0.95,
                    rotateX: isActive ? 0 : -5,
                    rotateY: isActive ? 0 : 5,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "block",
                    isActive
                      ? "text-white bg-primary px-6 py-2 rounded-lg"
                      : "text-foreground/70",
                  )}
                >
                  {item.label}
                </motion.span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-6 w-full max-w-3xl relative">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{
                  opacity: active === item.value ? 1 : 0,
                  y: active === item.value ? 0 : 10,
                  scale: 1,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="p-6 bg-card rounded-xl shadow-lg"
              >
                {item.content}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
