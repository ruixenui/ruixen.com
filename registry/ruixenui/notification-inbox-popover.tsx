"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Notification Inbox — Rauno Freiberg craft.
 *
 * Wave-proximity hover: cursor position drives nearby rows to lift,
 * sharpen, and gain weight through cosine falloff — computed per-frame
 * via direct DOM writes, zero re-renders. Hidden scrollbar with
 * edge-mask fading. Staggered mark-all-read cascade.
 * The interaction IS the design.
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
  for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
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

interface InboxItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read?: boolean;
}

interface NotificationInboxPopoverProps {
  items?: InboxItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  sound?: boolean;
}

/* ── Default data ── */

const SEED: InboxItem[] = [
  { id: "1", title: "Deployment complete", body: "v2.4.1 deployed to production successfully", time: "2m", read: false },
  { id: "2", title: "Review requested", body: "Alex requested your review on PR #482", time: "8m", read: false },
  { id: "3", title: "Build passed", body: "Pipeline #846 completed successfully", time: "24m", read: false },
  { id: "4", title: "Comment added", body: "Sarah commented on your issue #291", time: "1h", read: true },
  { id: "5", title: "Invitation", body: "You were invited to join Team Alpha", time: "3h", read: true },
  { id: "6", title: "Weekly report", body: "Your analytics summary is ready to view", time: "6h", read: true },
  { id: "7", title: "Security alert", body: "New login detected from unknown device", time: "1d", read: false },
];

/* ── Scoped CSS ── */

const STYLE = `
.ni{
  --ni-glass:rgba(255,255,255,.72);
  --ni-border:rgba(0,0,0,.06);
  --ni-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 6px rgba(0,0,0,.04),0 8px 28px rgba(0,0,0,.07);
  --ni-ink:0,0,0;
  --ni-dot:#007AFF;
  --ni-dot-bg:rgba(0,122,255,.1)
}
.dark .ni,[data-theme="dark"] .ni{
  --ni-glass:rgba(30,30,32,.82);
  --ni-border:rgba(255,255,255,.06);
  --ni-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 6px rgba(0,0,0,.18),0 8px 28px rgba(0,0,0,.28);
  --ni-ink:255,255,255;
  --ni-dot:#0A84FF;
  --ni-dot-bg:rgba(10,132,255,.12)
}
.ni-list{scrollbar-width:none;-ms-overflow-style:none}
.ni-list::-webkit-scrollbar{display:none}
`.replace(/\n/g, "");

/* ── Proximity math ── */

const RADIUS = 80;
const LIFT = 3.5;
const SCALE = 0.01;

function cosine(cy: number, ry: number): number {
  const d = Math.abs(cy - ry);
  return d > RADIUS ? 0 : (1 + Math.cos((d / RADIUS) * Math.PI)) / 2;
}

/* ── Component ── */

export function NotificationInboxPopover({
  items: ext,
  onMarkRead,
  onMarkAllRead,
  sound = true,
}: NotificationInboxPopoverProps) {
  const [internal, setInternal] = useState<InboxItem[]>(() => ext ?? SEED);
  const items = ext ?? internal;
  const unread = items.filter((n) => !n.read).length;

  const listRef = useRef<HTMLDivElement>(null);
  const rows = useRef<Map<string, HTMLDivElement>>(new Map());
  const raf = useRef(0);
  const cy = useRef<number | null>(null);
  const hovering = useRef(false);

  /* ── Per-frame proximity — direct DOM, zero re-renders ── */

  const paint = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const lr = list.getBoundingClientRect();
    const cursor = cy.current;

    rows.current.forEach((el) => {
      const rr = el.getBoundingClientRect();
      const center = rr.top - lr.top + rr.height / 2;
      const p = cursor !== null ? cosine(cursor, center) : 0;

      /* transform + shadow */
      el.style.transform =
        p > 0.01 ? `translateY(${-LIFT * p}px) scale(${1 + SCALE * p})` : "";
      el.style.boxShadow =
        p > 0.06
          ? `0 ${(p * 6).toFixed(1)}px ${(p * 16).toFixed(0)}px rgba(var(--ni-ink),${(p * 0.04).toFixed(3)})`
          : "none";

      /* subtle background tint at proximity peak */
      el.style.background =
        p > 0.1 ? `rgba(var(--ni-ink),${(p * 0.022).toFixed(3)})` : "";

      /* title weight + opacity */
      const isRead = el.dataset.read === "1";
      const t = el.querySelector("[data-t]") as HTMLElement | null;
      if (t) {
        t.style.fontWeight = String(Math.round((isRead ? 400 : 480) + p * 80));
        t.style.color = `rgba(var(--ni-ink),${(isRead ? 0.34 + p * 0.24 : 0.6 + p * 0.28).toFixed(2)})`;
      }

      /* body opacity */
      const b = el.querySelector("[data-b]") as HTMLElement | null;
      if (b) {
        b.style.color = `rgba(var(--ni-ink),${(0.32 + p * 0.13).toFixed(2)})`;
      }
    });

    if (hovering.current) raf.current = requestAnimationFrame(paint);
  }, []);

  /* ── Mouse handlers — ref writes only, no setState ── */

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const lr = listRef.current?.getBoundingClientRect();
      if (!lr) return;
      cy.current = e.clientY - lr.top;
      if (!hovering.current) {
        hovering.current = true;
        raf.current = requestAnimationFrame(paint);
      }
    },
    [paint],
  );

  const onLeave = useCallback(() => {
    hovering.current = false;
    cy.current = null;
    cancelAnimationFrame(raf.current);
    /* reset every row to neutral */
    rows.current.forEach((el) => {
      el.style.transform = "";
      el.style.boxShadow = "none";
      el.style.background = "";
      const t = el.querySelector("[data-t]") as HTMLElement | null;
      const b = el.querySelector("[data-b]") as HTMLElement | null;
      if (t) { t.style.fontWeight = ""; t.style.color = ""; }
      if (b) b.style.color = "";
    });
  }, []);

  /* cleanup on unmount */
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /* ── Actions ── */

  const markRead = useCallback(
    (id: string) => {
      if (sound) tick();
      if (ext) {
        onMarkRead?.(id);
      } else {
        setInternal((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
        onMarkRead?.(id);
      }
    },
    [ext, onMarkRead, sound],
  );

  const markAllRead = useCallback(() => {
    if (sound) tick();
    if (ext) {
      onMarkAllRead?.();
    } else {
      const ids = items.filter((n) => !n.read).map((n) => n.id);
      ids.forEach((id, i) => {
        setTimeout(() => {
          setInternal((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
          if (sound && i > 0) tick();
        }, i * 40);
      });
      onMarkAllRead?.();
    }
  }, [ext, items, onMarkAllRead, sound]);

  return (
    <div
      className="ni"
      style={{
        width: 340,
        borderRadius: 14,
        background: "var(--ni-glass)",
        border: "1px solid var(--ni-border)",
        boxShadow: "var(--ni-shadow)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px 11px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(var(--ni-ink),.88)",
              letterSpacing: "-0.01em",
            }}
          >
            Inbox
          </span>
          <AnimatePresence>
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  fontSize: 10,
                  fontWeight: 560,
                  color: "var(--ni-dot)",
                  background: "var(--ni-dot-bg)",
                  padding: "1px 6px",
                  borderRadius: 999,
                  letterSpacing: "0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {unread}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {unread > 0 && (
            <motion.button
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onClick={markAllRead}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 440,
                color: "rgba(var(--ni-ink),.34)",
                letterSpacing: "0.01em",
                padding: 0,
                transition: "color .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(var(--ni-ink),.88)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(var(--ni-ink),.34)";
              }}
            >
              Mark all read
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* hairline */}
      <div
        style={{
          height: 0.5,
          background: "rgba(var(--ni-ink),.06)",
          marginLeft: 16,
          marginRight: 16,
        }}
      />

      {/* ── List — hidden scrollbar, edge mask ── */}
      <div
        ref={listRef}
        className="ni-list"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          maxHeight: 380,
          overflowY: "auto",
          padding: "2px 0 4px",
          maskImage:
            "linear-gradient(to bottom,transparent,black 10px,black calc(100% - 10px),transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom,transparent,black 10px,black calc(100% - 10px),transparent)",
        }}
      >
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { height: { delay: 0.08 } } }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <div
                data-read={item.read ? "1" : "0"}
                ref={(el) => {
                  if (el) rows.current.set(item.id, el);
                  else rows.current.delete(item.id);
                }}
                onClick={() => !item.read && markRead(item.id)}
                style={{
                  position: "relative",
                  padding: "10px 16px",
                  cursor: item.read ? "default" : "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 9,
                  borderBottom:
                    i < items.length - 1
                      ? "0.5px solid rgba(var(--ni-ink),.05)"
                      : "none",
                  borderRadius: 8,
                  margin: "0 4px",
                  willChange: "transform",
                  transition: "transform .12s,box-shadow .1s,background .1s",
                }}
              >
                {/* unread dot */}
                <div
                  style={{
                    width: 6,
                    minWidth: 6,
                    height: 6,
                    marginTop: 5,
                    position: "relative",
                  }}
                >
                  <AnimatePresence>
                    {!item.read && (
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--ni-dot)",
                          position: "absolute",
                          inset: 0,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    data-t=""
                    style={{
                      fontSize: 13,
                      fontWeight: item.read ? 400 : 480,
                      color: `rgba(var(--ni-ink),${item.read ? 0.34 : 0.6})`,
                      lineHeight: 1.35,
                      letterSpacing: "-0.005em",
                      transition: "color .12s,font-weight .12s",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    data-b=""
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(var(--ni-ink),.32)",
                      lineHeight: 1.4,
                      marginTop: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      transition: "color .12s",
                    }}
                  >
                    {item.body}
                  </div>
                </div>

                {/* time */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "rgba(var(--ni-ink),.24)",
                    letterSpacing: "0.01em",
                    flexShrink: 0,
                    marginTop: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NotificationInboxPopover;
