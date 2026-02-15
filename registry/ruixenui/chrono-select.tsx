"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

/* ── constants ── */
const MO = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DA = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/* ── date math ── */
function dim(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function soff(y: number, m: number) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function toKey(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function todayKey() {
  const n = new Date();
  return toKey(n.getFullYear(), n.getMonth(), n.getDate());
}
function parseKey(k: string) {
  const [y, m, d] = k.split("-").map(Number);
  return { y, m: m - 1, d };
}
function displayDate(k: string) {
  const { y, m, d } = parseKey(k);
  return `${MO[m].slice(0, 3)} ${d}, ${y}`;
}

/* ── sound ── */
let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;
function tick() {
  try {
    if (!_ctx) _ctx = new AudioContext();
    if (!_buf) {
      const len = Math.round(_ctx.sampleRate * 0.003);
      _buf = _ctx.createBuffer(1, len, _ctx.sampleRate);
      const ch = _buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * 0.12;
      }
    }
    const s = _ctx.createBufferSource();
    s.buffer = _buf;
    s.connect(_ctx.destination);
    s.start();
  } catch {}
}

/* ── types ── */
interface ChronoSelectProps {
  /** Selected date as "YYYY-MM-DD" */
  value?: string;
  /** Fires with "YYYY-MM-DD" or null */
  onChange?: (date: string | null) => void;
  /** Trigger placeholder when nothing selected */
  placeholder?: string;
  /** Enable soft tick on interactions */
  sound?: boolean;
}

/* ── component ── */
export function ChronoSelect({
  value,
  onChange,
  placeholder = "Pick a date",
  sound = true,
}: ChronoSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value ?? null);
  const [hovDay, setHovDay] = useState<number | null>(null);
  const [dir, setDir] = useState(0);

  /* derive initial month/year from value */
  const init = selected ? parseKey(selected) : null;
  const [month, setMonth] = useState(init?.m ?? new Date().getMonth());
  const [year, setYear] = useState(init?.y ?? new Date().getFullYear());

  const wrapRef = useRef<HTMLDivElement>(null);
  const lastTick = useRef(0);

  const play = useCallback(() => {
    if (!sound) return;
    const now = Date.now();
    if (now - lastTick.current < 80) return;
    lastTick.current = now;
    tick();
  }, [sound]);

  /* sync external value */
  useEffect(() => {
    if (value && value !== selected) {
      setSelected(value);
      const p = parseKey(value);
      setMonth(p.m);
      setYear(p.y);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  /* click-outside */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const today = todayKey();
  const days = dim(year, month);
  const offset = soff(year, month);

  const weeks = useMemo(() => {
    const rows: (number | null)[][] = [];
    let row: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= days; d++) {
      row.push(d);
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }
    if (row.length) {
      while (row.length < 7) row.push(null);
      rows.push(row);
    }
    return rows;
  }, [year, month, days, offset]);

  const nav = (delta: number) => {
    setDir(delta);
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setMonth(m);
    setYear(y);
    play();
  };

  const pick = (d: number) => {
    const key = toKey(year, month, d);
    setSelected(key);
    onChange?.(key);
    play();
    setTimeout(() => setOpen(false), 180);
  };

  const goToday = () => {
    const n = new Date();
    setDir(0);
    setYear(n.getFullYear());
    setMonth(n.getMonth());
    pick(n.getDate());
  };

  /* cell size */
  const CELL = 36;

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: 280,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── single breathing card ── */}
      <motion.div
        animate={{
          borderRadius: open ? 14 : 12,
          boxShadow: open
            ? "0 8px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 1px 4px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        style={{
          background: "rgba(18,18,20,0.98)",
          overflow: "hidden",
        }}
      >
        {/* ── trigger ── */}
        <motion.button
          onClick={() => {
            setOpen((o) => !o);
            play();
          }}
          whileTap={{ scale: 0.985 }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "11px 16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: selected ? 500 : 400,
              letterSpacing: "-0.01em",
              color: selected
                ? "rgba(255,255,255,0.88)"
                : "rgba(255,255,255,0.3)",
            }}
          >
            {selected ? displayDate(selected) : placeholder}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.2)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ▾
          </motion.span>
        </motion.button>

        {/* ── expanding calendar ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              style={{ overflow: "hidden" }}
            >
              {/* hairline separator */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  margin: "0 14px",
                }}
              />

              <div style={{ padding: "12px 14px 14px" }}>
                {/* ── month / year nav ── */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <motion.button
                    onClick={() => nav(-1)}
                    whileTap={{ scale: 0.82 }}
                    style={{
                      width: 26,
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "none",
                      borderRadius: 7,
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 14,
                      fontWeight: 300,
                    }}
                  >
                    ‹
                  </motion.button>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${year}-${month}`}
                      initial={{ y: dir > 0 ? 6 : -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: dir > 0 ? -6 : 6, opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 24,
                        stiffness: 300,
                      }}
                      style={{
                        fontSize: 13,
                        fontWeight: 520,
                        letterSpacing: "-0.01em",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {MO[month]} {year}
                    </motion.span>
                  </AnimatePresence>

                  <motion.button
                    onClick={() => nav(1)}
                    whileTap={{ scale: 0.82 }}
                    style={{
                      width: 26,
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "none",
                      borderRadius: 7,
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 14,
                      fontWeight: 300,
                    }}
                  >
                    ›
                  </motion.button>
                </div>

                {/* ── day-of-week headers ── */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(7, ${CELL}px)`,
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  {DA.map((d) => (
                    <div
                      key={d}
                      style={{
                        textAlign: "center",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: "rgba(255,255,255,0.18)",
                        textTransform: "uppercase",
                        paddingBottom: 6,
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* ── calendar grid ── */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${year}-${month}`}
                    initial={{ x: dir > 0 ? 16 : -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: dir > 0 ? -16 : 16, opacity: 0 }}
                    transition={{
                      type: "spring",
                      damping: 26,
                      stiffness: 300,
                    }}
                  >
                    {weeks.map((week, wi) => (
                      <div
                        key={wi}
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(7, ${CELL}px)`,
                          justifyContent: "center",
                        }}
                      >
                        {week.map((d, ci) => {
                          if (d === null) return <div key={ci} />;

                          const key = toKey(year, month, d);
                          const isSel = key === selected;
                          const isToday = key === today;
                          const isHov = d === hovDay;

                          return (
                            <motion.button
                              key={d}
                              onClick={() => pick(d)}
                              onMouseEnter={() => setHovDay(d)}
                              onMouseLeave={() => setHovDay(null)}
                              animate={{
                                y: isSel ? -2 : isHov ? -1 : 0,
                              }}
                              whileTap={{ scale: 0.88 }}
                              transition={{
                                type: "spring",
                                damping: 22,
                                stiffness: 320,
                              }}
                              style={{
                                width: CELL,
                                height: CELL,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                fontWeight: isSel ? 600 : isToday ? 550 : 400,
                                color: isSel
                                  ? "rgba(255,255,255,0.95)"
                                  : isToday
                                    ? "rgba(255,255,255,0.82)"
                                    : isHov
                                      ? "rgba(255,255,255,0.65)"
                                      : "rgba(255,255,255,0.4)",
                                background: isSel
                                  ? "rgba(255,255,255,0.1)"
                                  : isHov
                                    ? "rgba(255,255,255,0.04)"
                                    : "transparent",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              {d}
                              {isToday && !isSel && (
                                <span
                                  style={{
                                    position: "absolute",
                                    bottom: 4,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: 3,
                                    height: 3,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.45)",
                                  }}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* ── today shortcut ── */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 8,
                  }}
                >
                  <motion.button
                    onClick={goToday}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.25)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                      padding: "3px 8px",
                      borderRadius: 6,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
                    }
                  >
                    Today
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
