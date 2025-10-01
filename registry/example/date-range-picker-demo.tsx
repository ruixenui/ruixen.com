"use client";

import * as React from "react";
import DateRangePicker from "@/registry/ruixenui/date-range-picker";
import { DateRange } from "react-day-picker";

export default function DateRangePickerDemo() {
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Date Range Picker Demo</h1>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Basic Date Range Picker
          </h3>
          <DateRangePicker onChange={setSelectedRange} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">With Default Values</h3>
          <DateRangePicker
            defaultFrom={new Date(2025, 9, 1)}
            defaultTo={new Date(2025, 9, 15)}
            placeholder="Select your trip dates"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">With Date Restrictions</h3>
          <DateRangePicker
            minDate={new Date()}
            placeholder="Cannot select past dates"
          />
        </div>

        {selectedRange?.from && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Selected Range:</p>
            <p className="text-sm text-muted-foreground">
              {selectedRange.from.toDateString()}
              {selectedRange.to && ` - ${selectedRange.to.toDateString()}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
