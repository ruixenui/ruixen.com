// components/glass/ControlPanel.tsx
"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ColorPicker from "./color-picker"
import SliderControl from "./slider-control"
import ToggleControl from "./toggle-control"
import { GlassState, withAlpha } from "@/lib/glass"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = { value: GlassState; onChange: (v: Partial<GlassState>) => void }

export default function ControlPanel({ value, onChange }: Props) {
  const rgbaBg = value.bgColor

  const onBgOpacity = (pct: number[]) => {
    const a = pct[0] / 100
    onChange({ opacity: a, bgColor: withAlpha(value.bgColor, a) })
  }

  const onHoverOpacity = (pct: number[]) => {
    onChange({ hoverOpacity: pct[0] / 100 })
  }

  const bgTab = useMemo(() => value.background.type, [value.background.type])

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Controls</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="px-6 pb-6 space-y-5">
            {/* Background */}
            <section>
              <h3 className="font-semibold mb-3 text-sm">Background</h3>
              <Tabs value={bgTab} onValueChange={(nv) => onChange({ background: { ...value.background, type: nv as any } })}>
                <TabsList className="grid grid-cols-4 !w-fit">
                  <TabsTrigger value="frosted">Frosted</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="noise">Noise</TabsTrigger>
                </TabsList>
                <TabsContent value="image" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="img" className="text-sm">Image URL</Label>
                    <Input id="img" placeholder="https://..." value={value.background.imageUrl ?? ""} onChange={(e)=> onChange({ background:{ ...value.background, imageUrl: e.target.value } })}/>
                  </div>
                </TabsContent>
                <TabsContent value="grid" className="space-y-3 mt-3">
                  <SliderControl label="Grid Size" min={8} max={64} step={1} value={[value.background.gridSize ?? 24]} onValueChange={(v)=> onChange({ background: { ...value.background, gridSize: v[0] } })}/>
                </TabsContent>
                <TabsContent value="noise" className="space-y-3 mt-3">
                  <SliderControl label="Noise Opacity" min={0} max={30} step={1} value={[Math.round((value.background.noiseOpacity ?? 0.08) * 100)]} onValueChange={(v)=> onChange({ background: { ...value.background, noiseOpacity: v[0]/100 } })} suffix="%" />
                </TabsContent>
              </Tabs>
              <div className="mt-4">
                <ToggleControl label="Dark mode canvas" checked={!!value.background.darkMode} onCheckedChange={(c)=> onChange({ background: { ...value.background, darkMode: !!c } })}/>
              </div>
            </section>

            <Separator />

            {/* Surface */}
            <section className="space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Surface</h3>
              <ColorPicker
                label="Background Color"
                value={rgbaBg}
                onChange={(c) => onChange({ bgColor: c, opacity: c.a })}
              />
              <SliderControl label="Blur" min={0} max={60} step={1} value={[value.blur]} onValueChange={(v)=> onChange({ blur: v[0] })} suffix="px"/>
              <SliderControl label="Opacity" min={0} max={100} step={1} value={[Math.round(value.opacity*100)]} onValueChange={onBgOpacity} suffix="%" />
              <SliderControl label="Saturation" min={0} max={200} step={1} value={[value.saturate]} onValueChange={(v)=> onChange({ saturate: v[0] })} suffix="%" />
            </section>

            <Separator />

            {/* Border */}
            <section className="space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Border</h3>
              <SliderControl label="Radius" min={0} max={64} step={1} value={[value.radius]} onValueChange={(v)=> onChange({ radius: v[0] })} suffix="px"/>
              <SliderControl label="Width" min={0} max={8} step={1} value={[value.borderWidth]} onValueChange={(v)=> onChange({ borderWidth: v[0] })} suffix="px"/>
              <ColorPicker label="Border Color" value={value.borderColor} onChange={(c)=> onChange({ borderColor: c })} />
            </section>

            <Separator />

            {/* Shadow */}
            <section className="space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Shadow</h3>
              <ToggleControl label="Enable Shadow" checked={value.shadow} onCheckedChange={(c)=> onChange({ shadow: !!c })}/>
              <SliderControl disabled={!value.shadow} label="Shadow Intensity" min={0} max={100} step={1} value={[Math.round(value.shadowIntensity*100)]} onValueChange={(v)=> onChange({ shadowIntensity: v[0]/100 })} suffix="%" />
            </section>

            <Separator />

            {/* Overlay */}
            <section className="space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Overlay</h3>
              <ToggleControl label="Gradient Overlay" checked={value.gradientOverlay} onCheckedChange={(c)=> onChange({ gradientOverlay: !!c })}/>
              <SliderControl disabled={!value.gradientOverlay} label="Gradient Angle" min={0} max={360} step={1} value={[value.gradientAngle]} onValueChange={(v)=> onChange({ gradientAngle: v[0] })} suffix="°"/>
            </section>

            <Separator />

            {/* Hover */}
            <section className="space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Hover</h3>
              <ToggleControl label="Enable Hover Effect" checked={value.hoverEnabled} onCheckedChange={(c)=> onChange({ hoverEnabled: !!c })}/>
              <SliderControl disabled={!value.hoverEnabled} label="Hover Blur" min={0} max={80} step={1} value={[value.hoverBlur]} onValueChange={(v)=> onChange({ hoverBlur: v[0] })} suffix="px"/>
              <SliderControl disabled={!value.hoverEnabled} label="Hover Opacity" min={0} max={100} step={1} value={[Math.round(value.hoverOpacity*100)]} onValueChange={onHoverOpacity} suffix="%" />
              <ToggleControl disabled={!value.hoverEnabled} label="Hover Shadow" checked={value.hoverShadow} onCheckedChange={(c)=> onChange({ hoverShadow: !!c })}/>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
