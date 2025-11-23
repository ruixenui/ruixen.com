"use client"

export type RGBA = { r: number; g: number; b: number; a: number }
export type Hex = `#${string}`

export type ShadowLayer = {
  x: number
  y: number
  blur: number
  spread: number
  color: Hex // base hex color for the layer
  opacity: number // 0..1
  inset?: boolean
}

export type PreviewOptions = {
  size: "s" | "m" | "l"
  dark: boolean
  background: Hex
  radius: number
  border: boolean
  borderColor: Hex
}

export type BaseControls = {
  layers: number // 1..5
  x: number
  y: number
  blur: number
  spread: number
  opacity: number // 0..1
  color: Hex
  inset: boolean
}

export type ShadowState = {
  base: BaseControls
  layers: ShadowLayer[]             // actual current layers (auto or manual)
  manual: boolean                   // if true, per-layer edits are preserved
  preview: PreviewOptions
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
export const hex = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")

export const hexToRgb = (h: Hex) => {
  let s = h.replace("#", "")
  if (s.length === 3) s = s.split("").map((c) => c + c).join("")
  const r = parseInt(s.slice(0, 2), 16)
  const g = parseInt(s.slice(2, 4), 16)
  const b = parseInt(s.slice(4, 6), 16)
  return { r, g, b }
}

export const rgbaStr = (h: Hex, a: number) => {
  const { r, g, b } = hexToRgb(h)
  return `rgba(${r}, ${g}, ${b}, ${clamp(a, 0, 1).toFixed(3)})`
}

// light/darken background for neumorphism
export const adjustHex = (h: Hex, amount: number): Hex => {
  const { r, g, b } = hexToRgb(h)
  const t = amount >= 0 ? 255 : 0
  const amt = Math.abs(amount)
  const rn = Math.round(r + (t - r) * amt)
  const gn = Math.round(g + (t - g) * amt)
  const bn = Math.round(b + (t - b) * amt)
  return (`#${hex(rn)}${hex(gn)}${hex(bn)}`) as Hex
}

// Turn layers into box-shadow CSS
export const layersToBoxShadow = (layers: ShadowLayer[]) =>
  layers
    .map((l) => {
      const parts = [
        l.inset ? "inset" : "",
        `${Math.round(l.x)}px`,
        `${Math.round(l.y)}px`,
        `${Math.round(l.blur)}px`,
        `${Math.round(l.spread)}px`,
        rgbaStr(l.color, l.opacity),
      ].filter(Boolean)
      return parts.join(" ")
    })
    .join(", ")

// Tailwind arbitrary class for multiple shadows
export const layersToTailwindShadow = (layers: ShadowLayer[]) => {
  const css = layersToBoxShadow(layers)
  // convert spaces to underscores for arbitrary value syntax
  const safe = css.replace(/ /g, "_")
  return `shadow-[${safe}]`
}
// You can also use arbitrary property:
// export const layersToTailwindArbitraryProperty = (layers: ShadowLayer[]) => `[box-shadow:${layersToBoxShadow(layers).replace(/ /g,"_")}]`

// Base -> multi-layer formula for professional/soft look
export const buildLayersFromBase = (b: BaseControls): ShadowLayer[] => {
  const count = clamp(b.layers, 1, 5)
  const out: ShadowLayer[] = []
  for (let i = 1; i <= count; i++) {
    const falloff = 1 / Math.pow(1 + (i - 1), 1.12) // gentle decay
    out.push({
      x: b.x * i,
      y: b.y * i,
      blur: Math.max(0, b.blur * (0.6 + i * 0.5)),
      spread: Math.round(b.spread * (i === 1 ? 1 : 0.5)),
      color: b.color,
      opacity: clamp(b.opacity * falloff, 0, 1),
      inset: b.inset,
    })
  }
  return out
}

// Material Elevation approximation (3-layer umbra/penumbra/ambient)
export const materialElevation = (dp: number, color: Hex = "#000000"): ShadowLayer[] => {
  const k = clamp(dp, 1, 24)
  const umbra: ShadowLayer = {
    x: 0, y: Math.round(k * 0.6 + 1),
    blur: Math.round(k * 1.2 + 2),
    spread: Math.round(-Math.max(1, Math.floor(k / 8))),
    color, opacity: 0.20, inset: false,
  }
  const penumbra: ShadowLayer = {
    x: 0, y: Math.round(k * 0.6 + 1),
    blur: Math.round(k * 1.8 + 2),
    spread: 0, color, opacity: 0.14, inset: false,
  }
  const ambient: ShadowLayer = {
    x: 0, y: Math.round(k * 0.34 + 1),
    blur: Math.round(k * 2.2 + 1),
    spread: 0, color, opacity: 0.12, inset: false,
  }
  return [umbra, penumbra, ambient]
}

// Neumorphism presets (outset or inset) from a base background
export const neumorph = (bg: Hex, inset = false): ShadowLayer[] => {
  const light = adjustHex(bg, 0.12)
  const dark = adjustHex(bg, -0.18)
  const a = inset ? 0.85 : 0.55
  const b = inset ? 0.85 : 0.38
  return inset
    ? [
        { x: 6, y: 6, blur: 12, spread: 0, color: dark, opacity: b, inset: true },
        { x: -6, y: -6, blur: 12, spread: 0, color: light, opacity: a, inset: true },
      ]
    : [
        { x: 8, y: 8, blur: 14, spread: 0, color: dark, opacity: b },
        { x: -8, y: -8, blur: 14, spread: 0, color: light, opacity: a },
      ]
}

// Glass‑compatible shadow (broad, low alpha)
export const glassShadow = (color: Hex = "#000000"): ShadowLayer[] => [
  { x: 0, y: 10, blur: 30, spread: 0, color, opacity: 0.14 },
  { x: 0, y: 6, blur: 10, spread: 0, color, opacity: 0.08 },
]

// Hard / crisp shadows
export const hardShadow = (color: Hex = "#000000"): ShadowLayer[] => [
  { x: 0, y: 2, blur: 0, spread: 0, color, opacity: 0.25 },
  { x: 0, y: 8, blur: 0, spread: 0, color, opacity: 0.12 },
]

// Floating card / button variants
export const floatingCard = (color: Hex = "#000000"): ShadowLayer[] => [
  { x: 0, y: 4, blur: 12, spread: 0, color, opacity: 0.16 },
  { x: 0, y: 10, blur: 24, spread: -6, color, opacity: 0.10 },
]
export const buttonShadow = (color: Hex = "#000000"): ShadowLayer[] => [
  { x: 0, y: 1, blur: 2, spread: 0, color, opacity: 0.22 },
  { x: 0, y: 4, blur: 8, spread: -2, color, opacity: 0.14 },
]

// ----- Default state -----
export const defaultShadowState: ShadowState = {
  base: { layers: 2, x: 0, y: 10, blur: 30, spread: 0, opacity: 0.25, color: "#000000", inset: false },
  layers: [],
  manual: false,
  preview: {
    size: "m",
    dark: false,
    background: "#F6F7F9",
    radius: 16,
    border: false,
    borderColor: "#E5E7EB",
  },
}

// format outputs
export const cssOutput = (layers: ShadowLayer[], radius: number, border: boolean, borderColor: Hex) => {
  const bs = layersToBoxShadow(layers)
  return `/* Add to your stylesheet */
.rx-shadow {
  box-shadow: ${bs};
  border-radius: ${Math.round(radius)}px;${border ? `\n  border: 1px solid ${borderColor};` : ""}
}`
}

export const tailwindOutput = (layers: ShadowLayer[], radius: number, border: boolean, borderColor: Hex) => {
  const shadow = layersToTailwindShadow(layers)
  const rounded = `rounded-[${Math.round(radius)}px]`
  const brd = border ? ` border border-[${borderColor}]` : ""
  return `<div className="${shadow} ${rounded}${brd} bg-white">...</div>`
}

export const componentSnippet = (layers: ShadowLayer[], radius: number, border: boolean, borderColor: Hex) => {
  const shadow = layersToTailwindShadow(layers)
  const rounded = `rounded-[${Math.round(radius)}px]`
  const brd = border ? ` border border-[${borderColor}]` : ""
  return `export function Card(props) {
  return (
    <div className="${shadow} ${rounded}${brd} bg-white p-6">
      {props.children}
    </div>
  )
}`
}

// utils
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement("textarea")
    ta.value = text
    ta.style.position = "fixed"
    ta.style.top = "0"
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    let ok = false
    try { ok = document.execCommand("copy") } catch {}
    document.body.removeChild(ta)
    return ok
  }
}
export const downloadFile = (filename: string, content: string, mime = "text/plain") => {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
