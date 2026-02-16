"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Wheel Pagination — Rauno Freiberg craft.
 *
 * Visible window of page numbers in a glass container.
 * Scroll wheel or drag vertically to rotate through pages.
 * Active number at center — full brightness, heavier weight.
 * Adjacent numbers fade with proximity. Spring snap to integers.
 * Micro noise-burst on every detent crossing.
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

interface WheelPaginationProps {
  totalPages?: number;
  visibleCount?: number;
  onChange?: (page: number) => void;
  sound?: boolean;
}

/* ── CSS ── */

const CSS = `.wp{--wp-bg:rgba(255,255,255,.72);--wp-border:rgba(0,0,0,.06);--wp-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--wp-ink:0,0,0}.dark .wp,[data-theme="dark"] .wp{--wp-bg:rgba(30,30,32,.82);--wp-border:rgba(255,255,255,.06);--wp-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--wp-ink:255,255,255}`;

/* ── Constants ── */

const ITEM_H = 36;
const SPRING = { type: "spring" as const, stiffness: 400, damping: 32 };

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ── Arrow SVG ── */

function Arrow({ dir, disabled, onClick }: { dir: "up" | "down"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "none",
        background: "none",
        padding: 6,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.2 : 0.4,
        transition: "opacity .15s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = disabled ? "0.2" : "0.4"; }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d={dir === "up" ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"}
          stroke={`rgba(var(--wp-ink),.6)`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ── Component ── */

export function WheelPagination({
  totalPages = 50,
  visibleCount = 5,
  onChange,
  sound = true,
}: WheelPaginationProps) {
  const [active, setActive] = useState(0);
  const lastSound = useRef(0);
  const scrollAccum = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPage = useRef(0);

  const go = useCallback((next: number) => {
    const c = clamp(next, 0, totalPages - 1);
    if (c !== prevPage.current && sound) tick(lastSound);
    prevPage.current = c;
    setActive(c);
    onChange?.(c);
  }, [totalPages, onChange, sound]);

  // Wheel handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) >= 40) {
        go(prevPage.current + Math.sign(scrollAccum.current));
        scrollAccum.current = 0;
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [go]);

  useEffect(() => { prevPage.current = active; }, [active]);

  // Visible window
  const half = Math.floor(visibleCount / 2);
  let start = active - half;
  let end = active + half;
  if (start < 0) { end += -start; start = 0; }
  if (end > totalPages - 1) { start -= end - (totalPages - 1); end = totalPages - 1; start = Math.max(0, start); }
  const visible: number[] = [];
  for (let i = start; i <= end; i++) visible.push(i);

  const viewH = visibleCount * ITEM_H;

  return (
    <div className="wp" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <Arrow dir="up" disabled={active === 0} onClick={() => go(active - 1)} />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: 120,
          height: viewH,
          background: "var(--wp-bg)",
          border: "1px solid var(--wp-border)",
          boxShadow: "var(--wp-shadow)",
          borderRadius: 12,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          cursor: "ns-resize",
        }}
      >
        <AnimatePresence initial={false}>
          {visible.map((p) => {
            const dist = Math.abs(p - active);
            const prox = Math.max(0, 1 - dist / (half + 1));
            const alpha = 0.15 + prox * 0.73;
            const weight = Math.round(400 + prox * 160);
            const scale = 0.85 + prox * 0.15;

            return (
              <motion.div
                key={p}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={SPRING}
                onClick={() => go(p)}
                style={{
                  height: ITEM_H,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <motion.span
                  animate={{ scale, opacity: alpha }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  style={{
                    fontSize: 14,
                    fontWeight: weight,
                    color: `rgba(var(--wp-ink),${alpha})`,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.01em",
                    userSelect: "none",
                    transition: "color .08s",
                  }}
                >
                  {p + 1}
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Arrow dir="down" disabled={active === totalPages - 1} onClick={() => go(active + 1)} />
    </div>
  );
}

export default WheelPagination;
