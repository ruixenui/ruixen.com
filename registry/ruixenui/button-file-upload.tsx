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
.fu{
  --fu-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --fu-border:rgba(0,0,0,0.06);
  --fu-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --fu-hi:rgba(0,0,0,0.88);
  --fu-dim:rgba(0,0,0,0.42);
  --fu-ok:#34C759
}
.dark .fu,[data-theme="dark"] .fu{
  --fu-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --fu-border:rgba(255,255,255,0.07);
  --fu-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --fu-hi:rgba(255,255,255,0.88);
  --fu-dim:rgba(255,255,255,0.28);
  --fu-ok:#30D158
}`;

/* ── component ── */
export interface ButtonFileUploadProps {
  onFileSelect: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  sound?: boolean;
  style?: React.CSSProperties;
}

export function ButtonFileUpload({
  onFileSelect,
  accept = "*/*",
  multiple = false,
  label = "Upload",
  sound = true,
  style,
}: ButtonFileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
      setFile(
        e.target.files.length === 1
          ? e.target.files[0].name
          : `${e.target.files.length} files`,
      );
      if (sound) tick();
      e.target.value = "";
    }
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (sound) tick();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <motion.button
        className="fu"
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderRadius: 10,
          border: "1px solid var(--fu-border)",
          background: "var(--fu-glass)",
          boxShadow: "var(--fu-shadow)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          color: "var(--fu-hi)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          ...style,
        }}
      >
        {/* upload arrow icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--fu-dim)" }}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <AnimatePresence mode="wait" initial={false}>
          {file ? (
            <motion.span
              key="file"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "var(--fu-ok)",
              }}
            >
              <span
                style={{
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {file}
              </span>
              <span
                onClick={clear}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  fontSize: 10,
                  cursor: "pointer",
                  opacity: 0.6,
                }}
              >
                ✕
              </span>
            </motion.span>
          ) : (
            <motion.span
              key="label"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

export default ButtonFileUpload;
