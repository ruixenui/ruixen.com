"use client";

import * as React from "react";
import { InboxCalendar, InboxEvent } from "@/registry/ruixenui/inbox-calendar";
import { v4 as uuidv4 } from "uuid";

export default function InboxCalendarDemo() {
  const [events, setEvents] = React.useState<InboxEvent[]>([
    {
      id: uuidv4(),
      title: "Team Standup",
      description: "Daily sync with the dev team.",
      date: new Date(2025, 8, 25, 10, 0),
      label: "Work",
    },
    {
      id: uuidv4(),
      title: "Lunch with Sarah",
      description: "Catch up at the cafe near office.",
      date: new Date(2025, 8, 25, 13, 0),
      label: "Personal",
    },
  ]);

  const handleAdd = (event: InboxEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemove = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 flex justify-center">
      <InboxCalendar
        events={events}
        onAddEvent={handleAdd}
        onRemoveEvent={handleRemove}
      />
    </div>
  );
}
