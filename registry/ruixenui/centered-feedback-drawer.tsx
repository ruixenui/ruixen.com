"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Centered Feedback Drawer — three emoji, one question.
 *
 * Not a form. Not a survey. Three faces —
 * 🙁 😐 😊 — universally understood in an instant.
 * Click one. It springs up, the others dim. A contextual
 * textarea slides in: "What went wrong?" or "What did you
 * enjoy?" — the interface reads your mood. Submit. Done.
 *
 * The faces are the interface.
 */

/* ── Types ── */

export interface FeedbackData {
  rating: number;
  label: string;
  message: string;
}

export interface CenteredFeedbackDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (feedback: FeedbackData) => void;
  sound?: boolean;
}

/* ── Constants ── */

const RATINGS = [
  { label: "Not great", placeholder: "What went wrong?" },
  { label: "Okay", placeholder: "What could be better?" },
  { label: "Great", placeholder: "What did you enjoy?" },
];

/* ── Audio ── */

let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function ensureBuf(ac: AudioContext): AudioBuffer {
  if (_buf && _buf.sampleRate === ac.sampleRate) return _buf;
  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.003);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    ch[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
  }
  _buf = buf;
  return buf;
}

function playTick(last: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - last.current < 80) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    src.playbackRate.value = 1.15;
    gain.gain.value = 0.03;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Emoji Faces ── */

const EMOJIS = ["🙁", "😐", "😊"];

/* ── Component ── */

export function CenteredFeedbackDrawer({
  open,
  onOpenChange,
  onSubmit,
  sound = true,
}: CenteredFeedbackDrawerProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const lastSound = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function reset() {
    setRating(null);
    setHovered(null);
    setMessage("");
    setSubmitted(false);
  }

  function handleRate(i: number) {
    setRating(i);
    if (sound) playTick(lastSound);
    setTimeout(() => textareaRef.current?.focus(), 220);
  }

  function handleSubmit() {
    if (rating === null) return;
    if (sound) playTick(lastSound);
    onSubmit?.({
      rating: rating + 1,
      label: RATINGS[rating].label,
      message,
    });
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(reset, 300);
    }, 1200);
  }

  function handleClose() {
    if (submitted) return;
    onOpenChange(false);
    setTimeout(reset, 300);
  }

  /* ── Style helpers ── */

  function faceOpacity(i: number): number {
    const sel = rating === i;
    const hov = hovered === i;
    const has = rating !== null;

    if (sel) return 1;
    if (hov) return has ? 0.5 : 0.85;
    return has ? 0.2 : 0.6;
  }

  function faceBg(i: number): string {
    if (rating === i) return "rgba(var(--d-ink),0.08)";
    if (hovered === i) return "rgba(var(--d-ink),0.04)";
    return "transparent";
  }

  function faceBorder(i: number): string {
    if (rating === i) return "1px solid rgba(var(--d-ink),0.12)";
    return "1px solid transparent";
  }

  return (
    <>
      <style>{`
        .cfd{--d-ink:0,0,0;--d-bg:rgba(255,255,255,0.98)}
        .dark .cfd,[data-theme="dark"] .cfd{--d-ink:255,255,255;--d-bg:rgba(24,24,26,0.98)}
        .cfd textarea::placeholder{color:rgba(var(--d-ink),0.2)}
      `}</style>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 40,
              }}
            />

            {/* Centering wrapper */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                pointerEvents: "none",
              }}
            >
              {/* Panel */}
              <motion.div
                className="cfd"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
                style={{
                  pointerEvents: "auto",
                  width: "calc(100% - 32px)",
                  maxWidth: 320,
                  background: "var(--d-bg)",
                  border: "1px solid rgba(var(--d-ink),0.06)",
                  borderRadius: 16,
                  padding: "28px 24px",
                }}
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.1 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {/* Question */}
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          color: "rgba(var(--d-ink),0.5)",
                          marginBottom: 22,
                        }}
                      >
                        How was your experience?
                      </div>

                      {/* Faces */}
                      <div style={{ display: "flex", gap: 14 }}>
                        {EMOJIS.map((emoji, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleRate(i)}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            whileTap={{ scale: 0.92 }}
                            animate={{ scale: rating === i ? 1.1 : 1 }}
                            transition={{
                              type: "spring",
                              damping: 18,
                              stiffness: 300,
                            }}
                            style={{
                              width: 52,
                              height: 52,
                              borderRadius: 14,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: 26,
                              lineHeight: 1,
                              opacity: faceOpacity(i),
                              background: faceBg(i),
                              border: faceBorder(i),
                              transition:
                                "opacity 0.15s, background 0.15s, border 0.15s",
                            }}
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </div>

                      {/* Label — appears below faces after selection */}
                      <div style={{ minHeight: 26, marginTop: 8 }}>
                        <AnimatePresence mode="wait">
                          {rating !== null && (
                            <motion.div
                              key={rating}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.12 }}
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "-0.01em",
                                color: "rgba(var(--d-ink),0.4)",
                              }}
                            >
                              {RATINGS[rating].label}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Comment area — slides in after rating */}
                      <AnimatePresence>
                        {rating !== null && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 300,
                            }}
                            style={{
                              width: "100%",
                              overflow: "hidden",
                            }}
                          >
                            {/* Hairline */}
                            <div
                              style={{
                                height: 1,
                                background: "rgba(var(--d-ink),0.06)",
                                margin: "6px 0 14px",
                              }}
                            />

                            {/* Textarea — contextual placeholder */}
                            <textarea
                              ref={textareaRef}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder={
                                rating !== null ? RATINGS[rating].placeholder : ""
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSubmit();
                                }
                              }}
                              style={{
                                width: "100%",
                                minHeight: 60,
                                resize: "none",
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                fontSize: 13,
                                fontWeight: 400,
                                lineHeight: 1.6,
                                color: "rgba(var(--d-ink),0.65)",
                                fontFamily: "inherit",
                              }}
                            />

                            {/* Send */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingTop: 2,
                              }}
                            >
                              <button
                                onClick={handleSubmit}
                                style={{
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: message
                                    ? "rgba(var(--d-ink),0.6)"
                                    : "rgba(var(--d-ink),0.3)",
                                  cursor: "pointer",
                                  background: "transparent",
                                  border: "none",
                                  padding: "4px 0",
                                  transition: "color 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color =
                                    "rgba(var(--d-ink),0.85)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = message
                                    ? "rgba(var(--d-ink),0.6)"
                                    : "rgba(var(--d-ink),0.3)";
                                }}
                              >
                                Send
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    /* Thank you */
                    <motion.div
                      key="thanks"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "rgba(var(--d-ink),0.5)",
                        padding: "8px 0",
                        textAlign: "center",
                      }}
                    >
                      Thank you.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default CenteredFeedbackDrawer;
