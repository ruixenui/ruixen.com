"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ColorPicker as UIColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerOutput,
  ColorPickerFormat,
} from "@/components/ui/color-picker"

export default function ColorPicker({ label, value, onHex }: { label: string; value: string; onHex: (hex: string) => void }) {
  const [open, setOpen] = useState(false)

  const handleColorChange = (color: [number, number, number, number]) => {
    const r = Math.round(color[0])
    const g = Math.round(color[1])
    const b = Math.round(color[2])
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    onHex(hex)
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 justify-start gap-3 px-3"
          >
            <div
              className="h-8 w-8 rounded border-2 shrink-0"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm font-mono">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-4" align="start">
          <UIColorPicker
            defaultValue={value}
            onChange={(color) => {
              if (Array.isArray(color) && color.length === 4) {
                handleColorChange(color as [number, number, number, number])
              }
            }}
            className="w-full"
          >
            <ColorPickerSelection />
            <div className="flex items-center gap-2 mt-3">
              <div className="w-full grid gap-2">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </UIColorPicker>
        </PopoverContent>
      </Popover>
    </div>
  )
}