"use client";

import { useState } from "react";
import { UniversalDatePicker } from "@/registry/ruixenui/universal-date-picker";
import type { DateRange } from "react-day-picker";

export default function DemoUniversalDatePicker() {
  const [selectedSingle, setSelectedSingle] = useState<Date>();
  const [selectedRange, setSelectedRange] = useState<DateRange>();

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-lg font-semibold">Single Date Picker</h2>
      <UniversalDatePicker
        mode="single"
        selected={selectedSingle}
        onChange={(value) => {
          // Ensure only Date is passed for single mode
          if (value instanceof Date || value === undefined) {
            setSelectedSingle(value);
          }
        }}
        className="max-w-sm"
        label="Pick a single date"
      />

      <h2 className="text-lg font-semibold mt-6">Range Date Picker</h2>
      <UniversalDatePicker
        mode="range"
        selected={selectedRange}
        onChange={(value) => {
          // Ensure only DateRange is passed for range mode
          if (!value || ("from" in value && "to" in value)) {
            setSelectedRange(value as DateRange);
          }
        }}
        className="max-w-sm"
        label="Pick a date range"
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Selected Single:{" "}
        {selectedSingle ? selectedSingle.toDateString() : "None"}
        <br />
        Selected Range:{" "}
        {selectedRange
          ? `${selectedRange.from?.toDateString() ?? "—"} – ${selectedRange.to?.toDateString() ?? "—"}`
          : "None"}
      </div>
    </div>
  );
}
