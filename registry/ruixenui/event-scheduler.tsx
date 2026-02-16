"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Event Scheduler — inline timeline creation.
 *
 * Today's events at a glance. Tap a time, type a title,
 * press Enter. The event springs into the list. Delete
 * with a tap. No forms, no modals, no dropdowns.
 *
 * The schedule is the interface.
 */

/* ── Types ── */

export interface SchedulerEvent {
  id: string;
  title: string;
  hour: number;
  minute: number;
}

export interface EventSchedulerProps {
  events?: SchedulerEvent[];
  onAdd?: (event: SchedulerEvent) => void;
  onRemove?: (id: string) => void;
  sound?: boolean;
}

/* ── Constants ── */

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const MINUTES = [0, 15, 30, 45];

/* ── Helpers ── */

function fmtHour(h: number): string {
  if (h === 0 || h === 12) return "12";
  return h > 12 ? String(h - 12) : String(h);
}

function fmtPeriod(h: number): string {
  return h >= 12 ? "pm" : "am";
}

function fmtTime(h: number, m: number): string {
  return `${fmtHour(h)}:${String(m).padStart(2, "0")} ${fmtPeriod(h)}`;
}

function sortKey(e: SchedulerEvent): number {
  return e.hour * 60 + e.minute;
}

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

/* ── Component ── */

export function EventScheduler({
  events: initialEvents = [],
  onAdd,
  onRemove,
  sound = true,
}: EventSchedulerProps) {
  const [events, setEvents] = useState<SchedulerEvent[]>(
    [...initialEvents].sort((a, b) => sortKey(a) - sortKey(b)),
  );
  const [title, setTitle] = useState("");
  const [selHour, setSelHour] = useState(10);
  const [selMinute, setSelMinute] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastSound = useRef(0);

  function tick() {
    if (sound) playTick(lastSound);
  }

  function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed) return;
    tick();
    const ev: SchedulerEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: trimmed,
      hour: selHour,
      minute: selMinute,
    };
    setEvents([...events, ev].sort((a, b) => sortKey(a) - sortKey(b)));
    onAdd?.(ev);
    setTitle("");
    inputRef.current?.focus();
    /* Scroll the new event into view after render */
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelector(`[data-eid="${ev.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  function handleRemove(id: string) {
    tick();
    setEvents((prev) => prev.filter((e) => e.id !== id));
    onRemove?.(id);
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="rounded-[14px] border border-neutral-200 bg-neutral-50 overflow-hidden dark:border-neutral-800 dark:bg-neutral-950"
      style={{
        maxWidth: 380,
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "20px 20px 14px",
        }}
      >
        <span
          className="text-neutral-900 dark:text-neutral-100"
          style={{
            fontSize: 15,
            fontWeight: 590,
            letterSpacing: "-0.01em",
          }}
        >
          Today
        </span>
        <span
          className="text-neutral-400 dark:text-neutral-600"
          style={{
            fontSize: 12,
          }}
        >
          {dateStr}
        </span>
      </div>

      {/* Event list */}
      <div
        ref={listRef}
        style={{
          padding: "0 20px",
          minHeight: 48,
          maxHeight: 200,
          overflowY: "auto",
          scrollbarWidth: "none",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8px, black calc(100% - 8px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 8px, black calc(100% - 8px), transparent)",
        }}
      >
        {events.length === 0 && (
          <div
            className="text-neutral-300 dark:text-neutral-700"
            style={{
              fontSize: 13,
              padding: "8px 0 14px",
            }}
          >
            Nothing scheduled
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              data-eid={event.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="border-b border-neutral-100 dark:border-neutral-800/50"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 0",
              }}
            >
              {/* Time */}
              <span
                className="text-neutral-400 dark:text-neutral-600"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  minWidth: 58,
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmtTime(event.hour, event.minute)}
              </span>

              {/* Title */}
              <span
                className="text-neutral-600 dark:text-neutral-400"
                style={{
                  fontSize: 13,
                  fontWeight: 450,
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {event.title}
              </span>

              {/* Delete */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleRemove(event.id)}
                className="text-neutral-200 dark:text-neutral-800 hover:text-red-500 dark:hover:text-red-400"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 0",
                  fontSize: 14,
                  lineHeight: 1,
                  transition: "color 0.15s",
                }}
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Creation zone */}
      <div
        className="border-t border-neutral-200 dark:border-neutral-800"
        style={{
          marginTop: 4,
          padding: "14px 20px 16px",
        }}
      >
        {/* Input row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="New event…"
            className="text-neutral-600 dark:text-neutral-400 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              fontWeight: 400,
              fontFamily: "inherit",
            }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={cn(
              "transition-colors duration-150",
              title.trim()
                ? "text-neutral-500 dark:text-neutral-500"
                : "text-neutral-200 dark:text-neutral-800",
            )}
            style={{
              background: "transparent",
              border: "none",
              cursor: title.trim() ? "pointer" : "default",
              fontSize: 13,
              fontWeight: 500,
              padding: "4px 0",
            }}
          >
            Add
          </motion.button>
        </div>

        {/* Selected time hint */}
        <div
          className="text-neutral-300 dark:text-neutral-700"
          style={{
            fontSize: 11,
            marginTop: 10,
            marginBottom: 6,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {fmtTime(selHour, selMinute)}
        </div>

        {/* Hours */}
        <div
          style={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {HOURS.map((h) => (
            <button
              key={h}
              onClick={() => {
                tick();
                setSelHour(h);
              }}
              className={cn(
                "transition-colors duration-150",
                selHour === h
                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  : "bg-transparent text-neutral-300 dark:text-neutral-700",
              )}
              style={{
                padding: "5px 7px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                cursor: "pointer",
                border: "none",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {fmtHour(h)}
              <span style={{ fontSize: 9, marginLeft: 1, opacity: 0.6 }}>
                {fmtPeriod(h)}
              </span>
            </button>
          ))}
        </div>

        {/* Minutes */}
        <div
          style={{
            display: "flex",
            gap: 1,
            marginTop: 3,
          }}
        >
          {MINUTES.map((m) => (
            <button
              key={m}
              onClick={() => {
                tick();
                setSelMinute(m);
              }}
              className={cn(
                "transition-colors duration-150",
                selMinute === m
                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  : "bg-transparent text-neutral-300 dark:text-neutral-700",
              )}
              style={{
                padding: "5px 8px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
                cursor: "pointer",
                border: "none",
              }}
            >
              :{String(m).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventScheduler;
