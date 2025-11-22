// app/gradient-generator/page.tsx
"use client";

import * as React from "react";
import { useGradient } from "@/lib/use-gradient";
import { GradientPreview } from "@/components/generator/css/gradient-preview";
import { ControlsPanel } from "@/components/generator/css/controls-panel";
import { ColorStopList } from "@/components/generator/css/color-stop-list";
import { PresetsGrid } from "@/components/generator/css/presets-grid";
import { ExportButtons } from "@/components/generator/css/export-buttons";


export default function GradientGeneratorPage() {
  const {
    gradient,
    setType,
    setAngle,
    setOrigin,
    addStop,
    updateStop,
    removeStop,
    reorderStops,
    reverseStops,
    shuffleStops,
    toggleStopLock,
    setBlendMode,
    setSmoothness,
    applyPreset,
    randomize,
  } = useGradient();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:px-6 lg:py-16">
        <header className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            CSS Gradient Generator
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Create beautiful gradients with pixel-perfect control. Drag stops, adjust colors, and export as CSS, Tailwind, PNG, or SVG.
          </p>
        </header>

        <section id="generator" className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <GradientPreview gradient={gradient} onOriginChange={setOrigin} />
            <ColorStopList
              stops={gradient.stops}
              onAddStop={() => addStop()}
              onUpdateStop={updateStop}
              onRemoveStop={removeStop}
              onToggleLock={toggleStopLock}
              onReorder={reorderStops}
            />
          </div>

          <div className="space-y-4">
            <ControlsPanel
              gradient={gradient}
              onTypeChange={setType}
              onAngleChange={setAngle}
              onOriginChange={setOrigin}
              onBlendModeChange={setBlendMode}
              onSmoothnessChange={setSmoothness}
              onReverse={reverseStops}
              onShuffle={shuffleStops}
              onRandom={randomize}
            />
            <PresetsGrid
              onSelectPreset={applyPreset}
              onRandom={randomize}
            />
            <ExportButtons gradient={gradient} />
          </div>
        </section>
      </div>
    </main>
  );
}