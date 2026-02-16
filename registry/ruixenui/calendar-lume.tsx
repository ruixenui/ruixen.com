"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ── constants ── */
const MO = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
const MOFULL = [
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
] as const;
const WK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
const WKFULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/* ── date math ── */
function daysIn(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function startOff(y: number, m: number) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function iso(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
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
export interface CalendarLumeProps {
  /** ISO date string "YYYY-MM-DD" */
  value?: string;
  /** Fires with ISO date string on day selection */
  onChange?: (date: string) => void;
  /** Enable tick sound. Default true */
  sound?: boolean;
}

type Level = "year" | "month" | "day";

/* ── stagger helper ── */
const stag = (i: number) => ({
  initial: { opacity: 0, y: 5 } as const,
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.016 },
  } as const,
});

/* ── depth transition variants (functions receiving custom direction) ── */
const depthVariants = {
  initial: (dir: string) => ({
    opacity: 0,
    scale: dir === "in" ? 0.93 : 1.07,
  }),
  animate: { opacity: 1, scale: 1 },
  exit: (dir: string) => ({
    opacity: 0,
    scale: dir === "in" ? 1.07 : 0.93,
  }),
};

const SPRING = { type: "spring" as const, stiffness: 340, damping: 28 };

/* ── component ── */
function CalendarLume({ value, onChange, sound = true }: CalendarLumeProps) {
  const now = useMemo(() => new Date(), []);

  const [year, setYear] = useState(() =>
    value ? Number(value.slice(0, 4)) : now.getFullYear(),
  );
  const [month, setMonth] = useState(() =>
    value ? Number(value.slice(5, 7)) - 1 : now.getMonth(),
  );
  const [day, setDay] = useState(() =>
    value ? Number(value.slice(8, 10)) : now.getDate(),
  );
  const [level, setLevel] = useState<Level>("day");
  const [decBase, setDecBase] = useState(
    () =>
      Math.floor((value ? Number(value.slice(0, 4)) : now.getFullYear()) / 12) *
      12,
  );

  /* hover trackers */
  const [hovY, setHovY] = useState<number | null>(null);
  const [hovM, setHovM] = useState<number | null>(null);
  const [hovD, setHovD] = useState<number | null>(null);

  /* direction ref — set synchronously before level state change */
  const dirRef = useRef<"in" | "out">("in");

  /* sound */
  const boot = useCallback(() => {
    if (sound) _init();
  }, [sound]);
  const tick = useCallback(() => {
    if (sound) _tick();
  }, [sound]);

  /* grids */
  const dayGrid = useMemo(() => {
    const total = daysIn(year, month);
    const off = startOff(year, month);
    const cells: (number | null)[] = [];
    for (let i = 0; i < off; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, [year, month]);

  const yearGrid = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 12; i++) out.push(decBase + i);
    return out;
  }, [decBase]);

  const isToday = useCallback(
    (d: number) =>
      d === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear(),
    [now, month, year],
  );

  const weekday = useMemo(
    () => WKFULL[new Date(year, month, day).getDay()],
    [year, month, day],
  );

  /* ── navigation ── */
  const drillIn = useCallback(
    (lv: Level) => {
      dirRef.current = "in";
      boot();
      tick();
      setLevel(lv);
    },
    [boot, tick],
  );

  const zoomOut = useCallback(
    (lv: Level) => {
      dirRef.current = "out";
      boot();
      tick();
      if (lv === "year") setDecBase(Math.floor(year / 12) * 12);
      setLevel(lv);
    },
    [boot, tick, year],
  );

  /* month shift at day level */
  const shiftMonth = useCallback(
    (delta: number) => {
      tick();
      let ny = year;
      let nm = month + delta;
      if (nm < 0) {
        nm = 11;
        ny -= 1;
      } else if (nm > 11) {
        nm = 0;
        ny += 1;
      }
      setYear(ny);
      setMonth(nm);
      const max = daysIn(ny, nm);
      if (day > max) setDay(max);
    },
    [tick, year, month, day],
  );

  const direction = dirRef.current;

  return (
    <div
      className="select-none"
      style={{
        padding: "28px 24px",
        width: 320,
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      {/* ── header: ‹ [scope label] › ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        {/* left arrow */}
        <motion.button
          onClick={() => {
            tick();
            if (level === "day") shiftMonth(-1);
            else if (level === "month") setYear((y) => y - 1);
            else setDecBase((b) => b - 12);
          }}
          whileTap={{ scale: 0.85 }}
          className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            fontFamily: "inherit",
            padding: "4px 10px",
          }}
        >
          ‹
        </motion.button>

        {/* scope label */}
        {level === "year" ? (
          <span
            className="text-neutral-600 dark:text-neutral-400"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {decBase} — {decBase + 11}
          </span>
        ) : (
          <motion.button
            onClick={() => zoomOut(level === "day" ? "month" : "year")}
            whileTap={{ scale: 0.96 }}
            className="text-neutral-600 dark:text-neutral-400 transition-colors"
            style={{
              background: "none",
              border: "none",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "inherit",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: 6,
              letterSpacing: "0.02em",
            }}
          >
            {level === "day" ? `${MOFULL[month]} ${year}` : String(year)}
          </motion.button>
        )}

        {/* right arrow */}
        <motion.button
          onClick={() => {
            tick();
            if (level === "day") shiftMonth(1);
            else if (level === "month") setYear((y) => y + 1);
            else setDecBase((b) => b + 12);
          }}
          whileTap={{ scale: 0.85 }}
          className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            fontFamily: "inherit",
            padding: "4px 10px",
          }}
        >
          ›
        </motion.button>
      </div>

      {/* weekday subtitle at day level */}
      {level === "day" && (
        <div
          className="text-neutral-400 dark:text-neutral-600"
          style={{
            textAlign: "center",
            fontSize: 11,
            marginBottom: 16,
            fontWeight: 400,
          }}
        >
          {weekday}
        </div>
      )}
      {level !== "day" && <div style={{ height: 16, marginBottom: 16 }} />}

      {/* ── content area ── */}
      <AnimatePresence mode="wait" custom={direction}>
        {/* ─ year picker ─ */}
        {level === "year" && (
          <motion.div
            key="year"
            custom={direction}
            variants={depthVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SPRING}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 4,
              }}
            >
              {yearGrid.map((y, i) => {
                const sel = y === year;
                const hov = hovY === y && !sel;
                return (
                  <motion.button
                    key={y}
                    {...stag(i)}
                    onClick={() => {
                      setYear(y);
                      const max = daysIn(y, month);
                      if (day > max) setDay(max);
                      drillIn("month");
                    }}
                    onMouseEnter={() => setHovY(y)}
                    onMouseLeave={() => setHovY(null)}
                    whileTap={{ scale: 0.92 }}
                    className={cn(
                      "border-none transition-colors",
                      sel
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold"
                        : hov
                          ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          : "bg-transparent text-neutral-600 dark:text-neutral-400",
                    )}
                    style={{
                      fontSize: 13,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      padding: "10px 4px",
                      borderRadius: 8,
                      textAlign: "center" as const,
                    }}
                  >
                    {y}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─ month picker ─ */}
        {level === "month" && (
          <motion.div
            key="month"
            custom={direction}
            variants={depthVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SPRING}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 4,
              }}
            >
              {MO.map((m, i) => {
                const sel = i === month;
                const hov = hovM === i && !sel;
                return (
                  <motion.button
                    key={m}
                    {...stag(i)}
                    onClick={() => {
                      setMonth(i);
                      const max = daysIn(year, i);
                      if (day > max) setDay(max);
                      drillIn("day");
                    }}
                    onMouseEnter={() => setHovM(i)}
                    onMouseLeave={() => setHovM(null)}
                    whileTap={{ scale: 0.92 }}
                    className={cn(
                      "border-none transition-colors",
                      sel
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold"
                        : hov
                          ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          : "bg-transparent text-neutral-600 dark:text-neutral-400",
                    )}
                    style={{
                      fontSize: 13,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      padding: "10px 4px",
                      borderRadius: 8,
                      textAlign: "center" as const,
                    }}
                  >
                    {m}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─ day picker ─ */}
        {level === "day" && (
          <motion.div
            key="day"
            custom={direction}
            variants={depthVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={SPRING}
          >
            {/* weekday headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                marginBottom: 4,
              }}
            >
              {WK.map((w) => (
                <div
                  key={w}
                  className="text-neutral-400 dark:text-neutral-600"
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 500,
                    padding: 4,
                  }}
                >
                  {w}
                </div>
              ))}
            </div>

            {/* day cells */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
              }}
            >
              {dayGrid.map((dd, i) => {
                if (dd === null)
                  return <div key={`e${i}`} style={{ padding: 8 }} />;

                const sel = dd === day;
                const td = isToday(dd);
                const hov = hovD === dd && !sel;

                return (
                  <motion.button
                    key={`d${dd}`}
                    {...stag(i)}
                    onClick={() => {
                      setDay(dd);
                      tick();
                      onChange?.(iso(year, month, dd));
                    }}
                    onMouseEnter={() => setHovD(dd)}
                    onMouseLeave={() => setHovD(null)}
                    whileTap={{ scale: 0.88 }}
                    className={cn(
                      "relative border-none transition-colors",
                      sel
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold"
                        : hov
                          ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          : td
                            ? "bg-transparent text-neutral-900 dark:text-neutral-100 font-semibold"
                            : "bg-transparent text-neutral-600 dark:text-neutral-400",
                    )}
                    style={{
                      fontSize: 13,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      padding: "10px 4px",
                      borderRadius: 8,
                      textAlign: "center" as const,
                    }}
                  >
                    {dd}
                    {td && !sel && (
                      <span
                        className="bg-neutral-400 dark:bg-neutral-600"
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { CalendarLume };
