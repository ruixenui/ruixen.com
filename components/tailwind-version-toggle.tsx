"use client";

import { useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";

export function TailwindVersionToggle() {
  const [config, setConfig] = useConfig();
  const mounted = useMounted();

  if (!mounted) return null;

  const tw = config.tailwindVersion || "4";
  const ui = config.uiLibrary || "radix";

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-muted/50 px-3 py-2.5">
      {/* Tailwind version row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Tailwind
        </span>
        <div className="flex items-center rounded-md bg-background p-0.5 shadow-sm">
          <button
            onClick={() => setConfig({ ...config, tailwindVersion: "4" })}
            className={`whitespace-nowrap rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
              tw === "4"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            v4
          </button>
          <button
            onClick={() => setConfig({ ...config, tailwindVersion: "3" })}
            className={`whitespace-nowrap rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
              tw === "3"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            v3
          </button>
        </div>
      </div>

      <div className="h-px bg-border/50" />

      {/* UI library row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Primitives
        </span>
        <div className="flex items-center rounded-md bg-background p-0.5 shadow-sm">
          <button
            onClick={() => setConfig({ ...config, uiLibrary: "radix" })}
            className={`whitespace-nowrap rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
              ui === "radix"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Radix
          </button>
          <button
            onClick={() => setConfig({ ...config, uiLibrary: "baseui" })}
            className={`whitespace-nowrap rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
              ui === "baseui"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Base
          </button>
        </div>
      </div>
    </div>
  );
}
