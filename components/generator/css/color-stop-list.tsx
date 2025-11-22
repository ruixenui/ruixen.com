"use client";

import * as React from "react";
import type { ColorStop } from "@/lib/use-gradient";
import { Button } from "@/components/ui/button";
import { ColorStopRow } from "./color-stop";

interface ColorStopListProps {
  stops: ColorStop[];
  onAddStop: () => void;
  onUpdateStop: (id: string, patch: Partial<ColorStop>) => void;
  onRemoveStop: (id: string) => void;
  onToggleLock: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export function ColorStopList({
  stops,
  onAddStop,
  onUpdateStop,
  onRemoveStop,
  onToggleLock,
  onReorder,
}: ColorStopListProps) {
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-200">Color Stops</p>
        <Button size="sm" variant="outline" onClick={onAddStop}>
          + Add Stop
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {stops.map((stop, index) => (
          <div
            key={stop.id}
            draggable
            onDragStart={(e) => {
              setDragIndex(index);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex === null || dragIndex === index) return;
              onReorder(dragIndex, index);
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
          >
            <ColorStopRow
              stop={stop}
              index={index}
              total={stops.length}
              onChange={(patch) => onUpdateStop(stop.id, patch)}
              onRemove={() => onRemoveStop(stop.id)}
              onToggleLock={() => onToggleLock(stop.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
