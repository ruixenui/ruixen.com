"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const COLORS = [
  "#facc15",
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#06b6d4",
  "#fbbf24",
  "#8b5cf6",
];

interface Particle {
  id: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  size: number;
  side: "left" | "right";
}

function generateBurst(): Particle[] {
  const particles: Particle[] = [];
  let id = 0;

  // Left burst — particles fan out to the left and downward
  for (let i = 0; i < 15; i++) {
    particles.push({
      id: id++,
      color: COLORS[i % COLORS.length],
      x: -(Math.random() * 120 + 30),
      y: Math.random() * 140 + 20,
      rotation: Math.random() * 540 - 270,
      scale: Math.random() * 0.5 + 0.4,
      delay: Math.random() * 0.2,
      size: Math.random() * 8 + 8,
      side: "left",
    });
  }

  // Right burst — particles fan out to the right and downward
  for (let i = 0; i < 15; i++) {
    particles.push({
      id: id++,
      color: COLORS[i % COLORS.length],
      x: Math.random() * 120 + 30,
      y: Math.random() * 140 + 20,
      rotation: Math.random() * 540 - 270,
      scale: Math.random() * 0.5 + 0.4,
      delay: Math.random() * 0.2,
      size: Math.random() * 8 + 8,
      side: "right",
    });
  }

  return particles;
}

export function ProBanner() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShine, setShowShine] = useState(true);
  const [particles] = useState(() => generateBurst());

  useEffect(() => {
    const showTimer = setTimeout(() => setShowConfetti(true), 400);
    const hideTimer = setTimeout(() => setShowConfetti(false), 2800);
    // Hide shine after animation completes
    const shineTimer = setTimeout(() => setShowShine(false), 1500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(shineTimer);
    };
  }, []);

  return (
    <div className="group relative top-0 overflow-visible bg-blue-600 py-3 text-white transition-all duration-300 md:py-0">
      {/* Shine/Glow container - overflow hidden to contain shine effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Shine overlay */}
        {showShine && (
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 80%, transparent 100%)",
              animation: "banner-shine 1.2s ease-out forwards",
            }}
          />
        )}
        {/* Glow pulse */}
        {showShine && (
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(96,165,250,0.5) 0%, transparent 70%)",
              animation: "banner-glow 1.2s ease-out forwards",
            }}
          />
        )}
      </div>
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://pro.ruixen.com"
          target="_blank"
          className="relative inline-flex text-sm leading-normal md:text-md"
        >
          {/* Left cracker origin */}
          {showConfetti && (
            <span
              className="pointer-events-none absolute -left-2 top-1/2 z-[9999]"
              aria-hidden="true"
            >
              {particles
                .filter((p) => p.side === "left")
                .map((p) => (
                  <span
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      left: 0,
                      top: 0,
                      opacity: 0,
                      animation: `confetti-pop 1.4s ease-out ${p.delay}s forwards`,
                      // @ts-expect-error CSS custom properties
                      "--cx": `${p.x}px`,
                      "--cy": `${p.y}px`,
                      "--cr": `${p.rotation}deg`,
                    }}
                  />
                ))}
            </span>
          )}

          <span className="text-[1rem] font-semibold">
            Ruixen Pro is now live.
          </span>
          <span className="text-[1rem] ml-2">
            30+ premium components, templates, blocks, and lifetime updates.
          </span>

          {/* Right cracker origin */}
          {showConfetti && (
            <span
              className="pointer-events-none absolute -right-2 top-1/2 z-[9999]"
              aria-hidden="true"
            >
              {particles
                .filter((p) => p.side === "right")
                .map((p) => (
                  <span
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      left: 0,
                      top: 0,
                      opacity: 0,
                      animation: `confetti-pop 1.4s ease-out ${p.delay}s forwards`,
                      // @ts-expect-error CSS custom properties
                      "--cx": `${p.x}px`,
                      "--cy": `${p.y}px`,
                      "--cr": `${p.rotation}deg`,
                    }}
                  />
                ))}
            </span>
          )}

          <ChevronRight className="ml-2 mt-[5px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </Link>
      </div>

      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />

      <style jsx global>{`
        @keyframes confetti-pop {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(0.2);
          }
          15% {
            opacity: 1;
            transform: translate(calc(var(--cx) * 0.3), calc(var(--cy) * 0.2))
              rotate(calc(var(--cr) * 0.3)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--cx), var(--cy)) rotate(var(--cr))
              scale(0.3);
          }
        }
        @keyframes banner-shine {
          0% {
            transform: translateX(-100%);
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        @keyframes banner-glow {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}

export function ProductHuntBanner() {
  return (
    <div className="group relative top-0 bg-[#ff6154] py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://www.producthunt.com/posts/ruixen-ui-2?utm_source=site-banner&utm_medium=banner&utm_campaign=product-hunt-banner"
          target="_blank"
          className="inline-flex text-xs leading-normal md:text-sm"
        >
          <span className="ml-1 font-[580] dark:font-[550]">
            Ruixen UI is live on Product Hunt Today! Show your support and vote
            for us.
          </span>
          <ChevronRight className="ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}

export function SiteBanner() {
  const pathname = usePathname();

  // Don't render banner on showcase page
  if (pathname === "/showcase") {
    return null;
  }

  return <ProBanner />;
}
