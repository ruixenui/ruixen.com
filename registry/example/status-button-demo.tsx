"use client";

import StatusButton from "@/registry/ruixenui/status-button";

export default function StatusButtonDemo() {
  const customColors = {
    live: "bg-green-600",
    idle: "bg-yellow-500",
    offline: "bg-red-600",
    custom: "bg-purple-500",
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <StatusButton
          label="Live Now"
          status="live"
          onClick={() => console.log("Live clicked!")}
        />

        <StatusButton
          label="Idle"
          status="idle"
          onClick={() => console.log("Idle clicked!")}
          size={14}
        />

        <StatusButton
          label="Offline"
          status="offline"
          onClick={() => console.log("Offline clicked!")}
          pulseDuration={0.8}
        />

        <StatusButton
          label="Custom Status"
          status="custom"
          colors={customColors}
          size={16}
          pulseDuration={1.5}
          onClick={() => console.log("Custom clicked!")}
        />

        <StatusButton
          label="Small Dot"
          status="live"
          size={8}
          pulseDuration={0.5}
        />

        <StatusButton
          label="Big Dot"
          status="idle"
          size={20}
          pulseDuration={1.2}
        />
      </div>
    </div>
  );
}
