"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Spring Toast Stack — Rauno Freiberg craft.
 *
 * Notification cards stack with depth compression —
 * diminishing scale, progressive blur, fading opacity.
 * Top card is draggable: swipe right to dismiss, rubber-band left.
 * Each card owns its drag state via motion `drag` prop
 * (no shared MotionValue, no interference between exit + enter).
 * Stack reshuffles with spring physics on every dismissal.
 * Micro noise-burst audio tick. CSS :active cursor.
 */

/* ── Audio — 3ms noise burst singleton ── */

let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function getAudio(): AudioContext {
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
  const len = Math.floor(ac.sampleRate * 0.003);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++)
    ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
  _buf = buf;
  return buf;
}

function tick() {
  try {
    const ac = getAudio();
    const src = ac.createBufferSource();
    const g = ac.createGain();
    src.buffer = ensureBuf(ac);
    g.gain.value = 0.06;
    src.connect(g).connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Types ── */

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type?: "default" | "success" | "error";
}

interface NotificationProps {
  items?: NotificationItem[];
  onDismiss?: (id: string) => void;
  sound?: boolean;
}

/* ── Default data ── */

const DEFAULT_ITEMS: NotificationItem[] = [
  {
    id: "1",
    title: "Deployment complete",
    body: "Your app has been deployed to production.",
    time: "2m ago",
    type: "success",
  },
  {
    id: "2",
    title: "Payment received",
    body: "You received $2,400 from Acme Corp.",
    time: "5m ago",
  },
  {
    id: "3",
    title: "Build failed",
    body: "Pipeline #847 failed at test stage.",
    time: "12m ago",
    type: "error",
  },
  {
    id: "4",
    title: "New comment",
    body: "Sarah left a comment on your pull request.",
    time: "1h ago",
  },
];

/* ── Scoped CSS ── */

const STYLE = `.nt{--nt-glass:rgba(255,255,255,.72);--nt-border:rgba(0,0,0,.06);--nt-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--nt-ink:0,0,0;--nt-ok:#34C759;--nt-err:#FF3B30}.dark .nt,[data-theme="dark"] .nt{--nt-glass:rgba(30,30,32,.82);--nt-border:rgba(255,255,255,.06);--nt-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--nt-ink:255,255,255;--nt-ok:#30D158;--nt-err:#FF453A}.nt-grab{cursor:grab}.nt-grab:active{cursor:grabbing}`;

/* ── Springs ── */

const SPRING = { type: "spring" as const, stiffness: 380, damping: 30 };

/* ── Depth constants ── */

const MAX_VISIBLE = 4;
const DEPTH_Y = 7;
const DEPTH_SCALE = 0.035;
const DEPTH_OPACITY = 0.12;
const CARD_H = 78;

/* ── Component ── */

export function Notification({
  items: ext,
  onDismiss,
  sound = true,
}: NotificationProps) {
  const [internal, setInternal] = useState<NotificationItem[]>(
    () => ext ?? DEFAULT_ITEMS,
  );
  const [isDragging, setIsDragging] = useState(false);

  const items = ext ?? internal;
  const visible = items.slice(0, MAX_VISIBLE);

  const dismiss = useCallback(
    (id: string) => {
      if (sound) tick();
      if (ext) {
        onDismiss?.(id);
      } else {
        setInternal((prev) => prev.filter((n) => n.id !== id));
        onDismiss?.(id);
      }
    },
    [ext, onDismiss, sound],
  );

  const dotColor = (type?: "default" | "success" | "error"): string => {
    if (type === "success") return "var(--nt-ok)";
    if (type === "error") return "var(--nt-err)";
    return `rgba(var(--nt-ink),.35)`;
  };

  const stackH =
    visible.length > 0 ? CARD_H + (visible.length - 1) * DEPTH_Y : 0;

  return (
    <div
      className="nt"
      style={{
        position: "relative",
        width: 340,
        height: stackH,
        userSelect: "none",
        transition: "height .35s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      <AnimatePresence>
        {visible.map((item, index) => {
          const isTop = index === 0;

          return (
            <motion.div
              key={item.id}
              className={isTop ? "nt-grab" : undefined}
              /* ── Per-instance drag — no shared MotionValue ── */
              drag={isTop ? "x" : false}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.06, right: 0.8 }}
              dragMomentum={false}
              whileDrag={{
                boxShadow:
                  "0 0 0 .5px rgba(var(--nt-ink),.04),0 4px 8px rgba(0,0,0,.08),0 16px 40px rgba(0,0,0,.12)",
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                if (info.offset.x > 100 || info.velocity.x > 500) {
                  dismiss(item.id);
                }
              }}
              /* ── Stack animation ── */
              initial={{ opacity: 0, y: -24, scale: 0.94 }}
              animate={{
                opacity: 1 - index * DEPTH_OPACITY,
                y:
                  index * DEPTH_Y -
                  (isDragging && index > 0 && index < 3 ? 2 : 0),
                scale:
                  1 -
                  index * DEPTH_SCALE +
                  (isDragging && index > 0 && index < 3 ? 0.008 : 0),
              }}
              exit={{
                x: 380,
                opacity: 0,
                transition: {
                  ...SPRING,
                  opacity: { duration: 0.18, ease: "easeOut" },
                },
              }}
              transition={SPRING}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: visible.length - index,
                filter: `blur(${index * 0.5}px)`,
                background: "var(--nt-glass)",
                border: "1px solid var(--nt-border)",
                boxShadow: "var(--nt-shadow)",
                borderRadius: 12,
                padding: "14px 16px",
                cursor: isTop ? undefined : "default",
                touchAction: "none",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {/* header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 5,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: dotColor(item.type),
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 520,
                    color: `rgba(var(--nt-ink),.88)`,
                    lineHeight: 1.3,
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: `rgba(var(--nt-ink),.35)`,
                    flexShrink: 0,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.time}
                </span>
              </div>

              {/* body */}
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 420,
                  color: `rgba(var(--nt-ink),.42)`,
                  lineHeight: 1.45,
                  margin: 0,
                  paddingLeft: 14,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.body}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default Notification;
