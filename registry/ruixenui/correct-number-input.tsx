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
.ni{
  --ni-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --ni-border:rgba(0,0,0,0.06);
  --ni-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --ni-dim:rgba(0,0,0,0.42);
  --ni-mid:rgba(0,0,0,0.55);
  --ni-hi:rgba(0,0,0,0.88);
  --ni-focus:rgba(0,0,0,0.12);
  --ni-btn:rgba(0,0,0,0.03);
  --ni-btn-h:rgba(0,0,0,0.07);
  --ni-sep:rgba(0,0,0,0.06)
}
.dark .ni,[data-theme="dark"] .ni{
  --ni-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --ni-border:rgba(255,255,255,0.07);
  --ni-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --ni-dim:rgba(255,255,255,0.28);
  --ni-mid:rgba(255,255,255,0.5);
  --ni-hi:rgba(255,255,255,0.88);
  --ni-focus:rgba(255,255,255,0.12);
  --ni-btn:rgba(255,255,255,0.03);
  --ni-btn-h:rgba(255,255,255,0.07);
  --ni-sep:rgba(255,255,255,0.06)
}`;

/* ── types ── */
interface CorrectNumberInputProps {
  label?: string;
  hint?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function CorrectNumberInput({
  label = "Amount",
  hint,
  defaultValue = 0,
  min,
  max,
  step = 1,
  onChange,
  sound = true,
  style,
}: CorrectNumberInputProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasValue = value !== 0 || focused;

  const clamp = (v: number) => {
    let n = v;
    if (min !== undefined) n = Math.max(min, n);
    if (max !== undefined) n = Math.min(max, n);
    return n;
  };

  const setVal = (v: number) => {
    const c = clamp(v);
    setValue(c);
    onChange?.(c);
  };

  const increment = () => {
    const next = clamp(value + step);
    if (next !== value) {
      if (sound) tick();
      setVal(next);
    }
  };

  const decrement = () => {
    const next = clamp(value - step);
    if (next !== value) {
      if (sound) tick();
      setVal(next);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="ni"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 6,
          ...style,
        }}
      >
        {/* glass field */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "stretch",
            borderRadius: 12,
            background: "var(--ni-glass)",
            border: `1px solid ${focused ? "var(--ni-focus)" : "var(--ni-border)"}`,
            boxShadow: "var(--ni-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            transition: "border-color 0.2s",
            overflow: "hidden",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* input area */}
          <div style={{ flex: 1, position: "relative", padding: "0 16px" }}>
            {/* floating label */}
            <span
              style={{
                position: "absolute",
                left: 16,
                top: hasValue ? 8 : "50%",
                transform: hasValue ? "none" : "translateY(-50%)",
                fontSize: hasValue ? 10 : 14,
                fontWeight: 500,
                color: "var(--ni-dim)",
                transition: "all 0.2s",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {label}
            </span>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={value === 0 && !focused ? "" : value}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "" || raw === "-") {
                  setValue(0);
                  return;
                }
                const n = Number(raw);
                if (!isNaN(n)) setVal(n);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: "100%",
                height: 52,
                paddingTop: hasValue ? 18 : 0,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 15,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                color: "var(--ni-hi)",
              }}
            />
          </div>

          {/* separator */}
          <div
            style={{
              width: 1,
              alignSelf: "stretch",
              background: "var(--ni-sep)",
            }}
          />

          {/* steppers */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 36,
            }}
          >
            <StepBtn dir="up" onClick={increment} />
            <div style={{ height: 1, background: "var(--ni-sep)" }} />
            <StepBtn dir="down" onClick={decrement} />
          </div>
        </div>

        {hint && (
          <span
            style={{
              fontSize: 11,
              color: "var(--ni-dim)",
              paddingLeft: 4,
            }}
          >
            {hint}
          </span>
        )}
      </motion.div>
    </>
  );
}

/* ── step button ── */
function StepBtn({
  dir,
  onClick,
}: {
  dir: "up" | "down";
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ni-btn)",
        border: "none",
        cursor: "pointer",
        color: "var(--ni-mid)",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--ni-btn-h)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--ni-btn)";
      }}
    >
      <svg
        width={12}
        height={12}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "up" ? <path d="M4 10l4-4 4 4" /> : <path d="M4 6l4 4 4-4" />}
      </svg>
    </motion.button>
  );
}
