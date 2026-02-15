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
.bb{
  --bb-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --bb-border:rgba(0,0,0,0.06);
  --bb-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --bb-hi:rgba(0,0,0,0.88);
  --bb-badge:#FF3B30;
  --bb-badge-t:#fff
}
.dark .bb,[data-theme="dark"] .bb{
  --bb-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --bb-border:rgba(255,255,255,0.07);
  --bb-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --bb-hi:rgba(255,255,255,0.88);
  --bb-badge:#FF453A;
  --bb-badge-t:#fff
}`;

/* ── component ── */
export interface ButtonBadgeProps {
  children: React.ReactNode;
  badge?: number | string;
  onClick?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

export function ButtonBadge({
  children,
  badge,
  onClick,
  sound = true,
  style,
}: ButtonBadgeProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.button
        className="bb"
        onClick={() => {
          onClick?.();
          if (sound) tick();
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderRadius: 10,
          border: "1px solid var(--bb-border)",
          background: "var(--bb-glass)",
          boxShadow: "var(--bb-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          color: "var(--bb-hi)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          ...style,
        }}
      >
        {children}
        <AnimatePresence mode="wait">
          {badge !== undefined && (
            <motion.span
              key={String(badge)}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 18,
                height: 18,
                padding: "0 5px",
                borderRadius: 9,
                background: "var(--bb-badge)",
                color: "var(--bb-badge-t)",
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {badge}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

export default ButtonBadge;
