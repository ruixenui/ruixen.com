"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";

/**
 * Sliding Pagination — Rauno Freiberg craft.
 *
 * Page numbers with a sliding background pill indicator.
 * layoutId spring animation between active positions.
 * Proximity-based brightness on numbers. Glass container.
 * Keyboard + wheel navigation. Audio tick on change.
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

interface SlidingPaginationProps {
  totalPages?: number;
  currentPage?: number;
  maxVisiblePages?: number;
  onPageChange?: (page: number) => void;
  sound?: boolean;
}

/* ── CSS ── */

const CSS = `.slp{--slp-bg:rgba(255,255,255,.72);--slp-border:rgba(0,0,0,.06);--slp-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--slp-ink:0,0,0;--slp-pill:rgba(0,0,0,.08)}.dark .slp,[data-theme="dark"] .slp{--slp-bg:rgba(30,30,32,.82);--slp-border:rgba(255,255,255,.06);--slp-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--slp-ink:255,255,255;--slp-pill:rgba(255,255,255,.1)}.slp-num{cursor:pointer;border:none;background:none;padding:0;position:relative;display:flex;align-items:center;justify-content:center;transition:color .1s}`;

/* ── Constants ── */

const CELL = 32;
const SPRING = { type: "spring" as const, stiffness: 500, damping: 35 };

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ── Component ── */

export function SlidingPagination({
  totalPages = 20,
  currentPage: extPage,
  maxVisiblePages = 7,
  onPageChange,
  sound = true,
}: SlidingPaginationProps) {
  const [internal, setInternal] = useState(0);
  const active = extPage !== undefined ? extPage - 1 : internal;
  const lastSound = useRef(0);
  const scrollAccum = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      const c = clamp(next, 0, totalPages - 1);
      if (c === active) return;
      if (sound) tick(lastSound);
      if (extPage !== undefined) {
        onPageChange?.(c + 1);
      } else {
        setInternal(c);
        onPageChange?.(c + 1);
      }
    },
    [active, totalPages, onPageChange, sound, extPage],
  );

  // Wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) >= 40) {
        go(active + Math.sign(scrollAccum.current));
        scrollAccum.current = 0;
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [go, active]);

  // Generate visible pages with ellipsis
  const pages: (number | "dots")[] = [];
  if (totalPages <= maxVisiblePages) {
    for (let i = 0; i < totalPages; i++) pages.push(i);
  } else {
    const side = 1;
    const mid = maxVisiblePages - 2 * side - 2;
    let left = Math.max(active - Math.floor(mid / 2), side);
    let right = Math.min(active + Math.floor(mid / 2), totalPages - 1 - side);
    if (left <= side) right = Math.max(right, side + mid);
    if (right >= totalPages - 1 - side)
      left = Math.min(left, totalPages - 1 - side - mid);
    left = Math.max(left, side);
    right = Math.min(right, totalPages - 1 - side);

    pages.push(0);
    if (left > side) pages.push("dots");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1 - side) pages.push("dots");
    pages.push(totalPages - 1);
  }

  return (
    <div
      ref={containerRef}
      className="slp"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(active + 1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(active - 1);
        }
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: "4px 6px",
        background: "var(--slp-bg)",
        border: "1px solid var(--slp-border)",
        boxShadow: "var(--slp-shadow)",
        borderRadius: 12,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        outline: "none",
        userSelect: "none",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Prev */}
      <button
        className="slp-num"
        onClick={() => go(active - 1)}
        style={{
          width: CELL,
          height: CELL,
          opacity: active === 0 ? 0.15 : 0.4,
        }}
        disabled={active === 0}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M7.5 2.5L4.5 6L7.5 9.5"
            stroke={`rgba(var(--slp-ink),.6)`}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((p, i) => {
        if (p === "dots") {
          return (
            <span
              key={`d${i}`}
              style={{
                width: 20,
                height: CELL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: `rgba(var(--slp-ink),.2)`,
                letterSpacing: "0.1em",
              }}
            >
              ...
            </span>
          );
        }

        const isActive = p === active;
        const dist = Math.abs(p - active);
        const prox = Math.max(0, 1 - dist / 4);
        const alpha = 0.25 + prox * 0.6;
        const weight = Math.round(400 + prox * 160);

        return (
          <button
            key={p}
            className="slp-num"
            onClick={() => go(p)}
            style={{
              width: CELL,
              height: CELL,
              fontSize: 12,
              fontWeight: weight,
              color: `rgba(var(--slp-ink),${alpha})`,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.01em",
              zIndex: isActive ? 1 : 0,
            }}
          >
            {/* Sliding pill indicator */}
            {isActive && (
              <motion.div
                layoutId="slp-pill"
                transition={SPRING}
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: 8,
                  background: "var(--slp-pill)",
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{p + 1}</span>
          </button>
        );
      })}

      {/* Next */}
      <button
        className="slp-num"
        onClick={() => go(active + 1)}
        style={{
          width: CELL,
          height: CELL,
          opacity: active === totalPages - 1 ? 0.15 : 0.4,
        }}
        disabled={active === totalPages - 1}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 2.5L7.5 6L4.5 9.5"
            stroke={`rgba(var(--slp-ink),.6)`}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default SlidingPagination;
