"use client";

import { useState } from "react";
import { SidePanelMultiCalendar } from "@/registry/ruixenui/side-panel-multi-calendar";

export default function DemoSidePanelMultiCalendar() {
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-6">
      <h2 className="text-lg font-semibold">
        Configurable Side Panel Multi-Select Calendar
      </h2>

      <SidePanelMultiCalendar
        selectedDates={dates}
        onChange={(newDates) => setDates(newDates)}
        maxSelectable={10}
        label="Choose multiple important dates"
        dateFormat="d"
        className="max-w-3xl"
        calendarClassName="border"
        panelClassName="bg-card rounded-md"
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
