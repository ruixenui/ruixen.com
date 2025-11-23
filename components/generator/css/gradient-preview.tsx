"use client";

import * as React from "react";
import type { GradientState, GradientOrigin } from "@/lib/use-gradient";
import { gradientToCSSValue } from "@/utils/generate-css";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface GradientPreviewProps {
  gradient: GradientState;
  onOriginChange: (origin: GradientOrigin) => void;
}

export function GradientPreview({
  gradient,
  onOriginChange,
}: GradientPreviewProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const handlePointer = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    onOriginChange({ x, y });
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
    handlePointer(e.clientX, e.clientY);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragging) return;
    e.preventDefault();
    handlePointer(e.clientX, e.clientY);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
    setDragging(false);
  };

  const cssValue = gradientToCSSValue(gradient);

  const originStyle = {
    left: `${gradient.origin.x * 100}%`,
    top: `${gradient.origin.y * 100}%`,
  };

  return (
    <Card className="relative h-[320px] w-full overflow-hidden py-0 border border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div
        ref={ref}
        className="relative h-full w-full cursor-crosshair"
        style={{
          backgroundImage: cssValue,
          mixBlendMode: gradient.blendMode,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setDragging(false)}
      >
        {/* subtle overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.6),transparent_45%)]" />

        {/* origin handle - only show for radial and conic */}
        {(gradient.type === "radial" || gradient.type === "conic") && (
          <div
            className={cn(
              "pointer-events-none absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80",
              dragging ? "bg-white" : "bg-white/70",
            )}
            style={originStyle}
          >
            <div className="absolute inset-0 animate-pulse rounded-full border border-white/40" />
          </div>
        )}
      </div>
    </Card>
  );
}
