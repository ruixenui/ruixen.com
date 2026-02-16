"use client";

import { useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Drawer Inner Content — gesture-driven bottom sheet.
 *
 * Built from nothing. No vaul, no shadcn, no portal.
 * Spring physics for open / close. Drag to dismiss —
 * velocity-aware snap. Content cascades in on open.
 * Structured sections with hairline separators.
 *
 * The drawer is infrastructure. The content is the design.
 */

/* ── Types ── */

export interface DrawerItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}

export interface DrawerSection {
  title?: string;
  items: DrawerItem[];
}

export interface DrawerInnerContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: DrawerSection[];
  sound?: boolean;
}

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
    src.playbackRate.value = 1.1;
    gain.gain.value = 0.03;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Component ── */

export function DrawerInnerContent({
  open,
  onOpenChange,
  sections,
  sound = true,
}: DrawerInnerContentProps) {
  const lastSound = useRef(0);

  /* Flatten items for stagger index */
  let globalIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 40,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 400 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.velocity.y > 300 || info.offset.y > 100) {
                onOpenChange(false);
              }
            }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              background: "rgba(24,24,26,0.98)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px 16px 0 0",
              paddingBottom: 20,
              touchAction: "none",
            }}
          >
            {/* Handle */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px 0 8px",
                cursor: "grab",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.12)",
                }}
              />
            </div>

            {/* Sections */}
            {sections.map((section, si) => {
              const sectionItems = section.items.map((item, ii) => {
                const idx = globalIndex++;
                return (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 + 0.03 * idx,
                      duration: 0.2,
                    }}
                    onClick={() => {
                      if (sound) playTick(lastSound);
                      item.onClick?.();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 20px",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 450,
                      letterSpacing: "-0.01em",
                      color: item.danger
                        ? "rgba(255,69,58,0.75)"
                        : "rgba(255,255,255,0.55)",
                      transition: "background 0.12s, color 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = item.danger
                        ? "rgba(255,69,58,1)"
                        : "rgba(255,255,255,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = item.danger
                        ? "rgba(255,69,58,0.75)"
                        : "rgba(255,255,255,0.55)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 18,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    {item.label}
                  </motion.div>
                );
              });

              return (
                <div key={si}>
                  {/* Section title */}
                  {section.title && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.06, duration: 0.2 }}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.25)",
                        padding: "10px 20px 4px",
                      }}
                    >
                      {section.title}
                    </motion.div>
                  )}

                  {/* Hairline */}
                  {si > 0 && !section.title && (
                    <div
                      style={{
                        height: 1,
                        background: "rgba(255,255,255,0.06)",
                        margin: "4px 16px",
                      }}
                    />
                  )}

                  {/* Items */}
                  {sectionItems}
                </div>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DrawerInnerContent;
