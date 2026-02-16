"use client";

import * as React from "react";
import { motion } from "motion/react";

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
.gl{
  --gl-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --gl-border:rgba(0,0,0,0.06);
  --gl-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --gl-hi:rgba(0,0,0,0.88);
  --gl-dim:rgba(0,0,0,0.42);
  --gl-glow:rgba(0,0,0,0.03)
}
.dark .gl,[data-theme="dark"] .gl{
  --gl-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --gl-border:rgba(255,255,255,0.07);
  --gl-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --gl-hi:rgba(255,255,255,0.88);
  --gl-dim:rgba(255,255,255,0.28);
  --gl-glow:rgba(255,255,255,0.04)
}`;

/* ── component ── */
export interface GlowLinkButtonProps {
  label?: string;
  href?: string;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function GlowLinkButton({
  label = "Explore on GitHub",
  href = "#",
  sound = true,
  style,
}: GlowLinkButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  const [glowX, setGlowX] = React.useState(0);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.a
        className="gl"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound && tick()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlowX(e.clientX - r.left);
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 24,
          border: "1px solid var(--gl-border)",
          background: "var(--gl-glass)",
          boxShadow: "var(--gl-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          color: "var(--gl-hi)",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          overflow: "hidden",
          ...style,
        }}
      >
        {/* cursor glow */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s",
            background: `radial-gradient(80px circle at ${glowX}px 50%, var(--gl-glow), transparent)`,
          }}
        />
        <span style={{ position: "relative" }}>{label}</span>
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "relative", color: "var(--gl-dim)" }}
          animate={{
            x: hovered ? 2 : 0,
            y: hovered ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </motion.svg>
      </motion.a>
    </>
  );
}
