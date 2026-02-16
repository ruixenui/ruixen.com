"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── sound ── */
let _a: AudioContext, _b: AudioBuffer;
const tick = () => {
  if (typeof window === "undefined") return;
  if (!_a) {
    _a = new AudioContext();
    _b = _a.createBuffer(1, (_a.sampleRate * 0.003) | 0, _a.sampleRate);
    const d = _b.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 4;
  }
  const s = _a.createBufferSource();
  s.buffer = _b;
  const g = _a.createGain();
  g.gain.value = 0.08;
  s.connect(g).connect(_a.destination);
  s.start();
};

/* ── theme ── */
const CSS = `
.cf{
  --cf-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --cf-border:rgba(0,0,0,0.06);
  --cf-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --cf-hi:rgba(0,0,0,0.88)
}
.dark .cf,[data-theme="dark"] .cf{
  --cf-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --cf-border:rgba(255,255,255,0.07);
  --cf-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --cf-hi:rgba(255,255,255,0.88)
}`;

/* ── confetti colors ── */
const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: number;
  shape: "circle" | "square";
}

/* ── component ── */
export interface ConfettiButtonProps {
  label?: string;
  onClick?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function ConfettiButton({
  label = "Celebrate",
  onClick,
  sound = true,
  style,
}: ConfettiButtonProps) {
  const [particles, setParticles] = React.useState<Particle[]>([]);

  const fire = () => {
    const batch: Particle[] = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 140,
      y: -(40 + Math.random() * 80),
      rotate: Math.random() * 540 - 270,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 4,
      shape: Math.random() > 0.5 ? "circle" : "square",
    }));
    setParticles(batch);
    if (sound) tick();
    onClick?.();
    setTimeout(() => setParticles([]), 900);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.button
          className="cf"
          onClick={fire}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 18px",
            borderRadius: 10,
            border: "1px solid var(--cf-border)",
            background: "var(--cf-glass)",
            boxShadow: "var(--cf-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            color: "var(--cf-hi)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            outline: "none",
            userSelect: "none",
            ...style,
          }}
        >
          {label}
        </motion.button>

        {/* particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: p.x,
                y: p.y,
                scale: 0,
                opacity: 0,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                mass: 0.8,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: p.size,
                height: p.size,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                borderRadius: p.shape === "circle" ? "50%" : 1,
                background: p.color,
                pointerEvents: "none",
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
