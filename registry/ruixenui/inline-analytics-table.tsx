"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";

/**
 * Inline Analytics Table — Rauno Freiberg craft.
 *
 * Glass table with animated inline progress bars and trend arrows.
 * Progress bars spring-animate on mount. Trend arrows bounce in.
 * Row hover brightening. Audio tick on row click.
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

interface AnalyticsItem {
  id: string;
  region: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface InlineAnalyticsTableProps {
  data?: AnalyticsItem[];
  sound?: boolean;
}

/* ── Defaults ── */

const DEFAULTS: AnalyticsItem[] = [
  { id: "1", region: "North America", sales: 1200, revenue: 25000, growth: 12 },
  { id: "2", region: "Europe", sales: 900, revenue: 18000, growth: -5 },
  { id: "3", region: "Asia", sales: 1500, revenue: 30000, growth: 20 },
  { id: "4", region: "South America", sales: 600, revenue: 10000, growth: 8 },
  { id: "5", region: "Africa", sales: 400, revenue: 7000, growth: -3 },
];

/* ── CSS ── */

const CSS = `.iat{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0;--t-ok:#34C759;--t-err:#FF3B30;--t-bar:rgba(0,0,0,.06)}.dark .iat,[data-theme="dark"] .iat{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255;--t-ok:#30D158;--t-err:#FF453A;--t-bar:rgba(255,255,255,.06)}.iat-row{transition:background .1s}.iat-row:hover{background:rgba(var(--t-ink),.03)}`;

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

/* ── Helpers ── */

function maxVal(data: AnalyticsItem[], key: "sales" | "revenue") {
  return Math.max(...data.map((d) => d[key]));
}

/* ── Component ── */

export function InlineAnalyticsTable({
  data = DEFAULTS,
  sound = true,
}: InlineAnalyticsTableProps) {
  const lastSound = useRef(0);
  const [selected, setSelected] = useState<string | null>(null);
  const maxSales = maxVal(data, "sales");
  const maxRev = maxVal(data, "revenue");
  const totalRev = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="iat" style={{
      width: "100%", maxWidth: 680,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={TH}>Region</th>
            <th style={TH}>Sales</th>
            <th style={TH}>Revenue</th>
            <th style={TH}>Growth</th>
            <th style={{ ...TH, textAlign: "center", width: 48 }}>Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const isSelected = item.id === selected;
            return (
              <tr
                key={item.id}
                className="iat-row"
                onClick={() => { setSelected(isSelected ? null : item.id); if (sound) tick(lastSound); }}
                style={{
                  cursor: "pointer",
                  background: isSelected ? "rgba(var(--t-ink),.04)" : undefined,
                }}
              >
                <td style={{ ...TD, fontWeight: 500, color: "rgba(var(--t-ink),.85)" }}>{item.region}</td>
                <td style={TD}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 36 }}>{item.sales.toLocaleString()}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--t-bar)", overflow: "hidden", maxWidth: 80 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.sales / maxSales) * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
                        style={{ height: "100%", borderRadius: 2, background: "rgba(var(--t-ink),.2)" }}
                      />
                    </div>
                  </div>
                </td>
                <td style={TD}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 48 }}>${item.revenue.toLocaleString()}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--t-bar)", overflow: "hidden", maxWidth: 80 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.revenue / maxRev) * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.15 }}
                        style={{ height: "100%", borderRadius: 2, background: "rgba(var(--t-ink),.2)" }}
                      />
                    </div>
                  </div>
                </td>
                <td style={TD}>
                  <span style={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    color: item.growth >= 0 ? "var(--t-ok)" : "var(--t-err)",
                  }}>
                    {item.growth >= 0 ? "+" : ""}{item.growth}%
                  </span>
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      {item.growth >= 0 ? (
                        <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="var(--t-ok)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      ) : (
                        <path d="M7 3V11M7 11L3.5 7.5M7 11L10.5 7.5" stroke="var(--t-err)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                  </motion.div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ ...TD, borderBottom: "none", fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
              {data.length} regions
            </td>
            <td style={{ ...TD, borderBottom: "none", fontWeight: 520, color: "rgba(var(--t-ink),.65)", fontVariantNumeric: "tabular-nums" }}>
              ${totalRev.toLocaleString()}
            </td>
            <td colSpan={2} style={{ ...TD, borderBottom: "none" }} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default InlineAnalyticsTable;
