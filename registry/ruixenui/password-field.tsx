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
.pf{
  --pf-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --pf-border:rgba(0,0,0,0.06);
  --pf-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --pf-dim:rgba(0,0,0,0.42);
  --pf-mid:rgba(0,0,0,0.55);
  --pf-hi:rgba(0,0,0,0.88);
  --pf-focus:rgba(0,0,0,0.12);
  --pf-sep:rgba(0,0,0,0.06);
  --pf-btn:rgba(0,0,0,0.03);
  --pf-btn-h:rgba(0,0,0,0.07);
  --pf-btn-border:rgba(0,0,0,0.06);
  --pf-track:rgba(0,0,0,0.06);
  --pf-weak:rgba(239,68,68,0.7);
  --pf-medium:rgba(234,179,8,0.7);
  --pf-strong:rgba(59,130,246,0.7);
  --pf-max:rgba(34,197,94,0.7);
  --pf-ok:rgba(34,197,94,0.8);
  --pf-fail:rgba(0,0,0,0.2)
}
.dark .pf,[data-theme="dark"] .pf{
  --pf-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --pf-border:rgba(255,255,255,0.07);
  --pf-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --pf-dim:rgba(255,255,255,0.28);
  --pf-mid:rgba(255,255,255,0.5);
  --pf-hi:rgba(255,255,255,0.88);
  --pf-focus:rgba(255,255,255,0.12);
  --pf-sep:rgba(255,255,255,0.06);
  --pf-btn:rgba(255,255,255,0.03);
  --pf-btn-h:rgba(255,255,255,0.07);
  --pf-btn-border:rgba(255,255,255,0.06);
  --pf-track:rgba(255,255,255,0.06);
  --pf-weak:rgba(248,113,113,0.8);
  --pf-medium:rgba(250,204,21,0.8);
  --pf-strong:rgba(96,165,250,0.8);
  --pf-max:rgba(74,222,128,0.8);
  --pf-ok:rgba(74,222,128,0.9);
  --pf-fail:rgba(255,255,255,0.15)
}`;

/* ── helpers ── */
const CHECKS = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Number", test: (v: string) => /\d/.test(v) },
  {
    label: "Special char",
    test: (v: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
  },
];

const STRENGTH_COLORS = [
  "var(--pf-track)",
  "var(--pf-weak)",
  "var(--pf-medium)",
  "var(--pf-strong)",
  "var(--pf-max)",
];

const STRENGTH_LABELS = ["", "Weak", "Fair", "Strong", "Very strong"];

const CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

/* ── types ── */
export interface PasswordFieldProps {
  label?: string;
  placeholder?: string;
  showChecklist?: boolean;
  allowGenerate?: boolean;
  onChange?: (value: string) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function PasswordField({
  label = "Password",
  placeholder = "Enter password",
  showChecklist = true,
  allowGenerate = true,
  onChange,
  sound = true,
  style,
}: PasswordFieldProps) {
  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = CHECKS.map((c) => c.test(value));
  const passed = results.filter(Boolean).length;

  const toggleVisibility = () => {
    setVisible((v) => !v);
    if (sound) tick();
  };

  const generate = () => {
    let pw = "";
    for (let i = 0; i < 16; i++)
      pw += CHARSET[Math.floor(Math.random() * CHARSET.length)];
    setValue(pw);
    onChange?.(pw);
    if (sound) tick();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="pf"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 0,
          borderRadius: 14,
          background: "var(--pf-glass)",
          border: "1px solid var(--pf-border)",
          boxShadow: "var(--pf-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          width: 340,
          ...style,
        }}
      >
        {/* input row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 4px 0 16px",
            borderBottom: value ? `1px solid var(--pf-sep)` : "none",
          }}
        >
          {/* label + input */}
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                top: value || focused ? 8 : "50%",
                transform: value || focused ? "none" : "translateY(-50%)",
                fontSize: value || focused ? 10 : 14,
                fontWeight: 500,
                color: "var(--pf-dim)",
                transition: "all 0.2s",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {label}
            </span>
            <input
              ref={inputRef}
              type={visible ? "text" : "password"}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onChange?.(e.target.value);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? placeholder : ""}
              style={{
                width: "100%",
                height: 52,
                paddingTop: value || focused ? 16 : 0,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 15,
                fontWeight: 500,
                color: "var(--pf-hi)",
              }}
            />
          </div>

          {/* eye toggle */}
          <motion.button
            onClick={toggleVisibility}
            whileTap={{ scale: 0.85 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--pf-mid)",
              transition: "color 0.15s",
              flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait">
              {visible ? (
                <motion.svg
                  key="off"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 2l12 12" />
                  <path d="M6.5 6.5a2 2 0 002.8 2.8" />
                  <path d="M3.6 3.6C2.2 4.8 1 6.4 1 8c0 0 3 5 7 5 1.3 0 2.4-.4 3.4-1" />
                  <path d="M11 5c1.3 1 2.6 2.4 3 3 0 0-3 5-7 5" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="on"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                  <circle cx="8" cy="8" r="2" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* generate button */}
          {allowGenerate && (
            <motion.button
              onClick={generate}
              whileTap={{ scale: 0.85 }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--pf-mid)",
                transition: "color 0.15s",
                flexShrink: 0,
              }}
            >
              <svg
                width={14}
                height={14}
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4.5a5.5 5.5 0 10.5 5.5" />
                <path d="M12 4.5V1.5" />
                <path d="M12 4.5h3" />
              </svg>
            </motion.button>
          )}
        </div>

        {/* strength bar */}
        {value && (
          <div style={{ padding: "10px 16px" }}>
            <div
              style={{
                display: "flex",
                gap: 3,
                marginBottom: 6,
              }}
            >
              {Array.from({ length: 4 }, (_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor:
                      i < passed ? STRENGTH_COLORS[passed] : "var(--pf-track)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 1.5,
                    background: "var(--pf-track)",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--pf-dim)",
              }}
            >
              {STRENGTH_LABELS[passed]}
            </span>
          </div>
        )}

        {/* checklist */}
        {showChecklist && value && (
          <>
            <div style={{ height: 1, background: "var(--pf-sep)" }} />
            <div
              style={{
                padding: "10px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {CHECKS.map((check, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    color: results[i] ? "var(--pf-ok)" : "var(--pf-dim)",
                    transition: "color 0.2s",
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
                    {results[i] ? (
                      <path d="M3 8.5l3.5 3.5L13 5" />
                    ) : (
                      <circle cx="8" cy="8" r="5" />
                    )}
                  </svg>
                  <span>{check.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}
