"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedTabs } from "@/components/layouts/scroll-header/animated-tabs";

const tabs = [
  { label: "Home", value: "home", href: "/preview/layouts/scroll-header" },
  {
    label: "About",
    value: "about",
    href: "/preview/layouts/scroll-header/about",
  },
  {
    label: "Contact",
    value: "contact",
    href: "/preview/layouts/scroll-header/contact",
  },
  {
    label: "Danger Zone",
    value: "danger-zone",
    href: "/preview/layouts/scroll-header/danger-zone",
  },
];

// Spring profile tuned for scroll-linked motion: tight, near-critical damping,
// low mass. Responds quickly, settles cleanly, no visible overshoot.
const SCROLL_SPRING = { stiffness: 500, damping: 50, mass: 0.5 } as const;

export function ScrollHeader() {
  // Read the window scroll position as a motion value (rAF-driven,
  // passive listener, no React state, no re-renders per frame).
  const { scrollY } = useScroll();

  // Logo shrink: scale 1 → 0.8 over the first 33px of scroll.
  const logoScaleRaw = useTransform(scrollY, [0, 33], [1, 0.8], {
    clamp: true,
  });
  const logoScale = useSpring(logoScaleRaw, SCROLL_SPRING);

  // Tab strip nudges right 0 → 40px over the first 80px of scroll to
  // clear space for the shrunken logo corner.
  const tabXRaw = useTransform(scrollY, [0, 80], [0, 40], { clamp: true });
  const tabX = useSpring(tabXRaw, SCROLL_SPRING);

  return (
    <>
      <header className="relative w-full bg-background">
        <motion.div
          className="fixed left-0 top-0 z-50 pl-5 pt-5"
          style={{ scale: logoScale, transformOrigin: "0 0" }}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-foreground">
            <Sparkles className="h-3 w-3 text-background" />
          </div>
        </motion.div>

        <div className="flex items-center justify-between px-5 pb-0 pl-14 pt-3 font-mono">
          <div className="flex items-center gap-2">
            <Link
              href="/layouts"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Layouts
            </Link>
            <span className="text-sm font-medium text-muted-foreground">/</span>
            <span className="text-sm font-medium">Scroll Header</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-40 overflow-x-hidden border-b border-border bg-background">
        <div className="flex items-center justify-center">
          <motion.div
            className="flex flex-1 justify-center"
            style={{ x: tabX }}
          >
            <AnimatedTabs tabs={tabs} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
