"use client";

import { useState } from "react";
import { DropdownRangeDatePicker } from "@/registry/ruixenui/dropdown-range-date-picker";

export default function DemoDropdownRangeDatePicker() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">
        Configurable Dropdown Range Picker
      </h2>

      <DropdownRangeDatePicker
        selectedRange={range}
        onChange={setRange}
        minYear={2000}
        maxYear={2030}
        monthFormat="MMM"
        label="Select date range"
        clearable
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Selected Range:{" "}
        {range?.from
          ? range.to
            ? `${range.from.toDateString()} - ${range.to.toDateString()}`
            : `${range.from.toDateString()}`
          : "None"}
      </div>
    </div>
  );
}
