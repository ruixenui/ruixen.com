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
.ul{
  --ul-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --ul-border:rgba(0,0,0,0.06);
  --ul-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --ul-dim:rgba(0,0,0,0.42);
  --ul-mid:rgba(0,0,0,0.55);
  --ul-hi:rgba(0,0,0,0.88);
  --ul-focus:rgba(0,0,0,0.12);
  --ul-icon-bg:rgba(0,0,0,0.04);
  --ul-icon-border:rgba(0,0,0,0.06)
}
.dark .ul,[data-theme="dark"] .ul{
  --ul-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --ul-border:rgba(255,255,255,0.07);
  --ul-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --ul-dim:rgba(255,255,255,0.28);
  --ul-mid:rgba(255,255,255,0.5);
  --ul-hi:rgba(255,255,255,0.88);
  --ul-focus:rgba(255,255,255,0.12);
  --ul-icon-bg:rgba(255,255,255,0.04);
  --ul-icon-border:rgba(255,255,255,0.06)
}`;

/* ── types ── */
interface UrlInputProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  hint?: string;
  onChange?: (url: string) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function UrlInput({
  label = "Website URL",
  placeholder = "example.com",
  defaultValue = "",
  hint,
  onChange,
  sound = true,
  style,
}: UrlInputProps) {
  const [url, setUrl] = React.useState(defaultValue);
  const [favicon, setFavicon] = React.useState<string | null>(null);
  const [faviconOk, setFaviconOk] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!url) {
      setFavicon(null);
      setFaviconOk(false);
      return;
    }
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      setFavicon(`${parsed.origin}/favicon.ico`);
      setFaviconOk(false);
    } catch {
      setFavicon(null);
      setFaviconOk(false);
    }
  }, [url]);

  const handleFocus = () => {
    setFocused(true);
    if (sound) tick();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="ul"
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
              color: "var(--ul-dim)",
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
            alignItems: "center",
            gap: 12,
            padding: "0 14px",
            borderRadius: 12,
            background: "var(--ul-glass)",
            border: `1px solid ${focused ? "var(--ul-focus)" : "var(--ul-border)"}`,
            boxShadow: "var(--ul-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            transition: "border-color 0.2s",
            cursor: "text",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* favicon / globe */}
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: "var(--ul-icon-bg)",
              border: "1px solid var(--ul-icon-border)",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {favicon ? (
              <img
                src={favicon}
                alt=""
                width={18}
                height={18}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 3,
                  opacity: faviconOk ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
                onLoad={() => setFaviconOk(true)}
                onError={() => {
                  setFavicon(null);
                  setFaviconOk(false);
                }}
              />
            ) : null}
            {(!favicon || !faviconOk) && (
              <svg
                width={14}
                height={14}
                viewBox="0 0 16 16"
                fill="none"
                stroke="var(--ul-dim)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M2 8h12" />
                <path d="M8 2c2 2 3 4 3 6s-1 4-3 6" />
                <path d="M8 2c-2 2-3 4-3 6s1 4 3 6" />
              </svg>
            )}
          </div>

          {/* protocol hint */}
          <span
            style={{
              fontSize: 13,
              color: "var(--ul-dim)",
              userSelect: "none" as const,
              flexShrink: 0,
            }}
          >
            https://
          </span>

          {/* input */}
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              onChange?.(e.target.value);
            }}
            onFocus={handleFocus}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            style={{
              flex: 1,
              height: 48,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "var(--ul-hi)",
              minWidth: 0,
            }}
          />
        </div>

        {hint && (
          <span
            style={{
              fontSize: 11,
              color: "var(--ul-dim)",
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
