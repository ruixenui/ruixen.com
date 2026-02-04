"use client";

import { useState } from "react";
import LiveWaveform from "@/registry/ruixenui/live-waveform";

const states = ["idle", "processing", "active"] as const;
type State = (typeof states)[number];

const labels: Record<State, string> = {
  idle: "Idle",
  processing: "Processing",
  active: "Listening",
};

export default function LiveWaveformDemo() {
  const [state, setState] = useState<State>("processing");

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-8">
      <div className="w-full max-w-lg space-y-4">
        <LiveWaveform
          processing={state === "processing"}
          active={state === "active"}
          onStop={() => setState("idle")}
        />
        <div className="flex items-center justify-center gap-2">
          {states.map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                state === s
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {labels[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
