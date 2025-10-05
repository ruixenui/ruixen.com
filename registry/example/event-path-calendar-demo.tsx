"use client";

import * as React from "react";
import { EventPathCalendar } from "@/registry/ruixenui/event-path-calendar";

export default function EventPathCalendarDemo() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Event Path Calendar Demo</h1>
      <EventPathCalendar />
    </div>
  );
}
