"use client";

import MultiStateMorphButton from "@/registry/ruixenui/multi-state-morph-button";

export default function MultiStateMorphButtonDemo() {
  const simulateAction = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject();
      }, 1500);
    });
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <MultiStateMorphButton label="Submit" onClick={simulateAction} />
      <MultiStateMorphButton
        label="Save"
        width={200}
        height={50}
        onClick={simulateAction}
        colors={{
          idle: "#64748b",
          loading: "#475569",
          success: "#10b981",
          error: "#ef4444",
        }}
      />
    </div>
  );
}
