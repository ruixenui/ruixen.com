"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Add Task — Rauno Freiberg craft.
 *
 * A quick-add task dialog. Title input, priority pills, submit.
 * Three zones separated by hairlines. Enter to submit.
 * The text field IS the form.
 *
 * Uses absolute positioning — fills its nearest positioned parent.
 * Wrap in a fixed inset-0 container for full-viewport overlay.
 *
 * Auto-focus on open. Escape to close.
 * Submit wakes up when title is non-empty.
 * Soft tick on keystrokes and interactions.
 */

/* ── Types ── */

export type Priority = "urgent" | "high" | "medium" | "low";

export interface TaskData {
  title: string;
  priority: Priority | null;
}

export interface AddTaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (task: TaskData) => void;
  sound?: boolean;
}

/* ── Constants ── */

const W = 400;
const SEP = "rgba(255,255,255,0.06)";
const PRIORITIES: Priority[] = ["urgent", "high", "medium", "low"];

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
  if (now - last.current < 20) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    src.playbackRate.value = 1.0;
    gain.gain.value = 0.04;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Component ── */

export function AddTaskSheet({
  open,
  onOpenChange,
  onSubmit,
  sound = true,
}: AddTaskSheetProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [focused, setFocused] = useState(false);

  const lastSound = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const ready = title.trim() !== "";

  /* Open → focus, close → reset */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    setTitle("");
    setPriority(null);
    setFocused(false);
  }, [open]);

  /* Escape */
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onOpenChange]);

  /* Submit */
  const submit = useCallback(() => {
    if (!title.trim()) {
      inputRef.current?.focus();
      return;
    }
    if (sound) playTick(lastSound);
    onSubmit?.({ title: title.trim(), priority });
  }, [title, priority, sound, onSubmit]);

  /* Enter to submit */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    },
    [submit],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => onOpenChange(false)}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10"
            style={{
              width: W,
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${SEP}`,
              overflow: "hidden",
            }}
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            {/* ── Title ── */}
            <div style={{ padding: "18px 20px" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => {
                  if (sound) playTick(lastSound);
                  setTitle(e.target.value);
                }}
                onKeyDown={onKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="placeholder:text-[rgba(255,255,255,0.15)]"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  fontWeight: 450,
                  letterSpacing: "-0.01em",
                  color: `rgba(255,255,255,${focused ? 0.85 : title ? 0.6 : 0.5})`,
                  transition: "color 0.15s",
                }}
              />
            </div>

            <div style={{ height: 1, background: SEP }} />

            {/* ── Priority ── */}
            <div
              style={{
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {PRIORITIES.map((p) => {
                const active = priority === p;
                return (
                  <button
                    key={p}
                    onClick={() => {
                      if (sound) playTick(lastSound);
                      setPriority(active ? null : p);
                    }}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: `rgba(255,255,255,${active ? 0.7 : 0.2})`,
                      background: active
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                      border: "none",
                      borderRadius: 999,
                      padding: "5px 10px",
                      cursor: "pointer",
                      transition: "color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        e.currentTarget.style.color = "rgba(255,255,255,0.2)";
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <div style={{ height: 1, background: SEP }} />

            {/* ── Submit ── */}
            <button
              onClick={submit}
              style={{
                width: "100%",
                padding: "18px 20px",
                background: ready ? "rgba(255,255,255,0.04)" : "transparent",
                border: "none",
                outline: "none",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: `rgba(255,255,255,${ready ? 0.65 : 0.2})`,
                cursor: ready ? "pointer" : "default",
                transition: "color 0.3s, background 0.3s",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                if (ready) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `rgba(255,255,255,${ready ? 0.65 : 0.2})`;
                e.currentTarget.style.background = ready
                  ? "rgba(255,255,255,0.04)"
                  : "transparent";
              }}
            >
              Add task
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddTaskSheet;
