"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import HomeNav from "@/components/ruixen/HomeNav";
import { Inter } from "next/font/google";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ruixen/Footer";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: "500" });

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const images = [
        "/components/cards/dark/card-01.png",
        "/components/cards/dark/card-02.png",
        "/components/cards/dark/card-03.png",
        "/components/cards/dark/card-04.png",
        "/components/cards/dark/card-05.png",
    ];

    const wavePath = [
        { x: -300, y: 80, scale: 0.6, z: 0 },
        { x: -150, y: -40, scale: 0.8, z: 1 },
        { x: 0, y: 0, scale: 1.5, z: 3 },
        { x: 150, y: -40, scale: 0.8, z: 1 },
        { x: 300, y: 80, scale: 0.6, z: 0 },
    ];
    

    const animateSlider = (newIndex: number) => {
        if (!sliderRef.current) return;

        const imgEls = sliderRef.current.querySelectorAll<HTMLImageElement>(".wave-image");

        imgEls.forEach((img, i) => {
            const relativeIndex = (i - newIndex + images.length) % images.length;
            const pathIndex = relativeIndex < wavePath.length ? relativeIndex : -1;

            if (pathIndex >= 0) {
                const target = wavePath[pathIndex];

                gsap.to(img, {
                    x: target.x,
                    y: target.y,
                    scale: target.scale,
                    zIndex: target.z,
                    duration: 1,
                    ease: "none", // Constant speed movement
                });
            } else {
                gsap.to(img, {
                    x: 300,
                    y: 100,
                    scale: 0.5,
                    zIndex: 0,
                    duration: 1,
                    ease: "none",
                });
            }
        });

        setCurrentIndex(newIndex);
    };

    const nextSlide = () => animateSlider((currentIndex + 1) % images.length);
    const prevSlide = () => animateSlider((currentIndex - 1 + images.length) % images.length);

    useEffect(() => {
        animateSlider(currentIndex);
    }, []);

    useEffect(() => {
        animateSlider(currentIndex);
    
        const interval = setInterval(() => {
            nextSlide();
        }, 2500); // Change 2500 to control loop speed
    
        return () => clearInterval(interval);
    }, [currentIndex]);
    

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
            <div className="flex justify-center items-center m-auto py-10 px-20 bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
                <div className={`${inter.className} relative min-h-screen bg-black overflow-hidden bg-white dark:bg-black text-black dark:text-white`}>
                    
                    {/* Borders */}
                    <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
                    <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute left-0 bottom-0 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-zinc-500" />

                    {/* Main Content */}
                    <div className="text-left mx-auto container bg-white dark:bg-black text-black dark:text-white flex flex-col md:flex-row gap-10 items-center">
                        <div className="flex-1">
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
                                    container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
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
                                <Button asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
                                    <Link href="/docs/sections/hero/hero-section">
                                        <span className="text-nowrap">Explore Components</span>
                                    </Link>
                                </Button>
                            </AnimatedGroup>
                        </div>

                        {/* Wave Slider beside content */}
                        <div className="flex-1 relative h-64 overflow-visible">
                            <div ref={sliderRef} className="relative h-full w-full">
                                {images.map((src, index) => (
                                    <Image
                                        key={index}
                                        src={src}
                                        alt="Slider"
                                        width={128}
                                        height={128}
                                        className={`wave-image absolute top-24 left-1/2 -translate-x-1/2 w-52 h-52 object-cover rounded-xl border border-white shadow-xl`}
                                        style={{ transform: "translate(0px, 0px)" }}
                                    />
                                ))}
                            </div>

                            {/* Controls */}
                            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 flex items-center gap-4">
                                <button onClick={prevSlide} className="p-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700">
                                    <ArrowLeft size={18} />
                                </button>
                                <button onClick={nextSlide} className="p-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default React.memo(Home);
