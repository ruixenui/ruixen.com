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
.cp{
  --cp-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --cp-border:rgba(0,0,0,0.06);
  --cp-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --cp-dim:rgba(0,0,0,0.42);
  --cp-mid:rgba(0,0,0,0.55);
  --cp-hi:rgba(0,0,0,0.88);
  --cp-sep:rgba(0,0,0,0.06);
  --cp-track:rgba(0,0,0,0.06);
  --cp-knob:#fff;
  --cp-knob-border:rgba(0,0,0,0.08);
  --cp-knob-shadow:0 1px 3px rgba(0,0,0,0.15);
  --cp-btn:rgba(0,0,0,0.03);
  --cp-btn-h:rgba(0,0,0,0.07);
  --cp-ok:rgba(34,197,94,0.8)
}
.dark .cp,[data-theme="dark"] .cp{
  --cp-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --cp-border:rgba(255,255,255,0.07);
  --cp-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --cp-dim:rgba(255,255,255,0.28);
  --cp-mid:rgba(255,255,255,0.5);
  --cp-hi:rgba(255,255,255,0.88);
  --cp-sep:rgba(255,255,255,0.06);
  --cp-track:rgba(255,255,255,0.06);
  --cp-knob:#fff;
  --cp-knob-border:rgba(255,255,255,0.06);
  --cp-knob-shadow:0 1px 3px rgba(0,0,0,0.2);
  --cp-btn:rgba(255,255,255,0.03);
  --cp-btn-h:rgba(255,255,255,0.07);
  --cp-ok:rgba(74,222,128,0.9)
}`;

const MONO =
  "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace";

const DEFAULT_COLORS = [
  "#F87171",
  "#FB923C",
  "#FACC15",
  "#4ADE80",
  "#22D3EE",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#A3E635",
  "#06B6D4",
  "#0EA5E9",
  "#6366F1",
];

const toRGBA = (hex: string, opacity: number) => {
  const alpha = Math.round(opacity * 2.55)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
};

/* ── types ── */
interface ColorPickerInputProps {
  colors?: string[];
  initialColor?: string;
  initialOpacity?: number;
  onChange?: (color: string, opacity: number) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function ColorPickerInput({
  colors = DEFAULT_COLORS,
  initialColor = "#3B82F6",
  initialOpacity = 100,
  onChange,
  sound = true,
  style,
}: ColorPickerInputProps) {
  const [color, setColor] = React.useState(initialColor);
  const [opacity, setOpacity] = React.useState(initialOpacity);
  const [copied, setCopied] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const finalColor = toRGBA(color, opacity);

  const selectColor = (c: string) => {
    setColor(c);
    if (sound) tick();
    onChange?.(c, opacity);
  };

  const updateOpacity = (e: PointerEvent | React.PointerEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const val = Math.round(pct * 100);
    setOpacity(val);
    onChange?.(color, val);
  };

  const onSliderDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    updateOpacity(e);
  };

  const onSliderMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateOpacity(e);
  };

  const onSliderUp = () => {
    dragging.current = false;
    if (sound) tick();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalColor.toUpperCase());
      if (sound) tick();
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* silent */
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="cp"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          borderRadius: 14,
          background: "var(--cp-glass)",
          border: "1px solid var(--cp-border)",
          boxShadow: "var(--cp-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          width: 300,
          ...style,
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
          }}
        >
          <span
            style={{ fontSize: 13, fontWeight: 500, color: "var(--cp-hi)" }}
          >
            Color
          </span>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              border: "1px solid var(--cp-border)",
              backgroundColor: finalColor,
              transition: "background-color 0.2s",
            }}
          />
        </div>

        <div style={{ height: 1, background: "var(--cp-sep)" }} />

        {/* swatches */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 8,
            padding: "14px 16px",
          }}
        >
          {colors.map((c) => (
            <motion.button
              key={c}
              onClick={() => selectColor(c)}
              whileTap={{ scale: 0.85 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: c,
                border: "none",
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatePresence>
                {color === c && (
                  <motion.svg
                    key="check"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    width={14}
                    height={14}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
                  >
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div style={{ height: 1, background: "var(--cp-sep)" }} />

        {/* opacity slider */}
        <div style={{ padding: "14px 16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--cp-dim)",
              marginBottom: 10,
            }}
          >
            <span>Opacity</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {opacity}%
            </span>
          </div>
          <div
            ref={sliderRef}
            onPointerDown={onSliderDown}
            onPointerMove={onSliderMove}
            onPointerUp={onSliderUp}
            style={{
              position: "relative",
              height: 6,
              borderRadius: 3,
              background: "var(--cp-track)",
              cursor: "pointer",
              touchAction: "none" as const,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${opacity}%`,
                borderRadius: 3,
                backgroundColor: color,
                opacity: 0.6,
                transition: dragging.current ? "none" : "width 0.1s",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: `${opacity}%`,
                transform: "translate(-50%, -50%)",
                width: 16,
                height: 16,
                borderRadius: 8,
                background: "var(--cp-knob)",
                border: "1px solid var(--cp-knob-border)",
                boxShadow: "var(--cp-knob-shadow)",
              }}
              whileTap={{ scale: 1.15 }}
            />
          </div>
        </div>

        <div style={{ height: 1, background: "var(--cp-sep)" }} />

        {/* output + copy */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px",
            gap: 8,
          }}
        >
          <span
            style={{
              flex: 1,
              fontSize: 12,
              fontFamily: MONO,
              fontVariantNumeric: "tabular-nums",
              color: "var(--cp-hi)",
              userSelect: "all" as const,
            }}
          >
            {finalColor.toUpperCase()}
          </span>
          <motion.button
            onClick={handleCopy}
            whileTap={{ scale: 0.85 }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "none",
              background: "var(--cp-btn)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: copied ? "var(--cp-ok)" : "var(--cp-mid)",
              transition: "background 0.15s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!copied)
                (e.currentTarget as HTMLElement).style.background =
                  "var(--cp-btn-h)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--cp-btn)";
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.svg
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  width={13}
                  height={13}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5l3.5 3.5L13 5" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  width={13}
                  height={13}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <rect x="5" y="5" width="8" height="8" rx="1.5" />
                  <path d="M3 11V3.5A1.5 1.5 0 014.5 2H11" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
