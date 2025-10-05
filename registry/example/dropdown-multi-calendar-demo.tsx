"use client";

import { useState } from "react";
import { DropdownMultiCalendar } from "@/registry/ruixenui/dropdown-multi-calendar";

export default function DemoDropdownMultiCalendar() {
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">
        Configurable Dropdown Multi-Select Calendar
      </h2>

      <DropdownMultiCalendar
        selectedDates={dates}
        onChange={(newDates) => setDates(newDates)}
        minYear={2000}
        maxYear={2030}
        maxSelectable={10}
        label="Select your important dates"
        monthFormat="MMM"
        className="max-w-md"
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Selected Dates:{" "}
        {dates.length > 0
          ? dates.map((d) => d.toDateString()).join(", ")
          : "None"}
      </div>
    </div>
  );
}
