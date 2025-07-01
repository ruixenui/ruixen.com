"use client";


import Link from "next/link";
import React, { useState, useEffect, Suspense, lazy } from "react";
import HomeNav from "@/components/ruixen/HomeNav";
import { Inter } from "next/font/google";
import { ArrowRight } from 'lucide-react'
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ruixen/Footer";

const inter = Inter({ subsets: ["latin"], weight: "500" });

function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const transitionVariants = {
        item: {
            hidden: {
                opacity: 0,
                filter: 'blur(12px)',
                y: 12,
            },
            visible: {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: {
                    type: "spring" as const,
                    bounce: 0.3,
                    duration: 1.5,
                },
            },
        },
    }

    return (
        <section>
            <HomeNav />
            <div className="flex justify-center items-center m-auto py-10 px-20 bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
                <div className={`${inter.className} relative min-h-screen bg-black overflow-hidden bg-white dark:bg-black text-black dark:text-white`}>
                    <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />

                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />

                    <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute left-0 bottom-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-zinc-500" />

                    <div className="text-left mx-auto container max-w-5xl bg-white dark:bg-black text-black dark:text-white">
                        <AnimatedGroup variants={transitionVariants} className="mt-40 bg-white dark:bg-black text-black dark:text-white">
                            <h1 className="mt-8 text-left text-5xl sm:text-6xl md:text-7xl xl:text-[6.5rem] font-extrabold leading-[1.1]">
                                Build Stunning UIs with <br />
                                <span className="inline-block whitespace-nowrap">
                                    <span className="ruixen-gradient-text">R</span>uixen<span className="ruixen-gradient-text">UI</span>
                                </span>
                            </h1>
                            <p className="mt-6 text-left text-lg text-muted-foreground">
                                Ruixen UI is a modern, fast, and customizable React component library built with Tailwind CSS, TypeScript, and accessibility in mind.
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
                                ...transitionVariants,
                            }}
                            className="mt-10 flex flex-col sm:flex-row items-start gap-3"
                        >
                            <div className="bg-white dark:bg-black text-black dark:text-white rounded-[14px] border p-0.5">
                                <Button asChild size="lg" className="rounded-xl px-5 text-base">
                                    <Link href="/docs">
                                        <span className="text-nowrap">Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                            <Button
                                asChild
                                size="lg"
                                variant="ghost"
                                className="h-10.5 rounded-xl px-5"
                            >
                                <Link href="/docs/sections/hero/hero-section">
                                    <span className="text-nowrap">Explore Components</span>
                                </Link>
                            </Button>
                        </AnimatedGroup>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default React.memo(Home);
