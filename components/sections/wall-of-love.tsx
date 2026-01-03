"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "X",
    url: "https://twitter.com/ruixen_ui",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/ruixenui",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/ruixen",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    url: "https://discord.gg/ruixen",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
];

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

            {/* Social links */}
            <div className="flex justify-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-border text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
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
