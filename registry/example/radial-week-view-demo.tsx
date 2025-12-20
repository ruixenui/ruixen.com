"use client";

import * as React from "react";
import {
  RadialWeekView,
  CalendarEvent,
} from "@/registry/ruixenui/radial-week-view";

export default function RadialWeekViewDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-4">
      <RadialWeekView
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
