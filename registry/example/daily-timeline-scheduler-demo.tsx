"use client";

import * as React from "react";
import DailyTimelineScheduler from "@/registry/ruixenui/daily-timeline-scheduler";

export default function DemoPage() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <DailyTimelineScheduler
        startHour={8} // Timeline starts at 8AM
        endHour={18} // Timeline ends at 6PM
        stepMinutes={30} // Each slot is 30 minutes
        title="Work Schedule" // Card title
        initialEvents={[
          { title: "Morning Meeting", time: new Date("2025-10-01T09:00:00") },
          { title: "Lunch Break", time: new Date("2025-10-01T13:00:00") },
          { title: "Project Review", time: new Date("2025-10-01T15:30:00") },
        ]}
        onEventAdd={(ev) => console.log("Added:", ev)}
        onEventUpdate={(ev, idx) => console.log("Updated:", idx, ev)}
        onEventDelete={(ev, idx) => console.log("Deleted:", idx, ev)}
      />
    </div>
  );
}
