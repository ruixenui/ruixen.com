"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Column Collaboration Table — Rauno Freiberg craft.
 *
 * Glass table with per-column comment threads. Click header icon
 * to open spring-animated popover. Add comments inline.
 * Comment count badge. Audio tick on add.
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

export interface CollabItem {
  id: string;
  [key: string]: string;
}

interface ColumnCollaborationTableProps {
  columns?: string[];
  data?: CollabItem[];
  sound?: boolean;
}

/* ── Defaults ── */

const DEFAULT_COLS = ["Name", "Email", "Location", "Status", "Balance"];

const DEFAULT_DATA: CollabItem[] = [
  { id: "1", Name: "Arjun Mehta", Email: "arjun.mehta@company.com", Location: "Bangalore, IN", Status: "Active", Balance: "$1,250.00" },
  { id: "2", Name: "Hannah Park", Email: "hannah.park@company.com", Location: "Seoul, KR", Status: "Active", Balance: "$600.00" },
  { id: "3", Name: "Oliver Scott", Email: "oliver.scott@company.com", Location: "Manchester, UK", Status: "Inactive", Balance: "$650.00" },
  { id: "4", Name: "Camila Torres", Email: "camila.torres@company.com", Location: "Bogotá, CO", Status: "Active", Balance: "$0.00" },
  { id: "5", Name: "Kenji Tanaka", Email: "kenji.tanaka@company.com", Location: "Osaka, JP", Status: "Active", Balance: "-$1,000.00" },
];

/* ── CSS ── */

const CSS = `.cct{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0}.dark .cct,[data-theme="dark"] .cct{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255}.cct-row{transition:background .1s}.cct-row:hover{background:rgba(var(--t-ink),.03)}.cct-inp{background:rgba(var(--t-ink),.03);border:1px solid rgba(var(--t-ink),.08);border-radius:6px;padding:6px 10px;font-size:12px;font-weight:420;color:rgba(var(--t-ink),.8);outline:none;width:100%;transition:border-color .15s}.cct-inp:focus{border-color:rgba(var(--t-ink),.2)}`;

const TH: React.CSSProperties = {
  padding: "10px 16px", fontSize: 11, fontWeight: 520,
  color: "rgba(var(--t-ink),.4)", letterSpacing: "0.04em",
  textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap",
  borderBottom: "1px solid var(--t-border)", position: "relative",
};

const TD: React.CSSProperties = {
  padding: "10px 16px", fontSize: 13, fontWeight: 420,
  color: "rgba(var(--t-ink),.7)",
  borderBottom: "1px solid rgba(var(--t-ink),.03)", whiteSpace: "nowrap",
};

/* ── Component ── */

export function ColumnCollaborationTable({
  columns = DEFAULT_COLS,
  data = DEFAULT_DATA,
  sound = true,
}: ColumnCollaborationTableProps) {
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [openCol, setOpenCol] = useState<string | null>(null);
  const lastSound = useRef(0);

  const addComment = useCallback((col: string) => {
    const text = newComment[col]?.trim();
    if (!text) return;
    setComments((prev) => ({ ...prev, [col]: [...(prev[col] || []), text] }));
    setNewComment((prev) => ({ ...prev, [col]: "" }));
    if (sound) tick(lastSound);
  }, [newComment, sound]);

  return (
    <div className="cct" style={{
      width: "100%", maxWidth: 760,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ padding: "12px 16px 8px", fontSize: 13, fontWeight: 560, color: "rgba(var(--t-ink),.85)", letterSpacing: "-0.01em" }}>
        Team Directory
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((col) => {
              const count = (comments[col] || []).length;
              return (
                <th key={col} style={TH}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{col}</span>
                    <button
                      onClick={() => setOpenCol(openCol === col ? null : col)}
                      style={{
                        border: "none", background: count > 0 ? "rgba(var(--t-ink),.06)" : "none",
                        borderRadius: 4, padding: "2px 4px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 3,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3h12v8a1 1 0 01-1 1H7l-3 2v-2H3a1 1 0 01-1-1V3z" stroke="rgba(var(--t-ink),.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </svg>
                      {count > 0 && (
                        <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(var(--t-ink),.5)" }}>{count}</span>
                      )}
                    </button>

                    {/* Popover */}
                    <AnimatePresence>
                      {openCol === col && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{
                            position: "absolute", left: 8, top: "calc(100% + 4px)", zIndex: 20,
                            background: "var(--t-bg)", border: "1px solid var(--t-border)",
                            boxShadow: "var(--t-shadow)", borderRadius: 10, padding: 12,
                            width: 240, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={{ fontSize: 11, fontWeight: 520, color: "rgba(var(--t-ink),.5)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            Comments — {col}
                          </div>
                          <div style={{ maxHeight: 120, overflowY: "auto", marginBottom: 8 }}>
                            {(comments[col] || []).length === 0 ? (
                              <div style={{ fontSize: 12, color: "rgba(var(--t-ink),.3)", padding: "4px 0" }}>No comments yet</div>
                            ) : (
                              (comments[col] || []).map((cmt, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                  style={{
                                    fontSize: 12, color: "rgba(var(--t-ink),.65)", padding: "5px 0",
                                    borderBottom: i < (comments[col] || []).length - 1 ? "1px solid rgba(var(--t-ink),.04)" : "none",
                                  }}
                                >
                                  {cmt}
                                </motion.div>
                              ))
                            )}
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            <input
                              className="cct-inp"
                              value={newComment[col] || ""}
                              onChange={(e) => setNewComment((prev) => ({ ...prev, [col]: e.target.value }))}
                              placeholder="Add comment..."
                              onKeyDown={(e) => e.key === "Enter" && addComment(col)}
                            />
                            <button
                              onClick={() => addComment(col)}
                              style={{
                                border: "none", background: "rgba(var(--t-ink),.08)", borderRadius: 6,
                                padding: "0 10px", fontSize: 11, fontWeight: 520,
                                color: "rgba(var(--t-ink),.6)", cursor: "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="cct-row">
              {columns.map((col, ci) => (
                <td key={col} style={{
                  ...TD,
                  fontWeight: ci === 0 ? 500 : TD.fontWeight,
                  color: ci === 0 ? "rgba(var(--t-ink),.85)" : TD.color,
                }}>
                  {item[col] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Click-away */}
      {openCol && <div onClick={() => setOpenCol(null)} style={{ position: "fixed", inset: 0, zIndex: 15 }} />}

      <div style={{
        display: "flex", justifyContent: "space-between", padding: "10px 16px",
        borderTop: "1px solid var(--t-border)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {data.length} rows
        </span>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {Object.values(comments).reduce((s, c) => s + c.length, 0)} comments
        </span>
      </div>
    </div>
  );
}

export default ColumnCollaborationTable;
