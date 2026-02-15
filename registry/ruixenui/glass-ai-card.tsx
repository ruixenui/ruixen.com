"use client";

import * as React from "react";
import { motion } from "motion/react";

/* ── theme ────────────────────────────────────────────────── */

const CSS = `
.gc{
  --gc-glass:linear-gradient(135deg,rgba(255,255,255,.78),rgba(255,255,255,.62));
  --gc-border:rgba(0,0,0,.06);
  --gc-shadow:0 0 1px rgba(0,0,0,.04),0 2px 8px rgba(0,0,0,.04),0 12px 32px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.8);
  --gc-bar:rgba(0,0,0,.06);
  --gc-bar-shimmer:rgba(0,0,0,.1);
  --gc-dim:rgba(0,0,0,.45);
  --gc-mid:rgba(0,0,0,.65);
  --gc-hi:rgba(0,0,0,.88);
  --gc-btn-bg:rgba(255,255,255,.92);
  --gc-btn-border:rgba(0,0,0,.06);
  --gc-btn-shadow:0 1px 3px rgba(0,0,0,.06);
  --gc-hover:rgba(0,0,0,.03);
  --gc-grad-a:#f472b6;
  --gc-grad-b:#a78bfa;
}
.dark .gc,[data-theme="dark"] .gc{
  --gc-glass:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.02));
  --gc-border:rgba(255,255,255,.07);
  --gc-shadow:0 1px 3px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.04);
  --gc-bar:rgba(255,255,255,.06);
  --gc-bar-shimmer:rgba(255,255,255,.1);
  --gc-dim:rgba(255,255,255,.35);
  --gc-mid:rgba(255,255,255,.55);
  --gc-hi:rgba(255,255,255,.88);
  --gc-btn-bg:rgba(255,255,255,.06);
  --gc-btn-border:rgba(255,255,255,.08);
  --gc-btn-shadow:0 1px 3px rgba(0,0,0,.12);
  --gc-hover:rgba(255,255,255,.04);
  --gc-grad-a:#f9a8d4;
  --gc-grad-b:#c4b5fd;
}
@keyframes gc-shimmer{
  0%{background-position:-200% 0}
  100%{background-position:200% 0}
}
@keyframes gc-hue{
  0%{filter:hue-rotate(0deg)}
  100%{filter:hue-rotate(360deg)}
}
`;

/* ── sound ────────────────────────────────────────────────── */

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

/* ── skeleton lines layout ───────────────────────────────── */

const DEFAULT_LINES: number[][] = [[100], [40, 20, 40], [40, 20], [20, 80]];

/* ── component ───────────────────────────────────────────── */

interface GlassAICardProps {
  lines?: number[][];
  actionLabel?: string;
  onAction?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function GlassAICard({
  lines = DEFAULT_LINES,
  actionLabel = "Summarize",
  onAction,
  sound = true,
  style,
}: GlassAICardProps) {
  const [pressed, setPressed] = React.useState(false);

  const handleClick = () => {
    if (sound) tick();
    setPressed(true);
    onAction?.();
    setTimeout(() => setPressed(false), 600);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="gc"
        style={{
          position: "relative",
          minWidth: 320,
          maxWidth: 400,
          padding: 24,
          background: "var(--gc-glass)",
          border: "1px solid var(--gc-border)",
          borderRadius: 16,
          boxShadow: "var(--gc-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          ...style,
        }}
      >
        {/* skeleton line groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {lines.map((group, gi) => (
            <div
              key={gi}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {group.length === 1 ? (
                <div
                  style={{
                    height: 6,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, var(--gc-bar) 40%, var(--gc-bar-shimmer) 50%, var(--gc-bar) 60%)`,
                    backgroundSize: "200% 100%",
                    animation: "gc-shimmer 2.4s ease-in-out infinite",
                    animationDelay: `${gi * 0.3}s`,
                    width: `${group[0]}%`,
                  }}
                />
              ) : (
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {group.map((w, i) => (
                    <div
                      key={i}
                      style={{
                        height: 6,
                        borderRadius: 999,
                        flex: `0 0 ${w}%`,
                        background: `linear-gradient(90deg, var(--gc-bar) 40%, var(--gc-bar-shimmer) 50%, var(--gc-bar) 60%)`,
                        backgroundSize: "200% 100%",
                        animation: "gc-shimmer 2.4s ease-in-out infinite",
                        animationDelay: `${(gi * group.length + i) * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* action button */}
        <div style={{ marginTop: 24 }}>
          <motion.button
            onClick={handleClick}
            whileTap={{ scale: 0.96 }}
            animate={pressed ? { scale: [1, 1.04, 1] } : {}}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              height: 32,
              padding: "0 14px",
              border: "none",
              borderRadius: 999,
              background: "transparent",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--gc-hi)",
              overflow: "hidden",
            }}
          >
            {/* animated gradient border ring */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                padding: 1,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, var(--gc-grad-a), var(--gc-grad-b))`,
                  opacity: 0.5,
                  animation: "gc-hue 4s linear infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: 999,
                  background: "var(--gc-btn-bg)",
                }}
              />
            </span>

            {/* sparkles icon */}
            <span style={{ position: "relative", display: "flex" }}>
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                  opacity={1}
                />
                <path d="M20 3v4" opacity={0.5} />
                <path d="M22 5h-4" opacity={0.5} />
                <path d="M4 17v2" opacity={0.5} />
                <path d="M5 18H3" opacity={0.5} />
              </svg>
            </span>

            {/* label */}
            <span style={{ position: "relative" }}>{actionLabel}</span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
