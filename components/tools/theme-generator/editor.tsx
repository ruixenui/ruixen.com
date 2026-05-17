"use client";

import { useCallback, useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";

import {
  THEME_TOKENS,
  deriveTheme,
  formatHslValue,
  generateCss,
  type OutputFormat,
  type Theme,
} from "@/lib/theme-generator";

const DEFAULT_PRIMARY = "#1e293b";
const DEFAULT_BASE_HUE = 240;

const PRESET_PRIMARIES: Array<{ label: string; hex: string }> = [
  { label: "Zinc", hex: "#1e293b" },
  { label: "Indigo", hex: "#4f46e5" },
  { label: "Violet", hex: "#7c3aed" },
  { label: "Sky", hex: "#0284c7" },
  { label: "Emerald", hex: "#059669" },
  { label: "Rose", hex: "#e11d48" },
];

function previewVarBlock(theme: Theme): string {
  return THEME_TOKENS.map(
    (t) => `--preview-${t}: ${formatHslValue(theme[t])};`,
  ).join("\n        ");
}

export function ThemeGeneratorEditor() {
  const [primaryHex, setPrimaryHex] = useState(DEFAULT_PRIMARY);
  const [baseHue, setBaseHue] = useState(DEFAULT_BASE_HUE);
  const [format, setFormat] = useState<OutputFormat>("hsl");
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState(false);

  const light = useMemo(
    () => deriveTheme(baseHue, primaryHex, "light"),
    [baseHue, primaryHex],
  );
  const dark = useMemo(
    () => deriveTheme(baseHue, primaryHex, "dark"),
    [baseHue, primaryHex],
  );
  const css = useMemo(
    () => generateCss(light, dark, format),
    [light, dark, format],
  );

  const previewTheme = previewMode === "light" ? light : dark;
  const scopeCss = useMemo(
    () =>
      `.theme-preview-scope {\n        ${previewVarBlock(previewTheme)}\n      }`,
    [previewTheme],
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [css]);

  const handleReset = useCallback(() => {
    setPrimaryHex(DEFAULT_PRIMARY);
    setBaseHue(DEFAULT_BASE_HUE);
    setFormat("hsl");
  }, []);

  return (
    <div className="grid grid-cols-1 divide-y lg:grid-cols-[300px_1fr] lg:divide-x lg:divide-y-0">
      {/* Controls */}
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="primary-color"
            className="text-xs font-medium text-foreground"
          >
            Primary color
          </label>
          <div className="flex gap-2">
            <input
              id="primary-color"
              type="color"
              value={primaryHex}
              onChange={(e) => setPrimaryHex(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded border bg-background p-0"
            />
            <input
              type="text"
              value={primaryHex}
              onChange={(e) => setPrimaryHex(e.target.value)}
              spellCheck={false}
              className="flex-1 rounded border bg-background px-2 font-mono text-xs uppercase"
            />
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {PRESET_PRIMARIES.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setPrimaryHex(preset.hex)}
                className="flex items-center gap-1 rounded border bg-card px-1.5 py-0.5 text-[10px] hover:bg-muted"
                title={preset.label}
              >
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-sm border border-border"
                  style={{ backgroundColor: preset.hex }}
                />
                {preset.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Drives buttons, focus rings, and accent links.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="base-hue"
            className="text-xs font-medium text-foreground"
          >
            Base hue: <span className="font-mono">{baseHue}°</span>
          </label>
          <input
            id="base-hue"
            type="range"
            min={0}
            max={360}
            step={1}
            value={baseHue}
            onChange={(e) => setBaseHue(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-[10px] text-muted-foreground">
            Tints the neutral surfaces (background, card, muted, border).
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground">
            Output format
          </span>
          <div className="grid grid-cols-2 gap-1 rounded-md bg-muted p-0.5">
            {(["hsl", "oklch"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                  format === f
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "hsl" ? "HSL (v1)" : "OKLCH (v2+)"}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            HSL is the legacy shadcn convention; OKLCH ships with shadcn v2 and
            newer.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border bg-card py-1.5 text-xs text-foreground hover:bg-muted"
        >
          <RotateCcw className="h-3 w-3" />
          Reset to defaults
        </button>
      </div>

      {/* Preview + Output */}
      <div className="flex flex-col">
        <style dangerouslySetInnerHTML={{ __html: scopeCss }} />

        <div className="flex flex-col border-b">
          <div className="flex items-center justify-between border-b px-4 py-2 text-xs font-medium text-muted-foreground">
            <span>Live preview</span>
            <div className="flex gap-0.5 rounded-md bg-muted p-0.5">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPreviewMode(m)}
                  className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    previewMode === m
                      ? "bg-background text-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
          </div>
          <div
            className="theme-preview-scope p-6"
            style={{
              background: "hsl(var(--preview-background))",
              color: "hsl(var(--preview-foreground))",
            }}
          >
            <div className="flex flex-wrap items-start gap-4">
              <div
                className="flex min-w-[220px] flex-1 flex-col gap-2 rounded-lg border p-4"
                style={{
                  background: "hsl(var(--preview-card))",
                  color: "hsl(var(--preview-card-foreground))",
                  borderColor: "hsl(var(--preview-border))",
                }}
              >
                <div className="text-sm font-semibold">Card title</div>
                <div
                  className="text-xs"
                  style={{ color: "hsl(var(--preview-muted-foreground))" }}
                >
                  This is sample muted text inside the card.
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: "hsl(var(--preview-muted))",
                      color: "hsl(var(--preview-muted-foreground))",
                    }}
                  >
                    Badge
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: "hsl(var(--preview-accent))",
                      color: "hsl(var(--preview-accent-foreground))",
                    }}
                  >
                    Accent
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-md px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "hsl(var(--preview-primary))",
                    color: "hsl(var(--preview-primary-foreground))",
                  }}
                >
                  Primary action
                </button>
                <button
                  type="button"
                  className="rounded-md border px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "hsl(var(--preview-secondary))",
                    color: "hsl(var(--preview-secondary-foreground))",
                    borderColor: "hsl(var(--preview-border))",
                  }}
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className="rounded-md px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "hsl(var(--preview-destructive))",
                    color: "hsl(var(--preview-destructive-foreground))",
                  }}
                >
                  Destructive
                </button>
              </div>

              <div className="flex min-w-[220px] flex-1 flex-col gap-2">
                <input
                  type="text"
                  placeholder="Email address"
                  className="rounded-md border px-3 py-1.5 text-xs"
                  style={{
                    background: "hsl(var(--preview-background))",
                    color: "hsl(var(--preview-foreground))",
                    borderColor: "hsl(var(--preview-input))",
                  }}
                />
                <div
                  className="rounded-md p-3 text-xs"
                  style={{
                    background: "hsl(var(--preview-popover))",
                    color: "hsl(var(--preview-popover-foreground))",
                    borderColor: "hsl(var(--preview-border))",
                    border: "1px solid hsl(var(--preview-border))",
                  }}
                >
                  <div className="font-medium">Popover content</div>
                  <div
                    className="mt-0.5 text-[11px]"
                    style={{
                      color: "hsl(var(--preview-muted-foreground))",
                    }}
                  >
                    Surfaces use card / popover tokens.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b px-4 py-2 text-xs font-medium text-muted-foreground">
            <span>CSS output</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded border bg-card px-2 py-0.5 text-[11px] text-foreground hover:bg-muted"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="max-h-[420px] min-h-[260px] overflow-auto whitespace-pre-wrap bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
            {css}
          </pre>
        </div>
      </div>
    </div>
  );
}
