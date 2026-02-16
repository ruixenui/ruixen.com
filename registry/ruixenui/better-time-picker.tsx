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
.tp{
  --tp-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --tp-border:rgba(0,0,0,0.06);
  --tp-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --tp-dim:rgba(0,0,0,0.42);
  --tp-mid:rgba(0,0,0,0.55);
  --tp-hi:rgba(0,0,0,0.88);
  --tp-sep:rgba(0,0,0,0.06);
  --tp-btn:rgba(0,0,0,0.03);
  --tp-btn-h:rgba(0,0,0,0.07);
  --tp-seg-bg:rgba(0,0,0,0.04);
  --tp-seg-active:rgba(0,0,0,0.07);
  --tp-knob:#fff;
  --tp-knob-border:rgba(0,0,0,0.08);
  --tp-knob-shadow:0 1px 3px rgba(0,0,0,0.12)
}
.dark .tp,[data-theme="dark"] .tp{
  --tp-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --tp-border:rgba(255,255,255,0.07);
  --tp-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --tp-dim:rgba(255,255,255,0.28);
  --tp-mid:rgba(255,255,255,0.5);
  --tp-hi:rgba(255,255,255,0.88);
  --tp-sep:rgba(255,255,255,0.06);
  --tp-btn:rgba(255,255,255,0.03);
  --tp-btn-h:rgba(255,255,255,0.07);
  --tp-seg-bg:rgba(255,255,255,0.04);
  --tp-seg-active:rgba(255,255,255,0.09);
  --tp-knob:#fff;
  --tp-knob-border:rgba(255,255,255,0.06);
  --tp-knob-shadow:0 1px 3px rgba(0,0,0,0.15)
}`;

const MONO =
  "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace";

/* ── types ── */
interface BetterTimePickerProps {
  defaultHour?: number;
  defaultMinute?: number;
  use24?: boolean;
  minuteStep?: number;
  onChange?: (hour: number, minute: number) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function BetterTimePicker({
  defaultHour = 12,
  defaultMinute = 0,
  use24 = false,
  minuteStep = 5,
  onChange,
  sound = true,
  style,
}: BetterTimePickerProps) {
  const [hour, setHour] = React.useState(defaultHour);
  const [minute, setMinute] = React.useState(defaultMinute);
  const [period, setPeriod] = React.useState<"AM" | "PM">(
    defaultHour >= 12 ? "PM" : "AM",
  );

  const displayHour = use24
    ? hour
    : hour === 0
      ? 12
      : hour > 12
        ? hour - 12
        : hour;

  const stepHour = (dir: 1 | -1) => {
    const maxH = use24 ? 23 : 23;
    const next = (hour + dir + 24) % 24;
    setHour(next);
    if (!use24) setPeriod(next >= 12 ? "PM" : "AM");
    if (sound) tick();
    onChange?.(next, minute);
  };

  const stepMinute = (dir: 1 | -1) => {
    const next = (minute + dir * minuteStep + 60) % 60;
    setMinute(next);
    if (sound) tick();
    onChange?.(hour, next);
  };

  const togglePeriod = () => {
    const newPeriod = period === "AM" ? "PM" : "AM";
    setPeriod(newPeriod);
    const newHour = newPeriod === "PM" ? (hour % 12) + 12 : hour % 12;
    setHour(newHour);
    if (sound) tick();
    onChange?.(newHour, minute);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="tp"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 0,
          borderRadius: 14,
          background: "var(--tp-glass)",
          border: "1px solid var(--tp-border)",
          boxShadow: "var(--tp-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          ...style,
        }}
      >
        {/* header */}
        <div style={{ padding: "12px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 16 16"
              fill="none"
              stroke="var(--tp-dim)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 4.5V8l2.5 1.5" />
            </svg>
            <span
              style={{ fontSize: 13, fontWeight: 500, color: "var(--tp-hi)" }}
            >
              Time
            </span>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--tp-sep)" }} />

        {/* picker columns */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 20px",
            gap: 4,
          }}
        >
          {/* hour column */}
          <TimeColumn
            value={String(displayHour).padStart(2, "0")}
            onUp={() => stepHour(1)}
            onDown={() => stepHour(-1)}
          />

          {/* colon */}
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              fontFamily: MONO,
              color: "var(--tp-dim)",
              padding: "0 2px",
              userSelect: "none",
            }}
          >
            :
          </span>

          {/* minute column */}
          <TimeColumn
            value={String(minute).padStart(2, "0")}
            onUp={() => stepMinute(1)}
            onDown={() => stepMinute(-1)}
          />

          {/* AM/PM toggle */}
          {!use24 && (
            <div
              style={{
                marginLeft: 12,
                borderRadius: 8,
                background: "var(--tp-seg-bg)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  onClick={period !== p ? togglePeriod : undefined}
                  style={{
                    padding: "6px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    border: "none",
                    background: "transparent",
                    color: period === p ? "var(--tp-hi)" : "var(--tp-dim)",
                    cursor: period !== p ? "pointer" : "default",
                    position: "relative",
                    zIndex: 1,
                    transition: "color 0.15s",
                  }}
                >
                  {p}
                </button>
              ))}
              {/* active indicator */}
              <motion.div
                animate={{ y: period === "AM" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 2,
                  right: 2,
                  height: "50%",
                  borderRadius: 6,
                  background: "var(--tp-knob)",
                  border: "1px solid var(--tp-knob-border)",
                  boxShadow: "var(--tp-knob-shadow)",
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

/* ── time column with up/down buttons ── */
function TimeColumn({
  value,
  onUp,
  onDown,
}: {
  value: string;
  onUp: () => void;
  onDown: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <motion.button
        onClick={onUp}
        whileTap={{ scale: 0.85 }}
        style={{
          width: 36,
          height: 24,
          borderRadius: 6,
          border: "none",
          background: "var(--tp-btn)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--tp-mid)",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--tp-btn-h)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--tp-btn)";
        }}
      >
        <svg
          width={10}
          height={10}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10l4-4 4 4" />
        </svg>
      </motion.button>

      <motion.span
        key={value}
        initial={{ opacity: 0.5, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: MONO,
          fontVariantNumeric: "tabular-nums",
          color: "var(--tp-hi)",
          lineHeight: 1,
          userSelect: "none",
          minWidth: 44,
          textAlign: "center",
        }}
      >
        {value}
      </motion.span>

      <motion.button
        onClick={onDown}
        whileTap={{ scale: 0.85 }}
        style={{
          width: 36,
          height: 24,
          borderRadius: 6,
          border: "none",
          background: "var(--tp-btn)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--tp-mid)",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--tp-btn-h)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--tp-btn)";
        }}
      >
        <svg
          width={10}
          height={10}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </motion.button>
    </div>
  );
}
