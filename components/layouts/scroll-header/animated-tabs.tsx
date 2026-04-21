"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Transition } from "motion/react";

import useTabs, { type Tab } from "@/hooks/layouts/use-tabs";
import { cn } from "@/lib/utils";

interface AnimatedTabsProps {
  tabs: Tab[];
}

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
};

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
  x: hoveredRect.left - navRect.left - 10,
  y: hoveredRect.top - navRect.top - 4,
  width: hoveredRect.width + 20,
  height: hoveredRect.height + 10,
});

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: {
  tabs: Tab[];
  selectedTabIndex: number;
  setSelectedTab: (input: [number, number]) => void;
}) => {
  const [buttonRefs, setButtonRefs] = React.useState<
    Array<HTMLAnchorElement | null>
  >([]);

  React.useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = React.useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(
    null,
  );
  const hoveredRect =
    buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  return (
    <nav
      ref={navRef}
      className="relative flex flex-shrink-0 items-center justify-center py-2"
      onPointerLeave={() => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i;
        return (
          <Link
            key={item.value}
            href={item.href || "#"}
            className="relative z-20 flex h-8 cursor-pointer select-none items-center rounded-md bg-transparent px-4 transition-colors"
            onPointerEnter={() => setHoveredTabIndex(i)}
            onFocus={() => setHoveredTabIndex(i)}
            onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
          >
            <motion.span
              ref={(el) => {
                buttonRefs[i] = el as HTMLAnchorElement;
              }}
              className={cn("block text-sm", {
                "text-zinc-500": !isActive,
                "font-semibold text-black dark:text-white": isActive,
              })}
            >
              <span
                className={item.value === "danger-zone" ? "text-red-500" : ""}
              >
                {item.label}
              </span>
            </motion.span>
          </Link>
        );
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={`absolute left-0 top-0 z-10 rounded-md ${
              hoveredTabIndex ===
              tabs.findIndex(({ value }) => value === "danger-zone")
                ? "bg-red-100 dark:bg-red-500/30"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
            initial={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            animate={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 1,
            }}
            exit={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            transition={transition as Transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={`absolute bottom-0 left-0 z-10 h-[2px] ${
              selectedTabIndex ===
              tabs.findIndex(({ value }) => value === "danger-zone")
                ? "bg-red-500"
                : "bg-black dark:bg-white"
            }`}
            initial={false}
            animate={{
              width: selectedRect.width + 18,
              x: `calc(${selectedRect.left - navRect.left - 9}px)`,
              opacity: 1,
            }}
            transition={transition as Transition}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const pathname = usePathname();

  const [hookProps] = React.useState(() => {
    const matchedTab =
      tabs.find((tab) => tab.href && pathname?.startsWith(tab.href)) ?? tabs[0];
    return {
      tabs: tabs.map(({ label, value, subRoutes, href }) => ({
        label,
        value,
        subRoutes,
        href,
      })),
      initialTabId: matchedTab.value,
    };
  });

  const framer = useTabs(hookProps);

  return (
    <div className="relative flex w-full items-start justify-start overflow-x-auto overflow-y-hidden">
      <Tabs {...framer.tabProps} />
    </div>
  );
}
