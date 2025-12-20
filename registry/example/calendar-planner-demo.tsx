"use client";

import * as React from "react";
import { CalendarPlanner } from "@/registry/ruixenui/calendar-planner";
import { format } from "date-fns";

export default function CalendarPlannerDemo() {
  const [selected, setSelected] = React.useState<Date | undefined>();

  // Mock info per date (e.g. events, availability, etc.)
  const mockInfo: Record<string, string> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateKey = format(d, "yyyy-MM-dd");
    mockInfo[dateKey] = i % 2 === 0 ? " Event" : "—";
  }

  return (
    <div className="flex flex-col justify-center items-center py-16 space-y-6">
      <CalendarPlanner
        value={selected}
        onChange={setSelected}
        info={mockInfo}
        yearRange={[1995, 2035]}
      />
      {selected && (
        <p className="text-sm text-muted-foreground">
          Selected: {selected.toDateString()}
        </p>
      )}
    </div>
  );
}
