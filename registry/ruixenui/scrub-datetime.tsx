"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Scrub Datetime — Rauno Freiberg craft.
 *
 * The text IS the interface. No chrome, no popover, no calendar grid.
 * Every segment of the date-time string is independently scrubable —
 * hover to reveal the affordance (ew-resize cursor, subtle underline),
 * drag horizontally to change value, scroll to increment.
 * Click AM/PM to toggle.
 * Soft mechanical tick on each step.
 * Day auto-clamps when month or year changes (leap-year safe).
 * Supports controlled (value) and uncontrolled (defaultValue) modes.
 */

/* ── Constants ── */

const PX_PER_STEP = 18;
const SCROLL_THRESHOLD = 45;

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

/* ── Types ── */

interface ScrubDatetimeProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  sound?: boolean;
  minYear?: number;
  maxYear?: number;
}

/* ── Audio — soft mechanical tick ── */

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
  const len = Math.floor(rate * 0.003); // 3ms — lighter than drum
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
  if (now - lastTime.current < 20) return;
  lastTime.current = now;

  try {
    const ac = audioCtx();
    const buf = clickBuffer(ac);

    const src = ac.createBufferSource();
    const gain = ac.createGain();

    src.buffer = buf;
    src.playbackRate.value = 1.1;
    gain.gain.value = 0.07;

    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent fallback */
  }
}

/* ── Helpers ── */

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function maxDays(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

/* ── Segment — scrubable inline value ── */

function Segment({
  display,
  value,
  min,
  max,
  onChange,
  sound,
  lastSoundTime,
}: {
  display: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  sound: boolean;
  lastSoundTime: React.MutableRefObject<number>;
}) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startVal: 0 });
  const scrollAccum = useRef(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const prevVal = useRef(value);

  const onDown = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = { startX: e.clientX, startVal: value };
      prevVal.current = value;
      setDragging(true);
    },
    [value],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const steps = Math.round(dx / PX_PER_STEP);
      const next = clamp(dragRef.current.startVal + steps, min, max);
      if (next !== prevVal.current) {
        if (sound) playTick(lastSoundTime);
        prevVal.current = next;
        onChange(next);
      }
    },
    [dragging, min, max, sound, lastSoundTime, onChange],
  );

  const onUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) >= SCROLL_THRESHOLD) {
        const dir = Math.sign(scrollAccum.current);
        scrollAccum.current = 0;
        const next = clamp(value + dir, min, max);
        if (next !== value) {
          if (sound) playTick(lastSoundTime);
          onChange(next);
        }
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [value, min, max, sound, lastSoundTime, onChange]);

  useEffect(() => {
    prevVal.current = value;
  }, [value]);

  const alpha = dragging ? 0.95 : hovered ? 0.75 : 0.5;

  return (
    <span
      ref={elRef}
      style={{
        color: `rgba(255,255,255,${alpha})`,
        cursor: dragging ? "grabbing" : "ew-resize",
        transition: dragging ? "none" : "color 0.15s",
        userSelect: "none",
        touchAction: "none",
        display: "inline-block",
        borderBottom:
          hovered || dragging
            ? `1px solid rgba(255,255,255,${dragging ? 0.12 : 0.06})`
            : "1px solid transparent",
        paddingBottom: 1,
        textShadow: dragging ? "0 0 14px rgba(255,255,255,0.1)" : "none",
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onLostPointerCapture={onUp}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {display}
    </span>
  );
}

/* ── Period Toggle — click to flip AM ↔ PM ── */

function PeriodToggle({
  isPM,
  onToggle,
  sound,
  lastSoundTime,
}: {
  isPM: boolean;
  onToggle: () => void;
  sound: boolean;
  lastSoundTime: React.MutableRefObject<number>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      style={{
        color: `rgba(255,255,255,${hovered ? 0.75 : 0.5})`,
        cursor: "pointer",
        transition: "color 0.15s",
        userSelect: "none",
        display: "inline-block",
        borderBottom: hovered
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        paddingBottom: 1,
      }}
      onClick={() => {
        if (sound) playTick(lastSoundTime);
        onToggle();
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {isPM ? "PM" : "AM"}
    </span>
  );
}

/* ── Static separator ── */

function Sep({ children }: { children: string }) {
  return (
    <span
      style={{
        color: "rgba(255,255,255,0.15)",
        userSelect: "none",
      }}
    >
      {children}
    </span>
  );
}

/* ── Component ── */

export function ScrubDatetime({
  value: controlledValue,
  defaultValue,
  onChange,
  sound = true,
  minYear = 2015,
  maxYear = 2035,
}: ScrubDatetimeProps) {
  const [internal, setInternal] = useState(() => defaultValue ?? new Date());
  const isControlled = controlledValue !== undefined;
  const date = isControlled ? controlledValue : internal;
  const lastSoundTime = useRef(0);

  const update = useCallback(
    (d: Date) => {
      if (!isControlled) setInternal(d);
      onChange?.(d);
    },
    [isControlled, onChange],
  );

  /* Extract parts */
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const hours24 = date.getHours();
  const minute = date.getMinutes();
  const isPM = hours24 >= 12;
  const hour12 = hours24 % 12 || 12;
  const dayMax = maxDays(month, year);

  /* Setters — safe against month-overflow */
  const setMonth = useCallback(
    (m: number) => {
      const d = new Date(date);
      d.setDate(1);
      d.setMonth(m);
      d.setDate(Math.min(day, maxDays(m, year)));
      update(d);
    },
    [date, day, year, update],
  );

  const setDay = useCallback(
    (v: number) => {
      const d = new Date(date);
      d.setDate(v);
      update(d);
    },
    [date, update],
  );

  const setYear = useCallback(
    (y: number) => {
      const d = new Date(date);
      d.setDate(1);
      d.setFullYear(y);
      d.setDate(Math.min(day, maxDays(month, y)));
      update(d);
    },
    [date, day, month, update],
  );

  const setHour = useCallback(
    (h: number) => {
      const d = new Date(date);
      d.setHours(isPM ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h);
      update(d);
    },
    [date, isPM, update],
  );

  const setMinute = useCallback(
    (m: number) => {
      const d = new Date(date);
      d.setMinutes(m);
      update(d);
    },
    [date, update],
  );

  const togglePeriod = useCallback(() => {
    const d = new Date(date);
    d.setHours(hours24 >= 12 ? hours24 - 12 : hours24 + 12);
    update(d);
  }, [date, hours24, update]);

  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      {/* Date line */}
      <div
        className="flex items-baseline gap-0 text-[17px] tracking-[-0.01em]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <Segment
          display={MONTHS[month]}
          value={month}
          min={0}
          max={11}
          onChange={setMonth}
          sound={sound}
          lastSoundTime={lastSoundTime}
        />
        <Sep> </Sep>
        <Segment
          display={String(day)}
          value={day}
          min={1}
          max={dayMax}
          onChange={setDay}
          sound={sound}
          lastSoundTime={lastSoundTime}
        />
        <Sep>, </Sep>
        <Segment
          display={String(year)}
          value={year}
          min={minYear}
          max={maxYear}
          onChange={setYear}
          sound={sound}
          lastSoundTime={lastSoundTime}
        />
      </div>

      {/* Time line */}
      <div
        className="flex items-baseline gap-0 text-[17px] tracking-[-0.01em]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <Segment
          display={String(hour12)}
          value={hour12}
          min={1}
          max={12}
          onChange={setHour}
          sound={sound}
          lastSoundTime={lastSoundTime}
        />
        <Sep>:</Sep>
        <Segment
          display={String(minute).padStart(2, "0")}
          value={minute}
          min={0}
          max={59}
          onChange={setMinute}
          sound={sound}
          lastSoundTime={lastSoundTime}
        />
        <Sep> </Sep>
        <PeriodToggle
          isPM={isPM}
          onToggle={togglePeriod}
          sound={sound}
          lastSoundTime={lastSoundTime}
        />
      </div>
    </div>
  );
}

export default ScrubDatetime;
