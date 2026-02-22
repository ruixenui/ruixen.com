"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

/**
 * Magnetic Tabs — Rauno Freiberg craft.
 *
 * Pill indicator magnetically attracted to hovered tab.
 * Soft spring on hover, snappier overshoot on selection.
 * Audio tick on change.
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

export interface MagneticTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface MagneticTabsProps {
  items?: MagneticTabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  sound?: boolean;
  className?: string;
}

/* ── CSS ── */

const CSS = `.mt{--mt-bg:rgba(255,255,255,.72);--mt-border:rgba(0,0,0,.06);--mt-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--mt-pill:rgba(0,0,0,.06);--mt-text:rgba(0,0,0,.5);--mt-text-active:rgba(0,0,0,.9);--mt-content-bg:rgba(0,0,0,.02);--mt-content-border:rgba(0,0,0,.06)}.dark .mt,[data-theme="dark"] .mt{--mt-bg:rgba(30,30,32,.82);--mt-border:rgba(255,255,255,.06);--mt-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--mt-pill:rgba(255,255,255,.08);--mt-text:rgba(255,255,255,.45);--mt-text-active:rgba(255,255,255,.9);--mt-content-bg:rgba(255,255,255,.03);--mt-content-border:rgba(255,255,255,.06)}`;

/* ── Constants ── */

const HOVER_SPRING = { type: "spring" as const, stiffness: 300, damping: 25 };
const SELECT_SPRING = { type: "spring" as const, stiffness: 500, damping: 22 };
const CONTENT_SPRING = {
  type: "spring" as const,
  stiffness: 250,
  damping: 25,
};

/* ── Component ── */

export function MagneticTabs({
  items = [
    {
      value: "overview",
      label: "Overview",
      content: "Overview content here.",
    },
    {
      value: "activity",
      label: "Activity",
      content: "Activity content here.",
    },
    {
      value: "settings",
      label: "Settings",
      content: "Settings content here.",
    },
    { value: "faq", label: "FAQ", content: "FAQ content here." },
  ],
  defaultValue,
  onChange,
  sound = true,
  className,
}: MagneticTabsProps) {
  const [active, setActive] = useState(defaultValue || items[0]?.value || "");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const lastSound = useRef(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement | null>(null);
  const measured = useRef(false);
  const selectTimer = useRef<ReturnType<typeof setTimeout>>();

  const pillX = useMotionValue(0);
  const pillW = useMotionValue(0);
  const springConfig = selectMode ? SELECT_SPRING : HOVER_SPRING;
  const springX = useSpring(pillX, springConfig);
  const springW = useSpring(pillW, springConfig);

  const movePill = useCallback(
    (value: string) => {
      const bar = barRef.current;
      if (!bar) return;
      const idx = items.findIndex((t) => t.value === value);
      const btn = tabRefs.current[idx];
      if (!btn) return;
      // Use offsetLeft/offsetWidth — immune to ancestor CSS transforms (e.g. scale)
      const x = btn.offsetLeft;
      const w = btn.offsetWidth;
      if (!measured.current) {
        pillX.jump(x);
        pillW.jump(w);
        measured.current = true;
      } else {
        pillX.set(x);
        pillW.set(w);
      }
    },
    [items, pillX, pillW],
  );

  useEffect(() => {
    movePill(hovered || active);
    const ro = new ResizeObserver(() => movePill(hovered || active));
    if (barRef.current) ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [active, hovered, movePill]);

  const go = useCallback(
    (value: string) => {
      if (value === active) return;
      setSelectMode(true);
      if (sound) tick(lastSound);
      setActive(value);
      onChange?.(value);
      clearTimeout(selectTimer.current);
      selectTimer.current = setTimeout(() => setSelectMode(false), 300);
    },
    [active, onChange, sound],
  );

  const activeItem = items.find((t) => t.value === active);

  return (
    <div className={`mt${className ? ` ${className}` : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Tab bar */}
      <div
        ref={barRef}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          padding: 4,
          background: "var(--mt-bg)",
          border: "1px solid var(--mt-border)",
          boxShadow: "var(--mt-shadow)",
          borderRadius: 14,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Pill indicator */}
        <motion.div
          style={{
            position: "absolute",
            top: 4,
            left: 0,
            height: "calc(100% - 8px)",
            x: springX,
            width: springW,
            background: "var(--mt-pill)",
            borderRadius: 10,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Tab buttons */}
        {items.map((item, i) => (
          <button
            key={item.value}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            onClick={() => go(item.value)}
            onMouseEnter={() => {
              setSelectMode(false);
              clearTimeout(selectTimer.current);
              setHovered(item.value);
            }}
            style={{
              position: "relative",
              zIndex: 1,
              border: "none",
              background: "none",
              padding: "8px 18px",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              color:
                active === item.value
                  ? "var(--mt-text-active)"
                  : "var(--mt-text)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              lineHeight: 1,
              transition: "color .15s ease",
              borderRadius: 10,
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      {activeItem?.content != null && (
        <div style={{ position: "relative", marginTop: 16, minHeight: 60 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={CONTENT_SPRING}
              style={{
                padding: 20,
                background: "var(--mt-content-bg)",
                border: "1px solid var(--mt-content-border)",
                borderRadius: 12,
                color: "var(--mt-text-active)",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {activeItem.content}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default MagneticTabs;
