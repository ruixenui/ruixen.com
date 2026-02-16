"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface NeonCircleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer radius of each donut */
  outerRadius?: number;
  /** Inner radius (the hole) */
  innerRadius?: number;
  /** Center-to-center spacing */
  gap?: number;
  /** Colour on the dark / entering side of the fade */
  color?: string;
  /** Colour on the bright / exiting side (defaults to warm off-white) */
  colorBright?: string;
  /** Which side is bright */
  fadeFrom?: "left" | "right" | "top-left" | "top-right" | "center";
  /** 0–1 — how much stays fully dark before fade begins */
  fadeStart?: number;
  /** 0–1 — where the bright colour starts blending in (relative to fade) */
  colorBlend?: number;
}

export function NeonCircleGrid({
  className,
  outerRadius = 9,
  innerRadius = 3.5,
  gap = 20,
  color = "#3ECF8E",
  colorBright = "#D6E8D0",
  fadeFrom = "right",
  fadeStart = 0,
  colorBlend = 0.45,
  ...props
}: NeonCircleGridProps) {
  const uid = useId().replace(/:/g, "");

  const half = gap / 2;
  const midR = (outerRadius + innerRadius) / 2;
  const ringWidth = outerRadius - innerRadius;
  const shadowA = darken(color, 0.5);
  const shadowB = darken(colorBright, 0.3);

  // fade‑mask gradient coords
  const gradCoords: Record<
    string,
    { x1: string; y1: string; x2: string; y2: string }
  > = {
    left: { x1: "1", y1: "0.5", x2: "0", y2: "0.5" },
    right: { x1: "0", y1: "0.5", x2: "1", y2: "0.5" },
    "top-left": { x1: "1", y1: "1", x2: "0", y2: "0" },
    "top-right": { x1: "0", y1: "1", x2: "1", y2: "0" },
    center: { x1: "0.5", y1: "0.5", x2: "1", y2: "1" },
  };
  const gc = gradCoords[fadeFrom];
  const isCenter = fadeFrom === "center";

  /* helper: build a donut‑ring pattern tile */
  const ringPattern = (
    id: string,
    strokeColor: string,
    shadowColor: string,
  ) => (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
      {/* Main ring — thick stroke = perfectly centred donut */}
      <circle
        cx={half}
        cy={half}
        r={midR}
        fill="none"
        stroke={strokeColor}
        strokeWidth={ringWidth}
      />
      {/* Outer rim — dark edge */}
      <circle
        cx={half}
        cy={half}
        r={outerRadius - 0.25}
        fill="none"
        stroke={shadowColor}
        strokeWidth={0.5}
        opacity={0.45}
      />
      {/* Inner rim — dark edge around hole */}
      <circle
        cx={half}
        cy={half}
        r={innerRadius + 0.25}
        fill="none"
        stroke={shadowColor}
        strokeWidth={0.5}
        opacity={0.45}
      />
      {/* Mid-band highlight for subtle depth */}
      <circle
        cx={half}
        cy={half}
        r={midR}
        fill="none"
        stroke="white"
        strokeWidth={ringWidth * 0.25}
        opacity={0.07}
      />
    </pattern>
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-5%",
          width: "110%",
          height: "110%",
          animation: `_ncg-drift-${uid} 38s ease-in-out infinite`,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes _ncg-drift-${uid} {
            0%   { transform: translate(0, 0) rotate(0deg); }
            20%  { transform: translate(-8px, 5px) rotate(0.25deg); }
            40%  { transform: translate(5px, -7px) rotate(-0.15deg); }
            60%  { transform: translate(-5px, -8px) rotate(0.18deg); }
            80%  { transform: translate(7px, 3px) rotate(-0.1deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes _ncg-glow-${uid} {
            0%, 100% { opacity: 0.22; }
            50%      { opacity: 0.38; }
          }
        `}</style>
        <defs>
          {/* ── Two donut patterns: dark-side colour & bright-side colour ── */}
          {ringPattern(`pat-a-${uid}`, color, shadowA)}
          {ringPattern(`pat-b-${uid}`, colorBright, shadowB)}

          {/* ── Mask A: full fade (controls overall visibility) ── */}
          {isCenter ? (
            <radialGradient id={`fade-a-${uid}`} cx="0.5" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="white" stopOpacity={1} />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
          ) : (
            <linearGradient
              id={`fade-a-${uid}`}
              x1={gc.x1}
              y1={gc.y1}
              x2={gc.x2}
              y2={gc.y2}
            >
              <stop
                offset={`${fadeStart * 100}%`}
                stopColor="white"
                stopOpacity={0}
              />
              <stop offset="100%" stopColor="white" stopOpacity={1} />
            </linearGradient>
          )}
          <mask id={`mask-a-${uid}`}>
            <rect width="100%" height="100%" fill={`url(#fade-a-${uid})`} />
          </mask>

          {/* ── Mask B: bright-colour blend (kicks in later in the fade) ── */}
          {isCenter ? (
            <radialGradient id={`fade-b-${uid}`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="white" stopOpacity={1} />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
          ) : (
            <linearGradient
              id={`fade-b-${uid}`}
              x1={gc.x1}
              y1={gc.y1}
              x2={gc.x2}
              y2={gc.y2}
            >
              <stop
                offset={`${colorBlend * 100}%`}
                stopColor="white"
                stopOpacity={0}
              />
              <stop offset="100%" stopColor="white" stopOpacity={1} />
            </linearGradient>
          )}
          <mask id={`mask-b-${uid}`}>
            <rect width="100%" height="100%" fill={`url(#fade-b-${uid})`} />
          </mask>

          {/* ── Soft glow filter ── */}
          <filter
            id={`glow-${uid}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1.2"
              result="blur"
            />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer 1 — green circles (glow) */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#pat-a-${uid})`}
          mask={`url(#mask-a-${uid})`}
          filter={`url(#glow-${uid})`}
          style={{ animation: `_ncg-glow-${uid} 7s ease-in-out infinite` }}
        />
        {/* Layer 2 — green circles (sharp) */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#pat-a-${uid})`}
          mask={`url(#mask-a-${uid})`}
        />
        {/* Layer 3 — cream/bright circles on top (blends in on bright side) */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#pat-b-${uid})`}
          mask={`url(#mask-b-${uid})`}
        />
      </svg>
    </div>
  );
}

/* ── colour helpers ── */

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function darken(hex: string, amount: number) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}
