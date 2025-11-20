"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export default function ToggleControl({ label, checked, onCheckedChange, disabled, className }: Props) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Label>{label}</Label>
      <Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled}/>
    </div>
  )
}
