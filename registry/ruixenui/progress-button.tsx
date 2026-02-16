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
.pb{
  --pb-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --pb-border:rgba(0,0,0,0.06);
  --pb-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --pb-hi:rgba(0,0,0,0.88);
  --pb-dim:rgba(0,0,0,0.42);
  --pb-fill:rgba(0,0,0,0.08);
  --pb-ok:#34C759
}
.dark .pb,[data-theme="dark"] .pb{
  --pb-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --pb-border:rgba(255,255,255,0.07);
  --pb-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --pb-hi:rgba(255,255,255,0.88);
  --pb-dim:rgba(255,255,255,0.28);
  --pb-fill:rgba(255,255,255,0.08);
  --pb-ok:#30D158
}`;

/* ── component ── */
type Phase = "idle" | "loading" | "done";

export interface ProgressButtonProps {
  label?: string;
  loadingLabel?: string;
  doneLabel?: string;
  duration?: number;
  onClick?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function ProgressButton({
  label = "Submit",
  loadingLabel = "Processing…",
  doneLabel = "Done",
  duration = 2000,
  onClick,
  sound = true,
  style,
}: ProgressButtonProps) {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [progress, setProgress] = React.useState(0);

  const run = () => {
    if (phase !== "idle") return;
    setPhase("loading");
    setProgress(0);
    if (sound) tick();
    onClick?.();

    let step = 0;
    const interval = setInterval(() => {
      step += 100 / (duration / 50);
      setProgress(Math.min(step, 100));
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setPhase("done");
      if (sound) tick();
      setTimeout(() => {
        setPhase("idle");
        setProgress(0);
      }, 1800);
    }, duration);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.button
        className="pb"
        onClick={run}
        whileHover={phase === "idle" ? { scale: 1.04 } : undefined}
        whileTap={phase === "idle" ? { scale: 0.96 } : undefined}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "8px 18px",
          minWidth: 120,
          borderRadius: 10,
          border: "1px solid var(--pb-border)",
          background: "var(--pb-glass)",
          boxShadow: "var(--pb-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          color: phase === "done" ? "var(--pb-ok)" : "var(--pb-hi)",
          fontSize: 13,
          fontWeight: 500,
          cursor: phase === "idle" ? "pointer" : "default",
          outline: "none",
          userSelect: "none",
          overflow: "hidden",
          transition: "color 0.2s",
          ...style,
        }}
      >
        {/* progress bar fill */}
        {phase === "loading" && (
          <motion.span
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.08, ease: "linear" }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              background: "var(--pb-fill)",
              borderRadius: 10,
              pointerEvents: "none",
            }}
          />
        )}

        {/* content crossfade */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {phase === "done" && (
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            )}
            {phase === "idle" && label}
            {phase === "loading" && loadingLabel}
            {phase === "done" && doneLabel}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
