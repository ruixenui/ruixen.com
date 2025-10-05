"use client";

import { useState } from "react";
import { CalendarLume } from "@/registry/ruixenui/calendar-lume";

export default function DemoCalendarLume() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Configurable Calendar Demo</h2>

      <CalendarLume
        initialDate={date}
        onChange={setDate}
        startYear={2000}
        endYear={2030}
        className="max-w-md"
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Selected Date: {date ? date.toDateString() : "None"}
      </div>
    </div>
  );
}
