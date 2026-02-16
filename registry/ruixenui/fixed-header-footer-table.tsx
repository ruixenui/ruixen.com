"use client";

/**
 * Fixed Header Footer Table — Rauno Freiberg craft.
 *
 * Glass container with sticky header and footer.
 * Scrollable body with hidden scrollbar and edge-fade mask.
 * Row hover brightening. Status dot indicators.
 */

/* ── Types ── */

interface TableItem {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "Active" | "Inactive";
  balance: number;
}

interface FixedHeaderFooterTableProps {
  items?: TableItem[];
  title?: string;
}

/* ── Defaults ── */

const DEFAULTS: TableItem[] = [
  { id: "1", name: "Olivia Martin", email: "olivia@example.com", location: "New York", status: "Active", balance: 1200 },
  { id: "2", name: "Jackson Lee", email: "jackson@example.com", location: "London", status: "Active", balance: 850 },
  { id: "3", name: "Isabella Nguyen", email: "isabella@example.com", location: "Paris", status: "Inactive", balance: 320 },
  { id: "4", name: "William Chen", email: "william@example.com", location: "Tokyo", status: "Active", balance: 2100 },
  { id: "5", name: "Sofia Rodriguez", email: "sofia@example.com", location: "Madrid", status: "Active", balance: 1750 },
  { id: "6", name: "Liam O'Brien", email: "liam@example.com", location: "Dublin", status: "Inactive", balance: 430 },
  { id: "7", name: "Emma Wilson", email: "emma@example.com", location: "Sydney", status: "Active", balance: 980 },
  { id: "8", name: "Noah Kim", email: "noah@example.com", location: "Seoul", status: "Active", balance: 1540 },
  { id: "9", name: "Ava Patel", email: "ava@example.com", location: "Mumbai", status: "Active", balance: 670 },
  { id: "10", name: "James Brown", email: "james@example.com", location: "Toronto", status: "Inactive", balance: 290 },
];

/* ── CSS ── */

const CSS = `.fht{--t-bg:rgba(255,255,255,.72);--t-border:rgba(0,0,0,.06);--t-shadow:0 0 0 .5px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06);--t-ink:0,0,0;--t-row:rgba(0,0,0,.015);--t-ok:#34C759;--t-dim:#FF3B30}.dark .fht,[data-theme="dark"] .fht{--t-bg:rgba(30,30,32,.82);--t-border:rgba(255,255,255,.06);--t-shadow:0 0 0 .5px rgba(255,255,255,.04),0 2px 4px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3);--t-ink:255,255,255;--t-row:rgba(255,255,255,.02);--t-ok:#30D158;--t-dim:#FF453A}.fht-scroll{scrollbar-width:none}.fht-scroll::-webkit-scrollbar{display:none}.fht-row{transition:background .1s}.fht-row:hover{background:rgba(var(--t-ink),.03)}`;

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

export function FixedHeaderFooterTable({
  items = DEFAULTS,
  title = "Team Members",
}: FixedHeaderFooterTableProps) {
  const total = items.reduce((s, i) => s + i.balance, 0);

  return (
    <div className="fht" style={{
      width: "100%", maxWidth: 720,
      background: "var(--t-bg)", border: "1px solid var(--t-border)",
      boxShadow: "var(--t-shadow)", borderRadius: 14,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: 420,
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ padding: "12px 16px 8px", fontSize: 13, fontWeight: 560, color: "rgba(var(--t-ink),.85)", letterSpacing: "-0.01em" }}>
        {title}
      </div>

      <div className="fht-scroll" style={{
        flex: 1, overflow: "auto",
        maskImage: "linear-gradient(to bottom, black 0%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 92%, transparent)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--t-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
              <th style={TH}>Name</th>
              <th style={TH}>Email</th>
              <th style={TH}>Location</th>
              <th style={TH}>Status</th>
              <th style={{ ...TH, textAlign: "right" }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="fht-row" style={{ background: i % 2 === 1 ? "var(--t-row)" : "transparent" }}>
                <td style={{ ...TD, fontWeight: 500, color: "rgba(var(--t-ink),.85)" }}>{item.name}</td>
                <td style={TD}>{item.email}</td>
                <td style={TD}>{item.location}</td>
                <td style={TD}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.status === "Active" ? "var(--t-ok)" : "var(--t-dim)" }} />
                    <span style={{ fontSize: 12, color: "rgba(var(--t-ink),.5)" }}>{item.status}</span>
                  </span>
                </td>
                <td style={{ ...TD, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${item.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", padding: "10px 16px",
        borderTop: "1px solid var(--t-border)", background: "var(--t-bg)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      }}>
        <span style={{ fontSize: 11, fontWeight: 450, color: "rgba(var(--t-ink),.35)" }}>{items.length} members</span>
        <span style={{ fontSize: 12, fontWeight: 520, color: "rgba(var(--t-ink),.65)", fontVariantNumeric: "tabular-nums" }}>Total: ${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default FixedHeaderFooterTable;
