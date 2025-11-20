"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ControlPanel from "./control-panel"
import PreviewPanel from "./preview-panel"
import CodeOutput from "./code-output"
import PresetGallery from "./preset-gallery"
import { defaultShadowState, ShadowState, buildLayersFromBase } from "@/lib/shadow"

export default function ShadowGeneratorPage() {
  const [state, setState] = useState<ShadowState>(() => {
    const s = { ...defaultShadowState }
    s.layers = buildLayersFromBase(s.base)
    return s
  })

  // when base changes and manual edits are not locked, rebuild layers
  useEffect(() => {
    if (!state.manual) {
      setState((s) => ({ ...s, layers: buildLayersFromBase(s.base) }))
    }
  }, [state.base.layers, state.base.x, state.base.y, state.base.blur, state.base.spread, state.base.opacity, state.base.color, state.base.inset, state.manual])

  const update = (patch: Partial<ShadowState>) => setState((s) => ({ ...s, ...patch }))

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Shadow Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Create modern shadows for cards, modals, and buttons. Build smooth, layered, hard, inset, and neumorphism shadows.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#generator"><Button size="lg">Start Creating</Button></a>
            <a href="#presets"><Button variant="outline" size="lg">View Presets</Button></a>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section id="generator" className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <ControlPanel state={state} setState={setState} />
          </div>
          <div className="space-y-4">
            <PreviewPanel state={state} setState={setState} />
            <CodeOutput state={state} />
          </div>
        </div>
      </section>

      {/* Presets */}
      <section id="presets" className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <PresetGallery state={state} setState={setState} />
      </section>

      {/* SEO long‑form */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <SeoArticle />
      </section>
    </main>
  )
}

function SeoArticle() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h2>What is a Shadow Generator?</h2>
      <p>
        Modern interfaces rely on shadows to suggest depth, focus, and affordance. A good shadow is rarely a single,
        dark blur. Professional shadows blend <em>multiple layers</em> with different radii and opacities to simulate
        umbra, penumbra, and ambient light. This tool builds those layers automatically, with real‑time preview and one‑click export.
      </p>
      <h3>How to tune shadows</h3>
      <ul>
        <li><strong>Blur vs. spread:</strong> Blur controls softness; spread expands the footprint. For crisp buttons set spread near 0.</li>
        <li><strong>Opacity:</strong> Keep values low. Most UI shadows live between 0.06 and 0.24 per layer.</li>
        <li><strong>Offset:</strong> Positive Y pushes shadows down for natural lighting; use negative Y sparingly.</li>
        <li><strong>Layers:</strong> Two to three layers often read best. Increase blur with distance and reduce opacity per layer.</li>
      </ul>
      <h3>Why many shadows look bad</h3>
      <p>
        They’re too dark, too sharp, or use a single layer. Instead, combine multiple subtle layers and ensure sufficient
        contrast with the background. Use presets (Material, Soft UI, Floating) as starting points and refine.
      </p>
      <h3>Neumorphism & inset</h3>
      <p>
        Neumorphism creates a raised or pressed effect using highlights and lowlights derived from the background color.
        Use it sparingly and ensure text contrast meets accessibility thresholds.
      </p>
      <h3>Tailwind & CSS export</h3>
      <p>
        You can copy a pure CSS block or a Tailwind class using an arbitrary <code>shadow-[...]</code> value that includes multiple comma‑separated layers.
        For production, safelist the generated class if it’s built dynamically.
      </p>
    </article>
  )
}
