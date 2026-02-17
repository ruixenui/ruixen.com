"use client";

import { useId, useRef, useState, useEffect } from "react";

const GRADIENTS = [
  // Forest green
  {
    bg: "linear-gradient(145deg, #8ec63f 0%, #34a853 35%, #138567 65%, #04503e 100%)",
    accent: "#1e9660",
    vignette: "rgba(2,30,20,0.35)",
  },
  // Ocean blue
  {
    bg: "linear-gradient(145deg, #60a5fa 0%, #2563eb 35%, #1d4ed8 65%, #1e3a8a 100%)",
    accent: "#1d4ed8",
    vignette: "rgba(5,10,40,0.35)",
  },
  // Royal purple
  {
    bg: "linear-gradient(145deg, #c084fc 0%, #9333ea 35%, #7e22ce 65%, #4c1d95 100%)",
    accent: "#7e22ce",
    vignette: "rgba(20,5,40,0.35)",
  },
  // Sunset orange
  {
    bg: "linear-gradient(145deg, #fb923c 0%, #ea580c 35%, #c2410c 65%, #7c2d12 100%)",
    accent: "#c2410c",
    vignette: "rgba(30,10,2,0.35)",
  },
  // Caribbean teal
  {
    bg: "linear-gradient(145deg, #2dd4bf 0%, #0d9488 35%, #0f766e 65%, #134e4a 100%)",
    accent: "#0f766e",
    vignette: "rgba(2,25,25,0.35)",
  },
  // Cherry rose
  {
    bg: "linear-gradient(145deg, #fb7185 0%, #e11d48 35%, #be123c 65%, #881337 100%)",
    accent: "#be123c",
    vignette: "rgba(30,5,10,0.35)",
  },
  // Deep indigo
  {
    bg: "linear-gradient(145deg, #818cf8 0%, #6366f1 35%, #4f46e5 65%, #312e81 100%)",
    accent: "#4f46e5",
    vignette: "rgba(10,8,40,0.35)",
  },
  // Amber gold
  {
    bg: "linear-gradient(145deg, #fbbf24 0%, #f59e0b 35%, #d97706 65%, #78350f 100%)",
    accent: "#92400e",
    vignette: "rgba(30,15,2,0.35)",
  },
  // Slate storm
  {
    bg: "linear-gradient(145deg, #94a3b8 0%, #64748b 35%, #475569 65%, #1e293b 100%)",
    accent: "#334155",
    vignette: "rgba(8,10,15,0.35)",
  },
  // Coral pink
  {
    bg: "linear-gradient(145deg, #f472b6 0%, #ec4899 35%, #db2777 65%, #831843 100%)",
    accent: "#be185d",
    vignette: "rgba(30,5,15,0.35)",
  },
  // Lime
  {
    bg: "linear-gradient(145deg, #a3e635 0%, #84cc16 35%, #65a30d 65%, #365314 100%)",
    accent: "#4d7c0f",
    vignette: "rgba(10,25,2,0.35)",
  },
  // Sky cyan
  {
    bg: "linear-gradient(145deg, #22d3ee 0%, #06b6d4 35%, #0891b2 65%, #164e63 100%)",
    accent: "#0e7490",
    vignette: "rgba(2,15,25,0.35)",
  },
  // Crimson
  {
    bg: "linear-gradient(145deg, #f87171 0%, #ef4444 35%, #dc2626 65%, #7f1d1d 100%)",
    accent: "#b91c1c",
    vignette: "rgba(30,5,5,0.35)",
  },
];

function hashTitle(title: string): number {
  let hash = 6527;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function BlogThumbnail({
  title,
  tag,
  className = "",
  animated = false,
}: {
  title: string;
  tag?: string;
  className?: string;
  animated?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const coarseId = `gc-${id}`;
  const fineId = `gf-${id}`;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!animated);

  const gradient = GRADIENTS[hashTitle(title) % GRADIENTS.length];

  // Split title: last word becomes the highlight
  const words = title.replace(/[.!?]+$/, "").split(/\s+/);
  const highlightWord = words[words.length - 1];
  const brandText = words.slice(0, -1).join(" ");

  useEffect(() => {
    if (!animated) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ background: gradient.bg }}
    >
      {/* Grain noise */}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        style={{ isolation: "isolate" }}
      >
        <defs>
          <filter id={coarseId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves={4}
              stitchTiles="stitch"
              result="noise"
            />
            <feComponentTransfer in="noise" result="boosted">
              <feFuncR type="linear" slope={3} intercept={-0.8} />
              <feFuncG type="linear" slope={3} intercept={-0.8} />
              <feFuncB type="linear" slope={3} intercept={-0.8} />
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0" in="boosted" />
          </filter>
          <filter id={fineId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={3}
              stitchTiles="stitch"
              result="fnoise"
            />
            <feComponentTransfer in="fnoise" result="fboosted">
              <feFuncR type="linear" slope={2.5} intercept={-0.6} />
              <feFuncG type="linear" slope={2.5} intercept={-0.6} />
              <feFuncB type="linear" slope={2.5} intercept={-0.6} />
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0" in="fboosted" />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${coarseId})`}
          style={{ opacity: 0.85, mixBlendMode: "overlay" }}
        />
        <rect
          width="100%"
          height="100%"
          filter={`url(#${fineId})`}
          style={{ opacity: 0.5, mixBlendMode: "overlay" }}
        />
      </svg>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, ${gradient.vignette} 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col items-center justify-center p-5 md:p-8">
        {tag && (
          <span
            className="mb-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm"
            style={
              animated
                ? {
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.4s ease-out",
                  }
                : undefined
            }
          >
            {tag}
          </span>
        )}

        {animated ? (
          /* Animated mode: brand + highlight split */
          <div className="flex flex-wrap items-baseline justify-center gap-x-[0.25em] gap-y-1.5 text-2xl md:text-3xl lg:text-4xl">
            <span
              className="font-medium leading-tight tracking-tight text-white/90"
              style={{
                opacity: visible ? 1 : 0,
                transform: `translateY(${visible ? 0 : 10}px)`,
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              {brandText}
            </span>
            <span className="relative inline-flex items-center">
              <span
                className="absolute -inset-x-2 -inset-y-1 rounded-xl bg-white sm:-inset-x-3 sm:rounded-2xl"
                style={{
                  transformOrigin: "left center",
                  transform: `scaleX(${visible ? 1 : 0})`,
                  transition:
                    "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
                }}
              />
              <span
                className="relative z-10 font-bold tracking-tight"
                style={{
                  color: visible ? gradient.accent : "rgba(255,255,255,0.9)",
                  transition: "color 0.3s ease-out 0.5s",
                }}
              >
                {highlightWord}
              </span>
            </span>
          </div>
        ) : (
          /* Static mode: clean full title */
          <p className="max-w-[90%] text-balance text-center text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
