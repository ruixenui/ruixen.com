"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Stack Pagination — Rauno Freiberg craft.
 *
 * Physical card stack with depth compression. Active card is full
 * opacity on top. Cards behind compress with diminishing scale,
 * progressive blur, and fading opacity. Click to advance.
 * Arrow keys navigate. Spring physics. Audio tick on change.
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

interface StackPaginationProps {
  totalPages?: number;
  onChange?: (page: number) => void;
  sound?: boolean;
}

/* ── CSS ── */

const CSS = `.skp{--skp-bg:rgba(255,255,255,.72);--skp-card:rgba(255,255,255,.85);--skp-border:rgba(0,0,0,.06);--skp-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--skp-ink:0,0,0}.dark .skp,[data-theme="dark"] .skp{--skp-bg:rgba(30,30,32,.82);--skp-card:rgba(40,40,44,.85);--skp-border:rgba(255,255,255,.06);--skp-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--skp-ink:255,255,255}`;

/* ── Constants ── */

const CARD_W = 80;
const CARD_H = 100;
const MAX_VISIBLE = 5;
const DEPTH_Y = 6;
const DEPTH_SCALE = 0.04;
const DEPTH_OPACITY = 0.15;
const SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ── Component ── */

export function StackPagination({
  totalPages = 10,
  onChange,
  sound = true,
}: StackPaginationProps) {
  const [active, setActive] = useState(0);
  const lastSound = useRef(0);

  const go = useCallback(
    (next: number) => {
      const c = clamp(next, 0, totalPages - 1);
      if (c === active) return;
      if (sound) tick(lastSound);
      setActive(c);
      onChange?.(c);
    },
    [active, totalPages, onChange, sound],
  );

  const visible: number[] = [];
  for (let i = 0; i < Math.min(MAX_VISIBLE, totalPages); i++) {
    const page = active + i;
    if (page < totalPages) visible.push(page);
  }

  const stackH = CARD_H + (visible.length - 1) * DEPTH_Y;

  return (
    <div
      className="skp"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          go(active + 1);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          go(active - 1);
        }
      }}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        outline: "none",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        style={{
          position: "relative",
          width: CARD_W,
          height: stackH,
          transition: "height .3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <AnimatePresence>
          {visible.map((page, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={page}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{
                  opacity: 1 - index * DEPTH_OPACITY,
                  y: index * DEPTH_Y,
                  scale: 1 - index * DEPTH_SCALE,
                }}
                exit={{
                  opacity: 0,
                  x: 120,
                  rotate: 8,
                  transition: { ...SPRING, opacity: { duration: 0.15 } },
                }}
                transition={SPRING}
                onClick={() => (isTop ? go(active + 1) : go(page))}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: CARD_W,
                  height: CARD_H,
                  zIndex: visible.length - index,
                  borderRadius: 12,
                  background: "var(--skp-card)",
                  border: "1px solid var(--skp-border)",
                  boxShadow: isTop
                    ? "0 2px 8px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.04)"
                    : "var(--skp-shadow)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  cursor: "pointer",
                  filter: `blur(${index * 0.4}px)`,
                  userSelect: "none",
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: `rgba(var(--skp-ink),${isTop ? 0.85 : 0.3})`,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                    transition: "color .12s",
                  }}
                >
                  {page + 1}
                </span>
                {isTop && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: `rgba(var(--skp-ink),.3)`,
                      letterSpacing: "0.02em",
                    }}
                  >
                    of {totalPages}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => go(active - 1)}
          style={{
            border: "none",
            background: `rgba(var(--skp-ink),.04)`,
            padding: "6px 12px",
            borderRadius: 8,
            cursor: active === 0 ? "default" : "pointer",
            opacity: active === 0 ? 0.3 : 1,
            fontSize: 11,
            fontWeight: 500,
            color: `rgba(var(--skp-ink),.55)`,
            transition: "opacity .12s, background .12s",
          }}
          onMouseEnter={(e) => {
            if (active > 0)
              (e.currentTarget as HTMLElement).style.background =
                `rgba(var(--skp-ink),.08)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              `rgba(var(--skp-ink),.04)`;
          }}
        >
          Prev
        </button>

        <span
          style={{
            fontSize: 11,
            fontWeight: 450,
            color: `rgba(var(--skp-ink),.3)`,
            fontVariantNumeric: "tabular-nums",
            minWidth: 36,
            textAlign: "center",
          }}
        >
          {active + 1} / {totalPages}
        </span>

        <button
          onClick={() => go(active + 1)}
          style={{
            border: "none",
            background: `rgba(var(--skp-ink),.04)`,
            padding: "6px 12px",
            borderRadius: 8,
            cursor: active === totalPages - 1 ? "default" : "pointer",
            opacity: active === totalPages - 1 ? 0.3 : 1,
            fontSize: 11,
            fontWeight: 500,
            color: `rgba(var(--skp-ink),.55)`,
            transition: "opacity .12s, background .12s",
          }}
          onMouseEnter={(e) => {
            if (active < totalPages - 1)
              (e.currentTarget as HTMLElement).style.background =
                `rgba(var(--skp-ink),.08)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              `rgba(var(--skp-ink),.04)`;
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StackPagination;
