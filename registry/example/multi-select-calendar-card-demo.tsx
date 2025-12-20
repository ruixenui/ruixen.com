"use client";

import { useState } from "react";
import { MultiSelectCalendarCard } from "@/registry/ruixenui/multi-select-calendar-card";

export default function DemoMultiSelectCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6">
      <h2 className="text-lg font-semibold">
        Configurable Multi-Select Calendar
      </h2>

      <MultiSelectCalendarCard
        selectedDates={selectedDates}
        onChange={(dates) => setSelectedDates(dates)}
        maxSelectable={5}
        label="Choose important dates"
        dateFormat="PPP"
        className="max-w-md"
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Selected Dates:{" "}
        {selectedDates.length > 0
          ? selectedDates.map((d) => d.toDateString()).join(", ")
          : "None"}
      </div>
    </div>
  );
}
