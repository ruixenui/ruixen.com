"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Flexi Filter Table — Rauno Freiberg craft.
 *
 * Glass table with multi-filter bar: search, status pills, location dropdown,
 * balance range. Row selection via custom checkboxes. Filtered rows
 * spring in/out. Status dots. Audio tick on filter changes.
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

export interface FlexiRow {
  id: number;
  name: string;
  email: string;
  location: string;
  status: string;
  balance: number;
}

interface FlexiFilterTableProps {
  data?: FlexiRow[];
  statuses?: string[];
  locations?: string[];
  sound?: boolean;
}

/* ── Defaults ── */

const DEFAULTS: FlexiRow[] = [
  { id: 1, name: "Alex Thompson", email: "alex.t@company.com", location: "San Francisco", status: "Active", balance: 1250 },
  { id: 2, name: "Sarah Chen", email: "sarah.c@company.com", location: "Singapore", status: "Active", balance: 600 },
  { id: 3, name: "James Wilson", email: "j.wilson@company.com", location: "London", status: "Inactive", balance: 650 },
  { id: 4, name: "Maria Garcia", email: "m.garcia@company.com", location: "Madrid", status: "Active", balance: 0 },
  { id: 5, name: "David Kim", email: "d.kim@company.com", location: "Seoul", status: "Active", balance: -1000 },
];

const DEFAULT_STATUSES = ["Active", "Inactive"];
const DEFAULT_LOCATIONS = ["San Francisco", "Singapore", "London", "Madrid", "Seoul"];

/* ── CSS ── */

const CSS = `.fft{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0;--t-ok:#34C759;--t-dim:#FF3B30}.dark .fft,[data-theme="dark"] .fft{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255;--t-ok:#30D158;--t-dim:#FF453A}.fft-row{transition:background .1s}.fft-row:hover{background:rgba(var(--t-ink),.03)}.fft-inp{background:rgba(var(--t-ink),.03);border:1px solid rgba(var(--t-ink),.08);border-radius:8px;padding:7px 12px;font-size:12px;font-weight:420;color:rgba(var(--t-ink),.8);outline:none;transition:border-color .15s}.fft-inp:focus{border-color:rgba(var(--t-ink),.2)}.fft-inp::placeholder{color:rgba(var(--t-ink),.25)}`;

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

export function FlexiFilterTable({
  data = DEFAULTS,
  statuses = DEFAULT_STATUSES,
  locations = DEFAULT_LOCATIONS,
  sound = true,
}: FlexiFilterTableProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [locOpen, setLocOpen] = useState(false);
  const [activeLoc, setActiveLoc] = useState("All");
  const [minBal, setMinBal] = useState("");
  const [maxBal, setMaxBal] = useState("");
  const lastSound = useRef(0);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      if (activeStatus !== "All" && item.status !== activeStatus) return false;
      if (activeLoc !== "All" && item.location !== activeLoc) return false;
      if (search && !`${item.name} ${item.email}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (minBal && item.balance < Number(minBal)) return false;
      if (maxBal && item.balance > Number(maxBal)) return false;
      return true;
    });
  }, [data, search, activeStatus, activeLoc, minBal, maxBal]);

  const toggleRow = useCallback((id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => prev.size === filtered.length ? new Set() : new Set(filtered.map((r) => r.id)));
  }, [filtered]);

  const totalBal = filtered.reduce((s, r) => s + r.balance, 0);
  const statusColors: Record<string, string> = { Active: "var(--t-ok)", Inactive: "var(--t-dim)" };

  return (
    <div className="fft" style={{
      width: "100%", maxWidth: 780,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Header */}
      <div style={{ padding: "12px 16px 0", fontSize: 13, fontWeight: 560, color: "rgba(var(--t-ink),.85)", letterSpacing: "-0.01em" }}>
        Team
      </div>

      {/* Filters */}
      <div style={{ padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        {/* Search */}
        <input
          className="fft-inp"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 180 }}
        />

        {/* Status pills */}
        <div style={{ display: "flex", gap: 3, position: "relative" }}>
          {["All", ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => { setActiveStatus(s); if (sound) tick(lastSound); }}
              style={{
                position: "relative", border: "none", background: "none",
                padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500,
                cursor: "pointer", zIndex: 1,
                color: activeStatus === s ? "rgba(var(--t-ink),.85)" : "rgba(var(--t-ink),.35)",
                transition: "color .15s",
              }}
            >
              {activeStatus === s && (
                <motion.div
                  layoutId="fft-status"
                  style={{ position: "absolute", inset: 0, borderRadius: 6, background: "rgba(var(--t-ink),.06)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>{s}</span>
            </button>
          ))}
        </div>

        {/* Location dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setLocOpen(!locOpen)}
            style={{
              border: "1px solid rgba(var(--t-ink),.08)", background: "rgba(var(--t-ink),.03)",
              padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500,
              color: activeLoc === "All" ? "rgba(var(--t-ink),.4)" : "rgba(var(--t-ink),.7)",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
            }}
          >
            {activeLoc === "All" ? "Location" : activeLoc}
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
          </button>
          <AnimatePresence>
            {locOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  position: "absolute", left: 0, top: "calc(100% + 4px)", zIndex: 20,
                  background: "var(--t-bg)", border: "1px solid var(--t-border)",
                  boxShadow: "var(--t-shadow)", borderRadius: 8, padding: "4px 0",
                  minWidth: 140, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {["All", ...locations].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setActiveLoc(loc); setLocOpen(false); if (sound) tick(lastSound); }}
                    style={{
                      display: "block", width: "100%", padding: "6px 12px",
                      border: "none", background: activeLoc === loc ? "rgba(var(--t-ink),.04)" : "none",
                      cursor: "pointer", fontSize: 12, fontWeight: activeLoc === loc ? 500 : 420,
                      color: activeLoc === loc ? "rgba(var(--t-ink),.8)" : "rgba(var(--t-ink),.5)",
                      textAlign: "left",
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Balance range */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <input
            className="fft-inp"
            type="number"
            placeholder="Min $"
            value={minBal}
            onChange={(e) => setMinBal(e.target.value)}
            style={{ width: 72 }}
          />
          <span style={{ fontSize: 11, color: "rgba(var(--t-ink),.2)" }}>–</span>
          <input
            className="fft-inp"
            type="number"
            placeholder="Max $"
            value={maxBal}
            onChange={(e) => setMaxBal(e.target.value)}
            style={{ width: 72 }}
          />
        </div>
      </div>

      {/* Click-away for location */}
      {locOpen && <div onClick={() => setLocOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 15 }} />}

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...TH, width: 40, textAlign: "center", cursor: "pointer" }} onClick={toggleAll}>
              <span style={{
                display: "inline-flex", width: 16, height: 16, borderRadius: 4,
                border: `1.5px solid rgba(var(--t-ink),${selected.size === filtered.length && filtered.length > 0 ? ".5" : ".15"})`,
                background: selected.size === filtered.length && filtered.length > 0 ? "rgba(var(--t-ink),.08)" : "none",
                alignItems: "center", justifyContent: "center",
              }}>
                {selected.size === filtered.length && filtered.length > 0 && (
                  <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="rgba(var(--t-ink),.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
                )}
              </span>
            </th>
            <th style={TH}>Name</th>
            <th style={TH}>Email</th>
            <th style={TH}>Location</th>
            <th style={TH}>Status</th>
            <th style={{ ...TH, textAlign: "right" }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {filtered.map((row) => {
              const isSel = selected.has(row.id);
              return (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="fft-row"
                  style={{ background: isSel ? "rgba(var(--t-ink),.03)" : undefined }}
                >
                  <td style={{ ...TD, textAlign: "center", cursor: "pointer" }} onClick={() => toggleRow(row.id)}>
                    <span style={{
                      display: "inline-flex", width: 16, height: 16, borderRadius: 4,
                      border: `1.5px solid rgba(var(--t-ink),${isSel ? ".5" : ".15"})`,
                      background: isSel ? "rgba(var(--t-ink),.08)" : "none",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      {isSel && (
                        <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="rgba(var(--t-ink),.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
                      )}
                    </span>
                  </td>
                  <td style={{ ...TD, fontWeight: 500, color: "rgba(var(--t-ink),.85)" }}>{row.name}</td>
                  <td style={TD}>{row.email}</td>
                  <td style={TD}>{row.location}</td>
                  <td style={TD}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[row.status] || "rgba(var(--t-ink),.2)" }} />
                      <span style={{ fontSize: 12, color: "rgba(var(--t-ink),.5)" }}>{row.status}</span>
                    </span>
                  </td>
                  <td style={{
                    ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums",
                    color: row.balance < 0 ? "var(--t-dim)" : TD.color,
                  }}>
                    ${row.balance.toLocaleString()}
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", padding: "10px 16px",
        borderTop: "1px solid var(--t-border)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {selected.size > 0 ? `${selected.size} selected` : `${filtered.length} users`}
        </span>
        <span style={{ fontSize: 12, fontWeight: 520, color: "rgba(var(--t-ink),.65)", fontVariantNumeric: "tabular-nums" }}>
          Total: ${totalBal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default FlexiFilterTable;
