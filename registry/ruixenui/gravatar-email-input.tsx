"use client";

import * as React from "react";
import { motion } from "motion/react";
import md5 from "md5";

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
.ge{
  --ge-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --ge-border:rgba(0,0,0,0.06);
  --ge-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --ge-dim:rgba(0,0,0,0.42);
  --ge-mid:rgba(0,0,0,0.55);
  --ge-hi:rgba(0,0,0,0.88);
  --ge-focus:rgba(0,0,0,0.12);
  --ge-avatar:rgba(0,0,0,0.04);
  --ge-avatar-border:rgba(0,0,0,0.06)
}
.dark .ge,[data-theme="dark"] .ge{
  --ge-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --ge-border:rgba(255,255,255,0.07);
  --ge-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --ge-dim:rgba(255,255,255,0.28);
  --ge-mid:rgba(255,255,255,0.5);
  --ge-hi:rgba(255,255,255,0.88);
  --ge-focus:rgba(255,255,255,0.12);
  --ge-avatar:rgba(255,255,255,0.04);
  --ge-avatar-border:rgba(255,255,255,0.06)
}`;

/* ── types ── */
interface GravatarEmailInputProps {
  label?: string;
  placeholder?: string;
  initialValue?: string;
  hint?: string;
  onChange?: (email: string) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

/* ── component ── */
export default function GravatarEmailInput({
  label = "Email",
  placeholder = "you@example.com",
  initialValue = "",
  hint,
  onChange,
  sound = true,
  style,
}: GravatarEmailInputProps) {
  const [email, setEmail] = React.useState(initialValue);
  const [focused, setFocused] = React.useState(false);
  const [avatarLoaded, setAvatarLoaded] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const avatarUrl = React.useMemo(() => {
    if (!email.includes("@")) return null;
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=48`;
  }, [email]);

  React.useEffect(() => {
    setAvatarLoaded(false);
  }, [avatarUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    onChange?.(val);
  };

  const handleFocus = () => {
    setFocused(true);
    if (sound) tick();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="ge"
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
              color: "var(--ge-dim)",
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
            background: "var(--ge-glass)",
            border: `1px solid ${focused ? "var(--ge-focus)" : "var(--ge-border)"}`,
            boxShadow: "var(--ge-shadow)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            transition: "border-color 0.2s",
            cursor: "text",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* avatar */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              background: "var(--ge-avatar)",
              border: "1px solid var(--ge-avatar-border)",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                width={28}
                height={28}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  opacity: avatarLoaded ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
                onLoad={() => setAvatarLoaded(true)}
                onError={() => setAvatarLoaded(false)}
              />
            ) : (
              <svg
                width={14}
                height={14}
                viewBox="0 0 16 16"
                fill="none"
                stroke="var(--ge-dim)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="6" r="3" />
                <path d="M2.5 14c0-2.8 2.5-4.5 5.5-4.5s5.5 1.7 5.5 4.5" />
              </svg>
            )}
          </div>

          {/* input */}
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={handleChange}
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
              color: "var(--ge-hi)",
            }}
          />
        </div>

        {hint && (
          <span
            style={{
              fontSize: 11,
              color: "var(--ge-dim)",
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
