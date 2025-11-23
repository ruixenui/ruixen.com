// components/glass/PresetGallery.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassState, rgba } from "@/lib/glass";
import type { NamedPreset } from "@/data/presets";
import Link from "next/link";

type Props = {
  builtins: NamedPreset[];
  current: GlassState;
  onApply: (state: GlassState) => void;
};

type CustomPreset = { id: string; name: string; state: GlassState };

const LS_KEY = "glass-custom-presets-v1";

function PresetCard({
  preset,
  onClick,
}: {
  preset: NamedPreset;
  onClick: () => void;
}) {
  const { state } = preset;
  const bgColor = rgba(state.bgColor);
  const borderColor = rgba(state.borderColor);
  const sat = state.saturate / 100;

  const cardStyle: React.CSSProperties = {
    background: bgColor,
    backdropFilter: `blur(${state.blur}px) saturate(${sat})`,
    WebkitBackdropFilter: `blur(${state.blur}px) saturate(${sat})`,
    border: `${state.borderWidth}px solid ${borderColor}`,
    borderRadius: `${state.radius}px`,
    boxShadow: state.shadow
      ? `0 8px 24px rgba(0,0,0,${0.06 + state.shadowIntensity * 0.2})`
      : "none",
  };

  // Generate unique background based on preset colors
  const bgGradient = `radial-gradient(circle at 20% 30%, ${rgba({ ...state.bgColor, a: 0.4 })}, transparent 50%), radial-gradient(circle at 80% 70%, ${rgba({ ...state.borderColor, a: 0.3 })}, transparent 50%)`;

  return (
    <Link href="#generator">
      <button
        onClick={onClick}
        className="group relative overflow-hidden rounded-lg border hover:border-primary transition-all w-full"
      >
        <div
          className="aspect-video relative"
          style={{ background: bgGradient }}
        >
          {/* Glass card preview */}
          <div className="absolute inset-0 p-3 flex items-center justify-center">
            <div className="w-full h-full" style={cardStyle}>
              {state.gradientOverlay && (
                <div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  style={{
                    background: `linear-gradient(${state.gradientAngle}deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))`,
                  }}
                />
              )}
            </div>
          </div>
          {/* Label */}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-xs font-medium px-2 py-1 rounded bg-background/90 backdrop-blur-sm text-center truncate">
              {preset.name}
            </div>
          </div>
        </div>
      </button>
    </Link>
  );
}

export default function PresetGallery({ builtins, current, onApply }: Props) {
  const [name, setName] = useState("");
  const [custom, setCustom] = useState<CustomPreset[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setCustom(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const saveCustom = () => {
    if (!name.trim()) return;
    const np: CustomPreset = {
      id: crypto.randomUUID(),
      name: name.trim(),
      state: current,
    };
    const next = [np, ...custom].slice(0, 40);
    setCustom(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setName("");
  };

  const removeCustom = (id: string) => {
    const next = custom.filter((c) => c.id !== id);
    setCustom(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Presets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Name your preset..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveCustom()}
            className="flex-1"
          />
          <Button onClick={saveCustom} disabled={!name.trim()}>
            Save Current
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Built-in Presets</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {builtins.map((p) => (
              <PresetCard
                key={p.id}
                preset={p}
                onClick={() => onApply(p.state)}
              />
            ))}
          </div>
        </div>

        {custom.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-3">Your Presets</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {custom.map((p) => (
                <div key={p.id} className="relative group">
                  <PresetCard preset={p} onClick={() => onApply(p.state)} />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCustom(p.id);
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
