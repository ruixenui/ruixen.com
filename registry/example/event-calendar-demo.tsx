"use client";

import * as React from "react";
import {
  EventCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/event-calendar";

export default function DemoEventCalendar() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: "1", title: "Kickoff Meeting", date: new Date().toISOString() },
    { id: "2", title: "Design Review", date: new Date().toISOString() },
  ]);

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Event Calendar Demo</h1>
      <EventCalendar
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
