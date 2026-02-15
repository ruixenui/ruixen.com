"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Bottom Drawers — snap-point bottom sheet.
 *
 * Three snap heights: peek, half, full. Drag between them.
 * Velocity-aware — flick to advance one snap. Spring physics.
 * Backdrop dims progressively. Tap outside to collapse.
 * Content reveals with opacity crossfades at each level.
 *
 * The mechanism IS the experience.
 */

/* ── Types ── */

export interface BottomDrawersProps {
  /** Content visible at peek height (always visible) */
  peek: ReactNode;
  /** Content visible at half height and above */
  half?: ReactNode;
  /** Content visible at full height only */
  full?: ReactNode;
  /** Starting snap: 0 = peek, 1 = half, 2 = full */
  defaultSnap?: 0 | 1 | 2;
  sound?: boolean;
}

/* ── Constants ── */

const DRAWER_H = 400;
const PEEK_H = 96;
const HALF_H = 240;

/** Y offsets for each snap — higher value = more hidden */
const SNAPS = [
  DRAWER_H - PEEK_H, // peek: 304px down, 96px visible
  DRAWER_H - HALF_H, // half: 160px down, 240px visible
  0, // full: 0px down, all 400px visible
];

/* ── Audio ── */

let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function ensureBuf(ac: AudioContext): AudioBuffer {
  if (_buf && _buf.sampleRate === ac.sampleRate) return _buf;
  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.003);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    ch[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
  }
  _buf = buf;
  return buf;
}

function playTick(last: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - last.current < 80) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    src.playbackRate.value = 1.0;
    gain.gain.value = 0.03;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Component ── */

export function BottomDrawers({
  peek,
  half,
  full,
  defaultSnap = 0,
  sound = true,
}: BottomDrawersProps) {
  const [snap, setSnap] = useState(defaultSnap);
  const lastSound = useRef(0);

  function goTo(target: 0 | 1 | 2) {
    if (target !== snap && sound) playTick(lastSound);
    setSnap(target);
  }

  function handleDragEnd(
    _: unknown,
    info: { offset: { y: number }; velocity: { y: number } },
  ) {
    const current = SNAPS[snap] + info.offset.y;
    const vel = info.velocity.y;

    let target: 0 | 1 | 2;
    if (vel > 300) {
      /* Flicking down → collapse toward peek */
      target = Math.max(snap - 1, 0) as 0 | 1 | 2;
    } else if (vel < -300) {
      /* Flicking up → expand toward full */
      target = Math.min(snap + 1, 2) as 0 | 1 | 2;
    } else {
      /* Find nearest snap by distance */
      target = SNAPS.reduce(
        (best, sy, i) =>
          Math.abs(current - sy) < Math.abs(current - SNAPS[best]) ? i : best,
        0,
      ) as 0 | 1 | 2;
    }

    goTo(target);
  }

  /* Content visibility: peek always, half at snap>=1, full at snap===2 */
  const showHalf = snap >= 1;
  const showFull = snap === 2;

  /* Backdrop opacity: 0 at peek, progressive at half & full */
  const backdropOpacity = snap === 0 ? 0 : snap === 1 ? 0.15 : 0.35;

  return (
    <>
      {/* Backdrop — dims progressively, click to collapse */}
      <motion.div
        animate={{ opacity: backdropOpacity }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => goTo(0)}
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          zIndex: 40,
          pointerEvents: snap > 0 ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: SNAPS[0] }}
        dragElastic={0.05}
        onDragEnd={handleDragEnd}
        initial={{ y: SNAPS[defaultSnap] }}
        animate={{ y: SNAPS[snap] }}
        transition={{ type: "spring", damping: 32, stiffness: 380 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: DRAWER_H,
          background: "rgba(22,22,24,0.98)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px 14px 0 0",
          touchAction: "none",
          zIndex: 50,
          overflow: "hidden",
          cursor: "grab",
        }}
      >
        {/* Handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0 6px",
          }}
        >
          <div
            style={{
              width: 32,
              height: 3.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.10)",
            }}
          />
        </div>

        {/* Peek content — always visible */}
        <div style={{ padding: "0 20px" }}>{peek}</div>

        {/* Half content — fades in at half & full */}
        {half && (
          <motion.div
            animate={{ opacity: showHalf ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: "0 20px",
              pointerEvents: showHalf ? "auto" : "none",
            }}
          >
            {half}
          </motion.div>
        )}

        {/* Full content — fades in at full only */}
        {full && (
          <motion.div
            animate={{ opacity: showFull ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: "0 20px",
              pointerEvents: showFull ? "auto" : "none",
            }}
          >
            {full}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default BottomDrawers;
