"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  type TextureSettings,
  type MaterialSettings,
  type MaterialPreset,
  materialPresets,
} from "./lib/types";
import { texturePresets } from "./lib/procedural-textures";
import {
  ChevronDown,
  Upload,
  Eraser,
  Box,
  Palette,
  Image as ImageIcon,
  Play,
  MousePointer,
  Sun,
  Paintbrush,
  RotateCcw,
  X,
  type LucideIcon,
} from "lucide-react";
import { type LightSettings } from "./lib/canvas-defaults";
import type { AnimationType } from "./engine";

interface ControlsPanelProps {
  depth: number;
  onDepthChange: (v: number) => void;
  smoothness: number;
  onSmoothnessChange: (v: number) => void;
  color: string;
  onColorChange: (v: string) => void;
  bgColor: string;
  onBgColorChange: (v: string) => void;
  textureUrl: string | null;
  onTextureUpload: (url: string | null) => void;
  textureSettings: TextureSettings;
  onTextureSettingsChange: (s: TextureSettings) => void;
  materialSettings: MaterialSettings;
  onMaterialSettingsChange: (s: MaterialSettings) => void;
  animate: AnimationType;
  onAnimateChange: (v: AnimationType) => void;
  animateSpeed: number;
  onAnimateSpeedChange: (v: number) => void;
  animateReverse: boolean;
  onAnimateReverseChange: (v: boolean) => void;
  lightSettings: LightSettings;
  onLightSettingsChange: (s: LightSettings) => void;
  cursorOrbit: boolean;
  onCursorOrbitChange: (v: boolean) => void;
  orbitStrength: number;
  onOrbitStrengthChange: (v: number) => void;
  resetOnIdle: boolean;
  onResetOnIdleChange: (v: boolean) => void;
  resetDelay: number;
  onResetDelayChange: (v: number) => void;
  rotationX: number;
  onRotationXChange: (v: number) => void;
  rotationY: number;
  onRotationYChange: (v: number) => void;
  zoom: number;
  onZoomChange: (v: number) => void;
  onReset: () => void;
  onClose?: () => void;
  onLightingSectionChange?: (open: boolean) => void;
}

const COLOR_PRESETS = [
  { hex: "#000000", name: "Black" },
  { hex: "#ef4444", name: "Red" },
  { hex: "#f97316", name: "Orange" },
  { hex: "#eab308", name: "Yellow" },
  { hex: "#22c55e", name: "Green" },
  { hex: "#06b6d4", name: "Cyan" },
  { hex: "#3b82f6", name: "Blue" },
  { hex: "#8b5cf6", name: "Purple" },
  { hex: "#ec4899", name: "Pink" },
  { hex: "#ffffff", name: "White" },
];

const MATERIAL_PRESET_NAMES: Record<MaterialPreset, string> = {
  default: "Default",
  plastic: "Plastic",
  metal: "Metal",
  glass: "Glass",
  rubber: "Rubber",
  chrome: "Chrome",
  gold: "Gold",
  clay: "Clay",
  emissive: "Emissive",
  holographic: "Holographic",
};

const ANIMATION_OPTIONS: { value: AnimationType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "spin", label: "Spin" },
  { value: "float", label: "Float" },
  { value: "pulse", label: "Pulse" },
  { value: "wobble", label: "Wobble" },
  { value: "swing", label: "Swing" },
  { value: "spinFloat", label: "Spin + Float" },
];

function Section({
  icon: Icon,
  title,
  open,
  onToggle,
  onOpenChange,
  children,
}: {
  icon: LucideIcon;
  title: string;
  open: boolean;
  onToggle: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  const toggle = () => {
    onToggle();
    onOpenChange?.(!open);
  };

  return (
    <div className="border-b border-foreground/10">
      <button
        onClick={toggle}
        className={`flex w-full items-center gap-2 py-3 px-4 cursor-pointer transition-colors ${open ? "bg-foreground/5" : "hover:bg-foreground/5"}`}
      >
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium flex-1 text-left">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-4 pb-4 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ControlsPanel({
  depth,
  onDepthChange,
  smoothness,
  onSmoothnessChange,
  color,
  onColorChange,
  bgColor,
  onBgColorChange,
  textureUrl,
  onTextureUpload,
  textureSettings,
  onTextureSettingsChange,
  materialSettings,
  onMaterialSettingsChange,
  animate,
  onAnimateChange,
  animateSpeed,
  onAnimateSpeedChange,
  animateReverse,
  onAnimateReverseChange,
  lightSettings,
  onLightSettingsChange,
  cursorOrbit,
  onCursorOrbitChange,
  orbitStrength,
  onOrbitStrengthChange,
  resetOnIdle,
  onResetOnIdleChange,
  resetDelay,
  onResetDelayChange,
  rotationX,
  onRotationXChange,
  rotationY,
  onRotationYChange,
  zoom,
  onZoomChange,
  onReset,
  onClose,
  onLightingSectionChange,
}: ControlsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [transformOpen, setTransformOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("object");
  const toggleSection = (name: string) =>
    setOpenSection((prev) => (prev === name ? null : name));

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onTextureUpload(url);
    }
  };

  const updateTexture = (partial: Partial<TextureSettings>) => {
    onTextureSettingsChange({ ...textureSettings, ...partial });
  };

  return (
    <div className="w-full rounded-xl bg-card/70 backdrop-blur-xl border border-foreground/10 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Settings
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <Section
          icon={Box}
          title="Object"
          open={openSection === "object"}
          onToggle={() => toggleSection("object")}
        >
          <div className="space-y-2">
            <div className="relative flex items-center gap-2 h-8 rounded-md border border-input bg-background/30 px-2 cursor-pointer overflow-hidden">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="h-4 w-4 rounded-sm border border-foreground/15 shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-mono text-muted-foreground">
                {color}
              </span>
            </div>
            <div className="flex gap-1.5">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  className={`h-5 w-5 rounded-full border border-foreground/15 transition-transform hover:scale-110 ${color.toLowerCase() === preset.hex.toLowerCase() ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
                  style={{ backgroundColor: preset.hex }}
                  onClick={() => onColorChange(preset.hex)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Depth
              </Label>
              <span className="text-xs text-muted-foreground font-mono">
                {depth.toFixed(1)}
              </span>
            </div>
            <Slider
              value={[depth]}
              onValueChange={([v]) => onDepthChange(v)}
              min={0.5}
              max={10}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Smoothness
              </Label>
              <span className="text-xs text-muted-foreground font-mono">
                {(smoothness * 100).toFixed(0)}%
              </span>
            </div>
            <Slider
              value={[smoothness]}
              onValueChange={([v]) => onSmoothnessChange(v)}
              min={0}
              max={1}
              step={0.05}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Zoom
              </Label>
              <span className="text-xs text-muted-foreground font-mono">
                {zoom.toFixed(1)}
              </span>
            </div>
            <Slider
              value={[zoom]}
              onValueChange={([v]) => onZoomChange(v)}
              min={2}
              max={20}
              step={0.5}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 w-full"
            onClick={() => {
              onRotationXChange(0);
              onRotationYChange(0);
              onZoomChange(8);
              onReset();
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Position
          </Button>
        </Section>

        <Section
          icon={Paintbrush}
          title="Background"
          open={openSection === "background"}
          onToggle={() => toggleSection("background")}
        >
          <div className="space-y-2">
            <div className="relative flex items-center gap-2 h-8 rounded-md border border-input bg-background/30 px-2 cursor-pointer overflow-hidden">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="h-4 w-4 rounded-sm border border-foreground/15 shrink-0"
                style={{ backgroundColor: bgColor }}
              />
              <span className="text-xs font-mono text-muted-foreground">
                {bgColor}
              </span>
            </div>
            <div className="flex gap-1.5">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={`bg-${preset.hex}`}
                  className={`h-5 w-5 rounded-full border border-foreground/15 transition-transform hover:scale-110 ${bgColor.toLowerCase() === preset.hex.toLowerCase() ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
                  style={{ backgroundColor: preset.hex }}
                  onClick={() => onBgColorChange(preset.hex)}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section
          icon={Palette}
          title="Material"
          open={openSection === "material"}
          onToggle={() => toggleSection("material")}
        >
          <div className="space-y-2">
            <select
              value={materialSettings.preset}
              onChange={(e) => {
                const key = e.target.value as MaterialPreset;
                const p = materialPresets[key];
                onMaterialSettingsChange({
                  ...materialSettings,
                  preset: key,
                  metalness: p.metalness,
                  roughness: p.roughness,
                  opacity: p.opacity,
                  transparent: p.transparent,
                });
              }}
              className="w-full h-8 rounded-md border border-input bg-background/30 px-3 pr-8 text-xs ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring appearance-none bg-no-repeat bg-[right_8px_center] bg-[length:12px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              }}
            >
              {(Object.keys(materialPresets) as MaterialPreset[]).map((key) => (
                <option key={key} value={key}>
                  {MATERIAL_PRESET_NAMES[key]}
                </option>
              ))}
            </select>
          </div>

          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger className="flex w-full items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${advancedOpen ? "rotate-0" : "-rotate-90"}`}
              />
              Advanced
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Metalness</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {materialSettings.metalness.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[materialSettings.metalness]}
                  onValueChange={([v]) =>
                    onMaterialSettingsChange({
                      ...materialSettings,
                      metalness: v,
                    })
                  }
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Roughness</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {materialSettings.roughness.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[materialSettings.roughness]}
                  onValueChange={([v]) =>
                    onMaterialSettingsChange({
                      ...materialSettings,
                      roughness: v,
                    })
                  }
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Opacity</Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {materialSettings.opacity.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={[materialSettings.opacity]}
                  onValueChange={([v]) =>
                    onMaterialSettingsChange({
                      ...materialSettings,
                      opacity: v,
                      transparent: v < 1,
                    })
                  }
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <Label htmlFor="wireframe" className="text-xs cursor-pointer">
                  Wireframe
                </Label>
                <Switch
                  id="wireframe"
                  checked={materialSettings.wireframe}
                  onCheckedChange={(checked) =>
                    onMaterialSettingsChange({
                      ...materialSettings,
                      wireframe: checked,
                    })
                  }
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Section>

        <Section
          icon={ImageIcon}
          title="Texture"
          open={openSection === "texture"}
          onToggle={() => toggleSection("texture")}
        >
          <TexturePresetPicker
            activeUrl={textureUrl}
            onSelect={onTextureUpload}
          />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </Button>
            {textureUrl && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5"
                onClick={() => onTextureUpload(null)}
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleTextureUpload}
          />

          {textureUrl && (
            <Collapsible open={transformOpen} onOpenChange={setTransformOpen}>
              <CollapsibleTrigger className="flex w-full items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${transformOpen ? "rotate-0" : "-rotate-90"}`}
                />
                Transform
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3">
                {(
                  [
                    {
                      label: "Repeat X",
                      key: "repeatX",
                      min: 0.1,
                      max: 5,
                      step: 0.05,
                      format: (v: number) => `${v.toFixed(2)}x`,
                    },
                    {
                      label: "Repeat Y",
                      key: "repeatY",
                      min: 0.1,
                      max: 5,
                      step: 0.05,
                      format: (v: number) => `${v.toFixed(2)}x`,
                    },
                    {
                      label: "Rotation",
                      key: "rotation",
                      min: -Math.PI,
                      max: Math.PI,
                      step: 0.01,
                      format: (v: number) =>
                        `${((v * 180) / Math.PI).toFixed(0)}\u00B0`,
                    },
                    {
                      label: "Offset X",
                      key: "offsetX",
                      min: -2,
                      max: 2,
                      step: 0.01,
                      format: (v: number) => v.toFixed(2),
                    },
                    {
                      label: "Offset Y",
                      key: "offsetY",
                      min: -2,
                      max: 2,
                      step: 0.01,
                      format: (v: number) => v.toFixed(2),
                    },
                  ] as const
                ).map(({ label, key, min, max, step, format }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs">{label}</Label>
                      <span className="text-xs text-muted-foreground font-mono">
                        {format(textureSettings[key])}
                      </span>
                    </div>
                    <Slider
                      value={[textureSettings[key]]}
                      onValueChange={([v]) => updateTexture({ [key]: v })}
                      min={min}
                      max={max}
                      step={step}
                    />
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </Section>

        <Section
          icon={Play}
          title="Animation"
          open={openSection === "animation"}
          onToggle={() => toggleSection("animation")}
        >
          <div className="space-y-2">
            <select
              value={animate}
              onChange={(e) => onAnimateChange(e.target.value as AnimationType)}
              className="w-full h-8 rounded-md border border-input bg-background/30 px-3 pr-8 text-xs ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring appearance-none bg-no-repeat bg-[right_8px_center] bg-[length:12px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              }}
            >
              {ANIMATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {animate !== "none" && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Speed
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {animateSpeed.toFixed(1)}x
                  </span>
                </div>
                <Slider
                  value={[animateSpeed]}
                  onValueChange={([v]) => onAnimateSpeedChange(v)}
                  min={0.1}
                  max={5}
                  step={0.1}
                />
              </div>

              {(animate === "spin" ||
                animate === "spinFloat" ||
                animate === "wobble" ||
                animate === "swing") && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="reverse" className="text-xs cursor-pointer">
                    Reverse Direction
                  </Label>
                  <Switch
                    id="reverse"
                    checked={animateReverse}
                    onCheckedChange={onAnimateReverseChange}
                  />
                </div>
              )}
            </>
          )}
        </Section>

        <Section
          icon={MousePointer}
          title="Behavior"
          open={openSection === "interaction"}
          onToggle={() => toggleSection("interaction")}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="cursor-orbit" className="text-xs cursor-pointer">
              Follow Cursor
            </Label>
            <Switch
              id="cursor-orbit"
              checked={cursorOrbit}
              onCheckedChange={onCursorOrbitChange}
            />
          </div>
          {cursorOrbit && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Strength
                </Label>
                <span className="text-xs text-muted-foreground font-mono">
                  {orbitStrength.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[orbitStrength]}
                onValueChange={([v]) => onOrbitStrengthChange(v)}
                min={0.01}
                max={0.5}
                step={0.01}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="reset-idle" className="text-xs cursor-pointer">
              Reset on Idle
            </Label>
            <Switch
              id="reset-idle"
              checked={resetOnIdle}
              onCheckedChange={onResetOnIdleChange}
            />
          </div>
          {resetOnIdle && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Delay
                </Label>
                <span className="text-xs text-muted-foreground font-mono">
                  {resetDelay.toFixed(1)}s
                </span>
              </div>
              <Slider
                value={[resetDelay]}
                onValueChange={([v]) => onResetDelayChange(v)}
                min={0.5}
                max={10}
                step={0.5}
              />
            </div>
          )}
        </Section>

        <Section
          icon={Sun}
          title="Lighting"
          open={openSection === "lighting"}
          onToggle={() => toggleSection("lighting")}
          onOpenChange={onLightingSectionChange}
        >
          {(
            [
              {
                key: "keyX",
                label: "Key Light X",
                min: -10,
                max: 10,
                step: 0.5,
              },
              {
                key: "keyY",
                label: "Key Light Y",
                min: -10,
                max: 10,
                step: 0.5,
              },
              {
                key: "keyZ",
                label: "Key Light Z",
                min: -10,
                max: 10,
                step: 0.5,
              },
              {
                key: "keyIntensity",
                label: "Key Intensity",
                min: 0,
                max: 5,
                step: 0.1,
              },
              {
                key: "ambientIntensity",
                label: "Ambient",
                min: 0,
                max: 2,
                step: 0.05,
              },
            ] as const
          ).map(({ key, label, min, max, step }) => (
            <div className="space-y-2" key={key}>
              <div className="flex justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  {label}
                </Label>
                <span className="text-xs text-muted-foreground font-mono">
                  {lightSettings[key].toFixed(
                    key === "ambientIntensity" ? 2 : 1,
                  )}
                </span>
              </div>
              <Slider
                value={[lightSettings[key]]}
                onValueChange={([v]) =>
                  onLightSettingsChange({ ...lightSettings, [key]: v })
                }
                min={min}
                max={max}
                step={step}
              />
            </div>
          ))}

          <div className="flex items-center justify-between pt-1">
            <Label htmlFor="shadow" className="text-xs cursor-pointer">
              Shadows
            </Label>
            <Switch
              id="shadow"
              checked={lightSettings.shadowEnabled}
              onCheckedChange={(checked) =>
                onLightSettingsChange({
                  ...lightSettings,
                  shadowEnabled: checked,
                })
              }
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

function TexturePresetPicker({
  activeUrl,
  onSelect,
}: {
  activeUrl: string | null;
  onSelect: (url: string | null) => void;
}) {
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    const generated: Record<string, string> = {};
    texturePresets.forEach((preset) => {
      generated[preset.name] = preset.generate();
    });
    setPreviews(generated);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {texturePresets.map((preset) => {
        const previewUrl = previews[preset.name];
        const isActive =
          selectedName === preset.name && activeUrl === previewUrl;
        return (
          <Tooltip key={preset.name}>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  if (!previewUrl) return;
                  if (isActive) {
                    setSelectedName(null);
                    onSelect(null);
                  } else {
                    setSelectedName(preset.name);
                    onSelect(previewUrl);
                  }
                }}
                className={`h-10 w-10 rounded-full overflow-hidden border border-foreground/15 transition-all hover:scale-110 ${isActive ? "ring-2 ring-primary" : ""} ${!previewUrl ? "bg-muted animate-pulse" : ""}`}
              >
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt={preset.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">{preset.name}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
