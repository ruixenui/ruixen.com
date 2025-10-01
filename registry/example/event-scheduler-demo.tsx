"use client";

import * as React from "react";
import EventScheduler, { Event } from "@/registry/ruixenui/event-scheduler";

export default function EventSchedulerDemo() {
  const defaultEvents: Event[] = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(new Date().setHours(10, 0, 0)),
    },
    {
      id: 2,
      title: "Client Call",
      date: new Date(new Date().setHours(15, 30, 0)),
    },
  ];

  const handleAddEvent = (event: Event) => {
    console.log("Event added:", event);
  };

  const handleDeleteEvent = (id: number) => {
    console.log("Event deleted with id:", id);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Event Scheduler Demo</h1>
      <EventScheduler
        defaultEvents={defaultEvents}
        defaultTitle="New Event"
        defaultHour="12"
        defaultMinute="00"
        defaultAMPM="PM"
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}
