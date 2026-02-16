"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { trackCTAClick } from "@/lib/ga-events";
import { HeroTitleAnimation } from "@/registry/ruixenui/hero-title-animation";

const CLI_COMMAND = 'npx shadcn@latest add "https://ruixen.com/r/[component]"';

function Home() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CLI_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden bg-background text-black dark:text-white transition-all duration-300">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Label */}
          <div
            className="flex justify-center mb-5"
            style={{
              opacity: mounted ? 1 : 0,
              transform: `translateY(${mounted ? 0 : 8}px)`,
              transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            }}
          >
            <Link
              href="https://pro.ruixen.com"
              target="_blank"
              className="inline-block text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/35 hover:text-foreground/50 transition-colors duration-150"
            >
              Unlock the Full System
            </Link>
          </div>

          <HeroTitleAnimation />

          {/* Subtitle */}
          <p
            className="mt-5 mx-auto max-w-4xl text-center text-[15px] sm:text-base leading-relaxed text-foreground/50"
            style={{
              opacity: mounted ? 1 : 0,
              transform: `translateY(${mounted ? 0 : 16}px)`,
              transition:
                "opacity 0.5s ease-out 2.8s, transform 0.5s ease-out 2.8s",
            }}
          >
            A design-engineered set of production-ready components built for
            clarity and control. Customize, extend, and scale with confidence.
            Start with a strong foundation. Make it yours. Open source. Open
            architecture.
          </p>

          {/* CLI + Quick Start */}
          <div
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: `translateY(${mounted ? 0 : 20}px)`,
              transition:
                "opacity 0.6s ease-out 3.0s, transform 0.6s ease-out 3.0s",
            }}
          >
            {/* CLI command box */}
            <div className="flex items-center gap-3 rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-2.5">
              <code className="text-[13px] sm:text-sm font-mono text-foreground/50 select-all">
                {CLI_COMMAND}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 text-foreground/30 hover:text-foreground/60 transition-colors duration-150"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>

            {/* Quick Start button */}
            <Link
              href="/docs/components"
              onClick={() =>
                trackCTAClick({
                  location: "Hero",
                  cta_text: "Quick Start",
                })
              }
              className="group/start relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl px-5 text-sm font-medium text-background transition-shadow hover:shadow-lg hover:shadow-foreground/20"
            >
              <span className="absolute inset-0 rounded-xl bg-foreground" />
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover/start:opacity-100"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "pro-shine 2s ease-in-out infinite",
                }}
              />
              <span className="relative z-10">Quick Start</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default React.memo(Home);
