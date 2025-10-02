"use client";

import Scheduler, { Event } from "@/registry/ruixenui/scheduler";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SchedulerDemoPage() {
  // Example default events
  const defaultEvents: Event[] = [
    { id: 1, date: new Date("2025-10-05T10:00:00"), time: "10:00" },
    { id: 2, date: new Date("2025-10-06T14:30:00"), time: "14:30" },
  ];

  // Callback when event is added
  const handleAddEvent = (event: Event) => {
    console.log("Event Added:", event);
  };

  // Callback when event is edited
  const handleEditEvent = (event: Event) => {
    console.log("Event Edited:", event);
  };

  // Callback when event is deleted
  const handleDeleteEvent = (id: number) => {
    console.log("Event Deleted:", id);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Scheduler Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <Scheduler
            defaultEvents={defaultEvents}
            defaultHour="12"
            defaultMinute="00"
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </CardContent>
      </Card>
    </div>
  );
}
