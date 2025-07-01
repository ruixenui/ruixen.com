"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const codeStringHero_03 = `"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection_03() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
            🚀 Next-Gen Innovation
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 leading-tight">
            Build the Future <br />
            with <span className="underline decoration-wavy decoration-purple-400">Elegant Code</span>
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Empower developers with scalable components, clean architecture, and blazing-fast UI. Make your product unforgettable.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <Card className="bg-background/70 backdrop-blur-xl border border-border shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">✨ Real-time Collaboration</h3>
              <p className="text-muted-foreground text-sm">
                Built with secure sockets, fast sync, and instant updates. Powered by Next.js & Spring Boot.
              </p>
            </CardContent>
          </Card>

          <div className="absolute top-[-2rem] right-[-2rem] w-24 h-24 bg-indigo-400 blur-2xl rounded-full opacity-50 z-[-1]" />
          <div className="absolute bottom-[-2rem] left-[-2rem] w-32 h-32 bg-purple-500 blur-3xl rounded-full opacity-40 z-[-1]" />
        </motion.div>
      </div>
    </section>
  );
}
`;

export default function HeroSection_03() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
            🚀 Next-Gen Innovation
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 leading-tight">
            Build the Future <br />
            with <span className="underline decoration-wavy decoration-purple-400">Elegant Code</span>
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Empower developers with scalable components, clean architecture, and blazing-fast UI. Make your product unforgettable.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <Card className="bg-background/70 backdrop-blur-xl border border-border shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">✨ Real-time Collaboration</h3>
              <p className="text-muted-foreground text-sm">
                Built with secure sockets, fast sync, and instant updates. Powered by Next.js & Spring Boot.
              </p>
            </CardContent>
          </Card>

          <div className="absolute top-[-2rem] right-[-2rem] w-24 h-24 bg-indigo-400 blur-2xl rounded-full opacity-50 z-[-1]" />
          <div className="absolute bottom-[-2rem] left-[-2rem] w-32 h-32 bg-purple-500 blur-3xl rounded-full opacity-40 z-[-1]" />
        </motion.div>
      </div>
    </section>
  );
}
