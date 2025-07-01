"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";

export const codeStringHero_01= `"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function HeroSection_01() {
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    "Built with Shadcn UI and Tailwind CSS",
    "Smooth animations and transitions",
    "Fully responsive and accessible",
    "Dark and light mode support"
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="w-full min-h-[90vh] bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={isLoaded ? { opacity: 0.3, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={isLoaded ? { opacity: 0.2, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-medium">Modern UI Components</span>
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Create stunning <span className="text-primary">interfaces</span> with smooth transitions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="mt-6 text-lg text-muted-foreground max-w-lg">
                Build beautiful, accessible, and performant user interfaces with our modern component library powered by Shadcn UI and Tailwind CSS.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                View Components
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative">
            <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
              <div className="aspect-video relative overflow-hidden rounded-lg border border-border mb-6">
                <Image src={"https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/tour.png"} width={100} height={100} alt="" className="w-full h-full rounded-lg" unoptimized />
              </div>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="text-primary shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="text-base text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};`;

export default function HeroSection_01() {
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    "Built with Shadcn UI and Tailwind CSS",
    "Smooth animations and transitions",
    "Fully responsive and accessible",
    "Dark and light mode support"
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={isLoaded ? { opacity: 0.3, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={isLoaded ? { opacity: 0.2, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-medium">Modern UI Components</span>
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Create stunning <span className="text-primary">interfaces</span> with smooth transitions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="mt-6 text-lg text-muted-foreground max-w-lg">
                Build beautiful, accessible, and performant user interfaces with our modern component library powered by Shadcn UI and Tailwind CSS.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                View Components
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative">
            <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
              <div className="aspect-video relative overflow-hidden rounded-lg border border-border mb-6">
                <Image src={"https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/tour.png"} width={100} height={100} alt="" className="w-full h-full rounded-lg" unoptimized />
              </div>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="text-primary shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="text-base text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
