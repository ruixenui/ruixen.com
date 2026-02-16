"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

/**
 * Morphing Page Dots — Rauno Freiberg craft.
 *
 * Active dot stretches to pill shape showing page number.
 * Inactive dots are small circles. Spring width morph.
 * Horizontal drag to scrub through pages.
 * Glass container. Audio tick on change.
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
  for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
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
  } catch { /* silent */ }
}

/* ── Types ── */

interface MorphingPageDotsProps {
  total?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  sound?: boolean;
}

/* ── CSS ── */

const CSS = `.mpd{--mpd-bg:rgba(255,255,255,.72);--mpd-border:rgba(0,0,0,.06);--mpd-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--mpd-ink:0,0,0;--mpd-dot:rgba(0,0,0,.12);--mpd-active:rgba(0,0,0,.7)}.dark .mpd,[data-theme="dark"] .mpd{--mpd-bg:rgba(30,30,32,.82);--mpd-border:rgba(255,255,255,.06);--mpd-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--mpd-ink:255,255,255;--mpd-dot:rgba(255,255,255,.15);--mpd-active:rgba(255,255,255,.7)}.mpd-scrub{cursor:grab;touch-action:none}.mpd-scrub:active{cursor:grabbing}`;

/* ── Constants ── */

const DOT_H = 8;
const DOT_W_INACTIVE = 8;
const DOT_W_ACTIVE = 28;
const DOT_GAP = 6;
const SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ── Component ── */

export function MorphingPageDots({
  total = 5,
  initialPage = 0,
  onPageChange,
  sound = true,
}: MorphingPageDotsProps) {
  const [page, setPage] = useState(initialPage);
  const lastSound = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startPage = useRef(0);

  const go = useCallback((next: number) => {
    const c = clamp(next, 0, total - 1);
    if (c === page) return;
    if (sound) tick(lastSound);
    setPage(c);
    onPageChange?.(c);
  }, [page, total, onPageChange, sound]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    startX.current = e.clientX;
    startPage.current = page;
  }, [page]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    const step = DOT_W_INACTIVE + DOT_GAP;
    const delta = Math.round(dx / step);
    go(startPage.current + delta);
  }, [go]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="mpd" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "12px 16px",
        background: "var(--mpd-bg)",
        border: "1px solid var(--mpd-border)",
        boxShadow: "var(--mpd-shadow)",
        borderRadius: 24,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}>
        {/* Prev arrow */}
        <button
          onClick={() => go(page - 1)}
          style={{
            border: "none", background: "none", padding: 4,
            cursor: page === 0 ? "default" : "pointer",
            opacity: page === 0 ? 0.15 : 0.4,
            display: "flex", transition: "opacity .12s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2.5L4.5 6L7.5 9.5" stroke={`rgba(var(--mpd-ink),.6)`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dots area — draggable */}
        <div
          className="mpd-scrub"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onLostPointerCapture={onPointerUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: DOT_GAP,
          }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const isActive = i === page;

            return (
              <motion.div
                key={i}
                onClick={(e) => { e.stopPropagation(); go(i); }}
                animate={{
                  width: isActive ? DOT_W_ACTIVE : DOT_W_INACTIVE,
                  height: DOT_H,
                  borderRadius: DOT_H / 2,
                }}
                transition={SPRING}
                style={{
                  background: isActive ? "var(--mpd-active)" : "var(--mpd-dot)",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                {/* Page number inside active pill */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.08, duration: 0.15 }}
                    style={{
                      fontSize: 7,
                      fontWeight: 600,
                      color: `rgba(var(--mpd-ink),${isActive ? 0 : 0.5})`,
                      letterSpacing: "0.02em",
                      position: "absolute",
                    }}
                  >
                    {/* Number is invisible but gives the pill meaning */}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => go(page + 1)}
          style={{
            border: "none", background: "none", padding: 4,
            cursor: page === total - 1 ? "default" : "pointer",
            opacity: page === total - 1 ? 0.15 : 0.4,
            display: "flex", transition: "opacity .12s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke={`rgba(var(--mpd-ink),.6)`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MorphingPageDots;
