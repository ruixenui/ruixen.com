"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
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
  const first = items?.[0]?.value ?? "";
  const initial =
    defaultValue && items.some((i) => i.value === defaultValue)
      ? defaultValue
      : first;

  const [active, setActive] = React.useState<string>(initial);

  // Keep active valid if items change
  React.useEffect(() => {
    if (!items?.length) return;
    if (!items.some((i) => i.value === active)) setActive(items[0].value);
  }, [items, active]);

  const activeItem = React.useMemo(
    () => items.find((i) => i.value === active) ?? items[0],
    [items, active],
  );

  if (!items?.length) return null;

  return (
    <div className={cn("w-full", className)}>
      <Tabs value={active} onValueChange={setActive} className="w-full">
        {/* Header */}
        <div className="mx-auto w-full max-w-3xl">
          <TabsList
            className={cn(
              // IMPORTANT: w-full + h-auto (prevents shrinking and avoids scroll)
              "w-full h-auto",
              // Professional container
              "rounded-xl border bg-muted/40 p-1 shadow-sm",
              // No scroll. Wrap nicely instead.
              "grid gap-1",
              // Equal-feeling tabs; wraps to multiple rows if needed (no horizontal scroll)
              "grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]",
              "sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]",
              // Prevent accidental overflow growth due to long labels
              "overflow-hidden",
            )}
          >
            {items.map((item) => {
              const isActive = item.value === active;

              return (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  title={item.label}
                  className={cn(
                    // Fill the grid cell (no content-based width)
                    "w-full",
                    // Consistent sizing
                    "h-11 px-3",
                    // Layout
                    "relative rounded-lg",
                    "flex items-center justify-center",
                    // Typography
                    "text-sm font-medium",
                    // Make shadcn defaults not fight us
                    "bg-transparent data-[state=active]:bg-transparent",
                    // Focus
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                    // Inactive vs active text
                    "text-muted-foreground data-[state=active]:text-foreground",
                    // Depth feel without changing layout (transforms don’t reflow)
                    "data-[state=active]:-translate-y-[1px]",
                  )}
                >
                  {/* Active “depth” pill (perfectly matches trigger width/height) */}
                  {isActive && (
                    <motion.span
                      layoutId="zoomDepthTabs-activePill"
                      className={cn(
                        "absolute inset-0 rounded-lg",
                        "bg-background",
                        "shadow-[0_6px_18px_-10px_rgba(0,0,0,0.35)]",
                        "ring-1 ring-border",
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 520,
                        damping: 38,
                      }}
                    />
                  )}

                  {/* Subtle highlight line to sell the “depth” */}
                  {isActive && (
                    <motion.span
                      layoutId="zoomDepthTabs-activeSheen"
                      className="absolute left-2 right-2 top-1 h-px rounded bg-foreground/10"
                      transition={{
                        type: "spring",
                        stiffness: 520,
                        damping: 38,
                      }}
                    />
                  )}

                  {/* Label (truncate so text never forces width changes) */}
                  <motion.span
                    className="relative z-10 block w-full truncate text-center"
                    animate={{
                      scale: isActive ? 1.03 : 1,
                      opacity: isActive ? 1 : 0.85,
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  >
                    {item.label}
                  </motion.span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Content */}
        <div className="mx-auto mt-5 w-full max-w-3xl">
          {/* Always match the active value so Radix shows this panel */}
          <TabsContent value={active} className="mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.995 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className={cn(
                  "rounded-xl border bg-card shadow-sm",
                  "p-5 sm:p-6",
                )}
              >
                {activeItem?.content}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
