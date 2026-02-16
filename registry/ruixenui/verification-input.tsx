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
  g.gain.value = 0.04;
  s.connect(g).connect(_a.destination);
  s.start();
};

/* ── theme ── */
const CSS = `
.vi{
  --vi-dim:rgba(0,0,0,0.42);
  --vi-mid:rgba(0,0,0,0.55);
  --vi-hi:rgba(0,0,0,0.88);
  --vi-cell:rgba(0,0,0,0.02);
  --vi-cell-border:rgba(0,0,0,0.06);
  --vi-cell-active:rgba(0,0,0,0.12);
  --vi-cursor:rgba(0,0,0,0.2);
  --vi-filled:rgba(0,0,0,0.6);
  --vi-complete:rgba(0,0,0,0.85)
}
.dark .vi,[data-theme="dark"] .vi{
  --vi-dim:rgba(255,255,255,0.28);
  --vi-mid:rgba(255,255,255,0.5);
  --vi-hi:rgba(255,255,255,0.88);
  --vi-cell:rgba(255,255,255,0.02);
  --vi-cell-border:rgba(255,255,255,0.06);
  --vi-cell-active:rgba(255,255,255,0.15);
  --vi-cursor:rgba(255,255,255,0.2);
  --vi-filled:rgba(255,255,255,0.6);
  --vi-complete:rgba(255,255,255,0.85)
}`;

const CELL = 46;
const CELL_H = 56;
const GAP = 8;
const GROUP_GAP = 16;
const MONO =
  "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace";

/* ── types ── */
export interface VerificationInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onResend?: () => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export function VerificationInput({
  length = 6,
  onComplete,
  onResend,
  sound = true,
  style,
}: VerificationInputProps) {
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const digits = value.split("");
  const activeIndex = value.length;
  const completed = value.length >= length;
  const group = Math.floor(length / 2);

  React.useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, length);
      if (raw.length > value.length && sound) tick();
      setValue(raw);
      if (raw.length >= length) onComplete?.(raw);
    },
    [length, value.length, sound, onComplete],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && sound && value.length > 0) tick();
    },
    [sound, value.length],
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="vi"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          ...style,
        }}
      >
        {/* label */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "var(--vi-dim)",
            userSelect: "none" as const,
          }}
        >
          Verification code
        </span>

        {/* cells */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: GAP,
            cursor: "text",
            position: "relative",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              position: "absolute",
              opacity: 0,
              width: 1,
              height: 1,
              pointerEvents: "none",
            }}
            aria-label="Verification code"
          />

          {Array.from({ length }, (_, i) => {
            const digit = digits[i] || "";
            const isActive = focused && i === activeIndex && !completed;
            const isFilled = digit !== "";

            return (
              <React.Fragment key={i}>
                {i === group && <div style={{ width: GROUP_GAP - GAP }} />}
                <motion.div
                  animate={{
                    borderColor: isActive
                      ? "var(--vi-cell-active)"
                      : "var(--vi-cell-border)",
                  }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "relative",
                    width: CELL,
                    height: CELL_H,
                    borderRadius: 12,
                    background: "var(--vi-cell)",
                    border: "1px solid var(--vi-cell-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {isFilled && (
                      <motion.span
                        key={digit + i}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        style={{
                          fontSize: 22,
                          fontWeight: 500,
                          fontFamily: MONO,
                          fontVariantNumeric: "tabular-nums",
                          color: completed
                            ? "var(--vi-complete)"
                            : "var(--vi-filled)",
                          userSelect: "none" as const,
                        }}
                      >
                        {digit}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.div
                      layoutId="vi-cursor"
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 16,
                        height: 1.5,
                        borderRadius: 1,
                        background: "var(--vi-cursor)",
                      }}
                    />
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* resend */}
        <button
          onClick={onResend}
          style={{
            fontSize: 12,
            color: "var(--vi-dim)",
            background: "transparent",
            border: "none",
            cursor: onResend ? "pointer" : "default",
            transition: "color 0.15s",
            opacity: onResend ? 1 : 0,
            pointerEvents: onResend ? "auto" : "none",
          }}
          onMouseEnter={(e) => {
            if (onResend) e.currentTarget.style.color = "var(--vi-mid)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--vi-dim)";
          }}
          tabIndex={onResend ? 0 : -1}
        >
          Resend code
        </button>
      </motion.div>
    </>
  );
}

export default VerificationInput;
