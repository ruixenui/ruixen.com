"use client";

import { useState } from "react";
import {
  RangeCalendar,
  type DateRange,
} from "@/registry/ruixenui/range-calendar";

export default function RangeCalendarDemo() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <div className="flex min-h-[340px] w-full max-w-xs mx-auto flex-col items-center justify-center gap-4 px-4">
      <RangeCalendar value={range} onChange={setRange} />

      <span
        className="text-[12px] tabular-nums tracking-[-0.01em]"
        style={{
          color: "rgba(255,255,255,0.3)",
          opacity: range ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        {range
          ? `${range.start.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })} — ${range.end.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`
          : "\u00A0"}
      </span>
    </div>
  );
}
