"use client";

import {
  OrigamiFoldOutCalendar,
  EventItem,
} from "@/registry/ruixenui/origami-fold-out-calendar";
import { useState } from "react";

export default function OrigamiCalendarDemoPage() {
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(),
    },
    {
      id: 2,
      title: "Hackathon Kickoff",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Origami Fold-Out Calendar Demo</h1>
      <p className="text-muted-foreground">
        This page demonstrates the reusable{" "}
        <strong>OrigamiFoldOutCalendar</strong> component.
      </p>

      <OrigamiFoldOutCalendar
        initialEvents={events}
        onEventsChange={setEvents}
      />
    </div>
  );
}
