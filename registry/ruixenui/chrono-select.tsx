"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Chrono Select — inline date picker dropdown.
 *
 * Click to expand, calendar grid, today shortcut,
 * click-outside dismiss. Spring animations.
 * A single breathing card that opens and closes.
 */

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
    <div ref={wrapRef} className="relative" style={{ width: 280 }}>
      {/* ── single breathing card ── */}
      <motion.div
        animate={{
          borderRadius: open ? 14 : 12,
        }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        className={cn(
          "overflow-hidden border transition-shadow duration-200",
          "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950",
          open
            ? "shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "shadow-sm dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)]",
        )}
      >
        {/* ── trigger ── */}
        <motion.button
          onClick={() => {
            setOpen((o) => !o);
            play();
          }}
          whileTap={{ scale: 0.985 }}
          className="flex w-full items-center justify-between bg-transparent"
          style={{
            padding: "11px 16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            className={cn(
              "text-[14px] tracking-[-0.01em]",
              selected
                ? "font-medium text-neutral-900 dark:text-neutral-100"
                : "font-normal text-neutral-400 dark:text-neutral-600",
            )}
          >
            {selected ? displayDate(selected) : placeholder}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="select-none text-[9px] leading-none text-neutral-400 dark:text-neutral-600"
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
              <div className="mx-[14px] h-px bg-neutral-200 dark:bg-neutral-800" />

              <div style={{ padding: "12px 14px 14px" }}>
                {/* ── month / year nav ── */}
                <div className="mb-3 flex items-center justify-between">
                  <motion.button
                    onClick={() => nav(-1)}
                    whileTap={{ scale: 0.82 }}
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-neutral-100 text-[14px] font-light text-neutral-400 transition-colors hover:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-600 dark:hover:text-neutral-400"
                    style={{ border: "none", cursor: "pointer" }}
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
                      className="text-[13px] tracking-[-0.01em] text-neutral-600 dark:text-neutral-400"
                      style={{ fontWeight: 520 }}
                    >
                      {MO[month]} {year}
                    </motion.span>
                  </AnimatePresence>

                  <motion.button
                    onClick={() => nav(1)}
                    whileTap={{ scale: 0.82 }}
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-neutral-100 text-[14px] font-light text-neutral-400 transition-colors hover:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-600 dark:hover:text-neutral-400"
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    ›
                  </motion.button>
                </div>

                {/* ── day-of-week headers ── */}
                <div
                  className="mb-[2px] grid justify-center"
                  style={{ gridTemplateColumns: `repeat(7, ${CELL}px)` }}
                >
                  {DA.map((d) => (
                    <div
                      key={d}
                      className="pb-[6px] text-center text-[10px] font-medium uppercase tracking-[0.04em] text-neutral-300 dark:text-neutral-700"
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
                        className="grid justify-center"
                        style={{
                          gridTemplateColumns: `repeat(7, ${CELL}px)`,
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
                              className={cn(
                                "relative flex items-center justify-center rounded-lg text-[13px] transition-colors duration-100",
                                isSel
                                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950"
                                  : isHov
                                    ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                    : isToday
                                      ? "text-neutral-800 dark:text-neutral-200"
                                      : "text-neutral-400 dark:text-neutral-500",
                              )}
                              style={{
                                width: CELL,
                                height: CELL,
                                border: "none",
                                cursor: "pointer",
                                fontWeight: isSel
                                  ? 600
                                  : isToday
                                    ? 550
                                    : 400,
                              }}
                            >
                              {d}
                              {isToday && !isSel && (
                                <span className="absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* ── today shortcut ── */}
                <div className="mt-2 flex justify-center">
                  <motion.button
                    onClick={goToday}
                    whileTap={{ scale: 0.94 }}
                    className="rounded-md bg-transparent text-[11px] font-medium tracking-[0.02em] text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400"
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "3px 8px",
                    }}
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
