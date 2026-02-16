"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Table Dialog — Rauno Freiberg craft.
 *
 * Glass table with row selection, status dots, and a spring-animated
 * edit dialog overlay. Three-dot menu per row. Inline form fields.
 * Audio tick on save/open.
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

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  balance: string;
}

interface TableDialogProps {
  data?: UserRow[];
  sound?: boolean;
}

/* ── Defaults ── */

const DEFAULTS: UserRow[] = [
  { id: "1", name: "Arjun Mehta", email: "arjun.mehta@company.com", role: "Manager", status: "Active", balance: "$1,250.00" },
  { id: "2", name: "Hannah Park", email: "hannah.park@company.com", role: "Designer", status: "Active", balance: "$600.00" },
  { id: "3", name: "Oliver Scott", email: "oliver.scott@company.com", role: "Engineer", status: "Inactive", balance: "$650.00" },
  { id: "4", name: "Camila Torres", email: "camila.torres@company.com", role: "Engineer", status: "Active", balance: "$900.00" },
];

/* ── CSS ── */

const CSS = `.tbd{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0;--t-ok:#34C759;--t-dim:#FF3B30}.dark .tbd,[data-theme="dark"] .tbd{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255;--t-ok:#30D158;--t-dim:#FF453A}.tbd-row{transition:background .1s}.tbd-row:hover{background:rgba(var(--t-ink),.03)}.tbd-input{background:rgba(var(--t-ink),.03);border:1px solid rgba(var(--t-ink),.08);border-radius:8px;padding:8px 12px;font-size:13px;font-weight:420;color:rgba(var(--t-ink),.8);outline:none;width:100%;transition:border-color .15s}.tbd-input:focus{border-color:rgba(var(--t-ink),.2)}`;

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

export function TableDialog({
  data = DEFAULTS,
  sound = true,
}: TableDialogProps) {
  const [users, setUsers] = useState<UserRow[]>(data);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [editData, setEditData] = useState<Partial<UserRow>>({});
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const lastSound = useRef(0);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => prev.size === users.length ? new Set() : new Set(users.map((u) => u.id)));
  }, [users]);

  const openEdit = useCallback((user: UserRow) => {
    setEditing(user);
    setEditData({ ...user });
    setMenuOpen(null);
    if (sound) tick(lastSound);
  }, [sound]);

  const saveEdit = useCallback(() => {
    if (!editing) return;
    setUsers((prev) => prev.map((u) => u.id === editing.id ? { ...u, ...editData } as UserRow : u));
    setEditing(null);
    if (sound) tick(lastSound);
  }, [editing, editData, sound]);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setMenuOpen(null);
    if (sound) tick(lastSound);
  }, [sound]);

  const total = users.reduce((s, u) => {
    const n = parseFloat(u.balance.replace(/[^0-9.-]/g, ""));
    return s + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="tbd" style={{
      width: "100%", maxWidth: 720, position: "relative",
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...TH, width: 40, textAlign: "center", cursor: "pointer" }} onClick={toggleAll}>
              <span style={{
                display: "inline-flex", width: 16, height: 16, borderRadius: 4,
                border: `1.5px solid rgba(var(--t-ink),${selected.size === users.length ? ".5" : ".15"})`,
                background: selected.size === users.length ? "rgba(var(--t-ink),.08)" : "none",
                alignItems: "center", justifyContent: "center",
              }}>
                {selected.size === users.length && (
                  <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="rgba(var(--t-ink),.6)" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
                )}
              </span>
            </th>
            <th style={TH}>Name</th>
            <th style={TH}>Email</th>
            <th style={TH}>Role</th>
            <th style={TH}>Status</th>
            <th style={{ ...TH, textAlign: "right" }}>Balance</th>
            <th style={{ ...TH, width: 44 }} />
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {users.map((user) => {
              const isSel = selected.has(user.id);
              return (
                <motion.tr
                  key={user.id}
                  layout
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="tbd-row"
                  style={{ background: isSel ? "rgba(var(--t-ink),.03)" : undefined }}
                >
                  <td style={{ ...TD, textAlign: "center", cursor: "pointer" }} onClick={() => toggleSelect(user.id)}>
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
                  <td style={{ ...TD, fontWeight: 500, color: "rgba(var(--t-ink),.85)" }}>{user.name}</td>
                  <td style={TD}>{user.email}</td>
                  <td style={TD}>{user.role}</td>
                  <td style={TD}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: user.status === "Active" ? "var(--t-ok)" : "var(--t-dim)" }} />
                      <span style={{ fontSize: 12, color: "rgba(var(--t-ink),.5)" }}>{user.status}</span>
                    </span>
                  </td>
                  <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{user.balance}</td>
                  <td style={{ ...TD, position: "relative" }}>
                    <button
                      onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                      style={{
                        border: "none", background: "none", cursor: "pointer",
                        padding: 4, borderRadius: 4, display: "flex", alignItems: "center",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="3" cy="7" r="1.2" fill="rgba(var(--t-ink),.35)" />
                        <circle cx="7" cy="7" r="1.2" fill="rgba(var(--t-ink),.35)" />
                        <circle cx="11" cy="7" r="1.2" fill="rgba(var(--t-ink),.35)" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {menuOpen === user.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{
                            position: "absolute", right: 16, top: "100%", zIndex: 20,
                            background: "var(--t-bg)", border: "1px solid var(--t-border)",
                            boxShadow: "var(--t-shadow)", borderRadius: 8, padding: "4px 0",
                            minWidth: 100, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                          }}
                        >
                          <button
                            onClick={() => openEdit(user)}
                            style={{
                              display: "block", width: "100%", padding: "6px 12px",
                              border: "none", background: "none", cursor: "pointer",
                              fontSize: 12, fontWeight: 450, color: "rgba(var(--t-ink),.7)",
                              textAlign: "left",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            style={{
                              display: "block", width: "100%", padding: "6px 12px",
                              border: "none", background: "none", cursor: "pointer",
                              fontSize: 12, fontWeight: 450, color: "var(--t-dim)",
                              textAlign: "left",
                            }}
                          >
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Click-away for menu */}
      {menuOpen && <div onClick={() => setMenuOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 15 }} />}

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", padding: "10px 16px",
        borderTop: "1px solid var(--t-border)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>
          {selected.size > 0 ? `${selected.size} selected` : `${users.length} members`}
        </span>
        <span style={{ fontSize: 12, fontWeight: 520, color: "rgba(var(--t-ink),.65)", fontVariantNumeric: "tabular-nums" }}>
          Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Edit Dialog Overlay */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0,0,0,.3)", backdropFilter: "blur(4px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 360, padding: 20, borderRadius: 14,
                background: "var(--t-bg)", border: "1px solid var(--t-border)",
                boxShadow: "0 24px 64px rgba(0,0,0,.2)",
                backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 560, color: "rgba(var(--t-ink),.85)", marginBottom: 16 }}>
                Edit User
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(["name", "email", "role", "balance"] as const).map((field) => (
                  <input
                    key={field}
                    className="tbd-input"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editData[field] || ""}
                    onChange={(e) => setEditData((prev) => ({ ...prev, [field]: e.target.value }))}
                  />
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {(["Active", "Inactive"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setEditData((prev) => ({ ...prev, status: s }))}
                      style={{
                        flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 500,
                        border: `1.5px solid rgba(var(--t-ink),${editData.status === s ? ".2" : ".06"})`,
                        background: editData.status === s ? "rgba(var(--t-ink),.05)" : "none",
                        color: editData.status === s ? "rgba(var(--t-ink),.8)" : "rgba(var(--t-ink),.35)",
                        cursor: "pointer", transition: "all .15s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => setEditing(null)}
                  style={{
                    padding: "7px 16px", borderRadius: 8, border: "1px solid var(--t-border)",
                    background: "none", fontSize: 12, fontWeight: 500,
                    color: "rgba(var(--t-ink),.5)", cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  style={{
                    padding: "7px 16px", borderRadius: 8, border: "none",
                    background: "rgba(var(--t-ink),.85)", fontSize: 12, fontWeight: 520,
                    color: "rgba(var(--t-ink),.05) !important", cursor: "pointer",
                  }}
                >
                  <span style={{ color: "rgba(calc(255 - var(--t-ink)),calc(255 - var(--t-ink)),calc(255 - var(--t-ink)),.9)" }}>Save</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TableDialog;
