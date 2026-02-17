"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Calendar Wave — a calendar where days respond to your cursor
 * like the surface of water.
 *
 * Move over the grid: nearby days rise toward you, creating a
 * smooth cosine wave that ripples outward. Lifted cells brighten
 * and cast deeper shadows. Click to select — the chosen day
 * locks at peak height with a spring pop.
 *
 * The surface IS the interaction.
 */

/* ── constants ── */
const MONTHS = [
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
const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const CELL = 40;
const GAP = 2;
const STEP = CELL + GAP;
const RADIUS = 110;
const MAX_LIFT = 8;

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
function parseKey(k: string) {
  const [y, m, d] = k.split("-").map(Number);
  return { y, m: m - 1, d };
}

/* ── wave math ── */
function waveLift(mx: number, my: number, col: number, row: number): number {
  const cx = col * STEP + CELL / 2;
  const cy = row * STEP + CELL / 2;
  const dx = mx - cx;
  const dy = my - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist >= RADIUS) return 0;
  const t = dist / RADIUS;
  return (MAX_LIFT * (1 + Math.cos(Math.PI * t))) / 2;
}

/* ── sound ── */
let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function _init() {
  if (_ctx) return;
  _ctx = new AudioContext();
  const n = Math.ceil(_ctx.sampleRate * 0.003);
  _buf = _ctx.createBuffer(1, n, _ctx.sampleRate);
  const ch = _buf.getChannelData(0);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * 0.12;
  }
}

let _last = 0;
function _tick() {
  const now = Date.now();
  if (now - _last < 60) return;
  _last = now;
  if (!_ctx || !_buf) return;
  const s = _ctx.createBufferSource();
  s.buffer = _buf;
  s.connect(_ctx.destination);
  s.start();
}

/* ── types ── */
export interface CalendarWaveProps {
  /** Selected date as "YYYY-MM-DD" */
  value?: string;
  /** Fires with "YYYY-MM-DD" on day selection */
  onChange?: (date: string) => void;
  /** Enable tick sound. Default true */
  sound?: boolean;
}

/* ── component ── */
export function CalendarWave({
  value,
  onChange,
  sound = true,
}: CalendarWaveProps) {
  const now = useMemo(() => new Date(), []);

  const [month, setMonth] = useState(() =>
    value ? Number(value.slice(5, 7)) - 1 : now.getMonth(),
  );
  const [year, setYear] = useState(() =>
    value ? Number(value.slice(0, 4)) : now.getFullYear(),
  );
  const [selected, setSelected] = useState<string | null>(value ?? null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [hovering, setHovering] = useState(false);
  const [dir, setDir] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const today = toKey(now.getFullYear(), now.getMonth(), now.getDate());

  const tick = useCallback(() => {
    if (!sound) return;
    _init();
    _tick();
  }, [sound]);

  /* grid data */
  const days = dim(year, month);
  const offset = soff(year, month);

  const cells = useMemo(() => {
    const result: { day: number | null; col: number; row: number }[] = [];
    let idx = 0;
    for (let i = 0; i < offset; i++) {
      result.push({ day: null, col: idx % 7, row: Math.floor(idx / 7) });
      idx++;
    }
    for (let d = 1; d <= days; d++) {
      result.push({ day: d, col: idx % 7, row: Math.floor(idx / 7) });
      idx++;
    }
    return result;
  }, [year, month, days, offset]);

  /* mouse tracking */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  /* navigation */
  const nav = (delta: number) => {
    tick();
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
  };

  /* selection */
  const pick = (d: number) => {
    tick();
    const key = toKey(year, month, d);
    setSelected(key);
    onChange?.(key);
  };

  /* selected date display */
  const selDisplay = selected
    ? (() => {
        const { y, m, d } = parseKey(selected);
        const date = new Date(y, m, d);
        return date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      })()
    : null;

  return (
    <div
      className="select-none"
      style={{
        width: 7 * STEP - GAP + 48,
        padding: "28px 24px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      {/* ── header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <motion.button
          onClick={() => nav(-1)}
          whileTap={{ scale: 0.85 }}
          className="text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            padding: "4px 10px",
          }}
        >
          ‹
        </motion.button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${year}-${month}`}
            initial={{ y: dir > 0 ? 8 : -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: dir > 0 ? -8 : 8, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="text-neutral-900 dark:text-neutral-100"
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {MONTHS[month]} {year}
          </motion.span>
        </AnimatePresence>

        <motion.button
          onClick={() => nav(1)}
          whileTap={{ scale: 0.85 }}
          className="text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            padding: "4px 10px",
          }}
        >
          ›
        </motion.button>
      </div>

      {/* ── DOW headers ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(7, ${CELL}px)`,
          gap: GAP,
          marginBottom: 6,
        }}
      >
        {DOW.map((d) => (
          <div
            key={d}
            className="text-neutral-300 dark:text-neutral-700"
            style={{
              fontSize: 10,
              fontWeight: 500,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* ── grid with wave ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: dir > 0 ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir > 0 ? -16 : 16 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
        >
          <div
            ref={gridRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setMousePos({ x: -9999, y: -9999 });
            }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(7, ${CELL}px)`,
              gap: GAP,
            }}
          >
            {cells.map((cell, i) => {
              if (cell.day === null) {
                return (
                  <div key={`e-${i}`} style={{ width: CELL, height: CELL }} />
                );
              }

              const key = toKey(year, month, cell.day);
              const isSel = key === selected;
              const isToday = key === today;

              const lift = hovering
                ? waveLift(mousePos.x, mousePos.y, cell.col, cell.row)
                : 0;

              const effectiveLift = isSel ? MAX_LIFT : lift;

              const shadow =
                effectiveLift > 0.5
                  ? `0 ${Math.round(effectiveLift * 1.5)}px ${Math.round(effectiveLift * 3)}px rgba(0,0,0,${(0.03 + effectiveLift * 0.008).toFixed(3)})`
                  : "none";

              return (
                <motion.button
                  key={cell.day}
                  onClick={() => pick(cell.day!)}
                  animate={{
                    y: -effectiveLift,
                    scale: 1 + effectiveLift * 0.005,
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    mass: 0.4,
                  }}
                  className={cn(
                    "relative flex items-center justify-center rounded-[10px] transition-colors duration-150",
                    isSel
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950"
                      : isToday
                        ? "bg-transparent text-neutral-900 dark:text-neutral-100"
                        : lift > 3
                          ? "bg-neutral-50 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                          : lift > 1
                            ? "bg-transparent text-neutral-600 dark:text-neutral-400"
                            : "bg-transparent text-neutral-400 dark:text-neutral-600",
                  )}
                  style={{
                    width: CELL,
                    height: CELL,
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontWeight: isSel || isToday ? 600 : lift > 2 ? 500 : 400,
                    fontSize: 13,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                    boxShadow: shadow,
                  }}
                >
                  {cell.day}
                  {isToday && !isSel && (
                    <span className="absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── selected date label ── */}
      <AnimatePresence>
        {selDisplay && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="text-neutral-500 dark:text-neutral-500"
            style={{
              marginTop: 16,
              textAlign: "center",
              fontSize: 12,
              fontWeight: 450,
              letterSpacing: "-0.005em",
            }}
          >
            {selDisplay}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CalendarWave;
