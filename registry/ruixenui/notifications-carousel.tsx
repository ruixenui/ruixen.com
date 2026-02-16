"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, animate } from "motion/react";

/**
 * Notifications Carousel — Rauno Freiberg craft.
 *
 * Vertical spring carousel. Center item is full brightness + draggable.
 * Adjacent items fade with proximity falloff. Vertical drag/scroll to navigate.
 * Horizontal swipe on focused item to dismiss. Tap to select.
 * Spring physics everywhere. Micro noise-burst audio on detent.
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
  for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
  _b = buf;
  return buf;
}

function tick(ref: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - ref.current < 30) return;
  ref.current = now;
  try {
    const ac = getCtx();
    const src = ac.createBufferSource();
    const g = ac.createGain();
    src.buffer = getBuf(ac);
    g.gain.value = 0.07;
    src.connect(g).connect(ac.destination);
    src.start();
  } catch { /* silent */ }
}

/* ── Types ── */

interface CarouselItem {
  id: string;
  title: string;
  body: string;
  time: string;
}

interface NotificationsCarouselProps {
  items?: CarouselItem[];
  onDismiss?: (id: string) => void;
  onSelect?: (id: string) => void;
  sound?: boolean;
}

/* ── Defaults ── */

const DEFAULTS: CarouselItem[] = [
  { id: "1", title: "Deployment complete", body: "v2.4.1 deployed to production successfully", time: "2m ago" },
  { id: "2", title: "Review requested", body: "Alex requested your review on PR #482", time: "8m ago" },
  { id: "3", title: "Build passed", body: "Pipeline #846 completed in 3m 42s", time: "24m ago" },
  { id: "4", title: "New comment", body: "Sarah commented on your pull request", time: "1h ago" },
  { id: "5", title: "Security alert", body: "New login detected from San Francisco", time: "2h ago" },
  { id: "6", title: "Invoice paid", body: "Payment of $3,200 received from Acme", time: "4h ago" },
  { id: "7", title: "Team invitation", body: "You were invited to join Project Alpha", time: "6h ago" },
  { id: "8", title: "Weekly report", body: "Your weekly analytics summary is ready", time: "1d ago" },
];

/* ── CSS ── */

const CSS = `.nc{--nc-bg:rgba(255,255,255,.72);--nc-border:rgba(0,0,0,.06);--nc-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--nc-ink:0,0,0;--nc-card:rgba(255,255,255,.55);--nc-card-hi:rgba(255,255,255,.85)}.dark .nc,[data-theme="dark"] .nc{--nc-bg:rgba(30,30,32,.82);--nc-border:rgba(255,255,255,.06);--nc-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--nc-ink:255,255,255;--nc-card:rgba(255,255,255,.04);--nc-card-hi:rgba(255,255,255,.08)}.nc-row{cursor:grab;touch-action:none}.nc-row:active{cursor:grabbing}`;

/* ── Constants ── */

const ROW_H = 68;
const GAP = 6;
const STEP = ROW_H + GAP;
const SPRING = { type: "spring" as const, stiffness: 400, damping: 32 };
const DISMISS_THRESHOLD = 80;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ── Component ── */

export function NotificationsCarousel({
  items: ext,
  onDismiss,
  onSelect,
  sound = true,
}: NotificationsCarouselProps) {
  const [internal, setInternal] = useState<CarouselItem[]>(() => ext ?? DEFAULTS);
  const items = ext ?? internal;
  const [idx, setIdx] = useState(0);
  const prevIdx = useRef(0);
  const lastSound = useRef(0);
  const scrollAccum = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartIdx = useRef(0);

  // Keep idx in bounds
  const safeIdx = clamp(idx, 0, items.length - 1);

  const go = useCallback((next: number) => {
    const c = clamp(next, 0, items.length - 1);
    if (c !== prevIdx.current && sound) tick(lastSound);
    prevIdx.current = c;
    setIdx(c);
  }, [items.length, sound]);

  const dismiss = useCallback((id: string) => {
    if (sound) tick(lastSound);
    if (ext) {
      onDismiss?.(id);
    } else {
      setInternal(p => {
        const next = p.filter(n => n.id !== id);
        // Adjust index if needed
        const newIdx = Math.min(prevIdx.current, next.length - 1);
        prevIdx.current = Math.max(0, newIdx);
        setIdx(Math.max(0, newIdx));
        return next;
      });
      onDismiss?.(id);
    }
  }, [ext, onDismiss, sound]);

  // Wheel navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) >= 45) {
        go(prevIdx.current + Math.sign(scrollAccum.current));
        scrollAccum.current = 0;
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [go]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(safeIdx + 1); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(safeIdx - 1); }
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [go, safeIdx]);

  const viewH = STEP * 5;

  if (items.length === 0) {
    return (
      <div className="nc" style={{ width: 360, padding: 32, textAlign: "center" }}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <p style={{ fontSize: 13, color: `rgba(var(--nc-ink),.35)`, margin: 0 }}>No notifications</p>
      </div>
    );
  }

  return (
    <div
      className="nc"
      style={{
        width: 360,
        background: "var(--nc-bg)",
        border: "1px solid var(--nc-border)",
        boxShadow: "var(--nc-shadow)",
        borderRadius: 14,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Header */}
      <div style={{
        padding: "12px 16px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 500,
          color: `rgba(var(--nc-ink),.35)`,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          Notifications
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 450,
          color: `rgba(var(--nc-ink),.3)`,
          fontVariantNumeric: "tabular-nums",
        }}>
          {safeIdx + 1} / {items.length}
        </span>
      </div>

      {/* Carousel viewport */}
      <div
        ref={containerRef}
        tabIndex={0}
        style={{
          position: "relative",
          height: viewH,
          width: "100%",
          outline: "none",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
        onPointerDown={(e) => {
          dragStartY.current = e.clientY;
          dragStartIdx.current = safeIdx;
        }}
        onPointerUp={(e) => {
          const dy = e.clientY - dragStartY.current;
          if (Math.abs(dy) > 20) {
            go(dragStartIdx.current + (dy < 0 ? 1 : -1));
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const offset = i - safeIdx;
            if (Math.abs(offset) > 3) return null;
            const isFocused = i === safeIdx;
            const dist = Math.abs(offset);
            const prox = Math.max(0, 1 - dist / 3);
            const titleA = 0.2 + prox * 0.68;
            const bodyA = 0.12 + prox * 0.28;

            return (
              <CarouselRow
                key={item.id}
                item={item}
                offset={offset}
                isFocused={isFocused}
                titleA={titleA}
                bodyA={bodyA}
                prox={prox}
                viewH={viewH}
                onDismiss={() => dismiss(item.id)}
                onSelect={() => onSelect?.(item.id)}
                sound={sound}
                soundRef={lastSound}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        padding: "8px 16px 12px",
      }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === safeIdx ? 16 : 4,
              height: 4,
              borderRadius: 2,
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: `rgba(var(--nc-ink),${i === safeIdx ? 0.4 : 0.12})`,
              transition: "width .25s cubic-bezier(.4,0,.2,1), background .2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Row sub-component ── */

function CarouselRow({
  item,
  offset,
  isFocused,
  titleA,
  bodyA,
  prox,
  viewH,
  onDismiss,
  onSelect,
  sound,
  soundRef,
}: {
  item: CarouselItem;
  offset: number;
  isFocused: boolean;
  titleA: number;
  bodyA: number;
  prox: number;
  viewH: number;
  onDismiss: () => void;
  onSelect: () => void;
  sound: boolean;
  soundRef: React.MutableRefObject<number>;
}) {
  const xRef = useRef(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const passedRef = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);

  const y = viewH / 2 - ROW_H / 2 + offset * STEP;
  const weight = Math.round(420 + prox * 120);

  const paintZone = useCallback((dx: number) => {
    const z = zoneRef.current;
    if (!z) return;
    const abs = Math.abs(dx);
    const t = Math.min(1, abs / (DISMISS_THRESHOLD * 1.5));
    if (dx < -10) {
      z.style.background = `rgba(255,59,48,${t * 0.15})`;
      z.style.opacity = "1";
    } else if (dx > 10) {
      z.style.background = `rgba(52,199,89,${t * 0.15})`;
      z.style.opacity = "1";
    } else {
      z.style.opacity = "0";
    }
  }, []);

  const onDown = useCallback((e: React.PointerEvent) => {
    if (!isFocused) return;
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    xRef.current = 0;
    dragging.current = true;
    passedRef.current = false;
  }, [isFocused]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !isFocused) return;
    const dx = e.clientX - startX.current;
    xRef.current = dx;
    const row = rowRef.current;
    if (row) row.style.transform = `translateX(${dx}px)`;
    paintZone(dx);
    if (!passedRef.current && Math.abs(dx) > DISMISS_THRESHOLD) {
      passedRef.current = true;
      if (sound) tick(soundRef);
    }
  }, [isFocused, paintZone, sound, soundRef]);

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = xRef.current;
    const row = rowRef.current;

    if (Math.abs(dx) > DISMISS_THRESHOLD) {
      // Dismiss
      const dir = Math.sign(dx);
      if (row) {
        animate(dx, dir * 400, {
          type: "spring", stiffness: 300, damping: 30,
          onUpdate: (v) => { row.style.transform = `translateX(${v}px)`; row.style.opacity = `${1 - Math.abs(v) / 400}`; },
          onComplete: onDismiss,
        });
      } else {
        onDismiss();
      }
    } else {
      // Snap back
      if (row) {
        animate(dx, 0, {
          type: "spring", stiffness: 500, damping: 30,
          onUpdate: (v) => { row.style.transform = `translateX(${v}px)`; },
        });
      }
      paintZone(0);
      if (Math.abs(dx) < 3) onSelect();
    }
  }, [onDismiss, onSelect, paintZone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: y + 20 }}
      animate={{ opacity: 1, y }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={SPRING}
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        height: ROW_H,
      }}
    >
      {/* Action zone behind */}
      <div
        ref={zoneRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          opacity: 0,
          transition: "background .06s",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        ref={rowRef}
        className={isFocused ? "nc-row" : undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onLostPointerCapture={onUp}
        style={{
          position: "relative",
          height: "100%",
          padding: "12px 14px",
          borderRadius: 10,
          background: isFocused ? "var(--nc-card-hi)" : "var(--nc-card)",
          border: `1px solid rgba(var(--nc-ink),${isFocused ? 0.06 : 0.03})`,
          boxShadow: isFocused ? "0 1px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.03)" : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          filter: `blur(${Math.max(0, (1 - prox) * 0.8)}px)`,
          transition: "background .15s, border .15s, box-shadow .15s, filter .15s",
          willChange: "transform",
          touchAction: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 13,
            fontWeight: weight,
            color: `rgba(var(--nc-ink),${titleA})`,
            letterSpacing: "-0.01em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
            transition: "color .1s",
          }}>
            {item.title}
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 400,
            color: `rgba(var(--nc-ink),${bodyA})`,
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}>
            {item.time}
          </span>
        </div>
        <span style={{
          fontSize: 12,
          fontWeight: 400,
          color: `rgba(var(--nc-ink),${bodyA})`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          transition: "color .1s",
        }}>
          {item.body}
        </span>

        {/* Swipe hint for focused */}
        {isFocused && (
          <div style={{
            position: "absolute",
            right: 14,
            bottom: 6,
            fontSize: 9,
            fontWeight: 400,
            color: `rgba(var(--nc-ink),.18)`,
            letterSpacing: "0.02em",
          }}>
            swipe to dismiss
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default NotificationsCarousel;
