"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "motion/react";

/**
 * Gooey Dock — proximity magnification dock.
 *
 * Cosine-based scaling curve. Items lift on the Y-axis
 * as they grow — forming a subtle arch. Background
 * brightens on proximity. Icons scale with their cell.
 * Labels spring in / out with AnimatePresence.
 *
 * The interaction IS the design.
 */

/* ── Types ── */

export interface DockItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export interface GooeyDockProps {
  items: DockItem[];
  sound?: boolean;
}

/* ── Constants ── */

const BASE = 40;
const PEAK = 58;
const LIFT = 14;
const RADIUS = 150;

const SPRING = { mass: 0.1, stiffness: 200, damping: 14 };

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
    src.playbackRate.value = 1.2;
    gain.gain.value = 0.035;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Cosine falloff ── */

function cosineScale(d: number): number {
  const abs = Math.abs(d);
  if (abs > RADIUS) return 0;
  return (1 + Math.cos((abs / RADIUS) * Math.PI)) / 2;
}

/* ── Dock Icon ── */

function DockIcon({
  icon,
  label,
  active,
  onClick,
  mouseX,
  sound,
  lastSound,
}: DockItem & {
  mouseX: MotionValue<number>;
  sound: boolean;
  lastSound: React.MutableRefObject<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return Infinity;
    const rect = el.getBoundingClientRect();
    return val - rect.left - rect.width / 2;
  });

  /* Size — cosine curve */
  const sizeRaw = useTransform(distance, (d) => {
    const t = cosineScale(d);
    return BASE + (PEAK - BASE) * t;
  });
  const size = useSpring(sizeRaw, SPRING);

  /* Y lift — items arch upward */
  const liftRaw = useTransform(distance, (d) => {
    const t = cosineScale(d);
    return -LIFT * t;
  });
  const y = useSpring(liftRaw, SPRING);

  /* Background opacity — subtle fill on proximity */
  const bgRaw = useTransform(distance, (d) => {
    const t = cosineScale(d);
    return t * 0.08;
  });
  const bgOpacity = useSpring(bgRaw, SPRING);

  /* Icon scale — grows with cell */
  const iconScaleRaw = useTransform(size, [BASE, PEAK], [1, 1.2]);
  const iconScale = useSpring(iconScaleRaw, SPRING);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        y,
        borderRadius: 12,
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(255,255,255,${v})`,
        ),
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true);
        if (sound) playTick(lastSound);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label — springs in */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: 8,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon — scales with cell */}
      <motion.div
        style={{
          scale: iconScale,
          color: `rgba(255,255,255,${hovered ? 0.8 : 0.45})`,
          transition: "color 0.15s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </motion.div>

      {/* Active dot */}
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ── Dock ── */

export function GooeyDock({ items, sound = true }: GooeyDockProps) {
  const mouseX = useMotionValue(Infinity);
  const lastSound = useRef(0);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        padding: "8px 12px 10px",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {items.map((item, i) => (
        <DockIcon
          key={i}
          {...item}
          mouseX={mouseX}
          sound={sound}
          lastSound={lastSound}
        />
      ))}
    </div>
  );
}

export default GooeyDock;
