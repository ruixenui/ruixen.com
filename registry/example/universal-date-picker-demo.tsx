"use client";

import { useState } from "react";
import { UniversalDatePicker } from "@/registry/ruixenui/universal-date-picker";
import type { DateRange } from "react-day-picker";

export default function DemoUniversalDatePicker() {
  const [selectedSingle, setSelectedSingle] = useState<Date>();
  const [selectedRange, setSelectedRange] = useState<DateRange>();

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      {/* Container */}
      <div className="mx-auto max-w-xl space-y-10">
        {/* Single Picker */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Single Date Picker</h2>

          <UniversalDatePicker
            mode="single"
            selected={selectedSingle}
            onChange={(value) => {
              if (value instanceof Date || value === undefined) {
                setSelectedSingle(value);
              }
            }}
            label="Pick a single date"
            className="w-full"
          />
        </section>

        {/* Range Picker */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Range Date Picker</h2>

          <UniversalDatePicker
            mode="range"
            selected={selectedRange}
            onChange={(value) => {
              if (!value || ("from" in value && "to" in value)) {
                setSelectedRange(value as DateRange);
              }
            }}
            label="Pick a date range"
            className="w-full"
          />
        </section>

        {/* Output */}
        <section className="rounded-lg border bg-muted/40 p-4 text-sm">
          <div className="space-y-1">
            <div>
              <span className="font-medium">Selected Single:</span>{" "}
              {selectedSingle ? selectedSingle.toDateString() : "None"}
            </div>
            <div>
              <span className="font-medium">Selected Range:</span>{" "}
              {selectedRange
                ? `${selectedRange.from?.toDateString() ?? "—"} – ${
                    selectedRange.to?.toDateString() ?? "—"
                  }`
                : "None"}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
