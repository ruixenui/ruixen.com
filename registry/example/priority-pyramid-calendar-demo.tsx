"use client";

import * as React from "react";
import {
  PriorityPyramidCalendar,
  Event,
} from "@/registry/ruixenui/priority-pyramid-calendar";

export default function PriorityPyramidDemoPage() {
  const [events, setEvents] = React.useState<Event[]>([
    {
      id: 1,
      title: "Launch project",
      date: new Date(),
      priority: 1,
    },
    {
      id: 2,
      title: "Team meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      priority: 2,
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Priority Pyramid Calendar Demo
      </h1>
      <PriorityPyramidCalendar
        initialEvents={events}
        onEventsChange={setEvents}
      />
    </div>
  );
}
