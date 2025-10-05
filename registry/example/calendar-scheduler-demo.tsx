"use client";

import { CalendarScheduler } from "@/registry/ruixenui/calendar-scheduler";

export default function SchedulerDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <CalendarScheduler
        onConfirm={(val) => {
          console.log("Scheduled:", val);
        }}
      />
    </div>
  );
}
