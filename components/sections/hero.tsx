"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "../animated-group";

// Dynamically import non-critical components
// const HomeNav = dynamic(() => import("@/components/ruixen/HomeNav"), {
//   ssr: false,
//   loading: () => <div />,
// });
// const Footer = dynamic(() => import("@/components/ruixen/Footer"));
// const HeroAbout = dynamic(() => import("@/components/ruixen/HeroAbout"));
// const FaqAccordion = dynamic(() => import("@/components/ruixen/faq-accordion"));
// const HomeComponentsAd = dynamic(() => import("@/components/ruixen/HomeComponentsAd"));
// const WhosOnRuixen = dynamic(() => import("@/components/ruixen/WhosOnRuixen"));

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
  const transitionVariants = {
    item: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { type: "spring", bounce: 0.3, duration: 1.5 },
      },
    },
  };

  return (
    <section>
      <div className="flex justify-center my-24 xs:my-16 items-center mx-auto bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
        <div className="relative bg-white dark:bg-black">
          {/* Decorative Borders */}
          {/* Main Content */}
          <div className="relative z-10 text-left mx-auto max-w-5xl flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1">
              <AnimatedGroup preset="fade">
                <h1 className="relative text-[2rem] xs:text-[4rem] sm:text-[4rem] md:text-[6rem] lg:text-[6rem] xl:text-[6rem] font-semibold leading-[1.1] tracking-tight">
                  Customizable React UI Library <br />
                  <span className="inline-block whitespace-nowrap relative z-10">
                    <span className="ruixen-gradient-text">&</span>
                    <span className="relative">
                      <Image
                        width={300}
                        height={300}
                        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-object.png"
                        alt="3D Element"
                        className="
                        absolute 
                        -top-16 sm:-top-20 md:-top-24 lg:-top-28 xl:-top-32 
                        left-1/2 -translate-x-1/2 
                        w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] xl:w-[280px] 
                        z-10 
                        animate-floating
                      "
                        priority
                      />
                      <span className="relative z-20">Tailwind Templates</span>
                    </span>
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-200 max-w-2xl">
                  Ruixen UI is a modern, fast, and customizable React component
                  library built with Tailwind CSS, TypeScript, and accessibility
                  in mind.
                </p>
              </AnimatedGroup>

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
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-10"
              >
                <Button asChild size="lg" className="rounded-xl px-5 text-base">
                  <Link href="/docs/components/social-card">Get Started</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-5 text-base"
                >
                  <Link href="/templates">Get Templates</Link>
                </Button>
              </AnimatedGroup>

              <Suspense fallback={null}>{/* <WhosOnRuixen /> */}</Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* <Suspense fallback={null}>
        <HomeComponentsAd />
        <HeroAbout />
        <FaqAccordion
          data={ruixenFaqData}
          className=""
          questionClassName="bg-secondary hover:bg-secondary/80"
          answerClassName="bg-secondary text-secondary-foreground"
          timestamp="Updated daily at 12:00 PM"
        />
      </Suspense> */}
      {/* <Footer /> */}
    </section>
  );
}

export default React.memo(Home);
