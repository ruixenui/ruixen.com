"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

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
/*  Light: frosted-white panels, soft outer shadows         */
/*  Dark : white-tint glass, inner glow                     */
const IMG_CSS = `
.gi{
  --gi-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --gi-border:rgba(0,0,0,0.06);
  --gi-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --gi-dim:rgba(0,0,0,0.35);
  --gi-mid:rgba(0,0,0,0.5);
  --gi-hi:rgba(0,0,0,0.88);
  --gi-bar:rgba(255,255,255,0.85);
  --gi-bar-border:rgba(0,0,0,0.08);
  --gi-bar-shadow:0 2px 12px rgba(0,0,0,0.06);
  --gi-active:rgba(0,0,0,0.06);
  --gi-canvas:rgba(0,0,0,0.03)
}
.dark .gi,[data-theme="dark"] .gi{
  --gi-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --gi-border:rgba(255,255,255,0.07);
  --gi-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --gi-dim:rgba(255,255,255,0.28);
  --gi-mid:rgba(255,255,255,0.5);
  --gi-hi:rgba(255,255,255,0.88);
  --gi-bar:rgba(255,255,255,0.08);
  --gi-bar-border:rgba(255,255,255,0.06);
  --gi-bar-shadow:0 2px 12px rgba(0,0,0,0.15);
  --gi-active:rgba(255,255,255,0.08);
  --gi-canvas:rgba(0,0,0,0.2)
}`;

const I = {
  glass: "var(--gi-glass)",
  border: "var(--gi-border)",
  shadow: "var(--gi-shadow)",
  dim: "var(--gi-dim)",
  mid: "var(--gi-mid)",
  hi: "var(--gi-hi)",
  bar: "var(--gi-bar)",
  barBorder: "var(--gi-bar-border)",
  barShadow: "var(--gi-bar-shadow)",
  active: "var(--gi-active)",
  canvas: "var(--gi-canvas)",
};

/* ── context ───────────────────────────────────────────── */
interface State {
  images: string[];
  active: number;
  zoom: number;
  rotation: number;
  pan: { x: number; y: number };
}

interface Ctx extends State {
  add: (files: FileList | File[]) => void;
  remove: (i: number) => void;
  select: (i: number) => void;
  setZoom: (z: number) => void;
  rotate: () => void;
  setPan: (p: { x: number; y: number }) => void;
  sound: boolean;
}

const RESET = { zoom: 1, rotation: 0, pan: { x: 0, y: 0 } };
const Cx = React.createContext<Ctx>(null!);

/* ═══════════════════════════════════════════════════════════
   ImageEditor — wrapper + state provider
   ═══════════════════════════════════════════════════════════ */
interface ImageEditorProps {
  children: React.ReactNode;
  sound?: boolean;
  style?: React.CSSProperties;
  onChange?: (images: string[]) => void;
}

function ImageEditor({
  children,
  sound = true,
  style,
  onChange,
}: ImageEditorProps) {
  const [s, set] = React.useState<State>({
    images: [],
    active: 0,
    ...RESET,
  });

  const add = React.useCallback(
    (files: FileList | File[]) => {
      const valid = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (!valid.length) return;
      Promise.all(
        valid.map(
          (f) =>
            new Promise<string>((res) => {
              const r = new FileReader();
              r.onload = () => res(r.result as string);
              r.readAsDataURL(f);
            }),
        ),
      ).then((urls) => {
        set((p) => {
          const next = [...p.images, ...urls];
          onChange?.(next);
          return {
            images: next,
            active: p.images.length === 0 ? 0 : p.active,
            ...RESET,
          };
        });
        if (sound) tick();
      });
    },
    [sound, onChange],
  );

  const remove = React.useCallback(
    (i: number) => {
      set((p) => {
        const next = p.images.filter((_, idx) => idx !== i);
        onChange?.(next);
        return {
          images: next,
          active: Math.min(p.active, Math.max(0, next.length - 1)),
          ...RESET,
        };
      });
      if (sound) tick();
    },
    [sound, onChange],
  );

  const select = React.useCallback(
    (i: number) => {
      set((p) => ({ ...p, active: i, ...RESET }));
      if (sound) tick();
    },
    [sound],
  );

  const setZoom = React.useCallback((z: number) => {
    set((p) => {
      const clamped = Math.max(1, Math.min(5, z));
      return {
        ...p,
        zoom: clamped,
        pan: clamped <= 1 ? { x: 0, y: 0 } : p.pan,
      };
    });
  }, []);

  const rotate = React.useCallback(() => {
    set((p) => ({ ...p, rotation: p.rotation + 90 }));
    if (sound) tick();
  }, [sound]);

  const setPan = React.useCallback((pan: { x: number; y: number }) => {
    set((p) => ({ ...p, pan }));
  }, []);

  return (
    <Cx.Provider
      value={{ ...s, add, remove, select, setZoom, rotate, setPan, sound }}
    >
      <style>{IMG_CSS}</style>
      <motion.div
        className="gi"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          ...style,
        }}
      >
        {children}
      </motion.div>
    </Cx.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════
   ImageDropZone — glass upload area
   ═══════════════════════════════════════════════════════════ */
interface ImageDropZoneProps {
  accept?: string;
  multiple?: boolean;
}

function ImageDropZone({
  accept = "image/*",
  multiple = true,
}: ImageDropZoneProps) {
  const { add, images } = React.useContext(Cx);
  const ref = React.useRef<HTMLInputElement>(null);
  const [over, setOver] = React.useState(false);

  if (images.length > 0) return null;

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (e.dataTransfer.files.length) add(e.dataTransfer.files);
      }}
      onClick={() => ref.current?.click()}
      whileTap={{ scale: 0.985 }}
      style={{
        borderRadius: 14,
        background: I.glass,
        border: `1px solid ${over ? I.mid : I.border}`,
        boxShadow: I.shadow,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "52px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        transition: "border-color 150ms",
      }}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          if (e.target.files?.length) add(e.target.files);
          e.target.value = "";
        }}
        style={{ display: "none" }}
      />
      <div style={{ color: I.dim }}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div style={{ fontSize: 14, color: I.mid, fontWeight: 500 }}>
        Drop image here
      </div>
      <div style={{ fontSize: 12, color: I.dim }}>or click to browse</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ImageCanvas — main image view (zoom · pan · rotate)
   ═══════════════════════════════════════════════════════════ */
function ImageCanvas() {
  const { images, active, zoom, rotation, pan, setZoom, setPan } =
    React.useContext(Cx);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);
  const origin = React.useRef({ x: 0, y: 0 });
  const panOrigin = React.useRef({ x: 0, y: 0 });
  const zoomRef = React.useRef(zoom);
  zoomRef.current = zoom;

  /* wheel → zoom (non-passive so we can preventDefault) */
  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const h = (e: WheelEvent) => {
      e.preventDefault();
      const next = zoomRef.current + -e.deltaY * 0.003;
      setZoom(next);
    };
    el.addEventListener("wheel", h, { passive: false });
    return () => el.removeEventListener("wheel", h);
  }, [setZoom]);

  const src = images[active];
  if (!src) return null;

  return (
    <div
      ref={boxRef}
      onPointerDown={(e) => {
        if (zoom <= 1) return;
        dragging.current = true;
        origin.current = { x: e.clientX, y: e.clientY };
        panOrigin.current = { ...pan };
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        setPan({
          x: panOrigin.current.x + (e.clientX - origin.current.x),
          y: panOrigin.current.y + (e.clientY - origin.current.y),
        });
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      style={{
        borderRadius: 14,
        background: I.canvas,
        border: `1px solid ${I.border}`,
        boxShadow: I.shadow,
        overflow: "hidden",
        position: "relative",
        height: 280,
        cursor: zoom > 1 ? "grab" : "default",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <AnimatePresence>
        <motion.img
          key={active}
          src={src}
          alt=""
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transformOrigin: "center",
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
            transition: dragging.current ? "none" : "transform 200ms ease",
          }}
        />
      </AnimatePresence>

      {/* zoom badge */}
      <AnimatePresence>
        {zoom > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              background: I.bar,
              border: `1px solid ${I.barBorder}`,
              borderRadius: 8,
              padding: "3px 9px",
              fontSize: 11,
              fontWeight: 500,
              color: I.hi,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: I.barShadow,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(zoom * 100)}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ImageStrip — thumbnail row
   ═══════════════════════════════════════════════════════════ */
interface ImageStripProps {
  showAdd?: boolean;
  accept?: string;
}

function ImageStrip({ showAdd = true, accept = "image/*" }: ImageStripProps) {
  const { images, active, select, add } = React.useContext(Cx);
  const ref = React.useRef<HTMLInputElement>(null);

  if (!images.length) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        padding: "2px 0",
      }}
    >
      {images.map((src, i) => (
        <motion.button
          key={i}
          type="button"
          onClick={() => select(i)}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            overflow: "hidden",
            border:
              i === active ? `2px solid ${I.hi}` : `1px solid ${I.border}`,
            opacity: i === active ? 1 : 0.55,
            cursor: "pointer",
            padding: 0,
            background: I.canvas,
            flexShrink: 0,
            transition: "opacity 150ms, border-color 150ms",
          }}
        >
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.button>
      ))}

      {showAdd && (
        <>
          <motion.button
            type="button"
            onClick={() => ref.current?.click()}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              border: `1px dashed ${I.border}`,
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: I.dim,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.button>
          <input
            ref={ref}
            type="file"
            accept={accept}
            multiple
            onChange={(e) => {
              if (e.target.files?.length) add(e.target.files);
              e.target.value = "";
            }}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ImageBar — glass toolbar
   ═══════════════════════════════════════════════════════════ */
function ImageBar() {
  const ctx = React.useContext(Cx);

  if (!ctx.images.length) return null;

  const btns: {
    label: string;
    icon: React.ReactNode;
    fn: () => void;
    off?: boolean;
  }[] = [
    {
      label: "Rotate",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      ),
      fn: ctx.rotate,
    },
    {
      label: "Zoom out",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      ),
      fn: () => ctx.setZoom(ctx.zoom - 0.25),
      off: ctx.zoom <= 1,
    },
    {
      label: "Zoom in",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      ),
      fn: () => ctx.setZoom(ctx.zoom + 0.25),
      off: ctx.zoom >= 5,
    },
    {
      label: "Remove",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      ),
      fn: () => ctx.remove(ctx.active),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        background: I.bar,
        border: `1px solid ${I.barBorder}`,
        borderRadius: 12,
        padding: 4,
        boxShadow: I.barShadow,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {btns.map((b) => (
        <Btn key={b.label} {...b} />
      ))}
    </div>
  );
}

/* ── toolbar button ───────────────────────────────────── */
function Btn({
  label,
  icon,
  fn,
  off,
}: {
  label: string;
  icon: React.ReactNode;
  fn: () => void;
  off?: boolean;
}) {
  const [h, setH] = React.useState(false);

  return (
    <motion.button
      type="button"
      title={label}
      aria-label={label}
      onClick={fn}
      disabled={off}
      whileTap={{ scale: off ? 1 : 0.9 }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 36,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        border: "none",
        background: h && !off ? I.active : "transparent",
        color: off ? I.dim : I.hi,
        cursor: off ? "default" : "pointer",
        opacity: off ? 0.4 : 1,
        transition: "background 120ms, opacity 120ms",
        padding: 0,
      }}
    >
      {icon}
    </motion.button>
  );
}

/* ── exports ─────────────────────────────────────────── */
export { ImageEditor, ImageDropZone, ImageCanvas, ImageStrip, ImageBar };
export type { ImageEditorProps, ImageDropZoneProps, ImageStripProps };
