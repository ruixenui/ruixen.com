"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface HybridTabItem {
  value: string;
  icon: React.ElementType;
  label: string;
  content?: React.ReactNode;
}

interface HybridTabsProps {
  items?: HybridTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function HybridTabs({
  items = [
    { value: "home", icon: Home, label: "Home", content: "Welcome Home!" },
    {
      value: "search",
      icon: Search,
      label: "Search",
      content: "Find what you need.",
    },
    {
      value: "notifications",
      icon: Bell,
      label: "Alerts",
      content: "You have no new notifications.",
    },
    {
      value: "profile",
      icon: User,
      label: "Profile",
      content: "Your profile info here.",
    },
    {
      value: "settings",
      icon: Settings,
      label: "Settings",
      content: "Adjust your preferences.",
    },
  ],
  defaultValue = "home",
  className,
}: HybridTabsProps) {
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
          {items.map((item) => {
            const isActive = active === item.value;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn(
                  "relative flex items-center gap-2 rounded-full transition-all px-3 py-2",
                  "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
