"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Invert Tabs — inspired by rauno.me/craft.
 *
 * mix-blend-mode: exclusion on a white pill indicator.
 * Text auto-inverts under the pill in both light and dark themes.
 * Pure tab selector. Spring physics. Audio tick on change.
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

export interface InvertTabItem {
  value: string;
  label: string;
}

interface InvertTabsProps {
  items?: InvertTabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  sound?: boolean;
  className?: string;
}

/* ── CSS ── */

const CSS = `.it{--it-bg:#f0f0f0;--it-text:rgba(0,0,0,.5);--it-pill:#fff}.dark .it,[data-theme="dark"] .it{--it-bg:#1a1a1c;--it-text:rgba(255,255,255,.45);--it-pill:#fff}`;

/* ── Constants ── */

const SPRING = { stiffness: 420, damping: 28 };

/* ── Component ── */

export function InvertTabs({
  items = [
    { value: "all", label: "All Posts" },
    { value: "engineering", label: "Engineering" },
    { value: "community", label: "Community" },
    { value: "press", label: "Press" },
    { value: "changelog", label: "Changelog" },
  ],
  defaultValue,
  onChange,
  sound = true,
  className,
}: InvertTabsProps) {
  const [active, setActive] = useState(defaultValue || items[0]?.value || "");
  const lastSound = useRef(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement | null>(null);
  const measured = useRef(false);

  const pillX = useMotionValue(0);
  const pillW = useMotionValue(0);
  const springX = useSpring(pillX, SPRING);
  const springW = useSpring(pillW, SPRING);

  const measure = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const idx = items.findIndex((t) => t.value === active);
    const btn = tabRefs.current[idx];
    if (!btn) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const x = btnRect.left - barRect.left;
    const w = btnRect.width;
    if (!measured.current) {
      pillX.jump(x);
      pillW.jump(w);
      measured.current = true;
    } else {
      pillX.set(x);
      pillW.set(w);
    }
  }, [active, items, pillX, pillW]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (barRef.current) ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const go = useCallback(
    (value: string) => {
      if (value === active) return;
      if (sound) tick(lastSound);
      setActive(value);
      onChange?.(value);
    },
    [active, onChange, sound],
  );

  return (
    <div className={`it${className ? ` ${className}` : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        ref={barRef}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
          padding: 4,
          background: "var(--it-bg)",
          borderRadius: 9999,
          isolation: "isolate",
          overflow: "hidden",
        }}
      >
        {items.map((item, i) => (
          <button
            key={item.value}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            onClick={() => go(item.value)}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 32,
              border: "none",
              background: "none",
              padding: "0 14px",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              color: "var(--it-text)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              lineHeight: 1,
              borderRadius: 9999,
            }}
          >
            {item.label}
          </button>
        ))}

        {/* Exclusion pill — white blends via exclusion to auto-invert */}
        <motion.div
          style={{
            position: "absolute",
            top: 4,
            left: 0,
            height: "calc(100% - 8px)",
            x: springX,
            width: springW,
            background: "var(--it-pill)",
            borderRadius: 9999,
            mixBlendMode: "exclusion",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

export default InvertTabs;
