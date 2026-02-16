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
.bs{
  --bs-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --bs-border:rgba(0,0,0,0.06);
  --bs-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --bs-hi:rgba(0,0,0,0.88);
  --bs-dim:rgba(0,0,0,0.42);
  --bs-sep:rgba(0,0,0,0.08);
  --bs-hover:rgba(0,0,0,0.03);
  --bs-menu-shadow:0 8px 32px rgba(0,0,0,0.12),0 0 1px rgba(0,0,0,0.06)
}
.dark .bs,[data-theme="dark"] .bs{
  --bs-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --bs-border:rgba(255,255,255,0.07);
  --bs-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --bs-hi:rgba(255,255,255,0.88);
  --bs-dim:rgba(255,255,255,0.28);
  --bs-sep:rgba(255,255,255,0.08);
  --bs-hover:rgba(255,255,255,0.04);
  --bs-menu-shadow:0 8px 32px rgba(0,0,0,0.3),0 0 1px rgba(255,255,255,0.06)
}`;

/* ── types ── */
export interface SplitButtonOption {
  label: string;
  onClick: () => void;
}

export interface ButtonSplitProps {
  label: string;
  onClick: () => void;
  options: SplitButtonOption[];
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export function ButtonSplit({
  label,
  onClick,
  options,
  sound = true,
  style,
}: ButtonSplitProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const shared: React.CSSProperties = {
    border: "none",
    background: "transparent",
    color: "var(--bs-hi)",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    outline: "none",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        ref={ref}
        className="bs"
        style={{ position: "relative", display: "inline-block", ...style }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 10,
            border: "1px solid var(--bs-border)",
            background: "var(--bs-glass)",
            boxShadow: "var(--bs-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            overflow: "hidden",
          }}
        >
          {/* primary action */}
          <motion.button
            onClick={() => {
              onClick();
              if (sound) tick();
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ ...shared, padding: "8px 14px" }}
          >
            {label}
          </motion.button>

          {/* divider */}
          <span
            style={{
              width: 1,
              alignSelf: "stretch",
              margin: "6px 0",
              background: "var(--bs-sep)",
            }}
          />

          {/* chevron trigger */}
          <motion.button
            onClick={() => {
              setOpen((v) => !v);
              if (sound) tick();
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ ...shared, padding: "8px 10px" }}
          >
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--bs-dim)" }}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                minWidth: 160,
                padding: 4,
                borderRadius: 12,
                border: "1px solid var(--bs-border)",
                background: "var(--bs-glass)",
                boxShadow: "var(--bs-menu-shadow)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                zIndex: 50,
              }}
            >
              {options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    opt.onClick();
                    setOpen(false);
                    if (sound) tick();
                  }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: i * 0.03,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--bs-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "none",
                    background: "transparent",
                    color: "var(--bs-hi)",
                    fontSize: 13,
                    fontWeight: 400,
                    cursor: "pointer",
                    outline: "none",
                    textAlign: "left" as const,
                  }}
                >
                  {opt.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default ButtonSplit;
