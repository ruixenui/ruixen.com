"use client";

import { CalendarScheduler } from "@/registry/ruixenui/calendar-scheduler";

export default function CalendarSchedulerDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "24px 16px",
      }}
    >
      <CalendarScheduler
        onConfirm={(val) => {
          console.log("Confirmed:", val);
        }}
      />
    </div>
  );
}
