"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WallOfLove() {
  const floatingCards = [
    { id: 1, x: "10%", y: "20%", delay: 0, rotate: -12 },
    { id: 2, x: "75%", y: "15%", delay: 0.2, rotate: 8 },
    { id: 3, x: "20%", y: "65%", delay: 0.4, rotate: -6 },
    { id: 4, x: "80%", y: "60%", delay: 0.6, rotate: 15 },
    { id: 5, x: "50%", y: "10%", delay: 0.3, rotate: -3 },
    { id: 6, x: "5%", y: "45%", delay: 0.5, rotate: 10 },
    { id: 7, x: "90%", y: "40%", delay: 0.1, rotate: -8 },
  ];

  return (
    <section className="w-full bg-background relative overflow-hidden py-24 px-4">
      {/* Floating placeholder cards in background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingCards.map((card) => (
          <motion.div
            key={card.id}
            className="absolute w-48 h-32 md:w-56 md:h-36"
            style={{ left: card.x, top: card.y }}
            initial={{ opacity: 0, scale: 0.8, rotate: card.rotate }}
            animate={{
              opacity: 0.15,
              scale: 1,
              rotate: card.rotate,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: card.delay },
              scale: { duration: 0.8, delay: card.delay },
              y: {
                duration: 4 + card.id * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              },
            }}
          >
            <div className="w-full h-full rounded-2xl border border-border bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-muted-foreground/20" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 w-16 bg-muted-foreground/20 rounded" />
                  <div className="h-1.5 w-12 bg-muted-foreground/10 rounded" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-muted-foreground/15 rounded" />
                <div className="h-2 w-4/5 bg-muted-foreground/15 rounded" />
                <div className="h-2 w-3/5 bg-muted-foreground/15 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl mb-4">
            Wall of{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
                Love
              </span>
              <motion.span
                className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 blur-xl rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            We&apos;d love to feature your experience here
          </p>
        </motion.div>

        {/* Empty state container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-lg"
        >
          {/* Main card */}
          <div className="relative bg-background/95 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-12">
            {/* Empty speech bubbles illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Main bubble */}
                <motion.div
                  className="w-24 h-20 rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-border flex items-center justify-center"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MessageCircle className="w-8 h-8 text-muted-foreground/30" />
                </motion.div>
                {/* Bubble tail */}
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-muted border-l border-b border-border rotate-[-45deg]" />
              </div>
            </div>

            {/* Text content */}
            <div className="text-center space-y-3 mb-8">
              <h3 className="text-xl font-semibold text-foreground">
                Be the first to share
              </h3>
              <p className="text-muted-foreground">
                Share your experience with Ruixen UI and get featured here!
              </p>
            </div>

            {/* Share on X button */}
            <div className="flex justify-center">
              <Link
                href="https://twitter.com/intent/tweet?text=I%20tried%20%40ruixen_ui%20and%20%5Byour%20experience%5D%20%E2%80%94%20check%20it%20out%20at%20https%3A%2F%2Fruixen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-black/80 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Share on X</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center gap-2 text-muted-foreground/50"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
          <Heart className="w-4 h-4" fill="currentColor" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </div>
    </section>
  );
}
