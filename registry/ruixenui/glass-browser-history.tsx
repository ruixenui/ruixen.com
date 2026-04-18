"use client";

import * as React from "react";
import { motion } from "motion/react";

/* ── theme ────────────────────────────────────────────────── */

const CSS = `
.bh{
  --bh-brd:rgba(0,0,0,.08);
  --bh-sh1:0 1px 3px rgba(0,0,0,.04),0 6px 20px rgba(0,0,0,.05),0 20px 56px rgba(0,0,0,.07),inset 0 .5px 0 rgba(255,255,255,.7);
  --bh-sh2:0 1px 2px rgba(0,0,0,.03),0 4px 14px rgba(0,0,0,.03),inset 0 .5px 0 rgba(255,255,255,.5);
  --bh-sh3:0 1px 2px rgba(0,0,0,.02),0 2px 8px rgba(0,0,0,.015);
  --bh-chr:rgba(245,245,247,1);
  --bh-chr-b:rgba(0,0,0,.06);
  --bh-cnt:rgba(250,250,252,1);
  --bh-sk:rgba(0,0,0,.05);
  --bh-da:rgba(0,0,0,.55);
  --bh-di:rgba(0,0,0,.12);
}
.dark .bh,[data-theme="dark"] .bh{
  --bh-brd:rgba(255,255,255,.08);
  --bh-sh1:0 2px 8px rgba(0,0,0,.3),0 20px 56px rgba(0,0,0,.2),inset 0 .5px 0 rgba(255,255,255,.06);
  --bh-sh2:0 1px 4px rgba(0,0,0,.2),inset 0 .5px 0 rgba(255,255,255,.04);
  --bh-sh3:0 1px 2px rgba(0,0,0,.12);
  --bh-chr:rgba(38,38,42,1);
  --bh-chr-b:rgba(255,255,255,.06);
  --bh-cnt:rgba(22,22,26,1);
  --bh-sk:rgba(255,255,255,.05);
  --bh-da:rgba(255,255,255,.55);
  --bh-di:rgba(255,255,255,.1);
}
`;

const N = 5;

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
          {Array.from({ length: N }).map((_, i) => {
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
                </div>

                {/* content area */}
                <div
                  style={{
                    background: "var(--bh-cnt)",
                    height: "calc(100% - 40px)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── dot indicators ── */}
        <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
          {Array.from({ length: N }).map((_, i) => (
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
