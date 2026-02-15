"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

/* ── sound ─────────────────────────────────────────────── */
let _a: AudioContext, _b: AudioBuffer;
const tick = () => {
  if (typeof window === "undefined") return;
  if (!_a) {
    _a = new AudioContext();
    _b = _a.createBuffer(1, (_a.sampleRate * 0.003) | 0, _a.sampleRate);
    const d = _b.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 4;
  }
  const s = _a.createBufferSource();
  s.buffer = _b;
  const g = _a.createGain();
  g.gain.value = 0.08;
  s.connect(g).connect(_a.destination);
  s.start();
};

/* ── theme ─────────────────────────────────────────────── */
const GC_CSS = `
.gc{
  --gc-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --gc-border:rgba(0,0,0,0.06);
  --gc-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --gc-dim:rgba(0,0,0,0.35);
  --gc-mid:rgba(0,0,0,0.5);
  --gc-hi:rgba(0,0,0,0.88);
  --gc-divider:rgba(255,255,255,0.92);
  --gc-divider-border:rgba(0,0,0,0.12);
  --gc-divider-shadow:0 0 12px rgba(0,0,0,0.08),0 2px 6px rgba(0,0,0,0.06);
  --gc-knob:rgba(255,255,255,0.95);
  --gc-knob-border:rgba(0,0,0,0.1);
  --gc-knob-shadow:0 1px 8px rgba(0,0,0,0.1),0 2px 4px rgba(0,0,0,0.06);
  --gc-label:rgba(255,255,255,0.82);
  --gc-label-border:rgba(0,0,0,0.06);
  --gc-label-shadow:0 1px 6px rgba(0,0,0,0.05);
  --gc-canvas:rgba(0,0,0,0.03);
  --gc-drop-bg:rgba(0,0,0,0.02);
  --gc-drop-border:rgba(0,0,0,0.1)
}
.dark .gc,[data-theme="dark"] .gc{
  --gc-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --gc-border:rgba(255,255,255,0.07);
  --gc-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --gc-dim:rgba(255,255,255,0.28);
  --gc-mid:rgba(255,255,255,0.5);
  --gc-hi:rgba(255,255,255,0.88);
  --gc-divider:rgba(255,255,255,0.12);
  --gc-divider-border:rgba(255,255,255,0.15);
  --gc-divider-shadow:0 0 12px rgba(0,0,0,0.2),0 2px 6px rgba(0,0,0,0.15);
  --gc-knob:rgba(255,255,255,0.12);
  --gc-knob-border:rgba(255,255,255,0.18);
  --gc-knob-shadow:0 1px 8px rgba(0,0,0,0.15),0 2px 4px rgba(0,0,0,0.1);
  --gc-label:rgba(255,255,255,0.08);
  --gc-label-border:rgba(255,255,255,0.06);
  --gc-label-shadow:0 1px 6px rgba(0,0,0,0.12);
  --gc-canvas:rgba(0,0,0,0.2);
  --gc-drop-bg:rgba(255,255,255,0.02);
  --gc-drop-border:rgba(255,255,255,0.1)
}`;

const C = {
  glass: "var(--gc-glass)",
  border: "var(--gc-border)",
  shadow: "var(--gc-shadow)",
  dim: "var(--gc-dim)",
  mid: "var(--gc-mid)",
  hi: "var(--gc-hi)",
  divider: "var(--gc-divider)",
  dividerBorder: "var(--gc-divider-border)",
  dividerShadow: "var(--gc-divider-shadow)",
  knob: "var(--gc-knob)",
  knobBorder: "var(--gc-knob-border)",
  knobShadow: "var(--gc-knob-shadow)",
  label: "var(--gc-label)",
  labelBorder: "var(--gc-label-border)",
  labelShadow: "var(--gc-label-shadow)",
  canvas: "var(--gc-canvas)",
  dropBg: "var(--gc-drop-bg)",
  dropBorder: "var(--gc-drop-border)",
};

/* ── types ─────────────────────────────────────────────── */
interface GlassImageCompareProps {
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  sound?: boolean;
  style?: React.CSSProperties;
  onPositionChange?: (position: number) => void;
}

/* ═══════════════════════════════════════════════════════════
   GlassImageCompare — before/after slider
   ═══════════════════════════════════════════════════════════ */
function GlassImageCompare({
  before: beforeProp,
  after: afterProp,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  sound = true,
  style,
  onPositionChange,
}: GlassImageCompareProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [beforeSrc, setBeforeSrc] = React.useState(beforeProp ?? "");
  const [afterSrc, setAfterSrc] = React.useState(afterProp ?? "");
  const [dragging, setDragging] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const position = useMotionValue(initialPosition);
  const clipRight = useTransform(position, (p) => `inset(0 0 0 ${p}%)`);
  const clipLeft = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`);
  const dividerX = useTransform(position, (p) => `${p}%`);

  React.useEffect(() => {
    if (beforeProp !== undefined) setBeforeSrc(beforeProp);
  }, [beforeProp]);

  React.useEffect(() => {
    if (afterProp !== undefined) setAfterSrc(afterProp);
  }, [afterProp]);

  const updatePosition = React.useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(2, Math.min(98, pct));
      position.set(clamped);
      onPositionChange?.(clamped);
    },
    [position, onPositionChange],
  );

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
      if (sound) tick();
    },
    [sound, updatePosition],
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    },
    [dragging, updatePosition],
  );

  const handlePointerUp = React.useCallback(() => {
    setDragging(false);
  }, []);

  /* drop handler for each side */
  const handleDrop = React.useCallback(
    (side: "before" | "after") => (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file?.type.startsWith("image/")) return;
      const r = new FileReader();
      r.onload = () => {
        const url = r.result as string;
        if (side === "before") setBeforeSrc(url);
        else setAfterSrc(url);
        if (sound) tick();
      };
      r.readAsDataURL(file);
    },
    [sound],
  );

  /* double-click to reset to center */
  const handleDoubleClick = React.useCallback(() => {
    animate(position, 50, { type: "spring", stiffness: 300, damping: 30 });
    onPositionChange?.(50);
    if (sound) tick();
  }, [position, sound, onPositionChange]);

  const hasImages = beforeSrc && afterSrc;

  return (
    <>
      <style>{GC_CSS}</style>
      <motion.div
        className="gc"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          ...style,
        }}
      >
        {/* ── comparison viewport ─────────────────── */}
        <div
          ref={containerRef}
          onPointerDown={hasImages ? handlePointerDown : undefined}
          onPointerMove={hasImages ? handlePointerMove : undefined}
          onPointerUp={hasImages ? handlePointerUp : undefined}
          onDoubleClick={hasImages ? handleDoubleClick : undefined}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            borderRadius: 14,
            background: C.canvas,
            border: `1px solid ${C.border}`,
            boxShadow: C.shadow,
            overflow: "hidden",
            height: hasImages ? 320 : 200,
            cursor: hasImages
              ? dragging
                ? "grabbing"
                : "ew-resize"
              : "default",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {!hasImages ? (
            /* ── empty state: drop zones ─────────── */
            <div
              style={{
                display: "flex",
                height: "100%",
                gap: 1,
              }}
            >
              <DropSide
                label={beforeLabel}
                onDrop={handleDrop("before")}
                hasSrc={!!beforeSrc}
              />
              <div
                style={{
                  width: 1,
                  background: C.border,
                  flexShrink: 0,
                }}
              />
              <DropSide
                label={afterLabel}
                onDrop={handleDrop("after")}
                hasSrc={!!afterSrc}
              />
            </div>
          ) : (
            <>
              {/* before image (full, bottom layer) */}
              <motion.img
                src={beforeSrc}
                alt={beforeLabel}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  clipPath: clipLeft,
                }}
              />

              {/* after image (clipped, top layer) */}
              <motion.img
                src={afterSrc}
                alt={afterLabel}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  clipPath: clipRight,
                }}
              />

              {/* ── divider line ──────────────── */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: dividerX,
                  width: 2,
                  marginLeft: -1,
                  background: C.divider,
                  boxShadow: C.dividerShadow,
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              {/* ── knob ─────────────────────── */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: dividerX,
                  translateX: "-50%",
                  translateY: "-50%",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  animate={{
                    scale: dragging ? 1.15 : hovered ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: C.knob,
                    border: `1.5px solid ${C.knobBorder}`,
                    boxShadow: C.knobShadow,
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  {/* left arrow */}
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: C.hi }}
                  >
                    <polyline points="6,1 1,6 6,11" />
                  </svg>
                  {/* right arrow */}
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: C.hi }}
                  >
                    <polyline points="2,1 7,6 2,11" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* ── labels ────────────────────── */}
              <Label
                text={beforeLabel}
                side="left"
                visible={hovered || dragging}
              />
              <Label
                text={afterLabel}
                side="right"
                visible={hovered || dragging}
              />
            </>
          )}
        </div>

        {/* ── info bar ───────────────────────────── */}
        {hasImages && (
          <InfoBar
            position={position}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        )}
      </motion.div>
    </>
  );
}

/* ── drop side (empty state) ────────────────────────── */
function DropSide({
  label,
  onDrop,
  hasSrc,
}: {
  label: string;
  onDrop: (e: React.DragEvent) => void;
  hasSrc: boolean;
}) {
  const [over, setOver] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = React.useCallback(
    (files: FileList) => {
      const file = files[0];
      if (!file?.type.startsWith("image/")) return;
      // Simulate a drop event via the onDrop callback
      const fakeEvent = {
        preventDefault: () => {},
        dataTransfer: { files },
      } as unknown as React.DragEvent;
      onDrop(fakeEvent);
    },
    [onDrop],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        setOver(false);
        onDrop(e);
      }}
      onClick={() => ref.current?.click()}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: "pointer",
        background: over ? C.dropBg : "transparent",
        transition: "background 150ms",
        borderRadius: 4,
      }}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.length) handleFileSelect(e.target.files);
          e.target.value = "";
        }}
        style={{ display: "none" }}
      />
      <div style={{ color: C.dim }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: hasSrc ? C.mid : C.dim,
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 11, color: C.dim }}>Drop or click</div>
    </div>
  );
}

/* ── floating label ─────────────────────────────────── */
function Label({
  text,
  side,
  visible,
}: {
  text: string;
  side: "left" | "right";
  visible: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 4 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "absolute",
        bottom: 12,
        ...(side === "left" ? { left: 12 } : { right: 12 }),
        background: C.label,
        border: `1px solid ${C.labelBorder}`,
        borderRadius: 8,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 600,
        color: C.hi,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: C.labelShadow,
        letterSpacing: 0.3,
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      {text}
    </motion.div>
  );
}

/* ── info bar ───────────────────────────────────────── */
function InfoBar({
  position,
  beforeLabel,
  afterLabel,
}: {
  position: ReturnType<typeof useMotionValue<number>>;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pct, setPct] = React.useState(50);

  React.useEffect(() => {
    const unsub = position.on("change", (v) => setPct(Math.round(v)));
    return unsub;
  }, [position]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: C.glass,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "8px 14px",
        boxShadow: C.shadow,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 500, color: C.mid }}>
        {beforeLabel}
      </span>

      {/* mini bar */}
      <div
        style={{
          flex: 1,
          maxWidth: 160,
          height: 3,
          borderRadius: 2,
          background: C.border,
          margin: "0 14px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${pct}%`,
            borderRadius: 2,
            background: C.mid,
            transition: "width 60ms linear",
          }}
        />
      </div>

      <span style={{ fontSize: 12, fontWeight: 500, color: C.mid }}>
        {afterLabel}
      </span>

      <div
        style={{
          marginLeft: 12,
          fontSize: 11,
          fontWeight: 600,
          color: C.hi,
          fontVariantNumeric: "tabular-nums",
          minWidth: 36,
          textAlign: "right",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}

export { GlassImageCompare };
export type { GlassImageCompareProps };
