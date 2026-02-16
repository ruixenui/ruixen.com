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
.il{
  --il-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --il-border:rgba(0,0,0,0.06);
  --il-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --il-hi:rgba(0,0,0,0.88);
  --il-dim:rgba(0,0,0,0.42);
  --il-icon-bg:rgba(0,0,0,0.04)
}
.dark .il,[data-theme="dark"] .il{
  --il-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --il-border:rgba(255,255,255,0.07);
  --il-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --il-hi:rgba(255,255,255,0.88);
  --il-dim:rgba(255,255,255,0.28);
  --il-icon-bg:rgba(255,255,255,0.06)
}`;

/* ── component ── */
export interface IconLabelSubtextButtonProps {
  icon?: React.ReactNode;
  label: string;
  subtext?: string;
  onClick?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

const IconLabelSubtextButton: React.FC<IconLabelSubtextButtonProps> = ({
  icon,
  label,
  subtext,
  onClick,
  sound = true,
  style,
}) => {
  const defaultIcon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.button
        className="il"
        onClick={() => {
          onClick?.();
          if (sound) tick();
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          borderRadius: 12,
          border: "1px solid var(--il-border)",
          background: "var(--il-glass)",
          boxShadow: "var(--il-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          textAlign: "left" as const,
          ...style,
        }}
      >
        {/* icon circle */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--il-icon-bg)",
            color: "var(--il-hi)",
            flexShrink: 0,
          }}
        >
          {icon || defaultIcon}
        </span>

        {/* text column */}
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--il-hi)",
              lineHeight: 1.3,
            }}
          >
            {label}
          </span>
          {subtext && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "var(--il-dim)",
                lineHeight: 1.3,
              }}
            >
              {subtext}
            </span>
          )}
        </span>
      </motion.button>
    </>
  );
};

export default IconLabelSubtextButton;
