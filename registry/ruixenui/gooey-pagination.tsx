"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

/**
 * Gooey Pagination — Rauno Freiberg craft.
 *
 * Liquid dots with SVG gooey filter. Active indicator slides
 * between dots creating a metaball merge/split effect.
 * Glass container. Spring physics. Audio tick on change.
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

interface GooeyPaginationProps {
  totalPages?: number;
  onChange?: (page: number) => void;
  sound?: boolean;
}

/* ── CSS ── */

const CSS = `.gp{--gp-bg:rgba(255,255,255,.72);--gp-border:rgba(0,0,0,.06);--gp-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--gp-ink:0,0,0;--gp-dot:rgba(0,0,0,.12);--gp-active:rgba(0,0,0,.65)}.dark .gp,[data-theme="dark"] .gp{--gp-bg:rgba(30,30,32,.82);--gp-border:rgba(255,255,255,.06);--gp-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--gp-ink:255,255,255;--gp-dot:rgba(255,255,255,.15);--gp-active:rgba(255,255,255,.7)}`;

/* ── Constants ── */

const DOT_SIZE = 10;
const DOT_GAP = 16;
const SPRING = { type: "spring" as const, stiffness: 350, damping: 25 };

/* ── Component ── */

export function GooeyPagination({
  totalPages = 7,
  onChange,
  sound = true,
}: GooeyPaginationProps) {
  const [active, setActive] = useState(0);
  const lastSound = useRef(0);
  const filterId = useRef(
    `goo-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= totalPages || next === active) return;
      if (sound) tick(lastSound);
      setActive(next);
      onChange?.(next);
    },
    [active, totalPages, onChange, sound],
  );

  const totalW = totalPages * DOT_SIZE + (totalPages - 1) * DOT_GAP;

  return (
    <div
      className="gp"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 16px",
          background: "var(--gp-bg)",
          border: "1px solid var(--gp-border)",
          boxShadow: "var(--gp-shadow)",
          borderRadius: 28,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Prev */}
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
              stroke={`rgba(var(--gp-ink),.6)`}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Gooey dots */}
        <div
          style={{ position: "relative", width: totalW, height: DOT_SIZE + 12 }}
        >
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id={filterId}>
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: DOT_GAP,
              position: "relative",
              height: "100%",
              filter: `url(#${filterId})`,
              paddingTop: 6,
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                onClick={() => go(i)}
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: "50%",
                  background: "var(--gp-dot)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            ))}

            <motion.div
              animate={{ x: active * (DOT_SIZE + DOT_GAP) }}
              transition={SPRING}
              style={{
                position: "absolute",
                top: 6,
                left: 0,
                width: DOT_SIZE + 4,
                height: DOT_SIZE + 4,
                marginTop: -2,
                marginLeft: -2,
                borderRadius: "50%",
                background: "var(--gp-active)",
              }}
            />
          </div>
        </div>

        {/* Next */}
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
              stroke={`rgba(var(--gp-ink),.6)`}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <span
        style={{
          fontSize: 11,
          fontWeight: 450,
          color: `rgba(var(--gp-ink),.3)`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {active + 1} / {totalPages}
      </span>
    </div>
  );
}

export default GooeyPagination;
