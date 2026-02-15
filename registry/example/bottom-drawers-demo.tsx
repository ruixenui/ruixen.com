"use client";

import { BottomDrawers } from "@/registry/ruixenui/bottom-drawers";
import { Play, SkipBack, SkipForward } from "lucide-react";

export default function BottomDrawersDemo() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: 460, background: "rgba(10,10,12,1)" }}
    >
      {/* Background — simulated app surface */}
      <div style={{ padding: "24px 20px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.15)",
            marginBottom: 16,
          }}
        >
          Library
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                background: `rgba(255,255,255,${0.015 + i * 0.003})`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.03)",
                  width: `${85 - i * 12}%`,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.02)",
                  width: `${50 - i * 6}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <BottomDrawers
        defaultSnap={0}
        peek={
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Now Playing
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.75)",
                marginTop: 8,
              }}
            >
              Midnight City
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                marginTop: 3,
              }}
            >
              M83 &middot; Hurry Up, We&apos;re Dreaming
            </div>
          </div>
        }
        half={
          <div>
            {/* Separator */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.05)",
                margin: "16px 0",
              }}
            />

            {/* Progress */}
            <div
              style={{
                height: 2,
                borderRadius: 1,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "62%",
                  height: "100%",
                  borderRadius: 1,
                  background: "rgba(255,255,255,0.3)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                2:34
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                4:12
              </span>
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 40,
                marginTop: 20,
              }}
            >
              <SkipBack
                style={{
                  width: 15,
                  height: 15,
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Play
                  style={{
                    width: 16,
                    height: 16,
                    color: "rgba(255,255,255,0.65)",
                    marginLeft: 2,
                  }}
                />
              </div>
              <SkipForward
                style={{
                  width: 15,
                  height: 15,
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        }
        full={
          <div>
            {/* Separator */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.05)",
                margin: "18px 0 14px",
              }}
            />

            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.18)",
                marginBottom: 10,
              }}
            >
              Up Next
            </div>

            {[
              { title: "Outro", artist: "M83" },
              { title: "Wait", artist: "M83" },
              { title: "Raconte-Moi Une Histoire", artist: "M83" },
            ].map((song, i) => (
              <div
                key={i}
                style={{
                  padding: "7px 0",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 450,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {song.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.18)",
                    marginTop: 1,
                  }}
                >
                  {song.artist}
                </div>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
