
export const codeStringCTA_01 = `"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CTA_01() {
  return (
    <section className="relative py-24 px-6 sm:px-10 bg-background overflow-hidden text-foreground">
      {/* Blurred glow in background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary rounded-full blur-3xl z-0 dark:opacity-10"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Text Section */}
        <div className="text-left">
          <Badge className="mb-4">Limited Access</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to speed up your product?
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-md">
            Supercharge development with our expertly designed components and battle-tested system.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Book a Demo
            </Button>
          </div>
        </div>

        {/* Interactive Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative bg-muted dark:bg-zinc-800/60 p-6 sm:p-10 rounded-xl border border-border shadow-md overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 dark:bg-primary/10 rounded-full blur-2xl z-0" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            <div className="relative w-40 h-40">
              <Image
                src="/ruixen_dark.png"
                alt="Ruixen Logo Dark"
                fill
                className="rounded-full object-cover block dark:hidden"
              />
              <Image
                src="/ruixen_light.png"
                alt="Ruixen Logo Light"
                fill
                className="rounded-full object-cover hidden dark:block"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
`;