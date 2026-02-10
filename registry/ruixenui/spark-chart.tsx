"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SparkChartProps {
  data: number[];
  color?: string;
  height?: number;
  formatValue?: (value: number) => string;
  onValueChange?: (value: number, index: number) => void;
  onActiveChange?: (active: boolean) => void;
  className?: string;
}

/* ─── Geometry ─────────────────────────────────────────── */

const VW = 400;
const LABEL_H = 26;
const PAD_B = 4;

function buildPath(data: number[], h: number): string {
  const n = data.length;
  if (n < 2) return "";

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: (i / (n - 1)) * VW,
    y: LABEL_H + (1 - (v - min) / range) * (h - LABEL_H - PAD_B),
  }));

  const t = 0.4;
  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];

    d += ` C ${p1.x + ((p2.x - p0.x) * t) / 3} ${
      p1.y + ((p2.y - p0.y) * t) / 3
    }, ${p2.x - ((p3.x - p1.x) * t) / 3} ${
      p2.y - ((p3.y - p1.y) * t) / 3
    }, ${p2.x} ${p2.y}`;
  }

  return d;
}

function findPointAtX(
  path: SVGPathElement,
  targetX: number,
): { x: number; y: number } {
  const total = path.getTotalLength();
  let lo = 0;
  let hi = total;

  for (let i = 0; i < 25; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).x < targetX) lo = mid;
    else hi = mid;
  }

  const pt = path.getPointAtLength((lo + hi) / 2);
  return { x: pt.x, y: pt.y };
}

function interpolate(
  data: number[],
  pct: number,
): { value: number; index: number } {
  const idx = pct * (data.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(Math.ceil(idx), data.length - 1);
  const t = idx - lo;
  return {
    value: data[lo] + (data[hi] - data[lo]) * t,
    index: Math.round(idx),
  };
}

/* ─── Component ────────────────────────────────────────── */

export function SparkChart({
  data,
  color = "hsl(217, 91%, 60%)",
  height = 160,
  formatValue,
  onValueChange,
  onActiveChange,
  className,
}: SparkChartProps) {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<SVGGElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [active, setActive] = useState(false);

  const pathD = useMemo(() => buildPath(data, height), [data, height]);
  const fillD = useMemo(
    () => (pathD ? `${pathD} L ${VW} ${height} L 0 ${height} Z` : ""),
    [pathD, height],
  );

  const update = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      const path = pathRef.current;
      if (!el || !path) return;

      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const svgX = pct * VW;
      const pt = findPointAtX(path, svgX);
      const pctY = pt.y / height;
      const { value, index } = interpolate(data, pct);

      if (dotRef.current) {
        dotRef.current.style.left = `${pct * 100}%`;
        dotRef.current.style.top = `${pctY * 100}%`;
      }
      if (lineRef.current) {
        lineRef.current.style.left = `${pct * 100}%`;
      }
      if (revealRef.current) {
        revealRef.current.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
      }
      if (labelRef.current && formatValue) {
        labelRef.current.style.left = `${pct * 100}%`;
        labelRef.current.textContent = formatValue(value);
      }

      onValueChange?.(value, index);
    },
    [data, height, formatValue, onValueChange],
  );

  const handleEnter = useCallback(
    (e: React.PointerEvent) => {
      setActive(true);
      onActiveChange?.(true);
      update(e.clientX);
    },
    [update, onActiveChange],
  );

  const handleLeave = useCallback(() => {
    setActive(false);
    onActiveChange?.(false);
    if (revealRef.current) {
      revealRef.current.style.clipPath = "inset(0 0% 0 0)";
    }
  }, [onActiveChange]);

  const handleMove = useCallback(
    (e: React.PointerEvent) => update(e.clientX),
    [update],
  );

  const gradMutedId = `sg-m-${uid}`;
  const gradColorId = `sg-c-${uid}`;

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none touch-none cursor-none", className)}
      style={{ height }}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
    >
      <svg
        viewBox={`0 0 ${VW} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradMutedId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={gradColorId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.14" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Muted base — full path, always visible (the "right side" on scrub) */}
        <g className="text-muted-foreground">
          <path d={fillD} fill={`url(#${gradMutedId})`} />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Colored overlay — full at rest, clips to scrub position on hover */}
        <g ref={revealRef} style={{ clipPath: "inset(0 0% 0 0)" }}>
          <path d={fillD} fill={`url(#${gradColorId})`} />
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={0}
            className="animate-[spark-draw_0.8s_ease-out]"
          />
        </g>
      </svg>

      {/* Scrub label */}
      {formatValue && (
        <span
          ref={labelRef}
          className={cn(
            "pointer-events-none absolute top-0 -translate-x-1/2",
            "rounded-md bg-muted px-2 py-0.5",
            "text-[13px] font-medium tabular-nums text-foreground",
            "transition-opacity duration-100",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* Scrub line */}
      <div
        ref={lineRef}
        className="pointer-events-none absolute top-0 bottom-0 w-px -translate-x-1/2 bg-border transition-opacity duration-100"
        style={{ opacity: active ? 1 : 0 }}
      />

      {/* Indicator dot */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-100"
        style={{
          backgroundColor: color,
          boxShadow: "0 0 0 2px #fff, 0 0 8px 2px rgba(0,0,0,0.12)",
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
}
