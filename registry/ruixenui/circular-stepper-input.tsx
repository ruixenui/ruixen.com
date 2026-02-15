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
.cs{
  --cs-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --cs-border:rgba(0,0,0,0.06);
  --cs-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --cs-dim:rgba(0,0,0,0.42);
  --cs-mid:rgba(0,0,0,0.55);
  --cs-hi:rgba(0,0,0,0.88);
  --cs-track:rgba(0,0,0,0.06);
  --cs-fill:rgba(0,0,0,0.55);
  --cs-btn:rgba(0,0,0,0.03);
  --cs-btn-h:rgba(0,0,0,0.07);
  --cs-btn-border:rgba(0,0,0,0.06)
}
.dark .cs,[data-theme="dark"] .cs{
  --cs-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --cs-border:rgba(255,255,255,0.07);
  --cs-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --cs-dim:rgba(255,255,255,0.28);
  --cs-mid:rgba(255,255,255,0.5);
  --cs-hi:rgba(255,255,255,0.88);
  --cs-track:rgba(255,255,255,0.06);
  --cs-fill:rgba(255,255,255,0.55);
  --cs-btn:rgba(255,255,255,0.03);
  --cs-btn-h:rgba(255,255,255,0.07);
  --cs-btn-border:rgba(255,255,255,0.06)
}`;

/* ── types ── */
interface CircularStepperInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  size?: number;
  label?: string;
  onChange?: (value: number) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function CircularStepperInput({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  size = 140,
  label,
  onChange,
  sound = true,
  style,
}: CircularStepperInputProps) {
  const [value, setValue] = React.useState(defaultValue);
  const dragging = React.useRef(false);
  const prevSnap = React.useRef(value);

  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value - min) / (max - min);
  const offset = circumference * (1 - percentage);

  const setVal = React.useCallback(
    (v: number) => {
      setValue(v);
      onChange?.(v);
    },
    [onChange],
  );

  const increment = () => {
    const next = Math.min(value + step, max);
    if (next !== value) {
      if (sound) tick();
      setVal(next);
    }
  };

  const decrement = () => {
    const next = Math.max(value - step, min);
    if (next !== value) {
      if (sound) tick();
      setVal(next);
    }
  };

  /* ── drag on ring ── */
  const angleToValue = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(dx, -dy);
    if (angle < 0) angle += Math.PI * 2;
    const pct = angle / (Math.PI * 2);
    const raw = min + pct * (max - min);
    return Math.max(min, Math.min(max, Math.round(raw / step) * step));
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    const v = angleToValue(e);
    prevSnap.current = v;
    if (sound) tick();
    setVal(v);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    const v = angleToValue(e);
    if (v !== prevSnap.current) {
      if (sound) tick();
      prevSnap.current = v;
    }
    setVal(v);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="cs"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: 24,
          borderRadius: 14,
          background: "var(--cs-glass)",
          border: "1px solid var(--cs-border)",
          boxShadow: "var(--cs-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          ...style,
        }}
      >
        {label && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "var(--cs-dim)",
              userSelect: "none" as const,
            }}
          >
            {label}
          </span>
        )}

        {/* ring */}
        <div style={{ position: "relative", width: size, height: size }}>
          <svg
            width={size}
            height={size}
            style={{
              transform: "rotate(-90deg)",
              cursor: "pointer",
              touchAction: "none" as const,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--cs-track)"
              strokeWidth={5}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--cs-fill)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: offset }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </svg>

          {/* center value */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none" as const,
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ opacity: 0.4, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--cs-hi)",
                  lineHeight: 1,
                }}
              >
                {value}
              </motion.span>
            </AnimatePresence>
            <span
              style={{ fontSize: 10, color: "var(--cs-dim)", marginTop: 4 }}
            >
              of {max}
            </span>
          </div>
        </div>

        {/* buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <GlassBtn label="−" onClick={decrement} disabled={value <= min} />
          <GlassBtn label="+" onClick={increment} disabled={value >= max} />
        </div>

        {/* min / max */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 10,
            color: "var(--cs-dim)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </motion.div>
    </>
  );
}

/* ── glass button ── */
function GlassBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid var(--cs-btn-border)",
        background: "var(--cs-btn)",
        color: disabled ? "var(--cs-dim)" : "var(--cs-hi)",
        fontSize: 18,
        fontWeight: 400,
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.4 : 1,
        transition: "background 0.15s, opacity 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.background = "var(--cs-btn-h)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--cs-btn)";
      }}
    >
      {label}
    </motion.button>
  );
}
