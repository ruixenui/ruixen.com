"use client";

import * as React from "react";
import {
  HeatmapCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/heatmap-calendar";

export default function DemoHeatmapCalendar() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: "1", title: "Meeting", date: new Date().toISOString() },
    { id: "2", title: "Design Review", date: new Date().toISOString() },
    { id: "3", title: "Deploy", date: new Date().toISOString() },
  ]);

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Heatmap Calendar Demo</h1>
      <HeatmapCalendar
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
