"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NestedSubTab {
  value: string;
  label: string;
  content?: React.ReactNode;
}

export interface NestedTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
  subTabs?: NestedSubTab[];
}

interface NestedTabsProps {
  items?: NestedTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function NestedTabs({
  items = [
    {
      value: "dashboard",
      label: "Dashboard",
      content: "Main Dashboard Overview",
      subTabs: [
        {
          value: "dash-stats",
          label: "Stats",
          content: "Detailed stats here.",
        },
        {
          value: "dash-reports",
          label: "Reports",
          content: "Reports content here.",
        },
      ],
    },
    {
      value: "settings",
      label: "Settings",
      content: "General settings content",
      subTabs: [
        {
          value: "profile",
          label: "Profile",
          content: "Profile settings here.",
        },
        {
          value: "account",
          label: "Account",
          content: "Account settings here.",
        },
        {
          value: "security",
          label: "Security",
          content: "Security settings here.",
        },
      ],
    },
    {
      value: "docs",
      label: "Documentation",
      content: "Developer documentation content",
      subTabs: [
        { value: "api", label: "API", content: "API reference here." },
        {
          value: "guides",
          label: "Guides",
          content: "Guides and tutorials here.",
        },
      ],
    },
  ],
  defaultValue = "dashboard",
  className,
}: NestedTabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  const [activeSub, setActiveSub] = React.useState<string | null>(null);

  const currentMain = items.find((i) => i.value === active);

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <Tabs
        value={active}
        onValueChange={setActive}
        className="w-full max-w-2xl"
      >
        {/* Main Tabs */}
        <TabsList className="flex gap-2 bg-background/30">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                "px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                active === item.value
                  ? "text-white shadow-xl bg-primary/10"
                  : "bg-background/50 text-foreground/40 hover:text-foreground",
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sub Tabs (expandable) */}
        <AnimatePresence>
          {currentMain?.subTabs && (
            <motion.div
              key={currentMain.value}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2"
            >
              <Tabs
                value={activeSub || currentMain.subTabs[0].value}
                onValueChange={setActiveSub}
              >
                <TabsList className="flex gap-2 bg-background/20">
                  {currentMain.subTabs.map((sub) => (
                    <TabsTrigger
                      key={sub.value}
                      value={sub.value}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        activeSub === sub.value
                          ? "bg-primary text-white"
                          : "bg-background/40 text-foreground/40 hover:text-foreground",
                      )}
                    >
                      {sub.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Sub Tab Content */}
                <div className="mt-3 p-4 rounded-lg bg-card">
                  {currentMain.subTabs.map((sub) => (
                    <TabsContent key={sub.value} value={sub.value}>
                      {sub.content}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Tab Content (without subTabs) */}
        {!currentMain?.subTabs && (
          <div className="mt-4 p-4 rounded-lg bg-card">
            {currentMain?.content}
          </div>
        )}
      </Tabs>
    </div>
  );
}
