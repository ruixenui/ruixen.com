"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Range Calendar — Rauno Freiberg craft.
 *
 * A compact calendar grid stripped to pure numbers.
 * No borders, no cell outlines — just floating numerals in a 7-column grid.
 * Date range shown as a continuous capsule highlight that wraps across rows,
 * with per-row start/end rounding so the highlight reads as one fluid shape.
 * Click to set start, click again to set end. Hover previews the range.
 * Spring-animated month transitions with directional slide.
 * Today marked with a tiny dot below the number.
 * Duration display appears once a range is selected.
 * Soft noise-burst tick on selection and navigation.
 */

/* ── Types ── */

export interface DateRange {
  start: Date;
  end: Date;
}

interface RangeCalendarProps {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (range: DateRange | null) => void;
  sound?: boolean;
}

/* ── Constants ── */

const CELL = 34;
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_NAMES = [
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

/* ── Audio — soft tick ── */

let _ctx: AudioContext | null = null;
let _clickBuf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function clickBuffer(ac: AudioContext): AudioBuffer {
  if (_clickBuf && _clickBuf.sampleRate === ac.sampleRate) return _clickBuf;

  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.003);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);

  for (let i = 0; i < len; i++) {
    const t = i / len;
    ch[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
  }

  _clickBuf = buf;
  return buf;
}

function playTick(lastTime: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - lastTime.current < 30) return;
  lastTime.current = now;

  try {
    const ac = audioCtx();
    const buf = clickBuffer(ac);

    const src = ac.createBufferSource();
    const gain = ac.createGain();

    src.buffer = buf;
    src.playbackRate.value = 1.0;
    gain.gain.value = 0.06;

    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent fallback */
  }
}

/* ── Helpers ── */

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysBetween(a: Date, b: Date) {
  const msDay = 86400000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round(Math.abs(utcB - utcA) / msDay);
}

function getGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  // Monday = 0 .. Sunday = 6
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length < 42) cells.push(null);
  return cells;
}

function inRange(date: Date, start: Date, end: Date) {
  const t = date.getTime();
  const lo = start.getTime() <= end.getTime() ? start : end;
  const hi = start.getTime() <= end.getTime() ? end : start;
  return t >= lo.getTime() && t <= hi.getTime();
}

/* ── Component ── */

export function RangeCalendar({
  value: controlledValue,
  defaultValue,
  onChange,
  sound = true,
}: RangeCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [internal, setInternal] = useState<DateRange | null>(
    () => defaultValue ?? null,
  );
  const isControlled = controlledValue !== undefined;
  const range = isControlled ? controlledValue : internal;
  const lastSoundTime = useRef(0);

  const update = useCallback(
    (r: DateRange | null) => {
      if (!isControlled) setInternal(r);
      onChange?.(r);
    },
    [isControlled, onChange],
  );

  /* View state */
  const [viewYear, setViewYear] = useState(
    () => range?.start.getFullYear() ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    () => range?.start.getMonth() ?? today.getMonth(),
  );
  const [direction, setDirection] = useState(0);

  /* Selection state (always internal) */
  const [selStart, setSelStart] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);

  const grid = useMemo(
    () => getGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  /* Navigation */
  const goPrev = useCallback(() => {
    if (sound) playTick(lastSoundTime);
    setDirection(-1);
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, [sound]);

  const goNext = useCallback(() => {
    if (sound) playTick(lastSoundTime);
    setDirection(1);
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, [sound]);

  /* Click handler */
  const onDayClick = useCallback(
    (date: Date) => {
      if (sound) playTick(lastSoundTime);

      if (!selStart) {
        // First click — set start
        setSelStart(date);
        update(null);
      } else {
        // Second click — set range
        const start = selStart.getTime() <= date.getTime() ? selStart : date;
        const end = selStart.getTime() <= date.getTime() ? date : selStart;
        setSelStart(null);
        setHover(null);
        update({ start, end });
      }
    },
    [selStart, sound, update],
  );

  /* Compute visual range (committed range OR in-progress selection preview) */
  const visStart = selStart
    ? hover
      ? selStart.getTime() <= hover.getTime()
        ? selStart
        : hover
      : selStart
    : (range?.start ?? null);

  const visEnd = selStart
    ? hover
      ? selStart.getTime() <= hover.getTime()
        ? hover
        : selStart
      : selStart
    : (range?.end ?? null);

  /* Duration label */
  const days = range ? daysBetween(range.start, range.end) : null;

  const key = `${viewYear}-${viewMonth}`;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Header — month/year + nav */}
      <div
        className="flex w-full items-center justify-between"
        style={{ width: CELL * 7 }}
      >
        <button
          onClick={goPrev}
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors duration-150 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <span className="text-[13px] font-medium tracking-[-0.01em] text-neutral-500 dark:text-neutral-500">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          onClick={goNext}
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors duration-150 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7" style={{ width: CELL * 7 }}>
        {DAYS.map((d) => (
          <div
            key={d}
            className="flex select-none items-center justify-center text-[9px] font-medium uppercase tracking-[0.04em] text-neutral-300 dark:text-neutral-700"
            style={{
              width: CELL,
              height: 20,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid with animated month transitions */}
      <div
        className="relative overflow-hidden"
        style={{ width: CELL * 7, height: CELL * 6 }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={key}
            className="grid grid-cols-7"
            style={{ width: CELL * 7 }}
            initial={{ x: direction * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -80, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 36,
              mass: 0.8,
            }}
          >
            {grid.map((date, i) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${i}`}
                    style={{ width: CELL, height: CELL }}
                  />
                );
              }

              const dayNum = date.getDate();
              const col = i % 7;
              const isToday = sameDay(date, today);
              const daysInMonth = new Date(
                viewYear,
                viewMonth + 1,
                0,
              ).getDate();

              /* Range highlight logic */
              const isInRange =
                visStart && visEnd
                  ? inRange(date, visStart, visEnd)
                  : visStart
                    ? sameDay(date, visStart)
                    : false;
              const isStart = visStart ? sameDay(date, visStart) : false;
              const isEnd = visEnd ? sameDay(date, visEnd) : false;
              const isSingle = isStart && isEnd;

              /* Per-row capsule rounding */
              const roundL = isSingle || isStart || col === 0 || dayNum === 1;
              const roundR =
                isSingle || isEnd || col === 6 || dayNum === daysInMonth;

              const borderRadius = isInRange
                ? `${roundL ? CELL / 2 : 0}px ${roundR ? CELL / 2 : 0}px ${roundR ? CELL / 2 : 0}px ${roundL ? CELL / 2 : 0}px`
                : "0";

              /* Text color classes */
              const textCls =
                isStart || isEnd
                  ? "text-white dark:text-neutral-950"
                  : isInRange
                    ? "text-neutral-700 dark:text-neutral-300"
                    : isToday
                      ? "text-neutral-600 dark:text-neutral-400"
                      : "text-neutral-400 dark:text-neutral-500";

              return (
                <div
                  key={dayNum}
                  className="relative flex items-center justify-center"
                  style={{
                    width: CELL,
                    height: CELL,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => onDayClick(date)}
                  onMouseEnter={() => {
                    if (selStart) setHover(date);
                  }}
                  onMouseLeave={() => {
                    if (selStart) setHover(null);
                  }}
                >
                  {/* Range highlight background */}
                  {isInRange && (
                    <div
                      className={cn(
                        "absolute inset-0 transition-colors duration-100",
                        isStart || isEnd
                          ? "bg-neutral-900 dark:bg-neutral-100"
                          : "bg-neutral-100 dark:bg-neutral-800",
                      )}
                      style={{ borderRadius }}
                    />
                  )}

                  {/* Number */}
                  <span
                    className={cn(
                      "relative text-[13px] tabular-nums transition-colors duration-100",
                      textCls,
                    )}
                    style={{
                      fontWeight: isStart || isEnd ? 550 : 400,
                    }}
                  >
                    {dayNum}
                  </span>

                  {/* Today dot */}
                  {isToday && (
                    <div className="absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Duration display — always rendered to prevent layout shift */}
      <span
        className="text-[11px] tracking-[0.02em] text-neutral-400 transition-opacity duration-150 dark:text-neutral-600"
        style={{
          opacity: days !== null ? 1 : 0,
        }}
      >
        {days === null
          ? "\u00A0"
          : days === 0
            ? "1 day"
            : days === 1
              ? "2 days"
              : `${days + 1} days`}
      </span>
    </div>
  );
}

export default RangeCalendar;
