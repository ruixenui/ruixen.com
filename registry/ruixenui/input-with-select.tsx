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
.is{
  --is-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --is-border:rgba(0,0,0,0.06);
  --is-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --is-dim:rgba(0,0,0,0.42);
  --is-mid:rgba(0,0,0,0.55);
  --is-hi:rgba(0,0,0,0.88);
  --is-focus:rgba(0,0,0,0.12);
  --is-sep:rgba(0,0,0,0.06);
  --is-seg-bg:rgba(0,0,0,0.04);
  --is-seg-active:rgba(0,0,0,0.07);
  --is-knob:#fff;
  --is-knob-border:rgba(0,0,0,0.08);
  --is-knob-shadow:0 1px 3px rgba(0,0,0,0.12)
}
.dark .is,[data-theme="dark"] .is{
  --is-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --is-border:rgba(255,255,255,0.07);
  --is-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --is-dim:rgba(255,255,255,0.28);
  --is-mid:rgba(255,255,255,0.5);
  --is-hi:rgba(255,255,255,0.88);
  --is-focus:rgba(255,255,255,0.12);
  --is-sep:rgba(255,255,255,0.06);
  --is-seg-bg:rgba(255,255,255,0.04);
  --is-seg-active:rgba(255,255,255,0.09);
  --is-knob:#fff;
  --is-knob-border:rgba(255,255,255,0.06);
  --is-knob-shadow:0 1px 3px rgba(0,0,0,0.15)
}`;

/* ── types ── */
interface Option {
  value: string;
  label: string;
}

interface InputWithSelectProps {
  label?: string;
  placeholder?: string;
  options?: Option[];
  defaultOption?: string;
  defaultValue?: string;
  onChange?: (value: string, option: string) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function InputWithSelect({
  label = "Amount",
  placeholder = "0.00",
  options = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "inr", label: "INR" },
  ],
  defaultOption = "usd",
  defaultValue = "",
  onChange,
  sound = true,
  style,
}: InputWithSelectProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [selected, setSelected] = React.useState(defaultOption);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const activeIdx = options.findIndex((o) => o.value === selected);

  const selectOption = (opt: string) => {
    if (opt !== selected) {
      setSelected(opt);
      if (sound) tick();
      onChange?.(value, opt);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="is"
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
        {label && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "var(--is-dim)",
              userSelect: "none" as const,
              paddingLeft: 4,
            }}
          >
            {label}
          </span>
        )}

        {/* glass field */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            borderRadius: 12,
            background: "var(--is-glass)",
            border: `1px solid ${focused ? "var(--is-focus)" : "var(--is-border)"}`,
            boxShadow: "var(--is-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            transition: "border-color 0.2s",
            overflow: "hidden",
          }}
        >
          {/* input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e.target.value, selected);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            style={{
              flex: 1,
              height: 48,
              padding: "0 16px",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 15,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
              color: "var(--is-hi)",
              minWidth: 0,
            }}
          />

          {/* separator */}
          <div
            style={{
              width: 1,
              alignSelf: "stretch",
              background: "var(--is-sep)",
            }}
          />

          {/* segment control */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                borderRadius: 8,
                background: "var(--is-seg-bg)",
                padding: 2,
                position: "relative",
              }}
            >
              {/* active knob */}
              <motion.div
                animate={{
                  x: activeIdx * 100 + "%",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{
                  position: "absolute",
                  top: 2,
                  left: 2,
                  width: `calc(${100 / options.length}% - ${4 / options.length}px)`,
                  height: "calc(100% - 4px)",
                  borderRadius: 6,
                  background: "var(--is-knob)",
                  border: "1px solid var(--is-knob-border)",
                  boxShadow: "var(--is-knob-shadow)",
                }}
              />

              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "5px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    border: "none",
                    background: "transparent",
                    color:
                      selected === opt.value ? "var(--is-hi)" : "var(--is-dim)",
                    cursor: "pointer",
                    transition: "color 0.15s",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
