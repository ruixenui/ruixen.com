// "use client";

// import { Button } from "@/components/ui/button";
// import { ArrowRightIcon } from "lucide-react";
// import Link from "next/link";

// export default function PromoSection() {
//   return (
//     <div className="flex w-full flex-col items-center justify-center gap-y-3.5 rounded-xl border bg-indigo-600 p-5 text-white">
//       <h2 className="text-balance text-center text-lg font-semibold tracking-tighter">
//         Want to save time? Get beautifully designed website templates with
//         Ruixen UI Pro.
//       </h2>
//       <p className="text-balance text-center">
//         30+ beautiful sections and templates built with React, Typescript,
//         Tailwind CSS, and Motion.
//       </p>
//       <Button variant="default" asChild className="w-full">
//         <Link href="https://ruixen.com">
//           Get Pro
//           <ArrowRightIcon className="ml-2 size-4" />
//         </Link>
//       </Button>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

export default function PromoSection() {
  const [stars, setStars] = useState(0);
  const [targetStars, setTargetStars] = useState(0);
  const animationDuration = 2000; // ms
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Format stars number (1.5k, 2.3k, etc.)
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  // Animate star count
  const animateStars = useCallback(() => {
    const start = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / animationDuration, 1);
      setStars(Math.round(targetStars * progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [targetStars]);

  // Fetch GitHub repo stars
  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/ruixenui/ruixen.com",
        );
        if (!response.ok) throw new Error("Failed to fetch GitHub stars");
        const data = await response.json();
        setTargetStars(data.stargazers_count || 0);
      } catch (err) {
        console.error("GitHub stars fetch error:", err);
      }
    }
    fetchStars();
  }, []);

  // Animate stars when in view
  useEffect(() => {
    if (isInView && targetStars > 0) {
      animateStars();
    }
  }, [isInView, targetStars, animateStars]);

  return (
    <section
      ref={ref}
      className="w-full max-w-4xl mx-auto my-10 p-6 rounded-xl bg-indigo-600 text-white flex flex-col items-center gap-4 text-center"
      aria-label="Ruixen UI Components and Blogs"
    >
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">
        Explore 300+ free components and website templates
      </h2>

      <p className="text-base md:text-md max-w-xl">
        Browse beautifully designed React components, Tailwind CSS sections, and
        blog templates. Preview the website or explore the code on GitHub.
      </p>

      <div className="flex flex-col w-full gap-3 mt-4">
        <Button variant="default" asChild className="flex-1 justify-around">
          <Link href="https://ruixen.com" rel="noopener noreferrer">
            Website Preview
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>

        <Button
          variant="outline"
          className="flex-1 justify-around gap-2 relative"
        >
          <div className="flex items-center gap-2 z-10">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>

            <span>Star on GitHub</span>
            <StarIcon className="w-5 h-5 text-yellow-400" />

            <motion.span
              className="font-semibold tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formatNumber(stars)}
            </motion.span>
          </div>

          <Link
            href="https://github.com/ruixenui/ruixen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
            aria-label="Star Ruixen UI on GitHub"
          />
        </Button>
      </div>
    </section>
  );
}
