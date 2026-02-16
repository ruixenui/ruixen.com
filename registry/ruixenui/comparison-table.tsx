"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Comparison Table — Rauno Freiberg craft.
 *
 * Glass container. Select up to 2 items for side-by-side comparison.
 * Category filter pills with spring-sliding indicator.
 * Comparison panel springs in from below. Winner values highlighted.
 * Audio tick on selection.
 */

/* ── Audio ── */

let _a: AudioContext | null = null;
let _b: AudioBuffer | null = null;
function getCtx(): AudioContext {
  if (!_a) _a = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  if (_a.state === "suspended") _a.resume();
  return _a;
}
function getBuf(ac: AudioContext): AudioBuffer {
  if (_b && _b.sampleRate === ac.sampleRate) return _b;
  const len = Math.floor(ac.sampleRate * 0.003);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 4;
  _b = buf; return buf;
}
function tick(ref: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - ref.current < 25) return;
  ref.current = now;
  try { const ac = getCtx(); const s = ac.createBufferSource(); const g = ac.createGain(); s.buffer = getBuf(ac); g.gain.value = 0.06; s.connect(g).connect(ac.destination); s.start(); } catch { /* silent */ }
}

/* ── Types ── */

export interface ComparisonItem {
  id: number;
  category: string;
  price: number;
  rating: number;
  stock: number;
}

interface ComparisonTableProps {
  data?: ComparisonItem[];
  categories?: string[];
  sound?: boolean;
}

/* ── Defaults ── */

const DEFAULTS: ComparisonItem[] = [
  { id: 1, category: "Laptop", price: 1200, rating: 4.5, stock: 20 },
  { id: 2, category: "Tablet", price: 600, rating: 4.1, stock: 35 },
  { id: 3, category: "Smartphone", price: 800, rating: 4.7, stock: 50 },
  { id: 4, category: "Monitor", price: 300, rating: 4.0, stock: 15 },
  { id: 5, category: "Laptop", price: 1500, rating: 4.8, stock: 10 },
  { id: 6, category: "Tablet", price: 550, rating: 4.2, stock: 28 },
];

const DEFAULT_CATS = ["All", "Laptop", "Tablet", "Smartphone", "Monitor"];

/* ── CSS ── */

const CSS = `.ct{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0;--t-ok:#34C759;--t-hi:rgba(0,0,0,.88);--t-sel:rgba(0,122,255,.08)}.dark .ct,[data-theme="dark"] .ct{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255;--t-ok:#30D158;--t-hi:rgba(255,255,255,.88);--t-sel:rgba(100,210,255,.08)}.ct-row{transition:background .1s}.ct-row:hover{background:rgba(var(--t-ink),.03)}`;

const TH: React.CSSProperties = {
  padding: "10px 16px", fontSize: 11, fontWeight: 520,
  color: "rgba(var(--t-ink),.4)", letterSpacing: "0.04em",
  textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap",
  borderBottom: "1px solid var(--t-border)",
};

const TD: React.CSSProperties = {
  padding: "10px 16px", fontSize: 13, fontWeight: 420,
  color: "rgba(var(--t-ink),.7)",
  borderBottom: "1px solid rgba(var(--t-ink),.03)", whiteSpace: "nowrap",
};

/* ── Component ── */

export function ComparisonTable({
  data = DEFAULTS,
  categories = DEFAULT_CATS,
  sound = true,
}: ComparisonTableProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const lastSound = useRef(0);

  const toggleSelect = useCallback((id: number) => {
    if (sound) tick(lastSound);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev,
    );
  }, [sound]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return data;
    return data.filter((d) => d.category === activeCategory);
  }, [data, activeCategory]);

  const compared = useMemo(() => data.filter((d) => selected.includes(d.id)), [data, selected]);

  const attrs: { key: keyof ComparisonItem; label: string; better: "higher" | "lower" }[] = [
    { key: "price", label: "Price", better: "lower" },
    { key: "rating", label: "Rating", better: "higher" },
    { key: "stock", label: "Stock", better: "higher" },
  ];

  return (
    <div className="ct" style={{
      width: "100%", maxWidth: 640,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px 0" }}>
        <span style={{ fontSize: 13, fontWeight: 560, color: "rgba(var(--t-ink),.85)", letterSpacing: "-0.01em" }}>
          Compare Products
        </span>
        {selected.length > 0 && (
          <button
            onClick={() => { setSelected([]); if (sound) tick(lastSound); }}
            style={{
              border: "none", background: "rgba(var(--t-ink),.04)", padding: "4px 10px",
              borderRadius: 6, fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.5)",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: 4, padding: "10px 16px", position: "relative" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); if (sound) tick(lastSound); }}
            style={{
              position: "relative", border: "none", background: "none", padding: "5px 12px",
              borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: "pointer", zIndex: 1,
              color: activeCategory === cat ? "var(--t-hi)" : "rgba(var(--t-ink),.4)",
              transition: "color .15s",
            }}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="ct-pill"
                style={{
                  position: "absolute", inset: 0, borderRadius: 6,
                  background: "rgba(var(--t-ink),.06)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{cat}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={TH}>Category</th>
            <th style={TH}>Price</th>
            <th style={TH}>Rating</th>
            <th style={TH}>Stock</th>
            <th style={{ ...TH, textAlign: "center", width: 60 }}>Select</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const isSel = selected.includes(item.id);
              return (
                <motion.tr
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="ct-row"
                  style={{ background: isSel ? "var(--t-sel)" : undefined, cursor: "pointer" }}
                  onClick={() => toggleSelect(item.id)}
                >
                  <td style={{ ...TD, fontWeight: 500, color: "rgba(var(--t-ink),.85)" }}>{item.category}</td>
                  <td style={{ ...TD, fontVariantNumeric: "tabular-nums" }}>${item.price.toLocaleString()}</td>
                  <td style={{ ...TD, fontVariantNumeric: "tabular-nums" }}>{item.rating}</td>
                  <td style={{ ...TD, fontVariantNumeric: "tabular-nums" }}>{item.stock}</td>
                  <td style={{ ...TD, textAlign: "center" }}>
                    <span style={{
                      display: "inline-flex", width: 18, height: 18, borderRadius: 5,
                      border: `1.5px solid rgba(var(--t-ink),${isSel ? ".5" : ".15"})`,
                      background: isSel ? "rgba(var(--t-ink),.08)" : "none",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      {isSel && (
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          <path d="M2 5L4 7L8 3" stroke="rgba(var(--t-ink),.6)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Comparison panel */}
      <AnimatePresence>
        {compared.length === 2 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: "1px solid var(--t-border)", padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 520, color: "rgba(var(--t-ink),.5)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Comparison
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.35)" }}>Attribute</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.5)" }}>{compared[0].category} #{compared[0].id}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.5)" }}>{compared[1].category} #{compared[1].id}</div>
                {attrs.map((attr) => {
                  const v0 = compared[0][attr.key] as number;
                  const v1 = compared[1][attr.key] as number;
                  const w0 = attr.better === "higher" ? v0 > v1 : v0 < v1;
                  const w1 = attr.better === "higher" ? v1 > v0 : v1 < v0;
                  return [
                    <div key={`${attr.key}-label`} style={{ fontSize: 12, color: "rgba(var(--t-ink),.5)" }}>{attr.label}</div>,
                    <motion.div
                      key={`${attr.key}-0`}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.05 }}
                      style={{
                        fontSize: 13, fontWeight: w0 ? 560 : 420,
                        color: w0 ? "var(--t-ok)" : "rgba(var(--t-ink),.5)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {attr.key === "price" ? `$${v0.toLocaleString()}` : v0}
                    </motion.div>,
                    <motion.div
                      key={`${attr.key}-1`}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.1 }}
                      style={{
                        fontSize: 13, fontWeight: w1 ? 560 : 420,
                        color: w1 ? "var(--t-ok)" : "rgba(var(--t-ink),.5)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {attr.key === "price" ? `$${v1.toLocaleString()}` : v1}
                    </motion.div>,
                  ];
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", padding: "10px 16px",
        borderTop: "1px solid var(--t-border)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {filtered.length} items
        </span>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {selected.length}/2 selected
        </span>
      </div>
    </div>
  );
}

export default ComparisonTable;
