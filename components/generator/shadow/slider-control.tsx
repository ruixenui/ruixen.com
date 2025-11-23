"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SliderControl({
  label,
  min,
  max,
  step = 1,
  value,
  onValueChange,
  suffix,
  disabled,
  className,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number[];
  onValueChange: (v: number[]) => void;
  suffix?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-xs text-muted-foreground font-mono">
          {value[0]}
          {suffix}
        </span>
      </div>
      <Slider
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
}
