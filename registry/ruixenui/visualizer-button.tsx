"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── sound ── */
let _sa: AudioContext, _sb: AudioBuffer;
const tick = () => {
  if (typeof window === "undefined") return;
  if (!_sa) {
    _sa = new AudioContext();
    _sb = _sa.createBuffer(1, (_sa.sampleRate * 0.003) | 0, _sa.sampleRate);
    const d = _sb.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 4;
  }
  const s = _sa.createBufferSource();
  s.buffer = _sb;
  const g = _sa.createGain();
  g.gain.value = 0.08;
  s.connect(g).connect(_sa.destination);
  s.start();
};

/* ── theme ── */
const CSS = `
.vb{
  --vb-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --vb-border:rgba(0,0,0,0.06);
  --vb-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --vb-hi:rgba(0,0,0,0.88);
  --vb-dim:rgba(0,0,0,0.35)
}
.dark .vb,[data-theme="dark"] .vb{
  --vb-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --vb-border:rgba(255,255,255,0.07);
  --vb-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --vb-hi:rgba(255,255,255,0.88);
  --vb-dim:rgba(255,255,255,0.3)
}`;

/* ── canvas pill helper ── */
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

/* ── component ── */
export interface VisualizerButtonProps {
  audioSrc: string;
  bars?: number;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  height?: number;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function VisualizerButton({
  audioSrc,
  bars = 14,
  barWidth = 3,
  barGap = 2,
  barRadius = 1.5,
  height = 20,
  sound = true,
  style,
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

      let hasFreq = false;
      if (playing && analyserRef.current) {
        const an = analyserRef.current;
        if (!dataRef.current || dataRef.current.length !== an.frequencyBinCount)
          dataRef.current = new Uint8Array(
            an.frequencyBinCount,
          ) as Uint8Array<ArrayBuffer>;
        an.getByteFrequencyData(dataRef.current);
        for (let j = 0; j < dataRef.current.length; j++) {
          if (dataRef.current[j] > 0) {
            hasFreq = true;
            break;
          }
        }
      }

      for (let i = 0; i < bars; i++) {
        const bx = i * (barWidth + barGap);
        let bh = 3;
        let alpha = 1;
        if (playing && hasFreq && dataRef.current) {
          const idx = Math.floor((i / bars) * dataRef.current.length);
          bh = Math.max(3, (dataRef.current[idx] / 255) * height * 0.95);
        } else if (playing) {
          bh = Math.max(
            3,
            Math.abs(Math.sin(t * 3.2 + i * 0.7)) * height * 0.92,
          );
        } else {
          alpha = 0.3;
        }
        ctx.globalAlpha = alpha;
        pill(ctx, bx, height - bh, barWidth, bh, barRadius);
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
      if (sound) tick();
      return;
    }
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
      } catch {}
    }
    audio.play().catch(() => {});
    setPlaying(true);
    if (sound) tick();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.button
        className="vb"
        onClick={toggle}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 24,
          border: "1px solid var(--vb-border)",
          background: "var(--vb-glass)",
          boxShadow: "var(--vb-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          color: "var(--vb-hi)",
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          ...style,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {playing ? (
            <motion.svg
              key="pause"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </motion.svg>
          ) : (
            <motion.svg
              key="play"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </motion.svg>
          )}
        </AnimatePresence>
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: cw, height, color: "var(--vb-hi)" }}
        />
      </motion.button>
    </>
  );
}
