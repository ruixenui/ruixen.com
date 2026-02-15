"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Calendar Twin — dual-month range picker.
 *
 * Two months sit side by side. Click a day to start
 * a range, hover to preview, click again to confirm.
 * A continuous band connects start to end — rounding
 * at row edges, brightening at endpoints.
 *
 * The band IS the selection.
 */

/* ── Types ── */

export interface CalendarTwinProps {
  defaultStart?: string;
  defaultEnd?: string;
  onRangeChange?: (start: string | null, end: string | null) => void;
  sound?: boolean;
}

/* ── Constants ── */

const CELL = 36;
const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/* ── Helpers ── */

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toKey(y: number, m: number, d: number): string {
  return `${y}-${pad2(m + 1)}-${pad2(d)}`;
}

function parseKey(key: string): [number, number, number] {
  const [y, m, d] = key.split("-").map(Number);
  return [y, m - 1, d];
}

function formatDate(key: string): string {
  const [y, m, d] = parseKey(key);
  return new Date(y, m, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = parseKey(a);
  const [by, bm, bd] = parseKey(b);
  const da = new Date(ay, am, ad);
  const db = new Date(by, bm, bd);
  return Math.round((db.getTime() - da.getTime()) / 86400000) + 1;
}

function ordered(a: string, b: string): [string, string] {
  return a <= b ? [a, b] : [b, a];
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

export function CalendarTwin({
  defaultStart,
  defaultEnd,
  onRangeChange,
  sound = true,
}: CalendarTwinProps) {
  const [baseMonth, setBaseMonth] = useState(() => new Date().getMonth());
  const [baseYear, setBaseYear] = useState(() => new Date().getFullYear());
  const [rangeStart, setRangeStart] = useState<string | null>(
    defaultStart ?? null,
  );
  const [rangeEnd, setRangeEnd] = useState<string | null>(defaultEnd ?? null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const lastSound = useRef(0);

  function tick() {
    if (sound) playTick(lastSound);
  }

  /* ── Effective range (includes hover preview) ── */

  const isConfirmed = rangeStart !== null && rangeEnd !== null;
  let effStart: string | null = null;
  let effEnd: string | null = null;

  if (rangeStart) {
    if (rangeEnd) {
      [effStart, effEnd] = ordered(rangeStart, rangeEnd);
    } else if (hoverDate) {
      [effStart, effEnd] = ordered(rangeStart, hoverDate);
    } else {
      effStart = rangeStart;
    }
  }

  /* ── Today ── */

  const now = new Date();
  const todayKey = toKey(now.getFullYear(), now.getMonth(), now.getDate());

  /* ── Day click ── */

  const handleDayClick = useCallback(
    (dateKey: string) => {
      tick();
      if (rangeStart === null || rangeEnd !== null) {
        setRangeStart(dateKey);
        setRangeEnd(null);
        onRangeChange?.(dateKey, null);
      } else {
        const [s, e] = ordered(rangeStart, dateKey);
        setRangeStart(s);
        setRangeEnd(e);
        onRangeChange?.(s, e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rangeStart, rangeEnd, onRangeChange],
  );

  /* ── Navigation ── */

  function goMonth(delta: number) {
    tick();
    setDirection(delta);
    let m = baseMonth + delta;
    let y = baseYear;
    if (m < 0) {
      m = 11;
      y--;
    } else if (m > 11) {
      m = 0;
      y++;
    }
    setBaseMonth(m);
    setBaseYear(y);
  }

  /* ── Second month ── */

  let month2 = baseMonth + 1;
  let year2 = baseYear;
  if (month2 > 11) {
    month2 = 0;
    year2++;
  }

  /* ── Render a single month grid ── */

  function renderMonth(y: number, m: number) {
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const firstOffset = (new Date(y, m, 1).getDay() + 6) % 7;
    const monthLabel = new Date(y, m).toLocaleDateString("en-US", {
      month: "long",
    });

    return (
      <div>
        {/* Month name */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 590,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            marginBottom: 10,
            letterSpacing: "-0.01em",
          }}
        >
          {monthLabel}
        </div>

        {/* DOW headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(7, ${CELL}px)`,
            marginBottom: 4,
          }}
        >
          {DOW.map((d) => (
            <div
              key={d}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,0.2)",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid — no gap for continuous band */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(7, ${CELL}px)`,
          }}
        >
          {/* Leading empties */}
          {Array.from({ length: firstOffset }).map((_, i) => (
            <div key={`e-${i}`} style={{ width: CELL, height: CELL }} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const dateKey = toKey(y, m, d);
            const col = (firstOffset + d - 1) % 7;
            const isToday = dateKey === todayKey;

            /* Range logic */
            const inRange =
              effStart !== null &&
              effEnd !== null &&
              dateKey >= effStart &&
              dateKey <= effEnd;
            const isStart = dateKey === effStart;
            const isEnd = dateKey === effEnd;
            const isSingle = isStart && isEnd;

            /* Neighbor checks for band rounding */
            const leftEmpty = col === 0 || d === 1;
            const rightEmpty = col === 6 || d === daysInMonth;
            const prevInRange =
              !leftEmpty &&
              effStart !== null &&
              effEnd !== null &&
              toKey(y, m, d - 1) >= effStart &&
              toKey(y, m, d - 1) <= effEnd;
            const nextInRange =
              !rightEmpty &&
              effStart !== null &&
              effEnd !== null &&
              toKey(y, m, d + 1) >= effStart &&
              toKey(y, m, d + 1) <= effEnd;

            const roundLeft = inRange && !prevInRange;
            const roundRight = inRange && !nextInRange;

            /* Background */
            const bandBg = isConfirmed
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.025)";
            const endpointBg = isConfirmed
              ? "rgba(255,255,255,0.09)"
              : "rgba(255,255,255,0.055)";

            /* Radius */
            const R = "10px";
            const Z = "0";
            const radius = isSingle
              ? R
              : `${roundLeft ? R : Z} ${roundRight ? R : Z} ${roundRight ? R : Z} ${roundLeft ? R : Z}`;

            /* Text color */
            let textColor = "rgba(255,255,255,0.28)";
            if (isStart || isEnd) textColor = "rgba(255,255,255,0.95)";
            else if (inRange) textColor = "rgba(255,255,255,0.55)";
            else if (isToday) textColor = "rgba(255,255,255,0.95)";

            const isHov = dateKey === hoverDate && !inRange;

            return (
              <motion.button
                key={d}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDayClick(dateKey)}
                onMouseEnter={() => setHoverDate(dateKey)}
                onMouseLeave={() => setHoverDate(null)}
                style={{
                  width: CELL,
                  height: CELL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                  position: "relative",
                  background: inRange
                    ? isStart || isEnd
                      ? endpointBg
                      : bandBg
                    : isHov
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                  borderRadius: inRange ? radius : isHov ? "10px" : "10px",
                  transition: "background 0.12s",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight:
                      isStart || isEnd || isToday ? 650 : inRange ? 500 : 400,
                    fontVariantNumeric: "tabular-nums",
                    color:
                      isHov && !inRange ? "rgba(255,255,255,0.55)" : textColor,
                    transition: "color 0.12s",
                    lineHeight: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {d}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Range label ── */

  const rangeLabel = (() => {
    if (effStart && effEnd && effStart !== effEnd) {
      const count = daysBetween(effStart, effEnd);
      return `${formatDate(effStart)} – ${formatDate(effEnd)}  ·  ${count} day${count !== 1 ? "s" : ""}`;
    }
    if (effStart) {
      return isConfirmed
        ? formatDate(effStart)
        : `${formatDate(effStart)} — select end`;
    }
    return null;
  })();

  return (
    <div
      style={{
        background: "rgba(18,18,20,0.98)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 24px 14px",
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

        <span
          style={{
            fontSize: 15,
            fontWeight: 590,
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {baseYear}
        </span>

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

      {/* Twin grids */}
      <div style={{ padding: "0 24px 16px" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${baseYear}-${baseMonth}`}
            initial={{ opacity: 0, x: direction > 0 ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -12 : 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              display: "flex",
              gap: 24,
            }}
          >
            {renderMonth(baseYear, baseMonth)}
            {renderMonth(year2, month2)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Range info */}
      <AnimatePresence>
        {rangeLabel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                padding: "12px 24px 14px",
                fontSize: 12,
                fontWeight: 450,
                color: isConfirmed
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.25)",
                textAlign: "center",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.005em",
              }}
            >
              {rangeLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CalendarTwin;
