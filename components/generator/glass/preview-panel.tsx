// components/glass/PreviewPanel.tsx
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HoverPreview from "./hover-preview";
import { GlassState, rgba, withAlpha } from "@/lib/glass";
import { cn } from "@/lib/utils";

type Props = { value: GlassState; onChange: (v: Partial<GlassState>) => void };

export default function PreviewPanel({ value }: Props) {
  const [simulateHover, setSimulateHover] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    value.background.darkMode ? "dark" : "light",
  );

  const canvasClass = useMemo(() => {
    const common = "relative overflow-hidden rounded-xl";
    return theme === "dark"
      ? cn(common, "bg-neutral-950 text-neutral-50")
      : cn(common, "bg-neutral-50 text-neutral-900");
  }, [theme]);

  const canvasBgStyle = useMemo(() => {
    const b = value.background;
    if (b.type === "image") {
      return {
        backgroundImage: `url(${b.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as const;
    }
    if (b.type === "grid") {
      const size = b.gridSize ?? 24;
      const color =
        theme === "dark" ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)";
      return {
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      } as const;
    }
    if (b.type === "noise") {
      const opacity = b.noiseOpacity ?? 0.08;
      const noise = `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch' /></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${opacity}'/></svg>`,
      )}`;
      return {
        backgroundImage: `url("${noise}")`,
        backgroundSize: "auto",
      } as const;
    }
    // frosted: subtle gradient blobs
    const blob1 =
      theme === "dark" ? "rgba(96, 165, 250, .22)" : "rgba(147, 197, 253, .35)";
    const blob2 =
      theme === "dark"
        ? "rgba(244, 114, 182, .16)"
        : "rgba(251, 113, 133, .24)";
    return {
      backgroundImage: `radial-gradient(800px 400px at 10% 10%, ${blob1}, transparent 60%), radial-gradient(800px 400px at 90% 90%, ${blob2}, transparent 55%)`,
    } as const;
  }, [value.background, theme]);

  const cardStyle = useMemo(() => {
    const sat = value.saturate / 100;
    const baseBg = rgba(withAlpha(value.bgColor, value.opacity));
    const border = rgba(value.borderColor);
    const hoverBg = rgba(withAlpha(value.bgColor, value.hoverOpacity));

    const normal: React.CSSProperties = {
      background: baseBg,
      backdropFilter: `blur(${value.blur}px) saturate(${sat})`,
      WebkitBackdropFilter: `blur(${value.blur}px) saturate(${sat})`,
      border: `${value.borderWidth}px solid ${border}`,
      borderRadius: `${value.radius}px`,
      boxShadow: value.shadow
        ? `0 10px 30px rgba(0,0,0,${0.06 + value.shadowIntensity * 0.24})`
        : "none",
      transition:
        "background .2s ease, backdrop-filter .2s ease, box-shadow .2s ease, border-color .2s ease",
    };
    const hovered: React.CSSProperties = value.hoverEnabled
      ? {
          background: hoverBg,
          backdropFilter: `blur(${value.hoverBlur}px) saturate(${sat})`,
          WebkitBackdropFilter: `blur(${value.hoverBlur}px) saturate(${sat})`,
          boxShadow: value.hoverShadow
            ? `0 10px 34px rgba(0,0,0,${0.06 + value.shadowIntensity * 0.29})`
            : normal.boxShadow,
        }
      : {};
    return simulateHover ? { ...normal, ...hovered } : normal;
  }, [value, simulateHover]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Preview</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={simulateHover ? "default" : "outline"}
              size="sm"
              onClick={() => setSimulateHover((s) => !s)}
            >
              {simulateHover ? "Hover" : "Normal"}
            </Button>
            <Button
              variant={mobile ? "default" : "outline"}
              size="sm"
              onClick={() => setMobile((s) => !s)}
            >
              {mobile ? "Mobile" : "Desktop"}
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
            >
              {theme === "dark" ? "light" : "Dark"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div
          className={canvasClass}
          style={{ ...canvasBgStyle, height: mobile ? 280 : 320 }}
        >
          {/* Example content behind the glass card */}
          <div
            className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full blur-3xl opacity-40"
            style={{ background: "linear-gradient(45deg, #60a5fa, #f472b6)" }}
          />
          <div
            className="pointer-events-none absolute -right-20 -bottom-16 h-56 w-56 rounded-full blur-3xl opacity-40"
            style={{ background: "linear-gradient(135deg, #34d399, #fbbf24)" }}
          />

          <div className="absolute inset-0 p-6 sm:p-10">
            <HoverPreview enabled={simulateHover}>
              <div className="relative max-w-md mx-auto">
                <div className="glass-card p-6 sm:p-8" style={cardStyle}>
                  {/* overlay */}
                  {value.gradientOverlay && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit]"
                      style={{
                        background: `linear-gradient(${value.gradientAngle}deg, rgba(255,255,255,0.20), rgba(255,255,255,0.02))`,
                      }}
                    />
                  )}
                  {/* card content */}
                  <div className="relative z-10 space-y-2">
                    <h4 className="font-semibold">Glass Card</h4>
                    <p className="text-sm opacity-80">
                      Real‑time backdrop blur, saturation, borders, shadows &
                      hover effects.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button size="sm" variant="default">
                        Primary
                      </Button>
                      <Button size="sm" variant="outline">
                        Secondary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </HoverPreview>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
