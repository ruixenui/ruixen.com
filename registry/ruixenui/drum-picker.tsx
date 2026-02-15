"use client";

import { motion } from "motion/react";
import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Drum Picker — Rauno Freiberg craft.
 *
 * 3D cylindrical drum for discrete value selection.
 * Vertical drag or scroll to cycle through items.
 * Perspective-projected items curve away from center —
 * proximity-scaled brightness gives a natural depth cue.
 * CSS mask-image for background-agnostic edge fading.
 * Scroll-delta accumulation prevents trackpad over-sensitivity.
 * Rubber-band overscroll at limits.
 * Mechanical noise-burst click on each detent.
 * Spring-animated snapping on release.
 * Supports controlled (value) and uncontrolled (defaultValue) modes.
 */

/* ── Springs ── */

const spring = {
  snap: { type: "spring" as const, stiffness: 360, damping: 34 },
};

/* ── Types ── */

interface DrumPickerProps {
  items: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  sound?: boolean;
}

/* ── Constants ── */

const ANGLE_STEP = 20;
const RADIUS = 150;
const ITEM_H = 40;
const VISIBLE_HALF = 5;
const SCROLL_THRESHOLD = 50;

/* ── Audio — mechanical noise-burst detent clicks ── */

let _ctx: AudioContext | null = null;
let _clickBuf: AudioBuffer | null = null;

function audioCtx() {
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
  const len = Math.floor(rate * 0.004); // 4ms burst
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);

  for (let i = 0; i < len; i++) {
    const t = i / len;
    ch[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
  }

  _clickBuf = buf;
  return buf;
}

function playDetent(lastTime: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - lastTime.current < 25) return;
  lastTime.current = now;

  try {
    const ac = audioCtx();
    const buf = clickBuffer(ac);

    const src = ac.createBufferSource();
    const gain = ac.createGain();

    src.buffer = buf;
    src.playbackRate.value = 0.8;
    gain.gain.value = 0.12;

    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent fallback */
  }
}

/* ── Helpers ── */

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ── Component ── */

export function DrumPicker({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  sound = true,
}: DrumPickerProps) {
  const defaultIdx = defaultValue
    ? Math.max(0, items.indexOf(defaultValue))
    : 0;
  const [internalIdx, setInternalIdx] = useState(defaultIdx);

  const isControlled = controlledValue !== undefined;
  const currentIdx = isControlled
    ? Math.max(0, items.indexOf(controlledValue))
    : internalIdx;

  const [isDragging, setIsDragging] = useState(false);
  const [dragAngle, setDragAngle] = useState(0);
  const dragRef = useRef({ startY: 0, startAngle: 0 });
  const prevIdx = useRef(currentIdx);
  const lastSoundTime = useRef(0);
  const scrollAccum = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const targetAngle = currentIdx * ANGLE_STEP;
  const displayAngle = isDragging ? dragAngle : targetAngle;

  /* Set value + sound */
  const set = useCallback(
    (idx: number) => {
      const c = clamp(idx, 0, items.length - 1);
      if (c !== prevIdx.current) {
        if (sound) playDetent(lastSoundTime);
        prevIdx.current = c;
      }
      if (!isControlled) setInternalIdx(c);
      onChange?.(items[c]);
    },
    [sound, isControlled, items, onChange],
  );

  /* ── Pointer handlers ── */

  const onDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      const angle = currentIdx * ANGLE_STEP;
      dragRef.current = { startY: e.clientY, startAngle: angle };
      setDragAngle(angle);
      setIsDragging(true);
    },
    [currentIdx],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dy = e.clientY - dragRef.current.startY;
      let newAngle = dragRef.current.startAngle - dy * 0.35;

      // Rubber-band overscroll — diminishing drag past limits
      const minA = 0;
      const maxA = (items.length - 1) * ANGLE_STEP;
      if (newAngle < minA) {
        const over = minA - newAngle;
        newAngle = minA - over * 0.12;
      } else if (newAngle > maxA) {
        const over = newAngle - maxA;
        newAngle = maxA + over * 0.12;
      }

      setDragAngle(newAngle);

      // Sound on detent crossing
      const nearIdx = clamp(
        Math.round(newAngle / ANGLE_STEP),
        0,
        items.length - 1,
      );
      if (nearIdx !== prevIdx.current) {
        if (sound) playDetent(lastSoundTime);
        prevIdx.current = nearIdx;
      }
    },
    [isDragging, items.length, sound],
  );

  const onUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const nearIdx = clamp(
      Math.round(dragAngle / ANGLE_STEP),
      0,
      items.length - 1,
    );
    set(nearIdx);
  }, [isDragging, dragAngle, items.length, set]);

  /* Wheel — accumulated delta, non-passive */
  const wheelHandler = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;

      if (Math.abs(scrollAccum.current) >= SCROLL_THRESHOLD) {
        const dir = Math.sign(scrollAccum.current);
        scrollAccum.current = 0;
        set(prevIdx.current + dir);
      }
    },
    [set],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", wheelHandler, { passive: false });
    return () => el.removeEventListener("wheel", wheelHandler);
  }, [wheelHandler]);

  /* Sync controlled value */
  useEffect(() => {
    prevIdx.current = currentIdx;
  }, [currentIdx]);

  /* Container height */
  const viewH = ITEM_H * (VISIBLE_HALF * 2 + 1);

  return (
    <div className="flex w-full items-center justify-center">
      <div
        ref={containerRef}
        className="relative select-none"
        style={{
          height: viewH,
          width: "100%",
          maxWidth: 240,
          perspective: 900,
          touchAction: "none",
          cursor: isDragging ? "grabbing" : "ns-resize",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onLostPointerCapture={onUp}
      >
        {/* Selection slot — two hair-thin lines */}
        <div
          className="absolute inset-x-0 z-10 pointer-events-none"
          style={{
            top: "50%",
            transform: `translateY(-${ITEM_H / 2}px)`,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          className="absolute inset-x-0 z-10 pointer-events-none"
          style={{
            top: "50%",
            transform: `translateY(${ITEM_H / 2}px)`,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* 3D Cylinder */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: -displayAngle }}
          transition={isDragging ? { type: "tween", duration: 0 } : spring.snap}
        >
          {items.map((item, i) => {
            const angle = i * ANGLE_STEP;

            // Cull items far from current view
            const center = displayAngle / ANGLE_STEP;
            if (Math.abs(i - center) > VISIBLE_HALF + 2) return null;

            // Proximity-based styling — center item bright, others fade
            const dist = Math.abs(i - center);
            const prox = Math.max(0, 1 - dist / 4);
            const alpha = 0.2 + prox * 0.6;
            const weight = Math.round(400 + prox * 160);

            return (
              <div
                key={i}
                className="absolute inset-x-0 flex items-center justify-center"
                style={{
                  height: ITEM_H,
                  top: "50%",
                  marginTop: -(ITEM_H / 2),
                  transform: `rotateX(${angle}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <span
                  className="text-[15px] tracking-[-0.01em] whitespace-nowrap"
                  style={{
                    color: `rgba(255,255,255,${alpha})`,
                    fontWeight: weight,
                    fontVariantNumeric: "tabular-nums",
                    transition: "color 0.08s, font-weight 0.08s",
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default DrumPicker;
