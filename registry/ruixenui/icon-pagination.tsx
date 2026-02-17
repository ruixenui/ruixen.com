"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

/**
 * Icon Pagination — Rauno Freiberg craft.
 *
 * Row of colored dot indicators. Mouse proximity triggers wave
 * effect — nearby dots lift and brighten with cosine falloff.
 * Active dot has accent ring and elevated shadow.
 * Click to navigate. Audio tick on page change.
 */

/* ── Audio singleton ── */

let _a: AudioContext | null = null;
let _b: AudioBuffer | null = null;

function getCtx(): AudioContext {
  if (!_a)
    _a = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  if (_a.state === "suspended") _a.resume();
  return _a;
}

function getBuf(ac: AudioContext): AudioBuffer {
  if (_b && _b.sampleRate === ac.sampleRate) return _b;
  const len = Math.floor(ac.sampleRate * 0.003);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++)
    ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
  _b = buf;
  return buf;
}

function tick(ref: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - ref.current < 25) return;
  ref.current = now;
  try {
    const ac = getCtx();
    const src = ac.createBufferSource();
    const g = ac.createGain();
    src.buffer = getBuf(ac);
    g.gain.value = 0.06;
    src.connect(g).connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Types ── */

interface IconPaginationProps {
  totalPages?: number;
  maxVisible?: number;
  onChange?: (page: number) => void;
  sound?: boolean;
}

/* ── CSS ── */

const CSS = `.ip{--ip-bg:rgba(255,255,255,.72);--ip-border:rgba(0,0,0,.06);--ip-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--ip-ink:0,0,0}.dark .ip,[data-theme="dark"] .ip{--ip-bg:rgba(30,30,32,.82);--ip-border:rgba(255,255,255,.06);--ip-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--ip-ink:255,255,255}`;

/* ── Constants ── */

const COLORS = [
  "#FF6B6B",
  "#51CF66",
  "#339AF0",
  "#FCC419",
  "#CC5DE8",
  "#FF922B",
  "#20C997",
  "#F06595",
];
const PROX_RADIUS = 60;
const DOT_SIZE = 12;
const DOT_GAP = 10;
const SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };

/* ── Component ── */

export function IconPagination({
  totalPages = 8,
  maxVisible = 9,
  onChange,
  sound = true,
}: IconPaginationProps) {
  const [active, setActive] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const lastSound = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= totalPages || next === active) return;
      if (sound) tick(lastSound);
      setActive(next);
      onChange?.(next);
    },
    [active, totalPages, onChange, sound],
  );

  const count = Math.min(totalPages, maxVisible);

  // Visible window centered on active
  const half = Math.floor(count / 2);
  let start = active - half;
  let end = active + (count - half - 1);
  if (start < 0) {
    end += -start;
    start = 0;
  }
  if (end >= totalPages) {
    start -= end - totalPages + 1;
    end = totalPages - 1;
    start = Math.max(0, start);
  }

  const visible: number[] = [];
  for (let i = start; i <= end; i++) visible.push(i);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const dotW = DOT_SIZE + DOT_GAP;
      const padL = 34; // arrow + padding
      const idx = Math.round((x - padL - DOT_SIZE / 2) / dotW);
      setHoverIdx(idx >= 0 && idx < visible.length ? idx : -1);
    },
    [visible.length],
  );

  return (
    <div
      className="ip"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHoverIdx(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: DOT_GAP,
          padding: "10px 14px",
          background: "var(--ip-bg)",
          border: "1px solid var(--ip-border)",
          boxShadow: "var(--ip-shadow)",
          borderRadius: 24,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Prev arrow */}
        <button
          onClick={() => go(active - 1)}
          style={{
            border: "none",
            background: "none",
            padding: 4,
            cursor: active === 0 ? "default" : "pointer",
            opacity: active === 0 ? 0.15 : 0.4,
            display: "flex",
            transition: "opacity .12s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.5 2.5L4.5 6L7.5 9.5"
              stroke={`rgba(var(--ip-ink),.6)`}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {visible.map((p, i) => {
          const isActive = p === active;
          const color = COLORS[p % COLORS.length];

          // Proximity from hover
          let lift = 0;
          if (hoverIdx >= 0) {
            const dist = Math.abs(i - hoverIdx);
            if (dist * (DOT_SIZE + DOT_GAP) < PROX_RADIUS) {
              lift =
                (1 +
                  Math.cos(
                    ((dist * (DOT_SIZE + DOT_GAP)) / PROX_RADIUS) * Math.PI,
                  )) /
                2;
            }
          }

          return (
            <motion.button
              key={p}
              onClick={() => go(p)}
              animate={{
                y: -lift * 6,
                scale: isActive ? 1.3 : 1 + lift * 0.1,
              }}
              transition={SPRING}
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: color,
                opacity: isActive ? 1 : 0.45 + lift * 0.35,
                boxShadow: isActive
                  ? `0 0 0 2px var(--ip-bg), 0 0 0 3.5px ${color}, 0 2px 8px ${color}40`
                  : lift > 0.3
                    ? `0 2px 6px ${color}30`
                    : "none",
                transition: "opacity .1s, box-shadow .15s",
                flexShrink: 0,
              }}
            />
          );
        })}

        {/* Next arrow */}
        <button
          onClick={() => go(active + 1)}
          style={{
            border: "none",
            background: "none",
            padding: 4,
            cursor: active === totalPages - 1 ? "default" : "pointer",
            opacity: active === totalPages - 1 ? 0.15 : 0.4,
            display: "flex",
            transition: "opacity .12s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.5 2.5L7.5 6L4.5 9.5"
              stroke={`rgba(var(--ip-ink),.6)`}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Page label */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 450,
          color: `rgba(var(--ip-ink),.3)`,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.02em",
        }}
      >
        Page {active + 1} of {totalPages}
      </span>
    </div>
  );
}

export default IconPagination;
