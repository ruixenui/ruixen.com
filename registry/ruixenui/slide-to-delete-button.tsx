"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

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
.sd{
  --sd-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --sd-border:rgba(0,0,0,0.06);
  --sd-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --sd-hi:rgba(0,0,0,0.88);
  --sd-dim:rgba(0,0,0,0.35);
  --sd-danger:#FF3B30;
  --sd-danger-bg:rgba(255,59,48,0.1);
  --sd-thumb:#fff;
  --sd-thumb-border:rgba(0,0,0,0.08);
  --sd-thumb-shadow:0 1px 4px rgba(0,0,0,0.12)
}
.dark .sd,[data-theme="dark"] .sd{
  --sd-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --sd-border:rgba(255,255,255,0.07);
  --sd-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --sd-hi:rgba(255,255,255,0.88);
  --sd-dim:rgba(255,255,255,0.25);
  --sd-danger:#FF453A;
  --sd-danger-bg:rgba(255,69,58,0.12);
  --sd-thumb:rgba(255,255,255,0.12);
  --sd-thumb-border:rgba(255,255,255,0.08);
  --sd-thumb-shadow:0 1px 4px rgba(0,0,0,0.2)
}`;

/* ── component ── */
export interface SlideToDeleteButtonProps {
  label?: string;
  confirmedLabel?: string;
  onConfirm?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function SlideToDeleteButton({
  label = "Slide to delete",
  confirmedLabel = "Deleted",
  onConfirm,
  sound = true,
  style,
}: SlideToDeleteButtonProps) {
  const [confirmed, setConfirmed] = React.useState(false);
  const trackWidth = 220;
  const thumbSize = 40;
  const maxDrag = trackWidth - thumbSize - 6;
  const x = useMotionValue(0);
  const labelOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);
  const fillWidth = useTransform(x, [0, maxDrag], [0, trackWidth]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="sd"
        style={{
          position: "relative",
          width: trackWidth,
          height: 44,
          borderRadius: 12,
          border: "1px solid var(--sd-border)",
          background: "var(--sd-glass)",
          boxShadow: "var(--sd-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          userSelect: "none",
          ...style,
        }}
      >
        {/* red fill */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: fillWidth,
            background: "var(--sd-danger-bg)",
            pointerEvents: "none",
          }}
        />

        {/* label */}
        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 500,
            color: confirmed ? "var(--sd-danger)" : "var(--sd-dim)",
            opacity: confirmed ? 1 : labelOpacity,
            pointerEvents: "none",
          }}
        >
          {confirmed ? confirmedLabel : label}
        </motion.span>

        {/* draggable thumb */}
        {!confirmed && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0}
            style={{
              x,
              position: "absolute",
              top: 3,
              left: 3,
              width: thumbSize,
              height: thumbSize - 6,
              borderRadius: 9,
              background: "var(--sd-thumb)",
              border: "1px solid var(--sd-thumb-border)",
              boxShadow: "var(--sd-thumb-shadow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "grab",
              zIndex: 2,
            }}
            onDragEnd={() => {
              if (x.get() > maxDrag * 0.85) {
                setConfirmed(true);
                if (sound) tick();
                onConfirm?.();
              }
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--sd-danger)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </motion.div>
        )}
      </div>
    </>
  );
}
