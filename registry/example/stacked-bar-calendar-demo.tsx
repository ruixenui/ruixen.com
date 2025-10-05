"use client";

import * as React from "react";
import {
  StackedBarCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/stacked-bar-calendar";

export default function StackedBarCalendarDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      date: new Date().toISOString(),
      category: "medium",
    },
    {
      id: "2",
      title: "Project Deadline",
      date: new Date().toISOString(),
      category: "high",
    },
    {
      id: "3",
      title: "Code Review",
      date: new Date().toISOString(),
      category: "low",
    },
  ]);

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Stacked Bar Calendar Demo</h1>
      <StackedBarCalendar
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
