"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useCallback } from "react";

/**
 * Fine Tune Slider — Rauno Freiberg craft.
 *
 * Hold and drag to scrub. Pull away from the track to fine-tune.
 * Elastic tether visualizes precision depth. Layered thumb shadows.
 * Staggered tick marks. Track glow. Cursor glow under glass.
 */

/* ── Springs — tuned per visual weight ── */

const spring = {
  thumb: { type: "spring" as const, stiffness: 500, damping: 30 },
  content: { type: "spring" as const, stiffness: 340, damping: 28 },
  icon: { type: "spring" as const, stiffness: 440, damping: 24 },
  tether: { type: "spring" as const, stiffness: 500, damping: 40 },
};

/* ── Types ── */

interface FineTuneSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

/* ── Helper ── */

function snap(v: number, step: number, min: number, max: number) {
  const s = Math.round(v / step) * step;
  const d = step < 1 ? (String(step).split(".")[1]?.length ?? 0) : 0;
  return Math.min(max, Math.max(min, Number(s.toFixed(d))));
}

/* ── Tick positions ── */

const TICKS = [0, 25, 50, 75, 100];

/* ── Component ── */

export function FineTuneSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
}: FineTuneSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [precision, setPrecision] = useState(1);
  const [cursorOffset, setCursorOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    startX: 0,
    startVal: 0,
    rect: null as DOMRect | null,
  });

  /* Cursor glow */
  const [glowX, setGlowX] = useState(0);
  const [glowOn, setGlowOn] = useState(false);

  const doSnap = useCallback(
    (v: number) => snap(v, step, min, max),
    [min, max, step],
  );

  /* ── Pointer handlers ── */

  const onDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      const jumped = doSnap(min + pct * (max - min));

      setValue(jumped);
      onChange?.(jumped);
      drag.current = { startX: e.clientX, startVal: jumped, rect };
      setDragging(true);
    },
    [min, max, doSnap, onChange],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !drag.current.rect) return;
      const { startX, startVal, rect } = drag.current;
      if (rect.width === 0) return;

      const trackCenterY = rect.top + rect.height / 2;
      const vDist = e.clientY - trackCenterY;
      setCursorOffset(vDist);

      const p = 1 + Math.abs(vDist) / 60;
      setPrecision(p);

      const dx = (e.clientX - startX) / p;
      const dv = (dx / rect.width) * (max - min);
      const next = doSnap(startVal + dv);

      setValue(next);
      onChange?.(next);
    },
    [dragging, max, min, doSnap, onChange],
  );

  const onUp = useCallback(() => {
    setDragging(false);
    setPrecision(1);
    setCursorOffset(0);
  }, []);

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const inPrecision = dragging && precision > 1.4;
  const active = dragging || hovered;

  /* Tether geometry */
  const tetherLen = Math.min(Math.abs(cursorOffset), 140);
  const tetherDown = cursorOffset > 0;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative w-full select-none">
        {/* Surface */}
        <motion.div
          className="relative bg-neutral-900 border border-white/[0.06] px-5 pt-5 pb-4"
          style={{
            borderRadius: 16,
            overflow: "visible",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.03), 0 1px 3px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.2)",
          }}
          animate={{
            borderColor: inPrecision
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0.06)",
          }}
          transition={{ duration: 0.3 }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setGlowX(e.clientX - r.left);
            if (!glowOn) setGlowOn(true);
          }}
          onMouseLeave={() => {
            setGlowOn(false);
            if (!dragging) setHovered(false);
          }}
          onMouseEnter={() => setHovered(true)}
        >
          {/* ── Cursor glow — light-under-glass ── */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              borderRadius: 16,
              opacity: glowOn ? 1 : 0,
              transition: "opacity 0.3s ease",
              background: `radial-gradient(120px circle at ${glowX}px 50%, rgba(255,255,255,0.04), transparent)`,
            }}
          />

          {/* ── Value row ── */}
          <div className="relative z-10 flex items-baseline justify-between mb-4">
            <span className="text-[26px] font-[580] tracking-[-0.03em] text-white tabular-nums leading-none">
              {value}
            </span>

            <AnimatePresence>
              {inPrecision && (
                <motion.div
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, x: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 8, filter: "blur(4px)" }}
                  transition={{
                    ...spring.content,
                    filter: { duration: 0.15, ease: "easeOut" },
                  }}
                >
                  <CrosshairIcon />
                  <span className="text-[10px] font-medium tracking-[0.04em] text-neutral-500 uppercase">
                    {precision.toFixed(1)}×
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Track zone — overflow visible for tether ── */}
          <div className="relative z-10" style={{ overflow: "visible" }}>
            {/* ── Elastic tether — precision depth visual ── */}
            <AnimatePresence>
              {inPrecision && (
                <motion.div
                  className="absolute pointer-events-none z-20"
                  style={{
                    left: `${pct}%`,
                    top: "50%",
                    transform: "translateX(-50%)",
                    width: 1,
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 0.5,
                    height: tetherLen,
                    y: tetherDown ? 0 : -tetherLen,
                  }}
                  exit={{ opacity: 0, height: 0, y: 0 }}
                  transition={spring.tether}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: tetherDown
                        ? "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)"
                        : "linear-gradient(to top, rgba(255,255,255,0.5), transparent)",
                    }}
                  />
                  {/* Endpoint dot */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/40"
                    style={tetherDown ? { bottom: -1 } : { top: -1 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Track ── */}
            <div
              ref={trackRef}
              className="relative h-2 rounded-full"
              style={{
                touchAction: "none",
                cursor: dragging ? "grabbing" : "ew-resize",
                background: "rgba(255,255,255,0.04)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)",
              }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onLostPointerCapture={onUp}
            >
              {/* Filled portion — glows in precision mode */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${pct}%` }}
                animate={{
                  background: inPrecision
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.60)",
                  boxShadow: inPrecision
                    ? "0 0 16px rgba(255,255,255,0.15), 0 0 4px rgba(255,255,255,0.1)"
                    : dragging
                      ? "0 0 8px rgba(255,255,255,0.06)"
                      : "none",
                }}
                transition={{ duration: 0.25 }}
              />

              {/* Tick marks — stagger in on interaction */}
              {TICKS.map((t, i) => (
                <motion.div
                  key={t}
                  className="absolute top-full w-px bg-white/[0.08]"
                  style={{
                    left: `${t}%`,
                    marginTop: 4,
                    height: t === 50 ? 6 : 4,
                    transformOrigin: "top",
                  }}
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    scaleY: active ? 1 : 0,
                  }}
                  transition={{ ...spring.icon, delay: active ? i * 0.03 : 0 }}
                />
              ))}

              {/* Thumb */}
              <motion.div
                className="absolute top-1/2 z-10"
                style={{ left: `${pct}%`, x: "-50%", y: "-50%" }}
                animate={{
                  scale: dragging ? 1.2 : hovered ? 1.06 : 1,
                }}
                transition={spring.thumb}
              >
                <div
                  className="w-[18px] h-[18px] rounded-full bg-white"
                  style={{
                    boxShadow: inPrecision
                      ? "0 0 0 6px rgba(255,255,255,0.05), 0 0 20px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.4)"
                      : dragging
                        ? "0 0 0 4px rgba(255,255,255,0.04), 0 0 12px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.4)"
                        : hovered
                          ? "0 0 0 3px rgba(255,255,255,0.03), 0 1px 6px rgba(0,0,0,0.3)"
                          : "0 1px 4px rgba(0,0,0,0.25)",
                    transition: "box-shadow 0.25s ease",
                  }}
                />
              </motion.div>
            </div>

            {/* Min / Max labels — reveal on interaction */}
            <motion.div
              className="flex justify-between mt-3"
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.15, delay: active ? 0.06 : 0 }}
            >
              <span className="text-[10px] text-neutral-600 tabular-nums">
                {min}
              </span>
              <span className="text-[10px] text-neutral-600 tabular-nums">
                {max}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Icons ── */

function CrosshairIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-500"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
    </svg>
  );
}

export default FineTuneSlider;
