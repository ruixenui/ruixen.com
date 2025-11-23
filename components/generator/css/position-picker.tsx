"use client";

import * as React from "react";
import type { GradientOrigin } from "@/lib/use-gradient";
import { cn } from "@/lib/utils";

interface PositionPickerProps {
  origin: GradientOrigin;
  onChange: (origin: GradientOrigin) => void;
}

export function PositionPicker({ origin, onChange }: PositionPickerProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const handle = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    onChange({ x, y });
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
    handle(e.clientX, e.clientY);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragging) return;
    e.preventDefault();
    handle(e.clientX, e.clientY);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () =>
    setDragging(false);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-500">Origin</p>
      <div
        ref={ref}
        className="relative h-28 w-full cursor-crosshair rounded-md border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setDragging(false)}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.25),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(15,23,42,0.9),transparent_40%)] mix-blend-screen" />
        <div
          className={cn(
            "pointer-events-none absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 shadow-[0_0_0_4px_rgba(0,0,0,0.55)] bg-white/80",
          )}
          style={{
            left: `${origin.x * 100}%`,
            top: `${origin.y * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
