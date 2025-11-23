// components/shadow/PreviewPanel.tsx
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SliderControl from "./slider-control";
import ToggleControl from "./toggle-control";
import ColorPicker from "./color-picker";
import { ShadowState, layersToBoxShadow } from "@/lib/shadow";
import { cn } from "@/lib/utils";

export default function PreviewPanel({
  state,
  setState,
}: {
  state: ShadowState;
  setState: (s: ShadowState) => void;
}) {
  const sizePx =
    state.preview.size === "s" ? 240 : state.preview.size === "m" ? 320 : 420;
  const canvasClass = cn(
    "relative overflow-hidden rounded-xl border",
    state.preview.dark
      ? "bg-neutral-950 border-neutral-800 text-neutral-50"
      : "bg-white border-neutral-200 text-neutral-900",
  );

  const demoStyle = useMemo<React.CSSProperties>(() => {
    return {
      background: state.preview.background,
    };
  }, [state.preview.background]);

  const cardStyle = useMemo<React.CSSProperties>(() => {
    return {
      boxShadow: layersToBoxShadow(state.layers),
      borderRadius: `${state.preview.radius}px`,
      border: state.preview.border
        ? `1px solid ${state.preview.borderColor}`
        : undefined,
    };
  }, [
    state.layers,
    state.preview.border,
    state.preview.borderColor,
    state.preview.radius,
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Live Preview</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={state.preview.size === "s" ? "default" : "outline"}
            onClick={() =>
              setState({ ...state, preview: { ...state.preview, size: "s" } })
            }
          >
            S
          </Button>
          <Button
            size="sm"
            variant={state.preview.size === "m" ? "default" : "outline"}
            onClick={() =>
              setState({ ...state, preview: { ...state.preview, size: "m" } })
            }
          >
            M
          </Button>
          <Button
            size="sm"
            variant={state.preview.size === "l" ? "default" : "outline"}
            onClick={() =>
              setState({ ...state, preview: { ...state.preview, size: "l" } })
            }
          >
            L
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setState({
                ...state,
                preview: { ...state.preview, dark: !state.preview.dark },
              })
            }
          >
            {state.preview.dark ? "Dark" : "Light"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={canvasClass}>
          <div className="p-5 sm:p-8" style={demoStyle}>
            <div
              className="mx-auto flex items-center justify-center"
              style={{ height: sizePx, width: Math.max(280, sizePx + 60) }}
            >
              <div
                className="bg-white/95 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur p-6 sm:p-8"
                style={cardStyle}
              >
                <div className="space-y-2">
                  <h4 className="font-semibold">Shadow Card</h4>
                  <p className="text-sm opacity-80">
                    Layered, realistic shadows. Resize &amp; test on different
                    canvases.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="outline">
                      Secondary
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls under preview */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <SliderControl
                label="Roundness"
                min={0}
                max={48}
                value={[state.preview.radius]}
                onValueChange={([v]) =>
                  setState({
                    ...state,
                    preview: { ...state.preview, radius: v },
                  })
                }
                suffix="px"
              />
              <ToggleControl
                label="Border"
                checked={state.preview.border}
                onCheckedChange={(c) =>
                  setState({
                    ...state,
                    preview: { ...state.preview, border: !!c },
                  })
                }
              />
              <ColorPicker
                label="Background Color"
                value={state.preview.background}
                onHex={(hex) =>
                  setState({
                    ...state,
                    preview: { ...state.preview, background: hex as any },
                  })
                }
              />
              {state.preview.border && (
                <ColorPicker
                  label="Border Color"
                  value={state.preview.borderColor}
                  onHex={(hex) =>
                    setState({
                      ...state,
                      preview: { ...state.preview, borderColor: hex as any },
                    })
                  }
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
