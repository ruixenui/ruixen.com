"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface AngleControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function AngleControl({ value, onChange }: AngleControlProps) {
  const [internal, setInternal] = React.useState(value);

  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  const commit = (v: number) => {
    const clamped = ((v % 360) + 360) % 360;
    onChange(clamped);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-300">
        <span>Angle</span>
        <span>{Math.round(value)}°</span>
      </div>
      <Slider
        value={[internal]}
        min={0}
        max={360}
        step={1}
        onValueChange={([v]) => setInternal(v)}
        onValueCommit={([v]) => commit(v)}
      />
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          className="h-8 w-20 text-xs"
          value={Math.round(internal)}
          onChange={(e) => {
            const v = Number(e.target.value);
            setInternal(v);
          }}
          onBlur={() => commit(internal)}
        />
        <span className="text-xs text-slate-400">deg</span>
      </div>
    </div>
  );
}
