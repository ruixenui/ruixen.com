"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCTAClick } from "@/lib/ga-events";
import ComponentShowcaseSection from "./component-showcase-section";

// FAQ data (kept same)
const ruixenFaqData = [
  {
    id: 1,
    question: "Is Ruixen UI production-ready?",
    answer:
      "Absolutely. Every component is optimized for real-world apps — fast, responsive, and battle-tested.",
  },
  {
    id: 2,
    question: "Do I need to know Tailwind to use Ruixen UI?",
    answer:
      "Nope. Ruixen UI works out of the box, but it's even more powerful if you're familiar with Tailwind.",
  },
  {
    id: 3,
    question: "Can I customize the components?",
    answer:
      "Yes! All components are fully customizable to match your brand and style guides.",
  },
  {
    id: 4,
    question: "Is Ruixen UI open-source?",
    answer:
      "Parts of it are. We offer both free and premium components — choose what fits your project.",
  },
  {
    id: 5,
    question: "Will Ruixen UI slow down my website?",
    answer:
      "Not a chance. Performance is at the core of every component — smooth, lightweight, and optimized.",
  },
];

function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden bg-background text-black dark:text-white transition-all duration-300">
      {/* HERO SECTION */}
      <section className="relative flex flex-col justify-center items-center w-full min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full container mx-auto flex flex-col items-center justify-center text-center">
          {/* Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative font-semibold leading-[1.1] tracking-tight text-center mx-auto
              text-[2rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]"
          >
            Ruixen UI: Lightweight & Customizable React Library
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-6 mx-auto max-w-2xl text-center text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-200"
          >
            Ruixen UI is a modern, fast, and customizable React component
            library built with Tailwind CSS, TypeScript, and accessibility in
            mind.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="https://pro.ruixen.com"
              target="_blank"
              onClick={() =>
                trackCTAClick({
                  location: "Hero",
                  cta_text: "Get Pro Access",
                })
              }
              className="group/pro relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl px-6 text-base font-medium text-foreground transition-shadow hover:shadow-lg hover:shadow-blue-500/25"
            >
              {/* Rotating blue border */}
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  padding: "2px",
                  background: "linear-gradient(var(--pro-angle, 0deg), #3b82f6, #60a5fa, #3b82f6, #2563eb, #3b82f6)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "pro-border-spin 3s linear infinite",
                }}
              />
              {/* White inner fill */}
              <span className="absolute inset-[2px] rounded-[10px] bg-background" />
              <span className="relative z-10">Get Pro Access</span>
            </Link>

            <Link
              href="/docs/components"
              onClick={() =>
                trackCTAClick({
                  location: "Hero",
                  cta_text: "Get Started",
                })
              }
              className="group/start relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl px-6 text-base font-medium text-white dark:text-black transition-shadow hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-white/20"
            >
              {/* Rotating border */}
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  padding: "2px",
                  background: "linear-gradient(var(--pro-angle, 0deg), #000, #555, #000, #333, #000)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "pro-border-spin 3s linear infinite",
                }}
              />
              {/* Inner fill */}
              <span className="absolute inset-[2px] rounded-[10px] bg-black dark:bg-white" />
              {/* Shine sweep */}
              <span
                className="absolute inset-[2px] rounded-[10px] opacity-0 group-hover/start:opacity-100"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "pro-shine 2s ease-in-out infinite",
                }}
              />
              <span className="relative z-10">Get Started</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator - positioned at bottom of section */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[1px] h-16 bg-gradient-to-b from-transparent via-foreground/40 to-foreground/60"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* COMPONENT SHOWCASE SECTION */}
      <div className="w-full flex justify-center -mt-32">
        <ComponentShowcaseSection />
      </div>
    </main>
  );
}

export default React.memo(Home);
