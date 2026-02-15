"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Calendar Planner — a vertical stream of days.
 *
 * No grid. Time flows downward like a notebook.
 * Past days fade, today glows with an accent bar,
 * future days wait quietly. Events live inline,
 * right next to the date they belong to.
 * Select a day, type, press Enter.
 *
 * The stream IS the schedule.
 */

/* ── Types ── */

export interface PlannerEvent {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
}

export interface CalendarPlannerProps {
  events?: PlannerEvent[];
  onAdd?: (event: PlannerEvent) => void;
  onRemove?: (id: string) => void;
  sound?: boolean;
}

/* ── Constants ── */

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ── Helpers ── */

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toKey(y: number, m: number, d: number): string {
  return `${y}-${pad2(m + 1)}-${pad2(d)}`;
}

function getDayName(y: number, m: number, d: number): string {
  return DAY_NAMES[(new Date(y, m, d).getDay() + 6) % 7];
}

function isWeekend(y: number, m: number, d: number): boolean {
  const dow = new Date(y, m, d).getDay();
  return dow === 0 || dow === 6;
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

export function CalendarPlanner({
  events: initialEvents = [],
  onAdd,
  onRemove,
  sound = true,
}: CalendarPlannerProps) {
  const [events, setEvents] = useState<PlannerEvent[]>(initialEvents);
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [direction, setDirection] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSound = useRef(0);

  function tick() {
    if (sound) playTick(lastSound);
  }

  /* ── Calendar math ── */

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const now = new Date();
  const todayDay =
    now.getMonth() === month && now.getFullYear() === year
      ? now.getDate()
      : null;

  /* ── Event lookup ── */

  const prefix = `${year}-${pad2(month + 1)}`;
  const eventsByDay = useMemo(() => {
    const map = new Map<number, PlannerEvent[]>();
    for (const e of events) {
      if (e.date.startsWith(prefix)) {
        const d = parseInt(e.date.slice(8), 10);
        if (d >= 1 && d <= daysInMonth) {
          const arr = map.get(d) || [];
          arr.push(e);
          map.set(d, arr);
        }
      }
    }
    return map;
  }, [events, prefix, daysInMonth]);

  /* ── Auto-scroll to today ── */

  const todayScrollRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 300);
      }
    },
    // Re-run when month/year changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [month, year],
  );

  /* Reset scroll on month change when today isn't in view */
  useEffect(() => {
    if (todayDay === null && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [month, year, todayDay]);

  /* ── Month label ── */

  const monthName = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
  });

  /* ── Navigation ── */

  function goMonth(delta: number) {
    tick();
    setDirection(delta);
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y--;
    } else if (m > 11) {
      m = 0;
      y++;
    }
    setMonth(m);
    setYear(y);
    setSelectedDay(null);
    setTitle("");
  }

  /* ── Add / Remove ── */

  function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed || selectedDay === null) return;
    tick();
    const ev: PlannerEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: trimmed,
      date: toKey(year, month, selectedDay),
    };
    setEvents((prev) => [...prev, ev]);
    onAdd?.(ev);
    setTitle("");
    inputRef.current?.focus();
  }

  function handleRemove(id: string) {
    tick();
    setEvents((prev) => prev.filter((e) => e.id !== id));
    onRemove?.(id);
  }

  return (
    <div
      style={{
        background: "rgba(18,18,20,0.98)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        overflow: "hidden",
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
          padding: "24px 24px 16px",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => goMonth(-1)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
            color: "rgba(255,255,255,0.3)",
            padding: "6px 10px",
            borderRadius: 8,
            transition: "color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          ‹
        </motion.button>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 650,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {monthName}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.28)",
            }}
          >
            {year}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => goMonth(1)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
            color: "rgba(255,255,255,0.3)",
            padding: "6px 10px",
            borderRadius: 8,
            transition: "color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          ›
        </motion.button>
      </div>

      {/* Separator */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.05)",
          margin: "0 24px",
        }}
      />

      {/* Day stream */}
      <div
        ref={scrollRef}
        style={{
          maxHeight: 420,
          overflowY: "auto",
          scrollbarWidth: "none",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10px, black calc(100% - 10px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10px, black calc(100% - 10px), transparent)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: direction > 0 ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ padding: "8px 0 16px" }}
          >
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const isToday = d === todayDay;
              const isPast = todayDay !== null && d < todayDay;
              const isSel = d === selectedDay;
              const dayEvents = eventsByDay.get(d) || [];
              const hasEvents = dayEvents.length > 0;
              const weekend = isWeekend(year, month, d);

              const rowOpacity = isPast ? 0.3 : isToday ? 1 : 0.7;

              return (
                <div
                  key={d}
                  ref={isToday ? todayScrollRef : undefined}
                  style={{
                    opacity: rowOpacity,
                    transition: "opacity 0.2s",
                  }}
                >
                  {/* Today micro-label */}
                  {isToday && (
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.22)",
                        padding: "10px 24px 0 16px",
                        marginLeft: 2,
                      }}
                    >
                      Today
                    </div>
                  )}

                  {/* Day row — clickable to select */}
                  <div
                    onClick={() => {
                      tick();
                      setSelectedDay(isSel ? null : d);
                      setTitle("");
                      if (!isSel) {
                        setTimeout(() => inputRef.current?.focus(), 200);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      padding: `${hasEvents ? 10 : 8}px 24px ${hasEvents ? 10 : 8}px 14px`,
                      cursor: "pointer",
                      position: "relative",
                      background: isSel
                        ? "rgba(255,255,255,0.02)"
                        : isToday
                          ? "rgba(255,255,255,0.015)"
                          : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    {/* Today accent bar */}
                    {isToday && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 4,
                          bottom: 4,
                          width: 2,
                          borderRadius: 1,
                          background: "rgba(255,255,255,0.22)",
                        }}
                      />
                    )}

                    {/* Selected accent bar */}
                    {isSel && !isToday && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 4,
                          bottom: 4,
                          width: 2,
                          borderRadius: 1,
                          background: "rgba(255,255,255,0.1)",
                        }}
                      />
                    )}

                    {/* Date number */}
                    <span
                      style={{
                        width: 24,
                        textAlign: "right",
                        marginRight: 8,
                        fontSize: 13,
                        fontWeight: isToday ? 650 : 400,
                        fontVariantNumeric: "tabular-nums",
                        color: isToday
                          ? "rgba(255,255,255,0.95)"
                          : isSel
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.45)",
                        lineHeight: "18px",
                        flexShrink: 0,
                        transition: "color 0.15s",
                      }}
                    >
                      {d}
                    </span>

                    {/* Day abbreviation */}
                    <span
                      style={{
                        width: 28,
                        marginRight: 14,
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: weekend
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(255,255,255,0.28)",
                        lineHeight: "18px",
                        flexShrink: 0,
                      }}
                    >
                      {getDayName(year, month, d)}
                    </span>

                    {/* Events / empty */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {!hasEvents && (
                        <span
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.06)",
                            lineHeight: "18px",
                          }}
                        >
                          —
                        </span>
                      )}

                      {dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "1px 0",
                          }}
                        >
                          <div
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: isToday
                                ? "rgba(255,255,255,0.45)"
                                : "rgba(255,255,255,0.2)",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 450,
                              color: isToday
                                ? "rgba(255,255,255,0.75)"
                                : "rgba(255,255,255,0.55)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              flex: 1,
                              lineHeight: "18px",
                            }}
                          >
                            {ev.title}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemove(ev.id);
                            }}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 14,
                              color: "rgba(255,255,255,0.08)",
                              lineHeight: 1,
                              padding: "2px 0",
                              transition: "color 0.15s",
                              flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                "rgba(255,69,58,0.7)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                "rgba(255,255,255,0.08)";
                            }}
                          >
                            ×
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inline creation — slides in when selected */}
                  <AnimatePresence>
                    {isSel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 300,
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "4px 24px 8px 74px",
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
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Add event…"
                            style={{
                              flex: 1,
                              background: "transparent",
                              border: "none",
                              outline: "none",
                              fontSize: 13,
                              color: "rgba(255,255,255,0.55)",
                              fontFamily: "inherit",
                            }}
                          />
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdd();
                            }}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: title.trim() ? "pointer" : "default",
                              fontSize: 13,
                              fontWeight: 500,
                              color: title.trim()
                                ? "rgba(255,255,255,0.5)"
                                : "rgba(255,255,255,0.12)",
                              padding: "4px 0",
                              transition: "color 0.15s",
                            }}
                          >
                            Add
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Separator */}
                  {d < daysInMonth && (
                    <div
                      style={{
                        height: 1,
                        margin: "0 24px 0 14px",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CalendarPlanner;
