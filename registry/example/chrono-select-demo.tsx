"use client";

import { useState } from "react";
import { ChronoSelect } from "@/registry/ruixenui/chrono-select";

export default function ChronoSelectDemo() {
  const [date, setDate] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "24px 16px",
      }}
    >
      <ChronoSelect
        value={date ?? undefined}
        onChange={(d) => setDate(d)}
        placeholder="Select a date"
      />
    </div>
  );
}
