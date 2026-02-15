"use client";

import * as React from "react";
import { motion } from "motion/react";

/* ── theme ────────────────────────────────────────────────── */

const CSS = `
.bh{
  --bh-card:rgba(255,255,255,.94);
  --bh-brd:rgba(0,0,0,.08);
  --bh-sh1:0 1px 3px rgba(0,0,0,.04),0 6px 20px rgba(0,0,0,.05),0 20px 56px rgba(0,0,0,.07),inset 0 .5px 0 rgba(255,255,255,.7);
  --bh-sh2:0 1px 2px rgba(0,0,0,.03),0 4px 14px rgba(0,0,0,.03),inset 0 .5px 0 rgba(255,255,255,.5);
  --bh-sh3:0 1px 2px rgba(0,0,0,.02),0 2px 8px rgba(0,0,0,.015);
  --bh-txt:#111827;
  --bh-sub:#9ca3af;
  --bh-chr:rgba(245,245,247,1);
  --bh-chr-b:rgba(0,0,0,.06);
  --bh-url:rgba(0,0,0,.04);
  --bh-url-t:#6b7280;
  --bh-cnt:rgba(250,250,252,1);
  --bh-sk:rgba(0,0,0,.05);
  --bh-sk2:rgba(0,0,0,.1);
  --bh-blue:#3b82f6;
  --bh-grn:#22c55e;
  --bh-org:#f97316;
  --bh-prp:#8b5cf6;
  --bh-lbl:#6b7280;
  --bh-da:rgba(0,0,0,.55);
  --bh-di:rgba(0,0,0,.12);
}
.dark .bh,[data-theme="dark"] .bh{
  --bh-card:rgba(30,30,34,.96);
  --bh-brd:rgba(255,255,255,.08);
  --bh-sh1:0 2px 8px rgba(0,0,0,.3),0 20px 56px rgba(0,0,0,.2),inset 0 .5px 0 rgba(255,255,255,.06);
  --bh-sh2:0 1px 4px rgba(0,0,0,.2),inset 0 .5px 0 rgba(255,255,255,.04);
  --bh-sh3:0 1px 2px rgba(0,0,0,.12);
  --bh-txt:#f3f4f6;
  --bh-sub:#6b7280;
  --bh-chr:rgba(38,38,42,1);
  --bh-chr-b:rgba(255,255,255,.06);
  --bh-url:rgba(255,255,255,.06);
  --bh-url-t:#9ca3af;
  --bh-cnt:rgba(22,22,26,1);
  --bh-sk:rgba(255,255,255,.05);
  --bh-sk2:rgba(255,255,255,.1);
  --bh-blue:#60a5fa;
  --bh-grn:#4ade80;
  --bh-org:#fb923c;
  --bh-prp:#a78bfa;
  --bh-lbl:#9ca3af;
  --bh-da:rgba(255,255,255,.55);
  --bh-di:rgba(255,255,255,.1);
}
`;

/* ── data ─────────────────────────────────────────────────── */

const PAGES = [
  { url: "vercel.com/dashboard", date: "Apr 12, 2021", type: 0 },
  { url: "github.com/vercel/next.js", date: "Mar 28, 2021", type: 1 },
  { url: "linear.app/team", date: "Mar 15, 2021", type: 2 },
  { url: "figma.com/design", date: "Feb 20, 2021", type: 3 },
  { url: "notion.so/workspace", date: "Jan 8, 2021", type: 4 },
];

const N = PAGES.length;
const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";

/* ── component ────────────────────────────────────────────── */

interface GlassBrowserHistoryProps {
  style?: React.CSSProperties;
}

export default function GlassBrowserHistory({
  style,
}: GlassBrowserHistoryProps) {
  const [a, setA] = React.useState(0);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="bh"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          minHeight: 420,
          userSelect: "none",
          ...style,
        }}
      >
        {/* ── card stack ── */}
        <div style={{ position: "relative", width: 380, height: 264 }}>
          {PAGES.map((pg, i) => {
            const off = (i - a + N) % N;
            const vis = off <= 2;
            const front = off === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  y: vis ? off * -14 : -42,
                  x: vis ? off * -2 : -6,
                  scale: vis ? 1 - off * 0.04 : 0.88,
                  zIndex: vis ? 10 - off : 0,
                  opacity: vis ? (off === 0 ? 1 : off === 1 ? 0.65 : 0.35) : 0,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                drag={front ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={
                  front
                    ? (_, info) => {
                        if (info.offset.x < -40) setA((p) => (p + 1) % N);
                        else if (info.offset.x > 40)
                          setA((p) => (p - 1 + N) % N);
                      }
                    : undefined
                }
                onTap={front ? () => setA((p) => (p + 1) % N) : undefined}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  overflow: "hidden",
                  cursor: front ? "grab" : "default",
                  pointerEvents: front ? "auto" : "none",
                  border: "1px solid var(--bh-brd)",
                  boxShadow: vis
                    ? off === 0
                      ? "var(--bh-sh1)"
                      : off === 1
                        ? "var(--bh-sh2)"
                        : "var(--bh-sh3)"
                    : "none",
                  backdropFilter: "blur(24px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                  willChange: "transform",
                }}
              >
                {/* chrome bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    background: "var(--bh-chr)",
                    borderBottom: "1px solid var(--bh-chr-b)",
                  }}
                >
                  {/* traffic lights */}
                  <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, j) => (
                      <div
                        key={j}
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: front ? c : "var(--bh-sk)",
                        }}
                      />
                    ))}
                  </div>

                  {/* url bar */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      padding: "4px 12px",
                      borderRadius: 6,
                      background: "var(--bh-url)",
                      fontSize: 11,
                      color: "var(--bh-url-t)",
                      fontFamily: MONO,
                    }}
                  >
                    <svg
                      width={10}
                      height={10}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    >
                      <rect x={3} y={11} width={18} height={11} rx={2} />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    {pg.url}
                  </div>
                </div>

                {/* content area */}
                <div
                  style={{
                    padding: 14,
                    background: "var(--bh-cnt)",
                    height: "calc(100% - 40px)",
                    overflow: "hidden",
                  }}
                >
                  <PageWireframe type={pg.type} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── bottom label ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 380,
            marginTop: 24,
            padding: "0 4px",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--bh-lbl)",
              letterSpacing: -0.2,
            }}
          >
            Browser History
          </span>
          <span style={{ fontSize: 12, color: "var(--bh-sub)" }}>
            {PAGES[a].date}
          </span>
        </div>

        {/* ── dot indicators ── */}
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {PAGES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === a ? 1 : 0.8,
                background: i === a ? "var(--bh-da)" : "var(--bh-di)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onTap={() => setA(i)}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/* ── abstract wireframe pages ─────────────────────────────── */

const Sk = ({
  w,
  h = 6,
  c,
}: {
  w: string | number;
  h?: number;
  c?: string;
}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: h / 2,
      background: c || "var(--bh-sk)",
      flexShrink: 0,
    }}
  />
);

function PageWireframe({ type }: { type: number }) {
  switch (type) {
    case 0:
      return <DashboardPage />;
    case 1:
      return <RepoPage />;
    case 2:
      return <IssuesPage />;
    case 3:
      return <DesignPage />;
    case 4:
      return <NotesPage />;
    default:
      return null;
  }
}

/* vercel dashboard */
function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { n: "72", c: "var(--bh-blue)" },
          { n: "45", c: "var(--bh-grn)" },
          { n: "89", c: "var(--bh-org)" },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid var(--bh-chr-b)",
              background: "var(--bh-chr)",
            }}
          >
            <Sk w="60%" h={4} />
            <div
              style={{
                marginTop: 6,
                fontSize: 16,
                fontWeight: 700,
                color: m.c,
                lineHeight: 1,
              }}
            >
              {m.n}
            </div>
          </div>
        ))}
      </div>
      {[85, 72, 60].map((w, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 0",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i === 0 ? "var(--bh-grn)" : "var(--bh-sk2)",
            }}
          />
          <Sk w={`${w}%`} h={5} />
        </div>
      ))}
    </div>
  );
}

/* github repo */
function RepoPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 2,
        }}
      >
        <Sk w="40%" h={8} c="var(--bh-sk2)" />
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          <svg
            width={10}
            height={10}
            viewBox="0 0 24 24"
            fill="var(--bh-org)"
            stroke="none"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
          </svg>
          <span style={{ fontSize: 10, color: "var(--bh-sub)" }}>42.1k</span>
        </div>
      </div>
      <div style={{ height: 1, background: "var(--bh-sk)" }} />
      {["src", "pages", "package.json", "README.md", "tsconfig.json"].map(
        (f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "3px 0",
            }}
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--bh-sub)"
              strokeWidth={1.5}
            >
              {i < 2 ? (
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
              ) : (
                <>
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  <path d="M13 2v7h7" />
                </>
              )}
            </svg>
            <span
              style={{ fontSize: 11, color: "var(--bh-txt)", opacity: 0.7 }}
            >
              {f}
            </span>
          </div>
        ),
      )}
    </div>
  );
}

/* linear issues */
function IssuesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Sk w="35%" h={7} c="var(--bh-sk2)" />
      <div style={{ height: 1, background: "var(--bh-sk)", marginBottom: 2 }} />
      {[
        { c: "var(--bh-org)", w: "78%" },
        { c: "var(--bh-blue)", w: "65%" },
        { c: "var(--bh-prp)", w: "82%" },
        { c: "var(--bh-blue)", w: "58%" },
        { c: "var(--bh-org)", w: "70%" },
      ].map((r, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 0",
          }}
        >
          <div
            style={{
              width: 4,
              height: 14,
              borderRadius: 2,
              background: r.c,
              opacity: 0.6,
            }}
          />
          <Sk w={r.w} h={5} />
          <div style={{ marginLeft: "auto" }}>
            <Sk w={28} h={5} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* figma design */
function DesignPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
      }}
    >
      {[
        "var(--bh-blue)",
        "var(--bh-prp)",
        "var(--bh-sk)",
        "var(--bh-org)",
        "var(--bh-sk)",
        "var(--bh-grn)",
      ].map((c, i) => (
        <div
          key={i}
          style={{
            aspectRatio: "4/3",
            borderRadius: 6,
            background: c,
            opacity: c === "var(--bh-sk)" ? 1 : 0.15,
          }}
        />
      ))}
    </div>
  );
}

/* notion notes */
function NotesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Sk w="55%" h={10} c="var(--bh-sk2)" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginTop: 4,
        }}
      >
        <Sk w="100%" h={4} />
        <Sk w="88%" h={4} />
        <Sk w="95%" h={4} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginTop: 6,
        }}
      >
        <Sk w="40%" h={7} c="var(--bh-sk2)" />
        <Sk w="92%" h={4} />
        <Sk w="78%" h={4} />
        <Sk w="85%" h={4} />
      </div>
    </div>
  );
}
