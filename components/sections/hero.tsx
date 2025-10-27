"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "../animated-group";
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
  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
      {/* HERO SECTION */}
      <section className="flex flex-col justify-center items-center w-full min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="relative w-full container mx-auto flex flex-col items-center justify-center text-center">
          {/* Hero Text */}
          <AnimatedGroup preset="fade">
            <h1
              className="relative font-semibold leading-[1.1] tracking-tight text-center mx-auto
              text-[2rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]"
            >
              Ruixen UI: Lightweight & Customizable React Library
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-center text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-200">
              Ruixen UI is a modern, fast, and customizable React component
              library built with Tailwind CSS, TypeScript, and accessibility in
              mind.
            </p>
          </AnimatedGroup>

          {/* CTA Buttons */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              asChild
              size="md"
              className="rounded-xl px-5 text-base"
              onClick={() =>
                trackCTAClick({
                  location: "Hero",
                  cta_text: "Get Started",
                })
              }
            >
              <Link href="/docs/components">Get Started</Link>
            </Button>

            <Button
              asChild
              size="md"
              variant="outline"
              className="rounded-xl px-5 text-base"
              onClick={() =>
                trackCTAClick({
                  location: "Hero",
                  cta_text: "Get Templates",
                })
              }
            >
              <Link href="/templates">Get Templates</Link>
            </Button>
          </AnimatedGroup>
        </div>
      </section>

      {/* COMPONENT SHOWCASE SECTION */}
      <div className="w-full flex justify-center -mt-32">
        <ComponentShowcaseSection />
      </div>
    </main>
  );
}

export default React.memo(Home);
