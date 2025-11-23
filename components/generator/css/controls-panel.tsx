"use client";

import * as React from "react";
import type {
  GradientState,
  GradientType,
  BlendMode,
} from "@/lib/use-gradient";
import { AngleControl } from "./angle-control";
import { TypeSelector } from "./type-selector";
import { PositionPicker } from "./position-picker";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ControlsPanelProps {
  gradient: GradientState;
  onTypeChange: (type: GradientType) => void;
  onAngleChange: (value: number) => void;
  onOriginChange: (origin: GradientState["origin"]) => void;
  onBlendModeChange: (mode: BlendMode) => void;
  onSmoothnessChange: (v: number) => void;
  onReverse: () => void;
  onShuffle: () => void;
  onRandom: () => void;
}

const BLEND_MODES: BlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "soft-light",
  "color-dodge",
  "color-burn",
];

export function ControlsPanel({
  gradient,
  onTypeChange,
  onAngleChange,
  onOriginChange,
  onBlendModeChange,
  onSmoothnessChange,
  onReverse,
  onShuffle,
  onRandom,
}: ControlsPanelProps) {
  return (
    <div className="space-y-4 rounded-xl border border-white/10 p-4 backdrop-blur-xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TypeSelector value={gradient.type} onChange={onTypeChange} />
        {(gradient.type === "radial" || gradient.type === "conic") && (
          <PositionPicker origin={gradient.origin} onChange={onOriginChange} />
        )}
      </div>

      {gradient.type === "linear" && (
        <div className="mt-2">
          <AngleControl value={gradient.angle} onChange={onAngleChange} />
        </div>
      )}

      {gradient.type === "conic" && (
        <div className="mt-2">
          <AngleControl value={gradient.angle} onChange={onAngleChange} />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Blend Mode</p>
          <Select
            value={gradient.blendMode}
            onValueChange={(v) => onBlendModeChange(v as BlendMode)}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BLEND_MODES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-slate-400">
            Blends gradient with black background layer.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Smoothness</span>
            <span>{Math.round(gradient.smoothness * 100)}%</span>
          </div>
          <Slider
            value={[gradient.smoothness * 100]}
            min={0}
            max={100}
            step={5}
            onValueChange={([v]) => onSmoothnessChange(v / 100)}
          />
          <p className="text-[10px] text-slate-500">
            Conceptual smoothness parameter you can map to your own rendering.
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <Button variant="outline" size="sm" onClick={onReverse}>
          Reverse Gradient
        </Button>
        <Button variant="outline" size="sm" onClick={onShuffle}>
          Shuffle Colors
        </Button>
        <Button variant="default" size="sm" onClick={onRandom}>
          Randomize
        </Button>
      </div>
    </div>
  );
}
