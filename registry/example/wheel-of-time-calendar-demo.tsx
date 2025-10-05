"use client";

import * as React from "react";
import {
  WheelOfTimeCalendar,
  CalendarEvent,
} from "@/registry/ruixenui/wheel-of-time-calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

export default function DemoWheelPage() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [title, setTitle] = React.useState("");
  const [day, setDay] = React.useState("");

  const addEvent = (e: CalendarEvent) => {
    setEvents((prev) => [...prev, e]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAdd = () => {
    if (!title || !day) return;
    addEvent({
      id: uuidv4(),
      title,
      date: new Date(2025, 8, parseInt(day)),
    });
    setTitle("");
    setDay("");
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-2xl font-semibold">🌀 Wheel of Time Calendar</h1>
      <WheelOfTimeCalendar
        events={events}
        onAddEvent={addEvent}
        onRemoveEvent={removeEvent}
      />

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Day (1-30)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
