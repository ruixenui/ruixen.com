"use client";

import * as React from "react";
import { motion } from "motion/react";

/* ── theme ────────────────────────────────────────────────── */

const CSS = `
.af{
  --af-card:linear-gradient(135deg,rgba(255,255,255,.86),rgba(255,255,255,.74));
  --af-brd:rgba(0,0,0,.06);
  --af-sh:0 0 1px rgba(0,0,0,.03),0 4px 16px rgba(0,0,0,.04),0 20px 48px rgba(0,0,0,.05),inset 0 1px 0 rgba(255,255,255,.9);
  --af-txt:#111827;
  --af-sub:#9ca3af;
  --af-sep:rgba(0,0,0,.06);
  --af-path:rgba(0,0,0,.07);
  --af-blue:#3b82f6;
  --af-blue-bg:rgba(59,130,246,.08);
  --af-orange:#f97316;
  --af-orange-bg:rgba(249,115,22,.1);
  --af-stack:linear-gradient(135deg,rgba(255,255,255,.55),rgba(255,255,255,.42));
  --af-stack-brd:rgba(0,0,0,.04);
  --af-pill-brd:rgba(0,0,0,.1);
}
.dark .af,[data-theme="dark"] .af{
  --af-card:linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.028));
  --af-brd:rgba(255,255,255,.08);
  --af-sh:0 1px 3px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.04);
  --af-txt:#f3f4f6;
  --af-sub:#6b7280;
  --af-sep:rgba(255,255,255,.06);
  --af-path:rgba(255,255,255,.06);
  --af-blue:#60a5fa;
  --af-blue-bg:rgba(96,165,250,.1);
  --af-orange:#fb923c;
  --af-orange-bg:rgba(251,146,60,.1);
  --af-stack:linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.02));
  --af-stack-brd:rgba(255,255,255,.05);
  --af-pill-brd:rgba(255,255,255,.12);
}
@keyframes af-flow{from{stroke-dashoffset:0}to{stroke-dashoffset:-1}}
@keyframes af-flow-rev{from{stroke-dashoffset:0}to{stroke-dashoffset:1}}
@keyframes af-pulse{0%,100%{opacity:1}50%{opacity:.35}}
`;

/* ── component ───────────────────────────────────────────── */

interface GlassShipmentFlowProps {
  style?: React.CSSProperties;
}

const M = "ui-monospace,SFMono-Regular,Menlo,monospace";

export default function GlassShipmentFlow({ style }: GlassShipmentFlowProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="af"
        style={{
          position: "relative",
          display: "flex",
          minHeight: 480,
          width: "fit-content",
          minWidth: 620,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        {/* ── connection svg ── */}
        <svg
          viewBox="0 0 280 120"
          fill="none"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            margin: "auto",
            height: "100%",
            width: "54%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id="af-gb" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
            <filter id="af-gg" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
          </defs>

          {/* request rail */}
          <path d="M55 50 H225" stroke="var(--af-path)" strokeLinecap="round" />
          <path
            d="M55 50 H225"
            pathLength={1}
            stroke="var(--af-blue)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="0.12 0.38"
            opacity={0.45}
            filter="url(#af-gb)"
            style={{ animation: "af-flow 3s linear infinite" }}
          />
          <path
            d="M55 50 H225"
            pathLength={1}
            stroke="var(--af-blue)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="0.12 0.38"
            style={{ animation: "af-flow 3s linear infinite" }}
          />

          {/* response rail */}
          <path d="M55 70 H225" stroke="var(--af-path)" strokeLinecap="round" />
          <path
            d="M55 70 H225"
            pathLength={1}
            stroke="var(--af-orange)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="0.12 0.38"
            opacity={0.45}
            filter="url(#af-gg)"
            style={{ animation: "af-flow-rev 3.5s linear infinite" }}
          />
          <path
            d="M55 70 H225"
            pathLength={1}
            stroke="var(--af-orange)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="0.12 0.38"
            style={{ animation: "af-flow-rev 3.5s linear infinite" }}
          />
        </svg>

        {/* ── cards layer ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 104,
          }}
        >
          {/* ─── left card: in transit — with stacked depth ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", paddingTop: 10 }}
          >
            {/* stack — back (peeks above main card) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 8,
                right: 8,
                bottom: 10,
                borderRadius: 20,
                background: "var(--af-stack)",
                border: "1px solid var(--af-stack-brd)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            {/* stack — mid (peeks above main card) */}
            <div
              style={{
                position: "absolute",
                top: 5,
                left: 4,
                right: 4,
                bottom: 5,
                borderRadius: 20,
                background: "var(--af-stack)",
                border: "1px solid var(--af-stack-brd)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            {/* main card */}
            <div
              style={{
                position: "relative",
                width: 224,
                borderRadius: 20,
                background: "var(--af-card)",
                border: "1px solid var(--af-brd)",
                boxShadow: "var(--af-sh)",
                backdropFilter: "blur(32px) saturate(1.6)",
                WebkitBackdropFilter: "blur(32px) saturate(1.6)",
                color: "var(--af-txt)",
                padding: "22px 20px",
              }}
            >
              {/* top row: badge + order id */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px 5px 9px",
                    borderRadius: 999,
                    background: "var(--af-orange-bg)",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--af-orange)",
                      animation: "af-pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--af-orange)",
                    }}
                  >
                    In Progress
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--af-sub)",
                    fontFamily: M,
                  }}
                >
                  #YQZNFA
                </span>
              </div>

              {/* price + inline metrics */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      letterSpacing: -1.5,
                      lineHeight: 1,
                    }}
                  >
                    $200-250
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--af-blue)",
                      fontWeight: 500,
                    }}
                  >
                    +14%
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--af-sub)",
                    }}
                  >
                    +$25,26
                  </span>
                </div>
              </div>

              {/* route visualization */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "stretch",
                  marginBottom: 24,
                }}
              >
                {/* vertical dots + solid line */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: "var(--af-orange)",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      width: 2,
                      minHeight: 22,
                      background: "var(--af-orange)",
                      opacity: 0.35,
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      border: "2px solid var(--af-orange)",
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  />
                </div>
                {/* addresses */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingTop: 1,
                    paddingBottom: 1,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: 1.3,
                    }}
                  >
                    1248 N Highland Ave,
                    <br />
                    <span style={{ color: "var(--af-sub)" }}>
                      Los Angeles, CA 90038
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--af-sub)",
                      lineHeight: 1.3,
                    }}
                  >
                    2530 W 8th St,
                    <br />
                    Los Angeles, CA 90057
                  </span>
                </div>
              </div>

              {/* footer */}
              <div
                style={{
                  height: 1,
                  background: "var(--af-sep)",
                  marginBottom: 14,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--af-sub)" }}>
                  Oct 2, 2025
                </span>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--af-pill-brd)",
                    fontSize: 10,
                    color: "var(--af-sub)",
                    fontFamily: M,
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
                    <circle cx={12} cy={13} r={8} />
                    <path d="M12 9v4l2 2" />
                    <path d="M5 3L2 6" />
                    <path d="M22 6l-3-3" />
                    <path d="M12 2v2" />
                  </svg>
                  00:43:52
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── right card: delivered — with stacked depth ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ position: "relative", paddingTop: 10 }}
          >
            {/* stack — back */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 8,
                right: 8,
                bottom: 10,
                borderRadius: 20,
                background: "var(--af-stack)",
                border: "1px solid var(--af-stack-brd)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            {/* stack — mid */}
            <div
              style={{
                position: "absolute",
                top: 5,
                left: 4,
                right: 4,
                bottom: 5,
                borderRadius: 20,
                background: "var(--af-stack)",
                border: "1px solid var(--af-stack-brd)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            {/* main card */}
            <div
              style={{
                position: "relative",
                width: 224,
                borderRadius: 20,
                background: "var(--af-card)",
                border: "1px solid var(--af-brd)",
                boxShadow: "var(--af-sh)",
                backdropFilter: "blur(32px) saturate(1.6)",
                WebkitBackdropFilter: "blur(32px) saturate(1.6)",
                color: "var(--af-txt)",
                padding: "22px 20px",
              }}
            >
              {/* top row: badge + order id */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px 5px 9px",
                    borderRadius: 999,
                    background: "var(--af-blue-bg)",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--af-blue)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--af-blue)",
                    }}
                  >
                    Delivered
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--af-sub)",
                    fontFamily: M,
                  }}
                >
                  #MPLN47
                </span>
              </div>

              {/* amount + inline metrics */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      letterSpacing: -1.5,
                      lineHeight: 1,
                    }}
                  >
                    $1,240
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--af-blue)",
                      fontWeight: 500,
                    }}
                  >
                    +8%
                  </span>
                  <span style={{ fontSize: 12, color: "var(--af-sub)" }}>
                    +$92,40
                  </span>
                </div>
              </div>

              {/* route visualization */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "stretch",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: "var(--af-orange)",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      width: 2,
                      minHeight: 22,
                      background: "var(--af-orange)",
                      opacity: 0.3,
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      border: "2px solid var(--af-orange)",
                      opacity: 0.5,
                      flexShrink: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingTop: 1,
                    paddingBottom: 1,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: 1.3,
                    }}
                  >
                    88 Colin P Kelly Jr St,
                    <br />
                    <span style={{ color: "var(--af-sub)" }}>
                      San Francisco, CA 94107
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--af-sub)",
                      lineHeight: 1.3,
                    }}
                  >
                    1 Hacker Way,
                    <br />
                    Menlo Park, CA 94025
                  </span>
                </div>
              </div>

              {/* footer */}
              <div
                style={{
                  height: 1,
                  background: "var(--af-sep)",
                  marginBottom: 14,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--af-sub)" }}>
                  Sep 28, 2025
                </span>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--af-pill-brd)",
                    fontSize: 10,
                    color: "var(--af-sub)",
                    fontFamily: M,
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
                    <circle cx={12} cy={13} r={8} />
                    <path d="M12 9v4l2 2" />
                    <path d="M5 3L2 6" />
                    <path d="M22 6l-3-3" />
                    <path d="M12 2v2" />
                  </svg>
                  01:12:08
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
