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
.hp{
  --hp-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --hp-border:rgba(0,0,0,0.06);
  --hp-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --hp-hi:rgba(0,0,0,0.88);
  --hp-dim:rgba(0,0,0,0.55);
  --hp-preview-shadow:0 12px 40px rgba(0,0,0,0.12),0 0 1px rgba(0,0,0,0.06)
}
.dark .hp,[data-theme="dark"] .hp{
  --hp-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --hp-border:rgba(255,255,255,0.07);
  --hp-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --hp-hi:rgba(255,255,255,0.88);
  --hp-dim:rgba(255,255,255,0.5);
  --hp-preview-shadow:0 12px 40px rgba(0,0,0,0.3),0 0 1px rgba(255,255,255,0.06)
}`;

/* ── component ── */
export interface HoverPreviewButtonProps {
  label: string;
  previewContent: React.ReactNode;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function HoverPreviewButton({
  label,
  previewContent,
  sound = true,
  style,
}: HoverPreviewButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  const entered = React.useRef(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="hp"
        style={{
          position: "relative",
          display: "inline-block",
          ...style,
        }}
        onMouseEnter={() => {
          setHovered(true);
          if (!entered.current && sound) {
            tick();
            entered.current = true;
          }
        }}
        onMouseLeave={() => {
          setHovered(false);
          entered.current = false;
        }}
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid var(--hp-border)",
            background: "var(--hp-glass)",
            boxShadow: "var(--hp-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            color: "var(--hp-hi)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            outline: "none",
            userSelect: "none",
          }}
        >
          {label}
        </motion.button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: "50%",
                transform: "translateX(-50%)",
                minWidth: 200,
                padding: 12,
                borderRadius: 12,
                border: "1px solid var(--hp-border)",
                background: "var(--hp-glass)",
                boxShadow: "var(--hp-preview-shadow)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                color: "var(--hp-dim)",
                fontSize: 13,
                zIndex: 50,
                pointerEvents: "none",
              }}
            >
              {previewContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
