"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

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
function dim(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function soff(y: number, m: number) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function fmtDate(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function fmt12(h: number, m: number) {
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${pad(m)} ${ap}`;
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
export interface CalendarSchedulerProps {
  /** Fires on confirm with ISO date string + 12h time string */
  onConfirm?: (value: { date: string; time: string }) => void;
  /** First bookable hour (0-23). Default 8 */
  startHour?: number;
  /** Last bookable hour (0-23, inclusive of :00). Default 18 */
  endHour?: number;
  /** Slot interval in minutes. Default 30 */
  interval?: number;
  /** Enable tick sound. Default true */
  sound?: boolean;
}

type Slot = "month" | "day" | "time" | null;

/* ── stagger helper ── */
const stagger = (i: number) => ({
  initial: { opacity: 0, y: 6 } as const,
  animate: { opacity: 1, y: 0, transition: { delay: i * 0.018 } } as const,
});

/* ── className helpers ── */
const segClass = (active: boolean, hasValue: boolean) =>
  cn(
    "border-none font-light cursor-pointer rounded-[10px] transition-[background_0.2s,color_0.15s] font-[inherit]",
    active
      ? "bg-neutral-100 dark:bg-neutral-800"
      : "bg-transparent border-b border-neutral-200 dark:border-neutral-800",
    hasValue
      ? "text-neutral-900 dark:text-neutral-100"
      : "text-neutral-400 dark:text-neutral-600",
  );

const cellClass = (selected: boolean, hovered: boolean) =>
  cn(
    "border-none cursor-pointer rounded-lg transition-[background_0.12s,color_0.12s] text-center font-[inherit]",
    selected
      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold"
      : hovered
        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-normal"
        : "bg-transparent text-neutral-600 dark:text-neutral-400 font-normal",
  );

/* ── component ── */
function CalendarScheduler({
  onConfirm,
  startHour = 8,
  endHour = 18,
  interval = 30,
  sound = true,
}: CalendarSchedulerProps) {
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [day, setDay] = useState<number | null>(now.getDate());
  const [timeIdx, setTimeIdx] = useState<number | null>(null);
  const [open, setOpen] = useState<Slot>(null);
  const [hovMonth, setHovMonth] = useState<number | null>(null);
  const [hovDay, setHovDay] = useState<number | null>(null);
  const [hovTime, setHovTime] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  /* time slots */
  const times = useMemo(() => {
    const out: string[] = [];
    for (let h = startHour; h < endHour; h++)
      for (let m = 0; m < 60; m += interval) out.push(fmt12(h, m));
    out.push(fmt12(endHour, 0));
    return out;
  }, [startHour, endHour, interval]);

  /* click outside */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* sound helpers */
  const boot = useCallback(() => {
    if (sound) _init();
  }, [sound]);
  const tick = useCallback(() => {
    if (sound) _tick();
  }, [sound]);

  /* toggle picker */
  const toggle = useCallback(
    (s: Slot) => {
      boot();
      tick();
      setOpen((p) => (p === s ? null : s));
    },
    [boot, tick],
  );

  /* derived */
  const weekday = useMemo(() => {
    if (day === null) return null;
    return WKFULL[new Date(year, month, day).getDay()];
  }, [year, month, day]);

  const grid = useMemo(() => {
    const total = dim(year, month);
    const off = soff(year, month);
    const cells: (number | null)[] = [];
    for (let i = 0; i < off; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  }, [year, month]);

  const isToday = useCallback(
    (d: number) =>
      d === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear(),
    [now, month, year],
  );

  const ready = day !== null && timeIdx !== null;

  const confirm = useCallback(() => {
    if (!ready) return;
    tick();
    onConfirm?.({ date: fmtDate(year, month, day!), time: times[timeIdx!] });
  }, [ready, tick, onConfirm, year, month, day, timeIdx, times]);

  /* navigate month within day picker */
  const shiftMonth = useCallback(
    (delta: number) => {
      tick();
      setMonth((m) => {
        let nm = m + delta;
        let ny = year;
        if (nm < 0) {
          nm = 11;
          ny = year - 1;
        } else if (nm > 11) {
          nm = 0;
          ny = year + 1;
        }
        setYear(ny);
        const max = dim(ny, nm);
        if (day !== null && day > max) setDay(max);
        return nm;
      });
    },
    [tick, year, day],
  );

  return (
    <div
      ref={ref}
      className="select-none overflow-hidden"
      style={{
        padding: "36px 30px 28px",
        width: 380,
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      {/* ── label ── */}
      <div
        className="text-neutral-400 dark:text-neutral-600"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          marginBottom: 28,
        }}
      >
        Schedule for
      </div>

      {/* ── the sentence ── */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 6,
          rowGap: 8,
        }}
      >
        {/* month */}
        <motion.button
          onClick={() => toggle("month")}
          whileTap={{ scale: 0.97 }}
          className={segClass(open === "month", true)}
          style={{
            fontSize: 28,
            fontWeight: 300,
            padding: "2px 10px",
            lineHeight: 1.3,
          }}
        >
          {MONTHS[month]}
        </motion.button>

        {/* day */}
        <motion.button
          onClick={() => toggle("day")}
          whileTap={{ scale: 0.97 }}
          className={segClass(open === "day", day !== null)}
          style={{
            fontSize: 28,
            fontWeight: 300,
            padding: "2px 10px",
            lineHeight: 1.3,
          }}
        >
          {day !== null ? day : "\u2014\u2014"}
        </motion.button>

        {/* connector */}
        <span
          className="text-neutral-400 dark:text-neutral-600"
          style={{
            fontSize: 22,
            fontWeight: 300,
            padding: "0 2px",
          }}
        >
          at
        </span>

        {/* time */}
        <motion.button
          onClick={() => toggle("time")}
          whileTap={{ scale: 0.97 }}
          className={segClass(open === "time", timeIdx !== null)}
          style={{
            fontSize: 28,
            fontWeight: 300,
            padding: "2px 10px",
            lineHeight: 1.3,
          }}
        >
          {timeIdx !== null ? times[timeIdx] : "\u2014:\u2014\u2014"}
        </motion.button>
      </div>

      {/* ── weekday / year ── */}
      <div
        className="text-neutral-400 dark:text-neutral-600"
        style={{
          fontSize: 12,
          fontWeight: 400,
          marginTop: 10,
          letterSpacing: "0.02em",
        }}
      >
        {weekday ? `${weekday}, ${year}` : String(year)}
      </div>

      {/* ── pickers ── */}
      <AnimatePresence mode="wait">
        {/* ─ month picker ─ */}
        {open === "month" && (
          <motion.div
            key="mp"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ overflow: "hidden", marginTop: 22 }}
          >
            <div
              className="border-t border-neutral-200 dark:border-neutral-800"
              style={{ paddingTop: 18 }}
            >
              {/* year nav */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  marginBottom: 14,
                }}
              >
                <motion.button
                  onClick={() => {
                    setYear((y) => y - 1);
                    tick();
                  }}
                  whileTap={{ scale: 0.85 }}
                  className="bg-none border-none text-neutral-400 dark:text-neutral-600 cursor-pointer font-[inherit]"
                  style={{
                    fontSize: 15,
                    padding: "2px 8px",
                  }}
                >
                  &#8249;
                </motion.button>
                <span
                  className="text-neutral-600 dark:text-neutral-400"
                  style={{ fontSize: 12, fontWeight: 500 }}
                >
                  {year}
                </span>
                <motion.button
                  onClick={() => {
                    setYear((y) => y + 1);
                    tick();
                  }}
                  whileTap={{ scale: 0.85 }}
                  className="bg-none border-none text-neutral-400 dark:text-neutral-600 cursor-pointer font-[inherit]"
                  style={{
                    fontSize: 15,
                    padding: "2px 8px",
                  }}
                >
                  &#8250;
                </motion.button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 4,
                }}
              >
                {MONTHS.map((m, i) => {
                  const sel = i === month;
                  const hov = hovMonth === i;
                  return (
                    <motion.button
                      key={m}
                      {...stagger(i)}
                      onClick={() => {
                        setMonth(i);
                        const max = dim(year, i);
                        if (day !== null && day > max) setDay(max);
                        tick();
                        setOpen("day");
                      }}
                      onMouseEnter={() => setHovMonth(i)}
                      onMouseLeave={() => setHovMonth(null)}
                      whileTap={{ scale: 0.94 }}
                      className={cellClass(sel, !sel && hov)}
                      style={{
                        fontSize: 13,
                        padding: "9px 4px",
                      }}
                    >
                      {m.slice(0, 3)}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─ day picker ─ */}
        {open === "day" && (
          <motion.div
            key="dp"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ overflow: "hidden", marginTop: 22 }}
          >
            <div
              className="border-t border-neutral-200 dark:border-neutral-800"
              style={{ paddingTop: 18 }}
            >
              {/* month nav */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                  padding: "0 2px",
                }}
              >
                <motion.button
                  onClick={() => shiftMonth(-1)}
                  whileTap={{ scale: 0.85 }}
                  className="bg-none border-none text-neutral-400 dark:text-neutral-600 cursor-pointer font-[inherit]"
                  style={{
                    fontSize: 15,
                    padding: "2px 8px",
                  }}
                >
                  &#8249;
                </motion.button>
                <span
                  className="text-neutral-600 dark:text-neutral-400"
                  style={{ fontSize: 12, fontWeight: 500 }}
                >
                  {MONTHS[month]} {year}
                </span>
                <motion.button
                  onClick={() => shiftMonth(1)}
                  whileTap={{ scale: 0.85 }}
                  className="bg-none border-none text-neutral-400 dark:text-neutral-600 cursor-pointer font-[inherit]"
                  style={{
                    fontSize: 15,
                    padding: "2px 8px",
                  }}
                >
                  &#8250;
                </motion.button>
              </div>

              {/* weekday headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 2,
                  marginBottom: 4,
                }}
              >
                {WK.map((d) => (
                  <div
                    key={d}
                    className="text-neutral-400 dark:text-neutral-600"
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: 500,
                      padding: 4,
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 2,
                }}
              >
                {grid.map((d, i) => {
                  if (d === null)
                    return <div key={`e${i}`} style={{ padding: 8 }} />;

                  const sel = d === day;
                  const td = isToday(d);
                  const hov = hovDay === d && !sel;

                  return (
                    <motion.button
                      key={`d${d}`}
                      {...stagger(i)}
                      onClick={() => {
                        setDay(d);
                        tick();
                        setOpen("time");
                      }}
                      onMouseEnter={() => setHovDay(d)}
                      onMouseLeave={() => setHovDay(null)}
                      whileTap={{ scale: 0.88 }}
                      className={cn(
                        "border-none cursor-pointer rounded-lg transition-[background_0.12s,color_0.12s] text-center font-[inherit] relative",
                        sel
                          ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-semibold"
                          : hov
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                            : "bg-transparent",
                        !sel &&
                          !hov &&
                          td &&
                          "text-neutral-900 dark:text-neutral-100 font-semibold",
                        !sel &&
                          !hov &&
                          !td &&
                          "text-neutral-600 dark:text-neutral-400 font-normal",
                      )}
                      style={{
                        fontSize: 13,
                        padding: "9px 4px",
                        position: "relative",
                      }}
                    >
                      {d}
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
            </div>
          </motion.div>
        )}

        {/* ─ time picker ─ */}
        {open === "time" && (
          <motion.div
            key="tp"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ overflow: "hidden", marginTop: 22 }}
          >
            <div
              className="border-t border-neutral-200 dark:border-neutral-800"
              style={{ paddingTop: 18 }}
            >
              {/* period label */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginBottom: 12,
                  padding: "0 2px",
                }}
              >
                <span
                  className="text-neutral-400 dark:text-neutral-600"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  PICK A TIME
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 4,
                  maxHeight: 240,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {times.map((t, i) => {
                  const sel = i === timeIdx;
                  const hov = hovTime === i && !sel;
                  return (
                    <motion.button
                      key={t}
                      {...stagger(i)}
                      onClick={() => {
                        setTimeIdx(i);
                        tick();
                        setOpen(null);
                      }}
                      onMouseEnter={() => setHovTime(i)}
                      onMouseLeave={() => setHovTime(null)}
                      whileTap={{ scale: 0.94 }}
                      className={cellClass(sel, hov)}
                      style={{
                        fontSize: 13,
                        padding: "9px 4px",
                      }}
                    >
                      {t}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── confirm ── */}
      <AnimatePresence>
        {ready && open === null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="border-t border-neutral-200 dark:border-neutral-800"
            style={{
              marginTop: 28,
              paddingTop: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.button
              onClick={confirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-none cursor-pointer font-[inherit] hover:scale-[1.02] transition-[background_0.2s]"
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "11px 40px",
                borderRadius: 12,
                letterSpacing: "0.04em",
              }}
            >
              Confirm
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { CalendarScheduler };
