"use client";

import { motion } from "motion/react";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";

/**
 * Scroll Ruler — Rauno Freiberg craft.
 *
 * Pure metric lines. No surface, no border.
 * Scroll or drag to scrub through values.
 * Proximity-scaled ticks — magnifying-lens bulge at center.
 * Mechanical noise-burst click sounds on each detent.
 * CSS mask-image for background-agnostic edge fading.
 * Spring-animated snapping on release.
 * Supports controlled (value) and uncontrolled (defaultValue) modes.
 */

/* ── Springs ── */

const spring = {
  snap: { type: "spring" as const, stiffness: 400, damping: 30 },
};

/* ── Types ── */

interface ScrollRulerProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  suffix?: string;
  sound?: boolean;
  labelInterval?: number;
  majorInterval?: number;
  onChange?: (value: number) => void;
}

/* ── Constants ── */

const PITCH = 10;
const TICK_W = 2;

/* ── Audio — mechanical noise-burst detent clicks ── */

let _ctx: AudioContext | null = null;
let _clickBuf: AudioBuffer | null = null;

function ctx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function clickBuffer(ac: AudioContext): AudioBuffer {
  if (_clickBuf && _clickBuf.sampleRate === ac.sampleRate) return _clickBuf;

  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.005); // 5ms burst
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);

  for (let i = 0; i < len; i++) {
    const t = i / len;
    // Shaped noise — sharp attack, quartic decay
    ch[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
  }

  _clickBuf = buf;
  return buf;
}

function playClick(
  val: number,
  lastTime: React.MutableRefObject<number>,
  labelInt: number,
  majorInt: number,
) {
  const now = performance.now();
  if (now - lastTime.current < 20) return;
  lastTime.current = now;

  try {
    const ac = ctx();
    const buf = clickBuffer(ac);

    const isLabel = val % labelInt === 0;
    const isMajor = val % majorInt === 0;

    const src = ac.createBufferSource();
    const gain = ac.createGain();

    src.buffer = buf;
    // Pitch: label = deeper thock, minor = lighter tap
    src.playbackRate.value = isLabel ? 0.7 : isMajor ? 0.9 : 1.3;
    // Volume: label loudest, minor subtlest
    gain.gain.value = isLabel ? 0.18 : isMajor ? 0.1 : 0.05;

    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent fallback */
  }
}

/* ── Helper ── */

function snapVal(v: number, step: number, min: number, max: number) {
  const s = Math.round(v / step) * step;
  const d = step < 1 ? (String(step).split(".")[1]?.length ?? 0) : 0;
  return Math.min(max, Math.max(min, Number(s.toFixed(d))));
}

/* ── Component ── */

export function ScrollRuler({
  min = -90,
  max = 90,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  suffix = "°",
  sound = true,
  labelInterval = 10,
  majorInterval = 5,
  onChange,
}: ScrollRulerProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startVal: 0 });
  const prevVal = useRef(value);
  const lastSoundTime = useRef(0);
  const rulerAreaRef = useRef<HTMLDivElement>(null);

  /* Build ticks */
  const ticks = useMemo(() => {
    const totalSteps = Math.round((max - min) / step);
    const arr: number[] = [];
    for (let i = 0; i <= totalSteps; i++) {
      arr.push(+(min + i * step).toFixed(10));
    }
    return arr;
  }, [min, max, step]);

  /* Ruler x — current value centered */
  const valueIndex = (value - min) / step;
  const rulerX = -valueIndex * PITCH;

  /* Labels */
  const labelTicks = useMemo(
    () => ticks.filter((t) => t % labelInterval === 0),
    [ticks, labelInterval],
  );

  /* Set value + play sound */
  const set = useCallback(
    (next: number) => {
      if (next !== prevVal.current) {
        if (sound) playClick(next, lastSoundTime, labelInterval, majorInterval);
        prevVal.current = next;
      }
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [sound, isControlled, labelInterval, majorInterval, onChange],
  );

  /* ── Pointer handlers ── */

  const onDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { startX: e.clientX, startVal: value };
      setIsDragging(true);
    },
    [value],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - drag.current.startX;
      const dv = -(dx / PITCH) * step;
      set(snapVal(drag.current.startVal + dv, step, min, max));
    },
    [isDragging, step, min, max, set],
  );

  const onUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* Wheel — non-passive */
  const wheelHandler = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = snapVal(prevVal.current + dir * step, step, min, max);
      set(next);
    },
    [step, min, max, set],
  );

  useEffect(() => {
    const el = rulerAreaRef.current;
    if (!el) return;
    el.addEventListener("wheel", wheelHandler, { passive: false });
    return () => el.removeEventListener("wheel", wheelHandler);
  }, [wheelHandler]);

  /* Sync controlled value to prevVal */
  useEffect(() => {
    prevVal.current = value;
  }, [value]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative w-full select-none">
        {/* ── Value display ── */}
        <div className="text-center mb-3">
          <span className="text-[26px] font-[580] tracking-[-0.03em] text-white tabular-nums leading-none">
            {value}
            <span className="text-neutral-500 text-[20px]">{suffix}</span>
          </span>
        </div>

        {/* ── Ruler container — CSS mask for bg-agnostic edge fade ── */}
        <div
          ref={rulerAreaRef}
          className="relative h-16"
          style={{
            touchAction: "none",
            cursor: isDragging ? "grabbing" : "grab",
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onLostPointerCapture={onUp}
        >
          {/* Center indicator — fixed */}
          <div
            className="absolute left-1/2 top-0 bottom-4 z-10 -translate-x-1/2"
            style={{
              width: TICK_W,
              borderRadius: 1,
              background: isDragging
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0.9)",
              boxShadow: isDragging
                ? "0 0 12px rgba(255,255,255,0.35)"
                : "0 0 8px rgba(255,255,255,0.2)",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
          />
          {/* Indicator cap */}
          <div
            className="absolute left-1/2 -top-0.5 w-1.5 h-1.5 rounded-full z-10 -translate-x-1/2"
            style={{
              background: "white",
              boxShadow: "0 0 6px rgba(255,255,255,0.3)",
            }}
          />

          {/* ── Ruler strip — slides under center indicator ── */}
          <motion.div
            className="absolute inset-y-0"
            style={{ left: "50%" }}
            animate={{ x: rulerX }}
            transition={
              isDragging ? { type: "tween", duration: 0 } : spring.snap
            }
          >
            {/* Tick bars — proximity-scaled (magnifying lens) */}
            {ticks.map((tickVal, i) => {
              const isLabel = tickVal % labelInterval === 0;
              const isMajor = tickVal % majorInterval === 0;

              const dist = Math.abs(i - valueIndex);
              const prox = Math.max(0, 1 - dist / 8);

              const baseH = isLabel ? 24 : isMajor ? 14 : 7;
              const scale = 1 + prox * 0.5;

              const baseA = isLabel ? 0.4 : isMajor ? 0.15 : 0.06;
              const alpha = Math.min(1, baseA + prox * 0.35);

              return (
                <div
                  key={tickVal}
                  style={{
                    position: "absolute",
                    left: i * PITCH,
                    bottom: 16,
                    width: TICK_W,
                    height: baseH,
                    borderRadius: 1,
                    background: `rgba(255,255,255,${alpha})`,
                    transform: `translateX(-50%) scaleY(${scale})`,
                    transformOrigin: "bottom",
                    willChange: "transform",
                  }}
                />
              );
            })}

            {/* Labels — separate layer, not scaled */}
            {labelTicks.map((tickVal) => {
              const i = Math.round((tickVal - min) / step);
              const dist = Math.abs(i - valueIndex);
              const prox = Math.max(0, 1 - dist / 10);
              const alpha = 0.35 + prox * 0.4;

              return (
                <span
                  key={`l${tickVal}`}
                  style={{
                    position: "absolute",
                    left: i * PITCH,
                    bottom: 0,
                    transform: "translateX(-50%)",
                    fontSize: 9,
                    color: `rgba(163,163,163,${alpha})`,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}
                >
                  {tickVal}
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* ── Hint ── */}
        <div className="text-center mt-1">
          <span className="text-[10px] text-neutral-700">Scroll or drag</span>
        </div>
      </div>
    </div>
  );
}

export default ScrollRuler;
