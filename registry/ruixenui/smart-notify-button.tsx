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
.sn{
  --sn-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --sn-border:rgba(0,0,0,0.06);
  --sn-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --sn-hi:rgba(0,0,0,0.88);
  --sn-dim:rgba(0,0,0,0.42);
  --sn-ok:#34C759;
  --sn-err:#FF3B30;
  --sn-info:#007AFF;
  --sn-toast-shadow:0 12px 40px rgba(0,0,0,0.12),0 0 1px rgba(0,0,0,0.06)
}
.dark .sn,[data-theme="dark"] .sn{
  --sn-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --sn-border:rgba(255,255,255,0.07);
  --sn-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --sn-hi:rgba(255,255,255,0.88);
  --sn-dim:rgba(255,255,255,0.28);
  --sn-ok:#30D158;
  --sn-err:#FF453A;
  --sn-info:#0A84FF;
  --sn-toast-shadow:0 12px 40px rgba(0,0,0,0.3),0 0 1px rgba(255,255,255,0.06)
}`;

/* ── icons ── */
const icons: Record<string, React.ReactNode> = {
  success: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--sn-ok)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--sn-err)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  info: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--sn-info)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

/* ── component ── */
export interface SmartNotifyButtonProps {
  label?: string;
  message?: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number;
  sound?: boolean;
  style?: React.CSSProperties;
}

export default function SmartNotifyButton({
  label = "Notify",
  message = "Notification sent",
  description,
  type = "info",
  duration = 3000,
  sound = true,
  style,
}: SmartNotifyButtonProps) {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const notify = () => {
    if (sound) tick();
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), duration);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sn" style={{ position: "relative", ...style }}>
        <motion.button
          onClick={notify}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid var(--sn-border)",
            background: "var(--sn-glass)",
            boxShadow: "var(--sn-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            color: "var(--sn-hi)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            outline: "none",
            userSelect: "none",
          }}
        >
          {/* bell icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--sn-dim)" }}
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {label}
        </motion.button>

        {/* inline glass toast */}
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: 0,
                minWidth: 220,
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid var(--sn-border)",
                background: "var(--sn-glass)",
                boxShadow: "var(--sn-toast-shadow)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                zIndex: 50,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}>{icons[type]}</span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--sn-hi)",
                  }}
                >
                  {message}
                </span>
                {description && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--sn-dim)",
                    }}
                  >
                    {description}
                  </span>
                )}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
