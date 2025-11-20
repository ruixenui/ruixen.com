// data/presets.ts
import type { GlassState } from "@/lib/glass"

const base = (overrides: Partial<GlassState>): GlassState => ({
  background: { type: "frosted", imageUrl: undefined, gridSize: 24, noiseOpacity: 0.08, darkMode: false },
  bgColor: { r: 255, g: 255, b: 255, a: 0.14 },
  blur: 16,
  radius: 16,
  opacity: 0.14,
  borderWidth: 1,
  borderColor: { r: 255, g: 255, b: 255, a: 0.35 },
  shadow: true,
  shadowIntensity: 0.6,
  saturate: 140,
  gradientOverlay: true,
  gradientAngle: 135,
  hoverEnabled: true,
  hoverBlur: 24,
  hoverOpacity: 0.22,
  hoverShadow: true,
  ...overrides,
})

export type NamedPreset = { id: string; name: string; state: GlassState; tags?: string[] }

export const BUILT_IN_PRESETS: NamedPreset[] = [
  { id: "soft", name: "Soft Glass", state: base({ blur: 18, opacity: 0.16, radius: 20, shadowIntensity: 0.4 }) },
  { id: "frosted", name: "Frosted Card", state: base({ blur: 24, opacity: 0.18, radius: 16, borderColor: { r:255,g:255,b:255,a:0.45 } }) },
  { id: "neon", name: "Neon Glass", state: base({ bgColor: { r: 0, g: 255, b: 224, a: 0.12 }, borderColor: { r: 0, g: 255, b: 224, a: 0.5 }, shadowIntensity: 0.75 }) },
  { id: "brutal", name: "Brutalism Glass", state: base({ blur: 8, opacity: 0.12, radius: 4, borderWidth: 2, shadowIntensity: 0.2, gradientOverlay:false }) },
  { id: "holo", name: "Holographic", state: base({ gradientOverlay:true, gradientAngle: 125, bgColor:{r:255,g:255,b:255,a:0.10}, saturate: 180 }) },
  { id: "pastel", name: "Pastel Frost", state: base({ bgColor:{r:255,g:180,b:220,a:0.16}, blur: 20, borderColor:{r:255,g:255,b:255,a:0.55} }) },
  { id: "darkdash", name: "Dark Dashboard", state: base({ background:{type:"grid", gridSize:22, noiseOpacity:0.06, darkMode:true}, bgColor:{r:17,g:17,b:17,a:0.3}, borderColor:{r:255,g:255,b:255,a:0.08}, shadowIntensity:0.45, saturate:120 }) },
  { id: "widget", name: "Widget Card", state: base({ radius: 14, blur: 14, opacity: 0.18 }) },
  { id: "popup", name: "Popup Modal", state: base({ radius: 24, blur: 28, shadowIntensity:0.8, hoverEnabled:false }) },
  { id: "chip", name: "Pill Chip", state: base({ radius: 999, blur: 14, borderWidth:1 }) },
  { id: "kiosk", name: "Kiosk Panel", state: base({ radius: 12, blur: 12, borderWidth: 2, borderColor:{r:255,g:255,b:255,a:0.28} }) },
  { id: "ocean", name: "Ocean Blue", state: base({ bgColor:{r: 84, g: 149, b: 255, a: 0.15}, borderColor:{r:255,g:255,b:255,a:0.4}, blur:18 }) },
  { id: "mint", name: "Mint Card", state: base({ bgColor:{r: 170, g: 255, b: 216, a: 0.14}, blur:16, borderColor:{r:255,g:255,b:255,a:0.45} }) },
  { id: "amber", name: "Amber Panel", state: base({ bgColor:{r:255,g:200,b:120,a:0.12}, borderColor:{r:255,g:255,b:255,a:0.35}, blur:22 }) },
  { id: "haze", name: "High Haze", state: base({ blur: 36, opacity: 0.12, saturate: 160, shadowIntensity:0.35 }) },
  { id: "cta", name: "CTA Pop", state: base({ bgColor:{r:255,g:255,b:255,a:0.2}, blur:18, shadowIntensity: 0.9, gradientOverlay:true }) },
  { id: "sidebar", name: "Sidebar Glass", state: base({ radius: 12, blur: 10, opacity: 0.18, borderWidth: 1, shadowIntensity:0.25 }) },
  { id: "toolbar", name: "Toolbar Frost", state: base({ radius: 10, blur: 8, opacity: 0.14, borderWidth: 1, shadowIntensity:0.15 }) },
  { id: "hifi", name: "Hi‑Fi Neumorph", state: base({ blur: 14, opacity: 0.12, shadowIntensity: 0.2, gradientOverlay:false }) },
  { id: "status", name: "Status Badge", state: base({ radius: 999, blur: 10, opacity: 0.2, shadowIntensity:0.2, gradientOverlay:true }) },
]
