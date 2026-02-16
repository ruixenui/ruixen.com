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
.bc{
  --bc-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --bc-border:rgba(0,0,0,0.06);
  --bc-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --bc-hi:rgba(0,0,0,0.88);
  --bc-ok:#34C759
}
.dark .bc,[data-theme="dark"] .bc{
  --bc-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --bc-border:rgba(255,255,255,0.07);
  --bc-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --bc-hi:rgba(255,255,255,0.88);
  --bc-ok:#30D158
}`;

/* ── component ── */
export interface ButtonCopyProps {
  value: string;
  label?: string;
  copiedLabel?: string;
  showLabel?: boolean;
  sound?: boolean;
  style?: React.CSSProperties;
}

export function ButtonCopy({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  showLabel = true,
  sound = true,
  style,
}: ButtonCopyProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (sound) tick();
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.button
        className="bc"
        onClick={copy}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: showLabel ? "8px 14px" : 8,
          borderRadius: 10,
          border: "1px solid var(--bc-border)",
          background: "var(--bc-glass)",
          boxShadow: "var(--bc-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          color: copied ? "var(--bc-ok)" : "var(--bc-hi)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          transition: "color 0.2s",
          ...style,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.svg
              key="chk"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="cpy"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </motion.svg>
          )}
        </AnimatePresence>
        {showLabel && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "d" : "i"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {copied ? copiedLabel : label}
            </motion.span>
          </AnimatePresence>
        )}
      </motion.button>
    </>
  );
}

export default ButtonCopy;
