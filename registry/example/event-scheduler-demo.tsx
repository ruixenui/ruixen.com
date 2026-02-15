"use client";

import { EventScheduler } from "@/registry/ruixenui/event-scheduler";

export default function EventSchedulerDemo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <EventScheduler
        events={[
          { id: "1", title: "Team standup", hour: 10, minute: 0 },
          { id: "2", title: "Lunch with Alex", hour: 13, minute: 0 },
          { id: "3", title: "Client review", hour: 15, minute: 30 },
        ]}
      />
    </div>
  );
}
