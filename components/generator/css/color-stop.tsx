"use client";

import * as React from "react";
import type { ColorStop } from "@/lib/use-gradient";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { GripVertical, Lock, Unlock, Pipette, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorStopProps {
  stop: ColorStop;
  index: number;
  total: number;
  onChange: (patch: Partial<ColorStop>) => void;
  onRemove: () => void;
  onToggleLock: () => void;
  onEyedrop?: (color: string) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

type ColorMode = "hex" | "rgb" | "hsl";

declare global {
  interface Window {
    EyeDropper?: any;
  }
}

export function ColorStopRow({
  stop,
  index,
  total,
  onChange,
  onRemove,
  onToggleLock,
  onEyedrop,
  dragHandleProps,
}: ColorStopProps) {
  const [mode, setMode] = React.useState<ColorMode>("hex");
  const [hex, setHex] = React.useState(stop.color);
  const [rgb, setRgb] = React.useState(rgbFromHex(stop.color));
  const [hsl, setHsl] = React.useState(hslFromHex(stop.color));

  React.useEffect(() => {
    setHex(stop.color);
    setRgb(rgbFromHex(stop.color));
    setHsl(hslFromHex(stop.color));
  }, [stop.color]);

  const updateColorFromHex = (value: string) => {
    setHex(value);
    onChange({ color: value });
    setRgb(rgbFromHex(value));
    setHsl(hslFromHex(value));
  };

  const tryEyedrop = async () => {
    if (!window.EyeDropper) return;
    try {
      const ed = new window.EyeDropper();
      const res = await ed.open();
      if (res?.sRGBHex) {
        updateColorFromHex(res.sRGBHex);
        onEyedrop?.(res.sRGBHex);
      }
    } catch {
      // ignore
    }
  };

  const onRgbChange = (field: keyof typeof rgb, value: string) => {
    const v = Number(value);
    const newRgb = { ...rgb, [field]: isNaN(v) ? rgb[field] : v };
    setRgb(newRgb);
    const toHex = hexFromRgb(newRgb);
    setHex(toHex);
    onChange({ color: toHex });
    setHsl(hslFromHex(toHex));
  };

  const onHslChange = (field: keyof typeof hsl, value: string) => {
    const v = Number(value);
    const newHsl = { ...hsl, [field]: isNaN(v) ? hsl[field] : v };
    setHsl(newHsl);
    const hex = hexFromHsl(newHsl.h, newHsl.s, newHsl.l);
    setHex(hex);
    onChange({ color: hex });
    setRgb(rgbFromHex(hex));
  };

  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card px-3 py-3">
      <button
        className={cn(
          "mt-1 cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
        )}
        {...dragHandleProps}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div
              className="h-7 w-7 rounded-md border border-white/20 shadow-sm"
              style={{
                backgroundImage: `linear-gradient(45deg,#0000 25%,#0003 25%,#0003 50%,#0000 50%,#0000 75%,#0003 75%,#0003 100%)`,
                backgroundSize: "8px 8px",
              }}
            />
            <div
              className="absolute inset-[2px] rounded-[4px] border border-white/30"
              style={{ backgroundColor: stop.color, opacity: stop.opacity }}
            />
            <input
              type="color"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              value={hex}
              onChange={(e) => updateColorFromHex(e.target.value)}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <Input
                className="h-8 text-xs font-mono"
                value={hex}
                onChange={(e) => updateColorFromHex(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-xs">
                    {mode.toUpperCase()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 space-y-3 bg-slate-900/95">
                  <div className="flex gap-1 text-xs">
                    <Button
                      variant={mode === "hex" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setMode("hex")}
                    >
                      HEX
                    </Button>
                    <Button
                      variant={mode === "rgb" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setMode("rgb")}
                    >
                      RGB
                    </Button>
                    <Button
                      variant={mode === "hsl" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setMode("hsl")}
                    >
                      HSL
                    </Button>
                  </div>
                  {mode === "hex" && (
                    <Input
                      className="h-8 text-xs font-mono"
                      value={hex}
                      onChange={(e) => updateColorFromHex(e.target.value)}
                    />
                  )}
                  {mode === "rgb" && (
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div>
                        <p className="mb-1 text-slate-400">R</p>
                        <Input
                          className="h-8 text-xs"
                          value={rgb.r}
                          onChange={(e) => onRgbChange("r", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-slate-400">G</p>
                        <Input
                          className="h-8 text-xs"
                          value={rgb.g}
                          onChange={(e) => onRgbChange("g", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-slate-400">B</p>
                        <Input
                          className="h-8 text-xs"
                          value={rgb.b}
                          onChange={(e) => onRgbChange("b", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {mode === "hsl" && (
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div>
                        <p className="mb-1 text-slate-400">H</p>
                        <Input
                          className="h-8 text-xs"
                          value={hsl.h}
                          onChange={(e) => onHslChange("h", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-slate-400">S</p>
                        <Input
                          className="h-8 text-xs"
                          value={hsl.s}
                          onChange={(e) => onHslChange("s", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-slate-400">L</p>
                        <Input
                          className="h-8 text-xs"
                          value={hsl.l}
                          onChange={(e) => onHslChange("l", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              <Button
                variant={stop.locked ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={onToggleLock}
                title={stop.locked ? "Unlock" : "Lock"}
              >
                {stop.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                type="button"
                onClick={tryEyedrop}
                title="Eyedropper"
              >
                <Pipette className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={total <= 2}
                onClick={onRemove}
                title="Remove"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <span>Position</span>
                  <span>{Math.round(stop.position * 100)}%</span>
                </div>
                <Slider
                  value={[stop.position * 100]}
                  min={0}
                  max={100}
                  onValueChange={([v]) => onChange({ position: v / 100 })}
                />
              </div>
              <div className="w-28 space-y-1">
                <div className="flex justify-between">
                  <span>Opacity</span>
                  <span>{Math.round(stop.opacity * 100)}%</span>
                </div>
                <Slider
                  value={[stop.opacity * 100]}
                  min={0}
                  max={100}
                  onValueChange={([v]) => onChange({ opacity: v / 100 })}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Stop {index + 1}</p>
      </div>
    </div>
  );
}

/* ------ color conversion helpers (local to this file) ------ */

function rgbFromHex(hex: string) {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6) return { r: 255, g: 255, b: 255 };
  const num = parseInt(h, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function hexFromRgb(rgb: { r: number; g: number; b: number }) {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function hslFromHex(hex: string) {
  const { r, g, b } = rgbFromHex(hex);
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rf:
        h = ((gf - bf) / d + (gf < bf ? 6 : 0)) * 60;
        break;
      case gf:
        h = ((bf - rf) / d + 2) * 60;
        break;
      case bf:
        h = ((rf - gf) / d + 4) * 60;
        break;
    }
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hexFromHsl(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let [rf, gf, bf] = [0, 0, 0];

  if (hp >= 0 && hp < 1) [rf, gf, bf] = [c, x, 0];
  else if (hp >= 1 && hp < 2) [rf, gf, bf] = [x, c, 0];
  else if (hp >= 2 && hp < 3) [rf, gf, bf] = [0, c, x];
  else if (hp >= 3 && hp < 4) [rf, gf, bf] = [0, x, c];
  else if (hp >= 4 && hp < 5) [rf, gf, bf] = [x, 0, c];
  else if (hp >= 5 && hp < 6) [rf, gf, bf] = [c, 0, x];

  const m = l - c / 2;
  return hexFromRgb({
    r: (rf + m) * 255,
    g: (gf + m) * 255,
    b: (bf + m) * 255,
  });
}
