// components/shadow/LayerRow.tsx
"use client"

import SliderControl from "./slider-control"
import ToggleControl from "./toggle-control"
import ColorPicker from "./color-picker"
import { ShadowLayer } from "@/lib/shadow"
import { Button } from "@/components/ui/button"

export default function LayerRow({
  index,
  layer,
  onChange,
  onRemove,
  disableRemove,
}: {
  index: number
  layer: ShadowLayer
  onChange: (patch: Partial<ShadowLayer>) => void
  onRemove: () => void
  disableRemove?: boolean
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-medium text-sm">Layer {index + 1}</div>
        <Button size="sm" variant="ghost" onClick={onRemove} disabled={disableRemove}>Remove</Button>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <SliderControl label="X" min={-50} max={50} value={[layer.x]} onValueChange={([v]) => onChange({ x: v })} />
          <SliderControl label="Y" min={-50} max={50} value={[layer.y]} onValueChange={([v]) => onChange({ y: v })} />
          <SliderControl label="Blur" min={0} max={200} value={[layer.blur]} onValueChange={([v]) => onChange({ blur: v })} />
          <SliderControl label="Spread" min={-50} max={50} value={[layer.spread]} onValueChange={([v]) => onChange({ spread: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SliderControl label="Opacity" min={1} max={100} value={[Math.round(layer.opacity * 100)]} onValueChange={([v]) => onChange({ opacity: v / 100 })} suffix="%" />
          <ColorPicker
            label="Color"
            value={layer.color}
            onHex={(hex) => onChange({ color: hex as any })}
          />
        </div>
      </div>
      <div className="pt-2">
        <ToggleControl label="Inset" checked={!!layer.inset} onCheckedChange={(c) => onChange({ inset: !!c })} />
      </div>
    </div>
  )
}
