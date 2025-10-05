"use client";

import * as React from "react";
import {
  EventConstellationCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/event-constellation-calendar";
import { v4 as uuidv4 } from "uuid";

export default function EventConstellationDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    {
      id: uuidv4(),
      title: "Kickoff Meeting",
      date: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: "Demo Review",
      date: new Date(
        new Date().setDate(new Date().getDate() + 3),
      ).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Design Handoff",
      date: new Date(
        new Date().setDate(new Date().getDate() + 7),
      ).toISOString(),
    },
  ]);

  const handleAdd = (ev: CalendarEvent) => setEvents((p) => [...p, ev]);
  const handleRemove = (id: string) =>
    setEvents((p) => p.filter((e) => e.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">
        Event Constellation Calendar (Demo)
      </h1>
      <EventConstellationCalendar
        events={events}
        onAddEvent={handleAdd}
        onRemoveEvent={handleRemove}
      />
    </div>
  );
}
