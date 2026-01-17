"use client";

import * as React from "react";
import {
  ThreeDWallCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/three-dwall-calendar";
import { v4 as uuidv4 } from "uuid";

export default function Demo3DWallCalendar() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: uuidv4(), title: "Sprint Planning", date: new Date().toISOString() },
    {
      id: uuidv4(),
      title: "Design Handoff",
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Demo",
      date: new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ]);

  const addEvent = (ev: CalendarEvent) => setEvents((p) => [...p, ev]);
  const removeEvent = (id: string) =>
    setEvents((p) => p.filter((e) => e.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        3D Wall Calendar Demo
      </h1>
      <ThreeDWallCalendar
        events={events}
        onAddEvent={addEvent}
        onRemoveEvent={removeEvent}
      />
    </div>
  );
}
