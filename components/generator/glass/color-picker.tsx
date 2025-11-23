"use client"

import { useEffect, useMemo } from "react"
import { RGBA } from "@/lib/glass"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  ColorPicker as UIColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerOutput,
  ColorPickerFormat,
} from "@/components/ui/color-picker"

type Props = {
  label: string
  value: RGBA
  onChange: (c: RGBA) => void
}

export default function ColorPicker({ label, value, onChange }: Props) {
  // Convert RGBA to format the color picker expects
  const colorValue = useMemo(() => {
    return [value.r, value.g, value.b, value.a] as [number, number, number, number]
  }, [value.r, value.g, value.b, value.a])

  const handleColorChange = (newColor: [number, number, number, number]) => {
    onChange({
      r: Math.round(newColor[0]),
      g: Math.round(newColor[1]),
      b: Math.round(newColor[2]),
      a: newColor[3],
    })
  }

  const displayColor = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 justify-start gap-3 px-3"
          >
            <div
              className="h-8 w-8 rounded border-2 shrink-0"
              style={{ backgroundColor: displayColor }}
            />
            <span className="text-sm font-mono">{displayColor}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-4" align="start">
          <UIColorPicker
            value={colorValue}
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