"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import SliderControl from "./slider-control"
import ToggleControl from "./toggle-control"
import ColorPicker from "./color-picker"
import LayerRow from "./layer-row"
import { Button } from "@/components/ui/button"
import { ShadowState, buildLayersFromBase, ShadowLayer } from "@/lib/shadow"
import { useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ControlPanel({ state, setState }: { state: ShadowState; setState: (s: ShadowState) => void }) {
  const updateBase = useCallback((patch: Partial<ShadowState["base"]>) => {
    setState({ ...state, base: { ...state.base, ...patch } })
  }, [setState, state])

  const toggleManual = (on: boolean) => setState({ ...state, manual: on, layers: on ? state.layers : buildLayersFromBase(state.base) })

  const addLayer = () => {
    if (state.layers.length >= 5) return
    const last = state.layers[state.layers.length - 1]
    const nl: ShadowLayer = { ...last, x: last.x + 2, y: last.y + 2, blur: last.blur + 6, opacity: Math.max(0.04, last.opacity * 0.85) }
    setState({ ...state, manual: true, base: { ...state.base, layers: state.layers.length + 1 }, layers: [...state.layers, nl] })
  }

  const removeLayer = (i: number) => {
    if (state.layers.length <= 1) return
    const next = state.layers.filter((_, idx) => idx !== i)
    setState({ ...state, manual: true, base: { ...state.base, layers: next.length }, layers: next })
  }

  const updateLayer = (i: number, patch: Partial<ShadowLayer>) => {
    const next = state.layers.map((l, idx) => (idx === i ? { ...l, ...patch } : l))
    setState({ ...state, manual: true, layers: next, base: { ...state.base, layers: next.length } })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Shadow Controls</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="px-6 pb-6 space-y-5">
            <section className="space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Base</h3>
              <SliderControl label="Shadow Layers" min={1} max={5} step={1} value={[state.base.layers]} onValueChange={([v]) => updateBase({ layers: v })} />
              <div className="grid grid-cols-2 gap-3">
                <SliderControl label="Offset X" min={-50} max={50} value={[state.base.x]} onValueChange={([v]) => updateBase({ x: v })} />
                <SliderControl label="Offset Y" min={-50} max={50} value={[state.base.y]} onValueChange={([v]) => updateBase({ y: v })} />
                <SliderControl label="Blur" min={0} max={200} value={[state.base.blur]} onValueChange={([v]) => updateBase({ blur: v })} />
                <SliderControl label="Spread" min={-50} max={50} value={[state.base.spread]} onValueChange={([v]) => updateBase({ spread: v })} />
              </div>
              <SliderControl label="Shadow Opacity" min={1} max={100} value={[Math.round(state.base.opacity * 100)]} onValueChange={([v]) => updateBase({ opacity: v / 100 })} suffix="%" />
              <ColorPicker label="Shadow Color" value={state.base.color} onHex={(hex) => updateBase({ color: hex as `#${string}` })} />
              <ToggleControl label="Inset Shadow" checked={state.base.inset} onCheckedChange={(c) => updateBase({ inset: !!c })} />
            </section>

            <Separator />

            <section className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Advanced Layers</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant={state.manual ? "default" : "outline"} onClick={() => toggleManual(!state.manual)}>
                    {state.manual ? "Manual: On" : "Manual: Off"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setState({ ...state, manual: false, layers: buildLayersFromBase(state.base) })}>
                    Reset from Base
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {state.layers.map((layer, i) => (
                  <LayerRow
                    key={i}
                    index={i}
                    layer={layer}
                    onChange={(p) => updateLayer(i, p)}
                    onRemove={() => removeLayer(i)}
                    disableRemove={state.layers.length <= 1}
                  />
                ))}
              </div>

              <div className="pt-2">
                <Button size="sm" variant="secondary" onClick={addLayer} disabled={state.layers.length >= 5}>Add Layer</Button>
              </div>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
