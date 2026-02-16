"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

/**
 * Minimisable Table — Rauno Freiberg craft.
 *
 * Columns can be minimized to icon-only width with spring animation.
 * Glass container. Manage columns via header button.
 * Audio tick on toggle. Smooth width transitions.
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

interface ColDef<T> {
  key: string;
  label: string;
  icon: string; // SVG path d
  render?: (item: T) => React.ReactNode;
}

interface MinimisableTableProps<T extends Record<string, unknown>> {
  data?: T[];
  columns?: ColDef<T>[];
  defaultMinimized?: string[];
  sound?: boolean;
}

/* ── Defaults ── */

type UserRow = { id: string; name: string; email: string; location: string; status: string; balance: number };

const DEFAULTS: UserRow[] = [
  { id: "1", name: "Olivia Martin", email: "olivia@example.com", location: "New York", status: "Active", balance: 1200 },
  { id: "2", name: "Jackson Lee", email: "jackson@example.com", location: "London", status: "Active", balance: 850 },
  { id: "3", name: "Isabella Nguyen", email: "isabella@example.com", location: "Paris", status: "Inactive", balance: 320 },
];

// SVG icon paths (16x16 viewBox)
const ICONS = {
  user: "M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z",
  mail: "M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm0 1l6 4 6-4",
  pin: "M8 1a5 5 0 015 5c0 3.5-5 8-5 8S3 9.5 3 6a5 5 0 015-5zm0 3a2 2 0 100 4 2 2 0 000-4z",
  shield: "M8 1l6 2v4c0 3.31-2.55 6.4-6 7.5C4.55 13.4 2 10.31 2 7V3l6-2z",
  dollar: "M8 1v14M5 4h4.5a2.5 2.5 0 010 5H5m0 0h5.5a2.5 2.5 0 010 5H5",
};

const DEFAULT_COLS: ColDef<UserRow>[] = [
  { key: "name", label: "Name", icon: ICONS.user },
  { key: "email", label: "Email", icon: ICONS.mail },
  { key: "location", label: "Location", icon: ICONS.pin },
  { key: "status", label: "Status", icon: ICONS.shield },
  { key: "balance", label: "Balance", icon: ICONS.dollar, render: (item) => `$${item.balance.toLocaleString()}` },
];

/* ── CSS ── */

const CSS = `.mt{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0}.dark .mt,[data-theme="dark"] .mt{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255}.mt-row{transition:background .1s}.mt-row:hover{background:rgba(var(--t-ink),.03)}`;

const TH: React.CSSProperties = {
  padding: "10px 12px", fontSize: 11, fontWeight: 520,
  color: "rgba(var(--t-ink),.4)", letterSpacing: "0.04em",
  textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap",
  borderBottom: "1px solid var(--t-border)", cursor: "pointer",
  transition: "padding .25s, width .25s",
};

const TD: React.CSSProperties = {
  padding: "10px 12px", fontSize: 13, fontWeight: 420,
  color: "rgba(var(--t-ink),.7)",
  borderBottom: "1px solid rgba(var(--t-ink),.03)", whiteSpace: "nowrap",
  overflow: "hidden", textOverflow: "ellipsis",
  transition: "padding .25s, width .25s, max-width .25s",
};

/* ── Component ── */

export function MinimisableTable<T extends Record<string, unknown>>({
  data = DEFAULTS as unknown as T[],
  columns = DEFAULT_COLS as unknown as ColDef<T>[],
  defaultMinimized = [],
  sound = true,
}: MinimisableTableProps<T>) {
  const [minimized, setMinimized] = useState<Set<string>>(new Set(defaultMinimized));
  const [showMenu, setShowMenu] = useState(false);
  const lastSound = useRef(0);

  const toggle = useCallback((key: string) => {
    if (sound) tick(lastSound);
    setMinimized((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, [sound]);

  return (
    <div className="mt" style={{
      width: "100%", maxWidth: 700,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px" }}>
        <span style={{ fontSize: 13, fontWeight: 560, color: "rgba(var(--t-ink),.85)", letterSpacing: "-0.01em" }}>
          Team
        </span>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              border: "none", background: "rgba(var(--t-ink),.04)", padding: "5px 10px",
              borderRadius: 6, fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.5)",
              cursor: "pointer", transition: "background .12s",
            }}
          >
            Columns
          </button>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                position: "absolute", right: 0, top: "calc(100% + 4px)", zIndex: 10,
                background: "var(--t-bg)", border: "1px solid var(--t-border)",
                boxShadow: "var(--t-shadow)", borderRadius: 10, padding: "6px 0",
                minWidth: 140, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {columns.map((col) => (
                <button
                  key={col.key}
                  onClick={() => toggle(col.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, width: "100%",
                    padding: "6px 12px", border: "none", background: "none",
                    cursor: "pointer", fontSize: 12, fontWeight: 450,
                    color: minimized.has(col.key) ? "rgba(var(--t-ink),.35)" : "rgba(var(--t-ink),.7)",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    width: 14, height: 14, borderRadius: 4,
                    border: `1.5px solid rgba(var(--t-ink),${minimized.has(col.key) ? ".12" : ".3"})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: "rgba(var(--t-ink),.5)",
                  }}>
                    {!minimized.has(col.key) && (
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
                    )}
                  </span>
                  {col.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Click-away */}
      {showMenu && <div onClick={() => setShowMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 5 }} />}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isMin = minimized.has(col.key);
              return (
                <th
                  key={col.key}
                  onClick={() => toggle(col.key)}
                  title={isMin ? `Expand ${col.label}` : `Minimize ${col.label}`}
                  style={{
                    ...TH,
                    width: isMin ? 44 : "auto",
                    maxWidth: isMin ? 44 : undefined,
                    textAlign: isMin ? "center" : "left",
                    padding: isMin ? "10px 6px" : TH.padding,
                  }}
                >
                  {isMin ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.35 }}>
                      <path d={col.icon} stroke="rgba(var(--t-ink),.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    </svg>
                  ) : col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {(data as (T & Record<string, unknown>)[]).map((item, i) => (
            <tr key={String(item.id ?? i)} className="mt-row">
              {columns.map((col) => {
                const isMin = minimized.has(col.key);
                const val = col.render ? col.render(item) : String(item[col.key] ?? "");
                return (
                  <td
                    key={col.key}
                    style={{
                      ...TD,
                      width: isMin ? 44 : "auto",
                      maxWidth: isMin ? 44 : 200,
                      textAlign: isMin ? "center" : "left",
                      padding: isMin ? "10px 6px" : TD.padding,
                      fontWeight: col.key === "name" ? 500 : TD.fontWeight,
                      color: col.key === "name" ? "rgba(var(--t-ink),.85)" : TD.color,
                    }}
                  >
                    {isMin ? (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.2 }}>
                        <path d={col.icon} stroke="rgba(var(--t-ink),.4)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </svg>
                    ) : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MinimisableTable;
