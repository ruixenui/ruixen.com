"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Reorderable Table — Rauno Freiberg craft.
 *
 * Glass table with drag-and-drop column reordering.
 * Column visibility popover with checkboxes. Search bar.
 * Spring animations on reorder. Audio tick on drag.
 * Layout persisted to localStorage.
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

export type ReorderableRow = Record<string, unknown>;

export interface ColumnDef<T = ReorderableRow> {
  key: keyof T | (string & {});
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface ReorderableTableProps<T extends ReorderableRow> {
  data?: T[];
  columns?: ColumnDef<T>[];
  lsOrderKey?: string;
  lsVisibleKey?: string;
  searchable?: boolean;
  sound?: boolean;
}

/* ── Default data ── */

type DefaultRow = { id: number; name: string; email: string; role: string; location: string; status: string; balance: number };

const DEFAULT_ROWS: DefaultRow[] = [
  { id: 1, name: "Arjun Mehta", email: "arjun.mehta@company.com", role: "Manager", location: "Bangalore", status: "Active", balance: 1250 },
  { id: 2, name: "Hannah Park", email: "hannah.park@company.com", role: "Designer", location: "Seoul", status: "Active", balance: 600 },
  { id: 3, name: "Oliver Scott", email: "oliver.scott@company.com", role: "Engineer", location: "Manchester", status: "Inactive", balance: 650 },
  { id: 4, name: "Camila Torres", email: "camila.torres@company.com", role: "HR", location: "Bogotá", status: "Active", balance: 0 },
  { id: 5, name: "Kenji Tanaka", email: "kenji.tanaka@company.com", role: "Developer", location: "Osaka", status: "Suspended", balance: -1000 },
];

const DEFAULT_COLS: ColumnDef<DefaultRow>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "location", label: "Location" },
  {
    key: "status", label: "Status",
    render: (row) => {
      const c = row.status === "Active" ? "#34C759" : row.status === "Inactive" ? "rgba(var(--t-ink),.3)" : "#FF3B30";
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          <span>{row.status}</span>
        </span>
      );
    },
  },
  { key: "balance", label: "Balance", render: (row) => `$${row.balance.toLocaleString()}` },
];

/* ── CSS ── */

const CSS = `.rt{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0}.dark .rt,[data-theme="dark"] .rt{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255}.rt-row{transition:background .1s}.rt-row:hover{background:rgba(var(--t-ink),.03)}.rt-inp{background:rgba(var(--t-ink),.03);border:1px solid rgba(var(--t-ink),.08);border-radius:8px;padding:7px 12px;font-size:12px;font-weight:420;color:rgba(var(--t-ink),.8);outline:none;transition:border-color .15s}.rt-inp:focus{border-color:rgba(var(--t-ink),.2)}.rt-inp::placeholder{color:rgba(var(--t-ink),.25)}`;

const TH: React.CSSProperties = {
  padding: "10px 16px", fontSize: 11, fontWeight: 520,
  color: "rgba(var(--t-ink),.4)", letterSpacing: "0.04em",
  textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap",
  borderBottom: "1px solid var(--t-border)", cursor: "grab",
  userSelect: "none",
};

const TD: React.CSSProperties = {
  padding: "10px 16px", fontSize: 13, fontWeight: 420,
  color: "rgba(var(--t-ink),.7)",
  borderBottom: "1px solid rgba(var(--t-ink),.03)", whiteSpace: "nowrap",
  overflow: "hidden", textOverflow: "ellipsis",
};

/* ── Component ── */

export function ReorderableTable<T extends ReorderableRow>({
  data = DEFAULT_ROWS as unknown as T[],
  columns = DEFAULT_COLS as unknown as ColumnDef<T>[],
  lsOrderKey = "reorderable_table_order_v1",
  lsVisibleKey = "reorderable_table_visible_v1",
  searchable = true,
  sound = true,
}: ReorderableTableProps<T>) {
  const columnKeys = useMemo(() => columns.map((c) => String(c.key)), [columns]);
  const columnKeysStr = columnKeys.join(",");

  const [query, setQuery] = useState("");
  const [showColMenu, setShowColMenu] = useState(false);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const lastSound = useRef(0);
  const dragSrc = useRef<number | null>(null);

  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    if (typeof window === "undefined") return columnKeys;
    return JSON.parse(localStorage.getItem(lsOrderKey) || "null") || columnKeys;
  });

  const [visible, setVisible] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") {
      const initial: Record<string, boolean> = {};
      columnKeys.forEach((k) => (initial[k] = true));
      return initial;
    }
    const saved = JSON.parse(localStorage.getItem(lsVisibleKey) || "null");
    if (saved) return saved;
    const initial: Record<string, boolean> = {};
    columnKeys.forEach((k) => (initial[k] = true));
    return initial;
  });

  /* Persist */
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(lsOrderKey, JSON.stringify(columnOrder));
  }, [columnOrder, lsOrderKey]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(lsVisibleKey, JSON.stringify(visible));
  }, [visible, lsVisibleKey]);

  /* Sync with columns prop */
  useEffect(() => {
    setColumnOrder((prev) => {
      const missing = columnKeys.filter((k) => !prev.includes(k));
      return [...prev.filter((k) => columnKeys.includes(k)), ...missing];
    });
  }, [columnKeysStr]); // eslint-disable-line react-hooks/exhaustive-deps

  const orderedColumns = useMemo(
    () => columnOrder.map((k) => columns.find((c) => String(c.key) === k)).filter(Boolean) as ColumnDef<T>[],
    [columnOrder, columns],
  );

  const visibleCols = useMemo(
    () => orderedColumns.filter((c) => visible[String(c.key)]),
    [orderedColumns, visible],
  );

  /* Search */
  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q)));
  }, [data, query]);

  /* Drag & Drop */
  const onDragStart = useCallback((e: React.DragEvent, i: number) => {
    dragSrc.current = i;
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const onDrop = useCallback((e: React.DragEvent, i: number) => {
    e.preventDefault();
    setDragOver(null);
    const src = dragSrc.current;
    if (src === null || src === i) return;
    if (sound) tick(lastSound);
    setColumnOrder((prev) => {
      const visCols = prev.filter((k) => visible[k]);
      const srcKey = visCols[src];
      const destKey = visCols[i];
      const srcIdx = prev.indexOf(srcKey);
      const destIdx = prev.indexOf(destKey);
      const next = [...prev];
      next.splice(srcIdx, 1);
      next.splice(destIdx, 0, srcKey);
      return next;
    });
    dragSrc.current = null;
  }, [sound, visible]);

  const toggleVisible = useCallback((key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
    if (sound) tick(lastSound);
  }, [sound]);

  const resetLayout = useCallback(() => {
    setColumnOrder(columnKeys);
    const all: Record<string, boolean> = {};
    columnKeys.forEach((k) => (all[k] = true));
    setVisible(all);
    localStorage.removeItem(lsOrderKey);
    localStorage.removeItem(lsVisibleKey);
    if (sound) tick(lastSound);
  }, [columnKeys, lsOrderKey, lsVisibleKey, sound]);

  return (
    <div className="rt" style={{
      width: "100%", maxWidth: 800,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 560, color: "rgba(var(--t-ink),.85)", letterSpacing: "-0.01em" }}>
          Team
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {searchable && (
            <input
              className="rt-inp"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: 160 }}
            />
          )}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              style={{
                border: "none", background: "rgba(var(--t-ink),.04)", padding: "5px 10px",
                borderRadius: 6, fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.5)",
                cursor: "pointer",
              }}
            >
              Columns
            </button>
            <AnimatePresence>
              {showColMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    position: "absolute", right: 0, top: "calc(100% + 4px)", zIndex: 20,
                    background: "var(--t-bg)", border: "1px solid var(--t-border)",
                    boxShadow: "var(--t-shadow)", borderRadius: 10, padding: "6px 0",
                    minWidth: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {columns.map((col) => {
                    const k = String(col.key);
                    const isVis = visible[k];
                    return (
                      <button
                        key={k}
                        onClick={() => toggleVisible(k)}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, width: "100%",
                          padding: "6px 12px", border: "none", background: "none",
                          cursor: "pointer", fontSize: 12, fontWeight: 450,
                          color: isVis ? "rgba(var(--t-ink),.7)" : "rgba(var(--t-ink),.3)",
                          textAlign: "left",
                        }}
                      >
                        <span style={{
                          width: 14, height: 14, borderRadius: 4,
                          border: `1.5px solid rgba(var(--t-ink),${isVis ? ".3" : ".12"})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {isVis && (
                            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
                          )}
                        </span>
                        {col.label}
                      </button>
                    );
                  })}
                  <div style={{ borderTop: "1px solid rgba(var(--t-ink),.06)", marginTop: 4, paddingTop: 4 }}>
                    <button
                      onClick={resetLayout}
                      style={{
                        display: "block", width: "100%", padding: "6px 12px",
                        border: "none", background: "none", cursor: "pointer",
                        fontSize: 11, fontWeight: 500, color: "rgba(var(--t-ink),.4)",
                        textAlign: "left",
                      }}
                    >
                      Reset layout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Click-away */}
      {showColMenu && <div onClick={() => setShowColMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 15 }} />}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {visibleCols.map((col, idx) => (
                <th
                  key={String(col.key)}
                  draggable
                  onDragStart={(e) => onDragStart(e, idx)}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(idx); }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={(e) => onDrop(e, idx)}
                  style={{
                    ...TH,
                    background: dragOver === idx ? "rgba(var(--t-ink),.04)" : undefined,
                    transition: "background .12s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ opacity: 0.25, flexShrink: 0 }}>
                      <circle cx="3" cy="3" r="1" fill="currentColor" /><circle cx="7" cy="3" r="1" fill="currentColor" />
                      <circle cx="3" cy="7" r="1" fill="currentColor" /><circle cx="7" cy="7" r="1" fill="currentColor" />
                    </svg>
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={String((row as Record<string, unknown>).id ?? i)} className="rt-row">
                {visibleCols.map((col, ci) => (
                  <td key={String(col.key)} style={{
                    ...TD,
                    fontWeight: ci === 0 ? 500 : TD.fontWeight,
                    color: ci === 0 ? "rgba(var(--t-ink),.85)" : TD.color,
                  }}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", padding: "10px 16px",
        borderTop: "1px solid var(--t-border)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {filtered.length} rows
        </span>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {visibleCols.length}/{columns.length} columns
        </span>
      </div>
    </div>
  );
}

export default ReorderableTable;
