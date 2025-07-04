"use client";

import Link from "next/link";
import React from "react";
import HomeNav from "@/components/ruixen/HomeNav";
import { Inter } from "next/font/google";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ruixen/Footer";
import HeroTabsSection from "@/components/ruixen/HeroTabsSection";
import HeroAbout from "@/components/ruixen/HeroAbout";
import Explore from "@/components/ruixen/Explore";
import FaqAccordion from "@/components/ruixen/faq-accordion";

const inter = Inter({ subsets: ["latin"], weight: "500" });

const ruixenFaqData = [
    {
      id: 1,
      question: "Is Ruixen UI production-ready?",
      answer: "Absolutely. Every component is optimized for real-world apps — fast, responsive, and battle-tested.",
      icon: "🚀",
    },
    {
      id: 2,
      question: "Do I need to know Tailwind to use Ruixen UI?",
      answer: "Nope. Ruixen UI works out of the box, but it's even more powerful if you're familiar with Tailwind.",
    },
    {
      id: 3,
      question: "Can I customize the components?",
      answer: "Yes! All components are fully customizable to match your brand and style guides.",
      icon: "🎨",
    },
    {
      id: 4,
      question: "Is Ruixen UI open-source?",
      answer: "Parts of it are. We offer both free and premium components — choose what fits your project.",
    },
    {
      id: 5,
      question: "Will Ruixen UI slow down my website?",
      answer: "Not a chance. Performance is at the core of every component — smooth, lightweight, and optimized.",
      icon: "⚡",
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
                transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
            },
        },
    };

    return (
        <section>
            <HomeNav />
            <div className="flex justify-center items-center m-auto pt-10 px-20 bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
                <div className={`${inter.className} relative min-h-screen bg-black overflow-hidden bg-white dark:bg-black text-black dark:text-white`}>

                    {/* Borders */}
                    <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
                    {/* <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute left-0 bottom-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-zinc-500" /> */}

                    {/* Main Content */}
                    <div className="text-left mx-auto container bg-white dark:bg-black text-black dark:text-white flex flex-col md:flex-row gap-10 items-center">
                        <div className="flex-1">
                            <AnimatedGroup variants={transitionVariants} className="mt-40 bg-white dark:bg-black text-black dark:text-white">
                                <h1 className="relative mt-8 text-left text-[3.5rem] sm:text-[5rem] md:text-[6rem] xl:text-[7.5rem] font-extrabold leading-[1.1]">
                                    Build Stunning UIs with <br />
                                    <span className="inline-block whitespace-nowrap relative z-10">
                                        <span className="ruixen-gradient-text relative z-30">R</span>

                                        {/* Floating 3D image behind "uixen" */}
                                        <span className="relative z-10 inline-block">
                                            <img
                                                src="/3d-model.png"
                                                alt="3D Element"
                                                className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] z-10 pointer-events-none animate-floating"
                                            />
                                            <span className="relative z-20">uixen</span>
                                        </span>

                                        <span className="ruixen-gradient-text relative z-30">UI</span>
                                    </span>
                                </h1>

                                <p className="mt-6 text-left text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-200 relative z-40">
                                    Ruixen UI is a modern, fast, and customizable React component library built with Tailwind CSS, TypeScript, and accessibility in mind.
                                </p>
                            </AnimatedGroup>

                            <AnimatedGroup
                                variants={{
                                    container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                                    ...transitionVariants,
                                }}
                                className="mt-10 flex flex-col sm:flex-row items-start gap-3 mb-10"
                            >
                                <div className="bg-white dark:bg-black text-black dark:text-white rounded-[14px] border p-0.5">
                                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                                        <Link href="/docs">
                                            <span className="text-nowrap">Get Started</span>
                                        </Link>
                                    </Button>
                                </div>
                                <Button asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
                                    <Link href="/docs/sections/hero/hero-section">
                                        <span className="text-nowrap">Explore Components</span>
                                    </Link>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>
                </div>
            </div>
            {/* <HeroTabsSection /> */}
            <HeroAbout />
            <Explore />
            <FaqAccordion data={ruixenFaqData} className=""
                questionClassName="bg-secondary hover:bg-secondary/80"
                answerClassName="bg-secondary text-secondary-foreground"
                timestamp="Updated daily at 12:00 PM"/>
            <Footer />
        </section>
    );
}

export default React.memo(Home);
