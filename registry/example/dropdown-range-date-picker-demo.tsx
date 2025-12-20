"use client";

import { useState } from "react";
import { DropdownRangeDatePicker } from "@/registry/ruixenui/dropdown-range-date-picker";

export default function DemoDropdownRangeDatePicker() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>();

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6 min-h-screen">
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

      <div className=" text-sm text-muted-foreground">
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
