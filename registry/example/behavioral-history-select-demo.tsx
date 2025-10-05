"use client";

import * as React from "react";
import {
  BehavioralHistorySelect,
  HistoryOption,
} from "@/registry/ruixenui/behavioral-history-select";

const options: HistoryOption[] = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

export default function DemoBehavioralHistorySelect() {
  const [selected, setSelected] = React.useState<string>("");

  return (
    <div className="p-8 flex flex-col gap-6 items-start">
      <h1 className="text-xl font-bold">Behavioral History Select Demo</h1>

      <BehavioralHistorySelect
        options={options}
        label="Select a framework"
        placeholder="Choose framework..."
        onChange={setSelected}
        maxHistory={3}
        storageKey="framework_select_demo"
        selectWidth="300px"
      />

      {selected && (
        <p>
          Selected: <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
}
