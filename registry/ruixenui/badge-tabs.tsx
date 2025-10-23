"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface BadgeTabItem {
  value: string;
  label: string;
  badge?: number;
  content?: React.ReactNode;
}

interface BadgeTabsProps {
  items?: BadgeTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function BadgeTabs({
  items = [
    {
      value: "messages",
      label: "Messages",
      badge: 5,
      content: "You have 5 new messages.",
    },
    {
      value: "tasks",
      label: "Tasks",
      badge: 12,
      content: "12 tasks pending review.",
    },
    {
      value: "alerts",
      label: "Alerts",
      badge: 3,
      content: "3 new system alerts.",
    },
  ],
  defaultValue,
  className,
}: BadgeTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full",
        className,
      )}
    >
      <Tabs
        value={active}
        onValueChange={setActive}
        className="w-full"
      >
        {/* Tabs */}
        <TabsList className="relative flex gap-2 bg-background/30 p-4 rounded-xl border">
          {items.map((item) => {
            const isActive = item.value === active;
            return (
              <TabsTrigger key={item.value} value={item.value} asChild>
                <motion.button
                  className={cn(
                    "relative flex-1 flex justify-between items-center h-8 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-foreground/80",
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary/10 rounded-lg z-0"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>

                  {/* Badge */}
                  <AnimatePresence mode="popLayout">
                    {item.badge && item.badge > 0 && (
                      <motion.span
                        key={item.badge}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="ml-2 relative z-10 inline-flex items-center justify-center min-w-[20px] h-6 px-2 rounded-full bg-blue-500 text-white text-xs font-bold"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-4 w-full">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div className="p-4 bg-card rounded-lg">{item.content}</div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
