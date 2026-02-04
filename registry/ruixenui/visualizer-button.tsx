"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VisualizerButtonProps {
  /** Audio file URL */
  audioSrc: string;
  /** Number of equalizer bars */
  bars?: number;
  /** Bar width in pixels */
  barWidth?: number;
  /** Gap between bars in pixels */
  barGap?: number;
  /** Bar corner radius */
  barRadius?: number;
  /** Equalizer height in pixels */
  height?: number;
  /** Additional CSS classes */
  className?: string;
}

function pill(
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

export default function VisualizerButton({
  audioSrc,
  bars = 14,
  barWidth = 3,
  barGap = 2,
  barRadius = 1.5,
  height = 20,
  className,
}: VisualizerButtonProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const frameRef = React.useRef<number>(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const actxRef = React.useRef<AudioContext | null>(null);
  const srcRef = React.useRef<MediaElementAudioSourceNode | null>(null);
  const dataRef = React.useRef<Uint8Array<ArrayBuffer> | null>(null);

  const [playing, setPlaying] = React.useState(false);

  const cw = bars * barWidth + (bars - 1) * barGap;

  /* -------- audio element -------- */
  React.useEffect(() => {
    const el = new Audio(audioSrc);
    el.crossOrigin = "anonymous";
    audioRef.current = el;
    el.addEventListener("ended", () => setPlaying(false));
    return () => {
      el.pause();
      el.src = "";
    };
  }, [audioSrc]);

  /* -------- canvas animation -------- */
  React.useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    cvs.width = Math.round(cw * dpr);
    cvs.height = Math.round(height * dpr);

    const t0 = performance.now();

    const paint = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, height);

      const computed = getComputedStyle(cvs);
      ctx.fillStyle = computed.color;

      const t = (now - t0) / 1000;

      /* try reading real frequency data */
      let hasFreq = false;
      if (playing && analyserRef.current) {
        const an = analyserRef.current;
        if (
          !dataRef.current ||
          dataRef.current.length !== an.frequencyBinCount
        ) {
          dataRef.current = new Uint8Array(an.frequencyBinCount);
        }
        an.getByteFrequencyData(dataRef.current);
        for (let j = 0; j < dataRef.current.length; j++) {
          if (dataRef.current[j] > 0) {
            hasFreq = true;
            break;
          }
        }
      }

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + barGap);
        let bh = 3;
        let alpha = 1;

        if (playing && hasFreq && dataRef.current) {
          /* real frequency — bottom-up */
          const idx = Math.floor((i / bars) * dataRef.current.length);
          const val = dataRef.current[idx] / 255;
          bh = Math.max(3, val * height * 0.95);
        } else if (playing) {
          /* staggered bounce — each bar has its own phase */
          const bounce = Math.abs(Math.sin(t * 3.2 + i * 0.7));
          bh = Math.max(3, bounce * height * 0.92);
        } else {
          /* idle — short bars */
          alpha = 0.3;
        }

        ctx.globalAlpha = alpha;
        pill(ctx, x, height - bh, barWidth, bh, barRadius);
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(paint);
    };

    frameRef.current = requestAnimationFrame(paint);

    return () => cancelAnimationFrame(frameRef.current);
  }, [playing, bars, barWidth, barGap, barRadius, height, cw]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    /* setup Web Audio analyser on first play */
    if (!actxRef.current) {
      try {
        const actx = new AudioContext();
        actxRef.current = actx;
        const source = actx.createMediaElementSource(audio);
        srcRef.current = source;
        const analyser = actx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyser.connect(actx.destination);
        analyserRef.current = analyser;
      } catch {
        /* Web Audio unavailable — bounce fallback */
      }
    }

    audio.play().catch(() => {});
    setPlaying(true);
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full bg-muted px-4 py-2.5 text-foreground transition-colors hover:bg-muted/70",
        className,
      )}
    >
      {playing ? (
        <Pause className="size-3.5 shrink-0 fill-current" strokeWidth={0} />
      ) : (
        <Play className="size-3.5 shrink-0 fill-current" strokeWidth={0} />
      )}
      <canvas
        ref={canvasRef}
        className="block text-foreground"
        style={{ width: cw, height }}
      />
    </button>
  );
}
