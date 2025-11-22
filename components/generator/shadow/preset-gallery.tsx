"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ShadowState, materialElevation, neumorph, glassShadow, hardShadow, floatingCard, buttonShadow } from "@/lib/shadow"

export default function PresetGallery({ state, setState }: { state: ShadowState; setState: (s: ShadowState) => void }) {
  const apply = (layers: ReturnType<typeof materialElevation> | ReturnType<typeof neumorph>) => {
    setState({ ...state, manual: true, layers, base: { ...state.base, layers: Math.min(5, layers.length) } })
  }

  const handleApply = (layers: ReturnType<typeof materialElevation> | ReturnType<typeof neumorph>) => {
    apply(layers)
    window.location.hash = '#generator'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Popular Presets</CardTitle>
        <CardDescription>Instantly apply high‑quality shadow styles.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="material">
          <TabsList className="flex-wrap">
            <TabsTrigger value="material">Material Elevation 1-24</TabsTrigger>
            <TabsTrigger value="soft">Soft UI (Neumorphism)</TabsTrigger>
            <TabsTrigger value="hard">Hard Shadows</TabsTrigger>
            <TabsTrigger value="floating">Floating Cards</TabsTrigger>
            <TabsTrigger value="button">Button Shadows</TabsTrigger>
            <TabsTrigger value="glass">Glass-compatible</TabsTrigger>
          </TabsList>

          <TabsContent value="material" className="mt-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {Array.from({ length: 24 }).map((_, i) => {
                const dp = i + 1
                const layers = materialElevation(dp)
                return (
                  <button key={dp} onClick={() => handleApply(layers)} className="group text-left">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 p-3 flex flex-col items-center justify-center gap-2">
                      <div 
                        className="w-12 h-12 rounded-lg bg-white dark:bg-neutral-800 transition-transform group-hover:scale-110"
                        style={{ boxShadow: layers.map(l => `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(0,0,0,${l.opacity})`).join(", ") }}
                      />
                      <span className="text-xs font-medium">DP {dp}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="soft" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {[
                { name: "Neo Light", inset: false },
                { name: "Neo Inset", inset: true },
                { name: "Neo Subtle", inset: false },
                { name: "Neo Deep", inset: false },
                { name: "Neo Pressed", inset: true },
                { name: "Neo Raised", inset: false },
              ].map((p) => {
                const layers = neumorph(state.preview.background as any, p.inset)
                return (
                  <button key={p.name} onClick={() => handleApply(layers)} className="group text-left">
                    <div 
                      className="aspect-square rounded-lg p-4 flex items-center justify-center relative"
                      style={{ background: state.preview.background }}
                    >
                      <div 
                        className="w-20 h-20 rounded-xl transition-transform group-hover:scale-105"
                        style={{ background: state.preview.background, boxShadow: layers.map(l => `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(0,0,0,${l.opacity})`).join(", ") }}
                      />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-xs font-medium px-2 py-1 rounded bg-background/90 backdrop-blur-sm text-center truncate">
                          {p.name}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="hard" className="mt-4">
            <PresetGrid items={[
              { name: "Hard 1", layers: hardShadow() },
              { name: "Hard 2", layers: [{ x: 0, y: 3, blur: 0, spread: 0, color: "#000000", opacity: 0.22 }, { x: 0, y: 10, blur: 0, spread: -2, color: "#000000", opacity: 0.12 }] },
              { name: "Sharp Offset", layers: [{ x: 8, y: 8, blur: 0, spread: -2, color: "#000000", opacity: 0.18 }] },
            ]} onPick={(l) => apply(l)} />
          </TabsContent>

          <TabsContent value="floating" className="mt-4">
            <PresetGrid items={[
              { name: "Float 1", layers: floatingCard() },
              { name: "Float 2", layers: [{ x: 0, y: 8, blur: 16, spread: -4, color: "#000000", opacity: 0.14 }, { x: 0, y: 18, blur: 38, spread: -8, color: "#000000", opacity: 0.10 }] },
              { name: "Float 3", layers: [{ x: 0, y: 12, blur: 32, spread: -10, color: "#000000", opacity: 0.12 }] },
            ]} onPick={(l) => apply(l)} />
          </TabsContent>

          <TabsContent value="button" className="mt-4">
            <PresetGrid items={[
              { name: "Button 1", layers: buttonShadow() },
              { name: "Button 2", layers: [{ x: 0, y: 2, blur: 3, spread: 0, color: "#000000", opacity: 0.22 }, { x: 0, y: 6, blur: 10, spread: -3, color: "#000000", opacity: 0.12 }] },
              { name: "Raised", layers: [{ x: 0, y: 3, blur: 8, spread: -2, color: "#000000", opacity: 0.18 }] },
            ]} onPick={(l) => apply(l)} />
          </TabsContent>

          <TabsContent value="glass" className="mt-4">
            <PresetGrid items={[
              { name: "Glass Soft", layers: glassShadow() },
              { name: "Glass Deep", layers: [{ x: 0, y: 12, blur: 34, spread: -8, color: "#000000", opacity: 0.16 }, { x: 0, y: 6, blur: 18, spread: -6, color: "#000000", opacity: 0.10 }] },
              { name: "Glass Wide", layers: [{ x: 0, y: 24, blur: 54, spread: -12, color: "#000000", opacity: 0.12 }] },
            ]} onPick={(l) => apply(l)} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function PresetGrid({ items, onPick }: { items: { name: string; layers: ReturnType<typeof materialElevation> }[]; onPick: (l: any) => void }) {
  const handleClick = (layers: any) => {
    onPick(layers)
    window.location.hash = '#generator'
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((p) => (
        <button key={p.name} onClick={() => handleClick(p.layers)} className="group text-left">
          <div className="aspect-square rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 p-4 flex items-center justify-center relative overflow-hidden">
            <div 
              className="w-16 h-16 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ boxShadow: p.layers.map(l => `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(0,0,0,${l.opacity})`).join(", ") }}
            >
              <div className="w-8 h-8 rounded bg-primary/10" />
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="text-xs font-medium px-2 py-1 rounded bg-background/90 backdrop-blur-sm text-center truncate">
                {p.name}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
