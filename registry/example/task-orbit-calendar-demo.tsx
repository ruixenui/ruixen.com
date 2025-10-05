"use client";

import * as React from "react";
import {
  TaskOrbitCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/task-orbit-calendar";
import { v4 as uuidv4 } from "uuid";

export default function TaskOrbitCalendarDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: uuidv4(), title: "Morning Meeting", date: new Date().toISOString() },
    {
      id: uuidv4(),
      title: "Code Review",
      date: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const handleAddEvent = (event: CalendarEvent) =>
    setEvents((prev) => [...prev, event]);
  const handleRemoveEvent = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Task Orbit Calendar Demo</h1>
      <TaskOrbitCalendar
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
