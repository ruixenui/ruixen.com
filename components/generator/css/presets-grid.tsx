"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { gradientToCSSValue } from "@/utils/generate-css";
import { PRESET_CATEGORIES, PRESET_GRADIENTS, type GradientPreset } from "@/utils/preset-gradients";

interface PresetsGridProps {
  onSelectPreset: (preset: GradientPreset) => void;
  onRandom: () => void;
}

export function PresetsGrid({ onSelectPreset, onRandom }: PresetsGridProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            Presets
          </CardTitle>
          <Button size="sm" variant="outline" onClick={onRandom} className="gap-2">
            <Shuffle className="h-3 w-3" />
            Random
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Trending">
          <TabsList className="grid w-full grid-cols-8">
            {PRESET_CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {PRESET_CATEGORIES.map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PRESET_GRADIENTS.filter((p) => p.category === cat).map((preset) => (
                  <a href="#generator" key={preset.id}>
                    <button
                      onClick={() => onSelectPreset(preset)}
                      className="group relative h-20 w-full overflow-hidden rounded-lg border hover:border-primary transition-all"
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: gradientToCSSValue({
                            ...presetToStateLite(preset),
                            blendMode: "normal",
                            smoothness: 1,
                          }),
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                      <span className="relative z-10 m-2 inline-block rounded-md bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-medium">
                        {preset.name}
                      </span>
                    </button>
                  </a>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

// local light state for preview
function presetToStateLite(preset: GradientPreset) {
  return {
    type: preset.type,
    angle: preset.angle ?? 135,
    origin: preset.origin ?? { x: 0.5, y: 0.5 },
    stops: preset.stops.map((s, idx) => ({
      id: `${preset.id}-${idx}`,
      position: s.position,
      color: s.color,
      opacity: typeof s.opacity === "number" ? s.opacity : 1,
    })),
    blendMode: "normal" as const,
    smoothness: 1,
  };
}
