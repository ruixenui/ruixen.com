"use client";

import * as React from "react";
import { Square } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LiveWaveformProps {
  /** Enable real-time microphone input visualization */
  active?: boolean;
  /** Show animated processing wave pattern */
  processing?: boolean;
  /** Bar width in pixels */
  barWidth?: number;
  /** Gap between bars in pixels */
  barGap?: number;
  /** Bar corner radius */
  barRadius?: number;
  /** Bar color — inherits currentColor when unset */
  barColor?: string;
  /** Waveform height in pixels */
  height?: number;
  /** Apply gradient fade at edges */
  fadeEdges?: boolean;
  /** Fade gradient width in pixels */
  fadeWidth?: number;
  /** Microphone sensitivity multiplier */
  sensitivity?: number;
  /** Callback when stop button is pressed */
  onStop?: () => void;
  /** Additional CSS classes */
  className?: string;
}

function roundedBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
  ctx.fill();
}

export default function LiveWaveform({
  active = false,
  processing = false,
  barWidth = 3,
  barGap = 2,
  barRadius = 1.5,
  barColor,
  height = 48,
  fadeEdges = true,
  fadeWidth = 24,
  sensitivity = 1,
  onStop,
  className,
}: LiveWaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>(0);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const dataRef = React.useRef<Uint8Array<ArrayBuffer> | null>(null);

  const color = React.useCallback(() => {
    if (barColor) return barColor;
    const el = canvasRef.current;
    if (el) return getComputedStyle(el).color;
    return "#a1a1aa";
  }, [barColor]);

  /* -------- canvas animation -------- */
  React.useEffect(() => {
    const cvs = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cvs || !wrap) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width } = wrap.getBoundingClientRect();
      cvs.width = Math.round(width * dpr);
      cvs.height = Math.round(height * dpr);
      cvs.style.width = `${width}px`;
      cvs.style.height = `${height}px`;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const t0 = performance.now();

    const paint = (now: number) => {
      const w = wrap.getBoundingClientRect().width;
      const h = height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color();

      const step = barWidth + barGap;
      const count = Math.floor(w / step);
      const t = (now - t0) / 1000;
      const cy = h / 2;

      for (let i = 0; i < count; i++) {
        const x = i * step;
        const pos = i / count;
        let bh = 4;
        let alpha = 1;

        if (processing && !active) {
          /* layered sine waves → organic flowing animation */
          const s1 = Math.sin(t * 2.5 + pos * Math.PI * 4) * 0.38;
          const s2 = Math.sin(t * 1.7 + pos * Math.PI * 6 + 1.3) * 0.24;
          const s3 = Math.sin(t * 3.3 + pos * Math.PI * 2.5 + 0.8) * 0.14;
          const amp = (s1 + s2 + s3 + 0.76) / 1.52;
          bh = Math.max(4, amp * h * 0.82);
        } else if (active && analyserRef.current) {
          const an = analyserRef.current;
          if (
            !dataRef.current ||
            dataRef.current.length !== an.frequencyBinCount
          ) {
            dataRef.current = new Uint8Array(an.frequencyBinCount);
          }
          an.getByteFrequencyData(dataRef.current);
          const idx = Math.floor(pos * dataRef.current.length);
          const val = (dataRef.current[idx] / 255) * sensitivity;
          bh = Math.max(4, val * h * 0.85);
        } else {
          /* idle: tiny flat bars */
          alpha = 0.25;
        }

        if (fadeEdges) {
          const edge = Math.min(x, w - x - barWidth);
          if (edge < fadeWidth) alpha *= Math.max(0, edge / fadeWidth);
        }

        ctx.globalAlpha = alpha;
        roundedBar(ctx, x, cy - bh / 2, barWidth, bh, barRadius);
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(paint);
    };

    frameRef.current = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [
    active,
    processing,
    barWidth,
    barGap,
    barRadius,
    height,
    fadeEdges,
    fadeWidth,
    sensitivity,
    color,
  ]);

  /* -------- microphone -------- */
  React.useEffect(() => {
    if (!active) {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      analyserRef.current = null;
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;

        const actx = new AudioContext();
        audioCtxRef.current = actx;

        const src = actx.createMediaStreamSource(stream);
        const analyser = actx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        src.connect(analyser);
        analyserRef.current = analyser;
      } catch (e) {
        console.error("Microphone access failed:", e);
      }
    })();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      analyserRef.current = null;
    };
  }, [active]);

  const isLive = processing || active;

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-xl border border-border/50 bg-card px-4 py-3",
        className,
      )}
    >
      {isLive && onStop && (
        <button
          onClick={onStop}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-80"
          aria-label="Stop"
        >
          <Square className="size-3 fill-current" />
        </button>
      )}
      <div ref={wrapRef} className="flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block text-foreground"
          style={{ height }}
        />
      </div>
    </div>
  );
}
