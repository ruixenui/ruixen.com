"use client";

import * as React from "react";
import MonthlyHeatmapCalendar from "@/registry/ruixenui/monthly-heatmap-calendar";

export default function MonthlyCalendarDemo() {
  // Example initial events
  const initialEvents = {
    "2025-10-01": [
      { time: "10:00 AM", title: "Team Meeting" },
      { time: "03:00 PM", title: "Doctor Appointment" },
    ],
    "2025-10-05": [{ time: "01:00 PM", title: "Lunch with Client" }],
  };

  // Callback for when an event is added
  const handleEventAdd = (
    dateKey: string,
    event: { time: string; title: string },
  ) => {
    console.log("Event added:", dateKey, event);
  };

  // Callback for when an event is deleted
  const handleEventDelete = (dateKey: string, index: number) => {
    console.log("Event deleted:", dateKey, index);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <MonthlyHeatmapCalendar
        initialMonth={new Date("2025-10-01")}
        initialEvents={initialEvents}
        startYear={2020}
        endYear={2030}
        onEventAdd={handleEventAdd}
        onEventDelete={handleEventDelete}
      />
    </div>
  );
}
