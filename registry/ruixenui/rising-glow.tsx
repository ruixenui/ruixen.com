"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RisingGlowProps {
  /** Text content to wrap */
  children: React.ReactNode;
  /** Glow color (hex) */
  color?: string;
  /** Number of rising particles */
  particleCount?: number;
  /** Text-shadow spread radius in pixels */
  spread?: number;
  /** Additional CSS classes */
  className?: string;
}

interface Seed {
  x: number;
  speed: number;
  size: number;
  drift: number;
  phase: number;
  opacity: number;
}

export function RisingGlow({
  children,
  color = "#3b82f6",
  particleCount = 24,
  spread = 30,
  className,
}: RisingGlowProps) {
  const textRef = React.useRef<HTMLDivElement>(null);
  const cvsRef = React.useRef<HTMLCanvasElement>(null);
  const frameRef = React.useRef<number>(0);

  const seeds = React.useMemo<Seed[]>(
    () =>
      Array.from({ length: particleCount }, () => ({
        x: Math.random(),
        speed: Math.random() * 0.2 + 0.08,
        size: Math.random() * 2 + 1,
        drift: (Math.random() - 0.5) * 14,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.15,
      })),
    [particleCount],
  );

  React.useEffect(() => {
    const txt = textRef.current;
    const cvs = cvsRef.current;
    if (!txt || !cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width, height } = txt.getBoundingClientRect();
      const totalH = height * 2;
      cvs.width = Math.round(width * dpr);
      cvs.height = Math.round(totalH * dpr);
      cvs.style.width = `${width}px`;
      cvs.style.height = `${totalH}px`;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(txt);

    const t0 = performance.now();

    const paint = (now: number) => {
      const { width: w, height: h } = txt.getBoundingClientRect();
      const totalH = h * 2;
      const t = (now - t0) / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, totalH);

      /* soft radial glow at bottom center */
      const g = ctx.createRadialGradient(
        w / 2,
        totalH * 0.75,
        0,
        w / 2,
        totalH * 0.75,
        w * 0.45,
      );
      g.addColorStop(0, color + "30");
      g.addColorStop(0.6, color + "10");
      g.addColorStop(1, color + "00");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, totalH);

      /* rising particles */
      ctx.fillStyle = color;
      for (const p of seeds) {
        const progress = (t * p.speed + p.x) % 1;
        const px = p.x * w + Math.sin(t * 0.5 + p.phase) * p.drift;
        const py = totalH * (1 - progress);

        const fadeIn = Math.min(progress * 5, 1);
        const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
        ctx.globalAlpha = p.opacity * fadeIn * fadeOut;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(paint);
    };

    frameRef.current = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [color, seeds]);

  return (
    <div className={cn("relative inline-block", className)}>
      <canvas
        ref={cvsRef}
        className="pointer-events-none absolute inset-x-0 bottom-0"
      />
      <div
        ref={textRef}
        className="relative"
        style={{
          textShadow: `0 0 ${spread}px ${color}50, 0 0 ${spread * 2}px ${color}28, 0 0 ${spread * 3}px ${color}14`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default RisingGlow;
