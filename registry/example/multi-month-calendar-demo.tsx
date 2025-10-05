"use client";

import { useState } from "react";
import { MultiMonthCalendar } from "@/registry/ruixenui/multi-month-calendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function DemoMultiMonthCalendar() {
  const today = new Date();

  // Range example
  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 3),
  });

  // Single date example
  const [single, setSingle] = useState<Date | undefined>(today);

  return (
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-xl font-semibold text-center">
        Multi-Month Calendar Demo
      </h1>

      {/* Range Mode */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-semibold">Range Mode</h2>
        <MultiMonthCalendar
          numberOfMonths={3}
          mode="range"
          selected={range}
          onSelect={(date) => setRange(date)}
        />
        {range?.from && range?.to && (
          <p className="text-sm text-muted-foreground">
            Selected: {range.from.toDateString()} → {range.to.toDateString()}
          </p>
        )}
      </div>

      {/* Single Mode */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-semibold">Single Date Mode</h2>
        <MultiMonthCalendar
          numberOfMonths={2}
          mode="single"
          selected={single}
          onSelect={(date) => setSingle(date)}
        />
        {single && (
          <p className="text-sm text-muted-foreground">
            Selected: {single.toDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
