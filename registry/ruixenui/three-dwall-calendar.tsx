"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * 3D Wall Calendar — a calendar that hangs on a wall.
 *
 * Paper stack beneath the card suggests physical pages.
 * Month transitions flip like tearing off a sheet.
 * Hovered days lift off the surface — shadow deepens,
 * the cell floats. Today is always slightly raised.
 * Select a day: its events appear below with depth.
 *
 * The depth IS the interface.
 */

/* ── Types ── */

export interface WallEvent {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
}

export interface ThreeDWallCalendarProps {
  events?: WallEvent[];
  onAdd?: (event: WallEvent) => void;
  onRemove?: (id: string) => void;
  sound?: boolean;
}

/* ── Constants ── */

const CELL = 42;
const GAP = 2;
const STEP = CELL + GAP;
const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/* ── Helpers ── */

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toKey(y: number, m: number, d: number): string {
  return `${y}-${pad2(m + 1)}-${pad2(d)}`;
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

export function ThreeDWallCalendar({
  events: initialEvents = [],
  onAdd,
  onRemove,
  sound = true,
}: ThreeDWallCalendarProps) {
  const [events, setEvents] = useState<WallEvent[]>(initialEvents);
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [direction, setDirection] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSound = useRef(0);

  function tick() {
    if (sound) playTick(lastSound);
  }

  /* ── Calendar math ── */

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const weeks = Math.ceil((firstOffset + daysInMonth) / 7);

  const now = new Date();
  const todayDay =
    now.getMonth() === month && now.getFullYear() === year
      ? now.getDate()
      : null;

  /* ── Event lookup ── */

  const prefix = `${year}-${pad2(month + 1)}`;
  const eventsByDay = useMemo(() => {
    const map = new Map<number, WallEvent[]>();
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

  const eventDaySet = new Set(eventsByDay.keys());

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
    setHoveredDay(null);
    setTitle("");
  }

  /* ── Selected day ── */

  const selEvents =
    selectedDay !== null ? eventsByDay.get(selectedDay) || [] : [];
  const selLabel =
    selectedDay !== null
      ? new Date(year, month, selectedDay).toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      : "";

  /* ── Add / Remove ── */

  function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed || selectedDay === null) return;
    tick();
    const ev: WallEvent = {
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

  /* ── Event count ── */

  function eventCount(d: number): number {
    return eventsByDay.get(d)?.length || 0;
  }

  const gridW = 7 * STEP - GAP;

  return (
    <div style={{ position: "relative", paddingBottom: 8 }}>
      {/* ── Paper stack layers ── */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: 5,
          right: 5,
          height: 6,
          borderRadius: "0 0 16px 16px",
          background: "rgba(20,20,22,0.95)",
          border: "1px solid rgba(255,255,255,0.035)",
          borderTop: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 10,
          right: 10,
          height: 6,
          borderRadius: "0 0 14px 14px",
          background: "rgba(22,22,24,0.92)",
          border: "1px solid rgba(255,255,255,0.02)",
          borderTop: "none",
        }}
      />

      {/* ── Main card ── */}
      <div
        style={{
          position: "relative",
          background: "rgba(18,18,20,0.98)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          overflow: "hidden",
          width: "fit-content",
          boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "24px 26px 18px",
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

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
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

        {/* Perspective wrapper for page-flip effect */}
        <div style={{ perspective: 900, padding: "0 26px 22px" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${year}-${month}`}
              initial={{
                rotateX: direction > 0 ? 20 : -20,
                opacity: 0,
                scale: 0.97,
              }}
              animate={{ rotateX: 0, opacity: 1, scale: 1 }}
              exit={{
                rotateX: direction > 0 ? -20 : 20,
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              style={{
                transformOrigin: "center center",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Day-of-week headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(7, ${CELL}px)`,
                  gap: GAP,
                  marginBottom: 8,
                }}
              >
                {DOW.map((d) => (
                  <div
                    key={d}
                    style={{
                      fontSize: 10,
                      fontWeight: 550,
                      color: "rgba(255,255,255,0.2)",
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day grid with week dividers */}
              <div style={{ position: "relative" }}>
                {/* Week dividers — ruled paper lines */}
                {Array.from({ length: weeks - 1 }).map((_, i) => (
                  <div
                    key={`wd-${i}`}
                    style={{
                      position: "absolute",
                      left: 0,
                      width: gridW,
                      top: (i + 1) * STEP - GAP / 2,
                      height: 1,
                      background: "rgba(255,255,255,0.03)",
                      zIndex: 0,
                    }}
                  />
                ))}

                {/* Day cells */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(7, ${CELL}px)`,
                    gap: GAP,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Leading empties */}
                  {Array.from({ length: firstOffset }).map((_, i) => (
                    <div key={`e-${i}`} style={{ width: CELL, height: CELL }} />
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1;
                    const isSel = d === selectedDay;
                    const isHov = d === hoveredDay;
                    const isToday = d === todayDay;
                    const hasEv = eventDaySet.has(d);
                    const count = eventCount(d);

                    /* Shadow depth based on state */
                    let shadow = "none";
                    if (isSel)
                      shadow =
                        "0 6px 20px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.25)";
                    else if (isToday) shadow = "0 3px 10px rgba(0,0,0,0.2)";
                    else if (isHov) shadow = "0 4px 14px rgba(0,0,0,0.25)";

                    /* Background */
                    let bg = "transparent";
                    if (isSel) bg = "rgba(255,255,255,0.1)";
                    else if (isToday) bg = "rgba(255,255,255,0.05)";
                    else if (isHov) bg = "rgba(255,255,255,0.035)";

                    return (
                      <motion.button
                        key={d}
                        animate={{
                          y: isSel ? -5 : isHov ? -3 : isToday ? -1 : 0,
                        }}
                        whileTap={{ scale: 0.93, y: 0 }}
                        transition={{
                          type: "spring",
                          damping: 22,
                          stiffness: 320,
                        }}
                        onClick={() => {
                          tick();
                          setSelectedDay(isSel ? null : d);
                          setTitle("");
                        }}
                        onMouseEnter={() => setHoveredDay(d)}
                        onMouseLeave={() => setHoveredDay(null)}
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 10,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          border: "none",
                          background: bg,
                          boxShadow: shadow,
                          transition:
                            "background 0.15s, box-shadow 0.2s ease-out",
                          position: "relative",
                          padding: 0,
                          gap: 1,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: isToday ? 650 : hasEv ? 500 : 400,
                            fontVariantNumeric: "tabular-nums",
                            color: isSel
                              ? "rgba(255,255,255,0.95)"
                              : isToday
                                ? "rgba(255,255,255,0.95)"
                                : hasEv
                                  ? "rgba(255,255,255,0.68)"
                                  : isHov
                                    ? "rgba(255,255,255,0.5)"
                                    : "rgba(255,255,255,0.28)",
                            transition: "color 0.15s",
                            lineHeight: 1,
                          }}
                        >
                          {d}
                        </span>

                        {/* Event bar — marker line, like a physical calendar */}
                        {hasEv && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 5,
                              display: "flex",
                              gap: 2,
                            }}
                          >
                            {Array.from({
                              length: Math.min(count, 3),
                            }).map((_, idx) => (
                              <div
                                key={idx}
                                style={{
                                  width: count === 1 ? 8 : 3,
                                  height: 2,
                                  borderRadius: 1,
                                  background:
                                    isSel || isToday
                                      ? "rgba(255,255,255,0.55)"
                                      : "rgba(255,255,255,0.22)",
                                  transition: "background 0.15s",
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Selected day panel ── */}
        <AnimatePresence>
          {selectedDay !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "inset 0 1px 6px rgba(0,0,0,0.2)",
                  padding: "14px 26px 20px",
                }}
              >
                {/* Date label */}
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 550,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 10,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {selLabel}
                </div>

                {/* Events */}
                {selEvents.length === 0 && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.18)",
                      padding: "2px 0 8px",
                    }}
                  >
                    No events
                  </div>
                )}

                <div
                  style={{
                    maxHeight: 140,
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    maskImage:
                      selEvents.length > 3
                        ? "linear-gradient(to bottom, black 0%, black calc(100% - 16px), transparent)"
                        : undefined,
                    WebkitMaskImage:
                      selEvents.length > 3
                        ? "linear-gradient(to bottom, black 0%, black calc(100% - 16px), transparent)"
                        : undefined,
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {selEvents.map((ev) => (
                      <motion.div
                        key={ev.id}
                        layout
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -14 }}
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 350,
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "7px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          gap: 10,
                        }}
                      >
                        {/* Depth accent — shadow line */}
                        <div
                          style={{
                            width: 2,
                            height: 14,
                            borderRadius: 1,
                            background: "rgba(255,255,255,0.15)",
                            boxShadow: "1px 0 4px rgba(255,255,255,0.04)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 450,
                            color: "rgba(255,255,255,0.65)",
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ev.title}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleRemove(ev.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 14,
                            color: "rgba(255,255,255,0.12)",
                            lineHeight: 1,
                            padding: "2px 0",
                            transition: "color 0.15s",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "rgba(255,69,58,0.7)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(255,255,255,0.12)";
                          }}
                        >
                          ×
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Inline creation */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: selEvents.length > 0 ? 8 : 0,
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
                    placeholder="Add event…"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "inherit",
                    }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAdd}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: title.trim() ? "pointer" : "default",
                      fontSize: 13,
                      fontWeight: 500,
                      color: title.trim()
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.15)",
                      padding: "4px 0",
                      transition: "color 0.15s",
                    }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ThreeDWallCalendar;
