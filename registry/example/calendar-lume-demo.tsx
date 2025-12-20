"use client";

import { useState } from "react";
import { CalendarLume } from "@/registry/ruixenui/calendar-lume";

export default function DemoCalendarLume() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 space-y-6 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold">Configurable Calendar Demo</h2>

        <CalendarLume
          initialDate={date}
          onChange={setDate}
          startYear={2000}
          endYear={2030}
          className="w-full"
        />

        <div className="mt-4 text-sm text-muted-foreground">
          Selected Date: {date ? date.toDateString() : "None"}
        </div>
      </div>
    </div>
  );
}
