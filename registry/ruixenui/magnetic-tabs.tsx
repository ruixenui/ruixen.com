"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface MagneticTabsProps {
  items?: MagneticTabItem[];
  defaultValue?: string;
  className?: string;
  indicatorPadding?: number; // padding around tab for indicator
}

export default function MagneticTabs({
  items = [
    { value: "overview", label: "Overview", content: "Overview content here." },
    { value: "activity", label: "Activity", content: "Activity content here." },
    { value: "settings", label: "Settings", content: "Settings content here." },
    { value: "faq", label: "FAQ", content: "FAQ content here." },
  ],
  defaultValue = "overview",
  className,
  indicatorPadding = 6,
}: MagneticTabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  const [hovered, setHovered] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorX = useMotionValue(0);
  const indicatorWidth = useMotionValue(0);
  const indicatorTop = useMotionValue(0);
  const indicatorHeight = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25 };
  const springX = useSpring(indicatorX, springConfig);
  const springW = useSpring(indicatorWidth, springConfig);
  const springTop = useSpring(indicatorTop, springConfig);
  const springH = useSpring(indicatorHeight, springConfig);

  const updateIndicator = (value: string) => {
    const idx = items.findIndex((item) => item.value === value);
    const btn = tabRefs.current[idx];
    const container = containerRef.current;
    if (btn && container) {
      const cRect = container.getBoundingClientRect();
      const tRect = btn.getBoundingClientRect();
      indicatorX.set(tRect.left - cRect.left - indicatorPadding);
      indicatorWidth.set(tRect.width + indicatorPadding * 2);
      indicatorTop.set(tRect.top - cRect.top - indicatorPadding);
      indicatorHeight.set(tRect.height + indicatorPadding * 2);
    }
  };

  React.useEffect(() => {
    updateIndicator(active);
    const ro = new ResizeObserver(() => updateIndicator(active));
    if (containerRef.current) ro.observe(containerRef.current);
    tabRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", () => updateIndicator(active));
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", () => updateIndicator(active));
    };
  }, [active, indicatorPadding]);

  React.useEffect(() => {
    if (hovered) updateIndicator(hovered);
    else updateIndicator(active);
  }, [hovered, active, indicatorPadding]);

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
        <TabsList
          ref={containerRef}
          className="relative flex justify-center gap-2 p-2 bg-background/60 "
        >
          {/* Magnetic Indicator */}
          <motion.div
            style={{
              left: springX,
              width: springW,
              top: springTop,
              height: springH,
            }}
            className="absolute rounded-lg bg-primary/30 pointer-events-none"
          >
            <motion.div
              className={cn(
                "absolute inset-0 rounded-lg filter blur-md opacity-40",
              )}
              initial={false}
              animate={{ opacity: 0.4 }}
            />
          </motion.div>

          {items.map((item, i) => (
            <TabsTrigger
              key={item.value}
              ref={(el) => (tabRefs.current[i] = el)}
              value={item.value}
              asChild
              onMouseEnter={() => setHovered(item.value)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.button
                className={cn(
                  "relative z-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active === item.value ? "text-white" : "text-foreground/80",
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {item.label}
              </motion.button>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-4 w-full max-w-lg relative">
          <AnimatePresence mode="wait">
            {items.map(
              (item) =>
                item.value === active && (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    className="absolute inset-0 p-4 bg-card rounded-lg"
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
