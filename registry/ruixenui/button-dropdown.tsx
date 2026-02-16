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
.bd{
  --bd-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --bd-border:rgba(0,0,0,0.06);
  --bd-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --bd-hi:rgba(0,0,0,0.88);
  --bd-dim:rgba(0,0,0,0.42);
  --bd-hover:rgba(0,0,0,0.03);
  --bd-danger:#FF3B30;
  --bd-menu-shadow:0 8px 32px rgba(0,0,0,0.12),0 0 1px rgba(0,0,0,0.06)
}
.dark .bd,[data-theme="dark"] .bd{
  --bd-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --bd-border:rgba(255,255,255,0.07);
  --bd-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --bd-hi:rgba(255,255,255,0.88);
  --bd-dim:rgba(255,255,255,0.28);
  --bd-hover:rgba(255,255,255,0.04);
  --bd-danger:#FF453A;
  --bd-menu-shadow:0 8px 32px rgba(0,0,0,0.3),0 0 1px rgba(255,255,255,0.06)
}`;

/* ── types ── */
export interface DropdownItem {
  label: string;
  onClick?: () => void;
  destructive?: boolean;
}

export interface ButtonDropdownProps {
  label: string;
  items: DropdownItem[];
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export function ButtonDropdown({
  label,
  items,
  sound = true,
  style,
}: ButtonDropdownProps) {
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

  const pill: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 10,
    border: "1px solid var(--bd-border)",
    background: "var(--bd-glass)",
    boxShadow: "var(--bd-shadow)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    color: "var(--bd-hi)",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    outline: "none",
    userSelect: "none",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        ref={ref}
        className="bd"
        style={{ position: "relative", display: "inline-block", ...style }}
      >
        <motion.button
          onClick={() => {
            setOpen((v) => !v);
            if (sound) tick();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={pill}
        >
          <span>{label}</span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--bd-dim)" }}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.button>

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
                left: 0,
                minWidth: 160,
                padding: 4,
                borderRadius: 12,
                border: "1px solid var(--bd-border)",
                background: "var(--bd-glass)",
                boxShadow: "var(--bd-menu-shadow)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                zIndex: 50,
              }}
            >
              {items.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    item.onClick?.();
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
                    (e.currentTarget.style.background = "var(--bd-hover)")
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
                    color: item.destructive
                      ? "var(--bd-danger)"
                      : "var(--bd-hi)",
                    fontSize: 13,
                    fontWeight: 400,
                    cursor: "pointer",
                    outline: "none",
                    textAlign: "left" as const,
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default ButtonDropdown;
