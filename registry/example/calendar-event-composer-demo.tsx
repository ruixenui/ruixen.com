"use client";

import {
  CalendarEventComposer,
  type ComposerEvent,
} from "@/registry/ruixenui/calendar-event-composer";

const INITIAL: ComposerEvent[] = [
  {
    id: "seed-new-event",
    title: "",
    startMin: 16 * 60 + 45,
    endMin: 17 * 60 + 45,
    categoryId: "work",
  },
];

export default function CalendarEventComposerDemo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px 16px",
        width: "100%",
      }}
    >
      <CalendarEventComposer
        date={new Date(2026, 2, 8)}
        startHour={10}
        endHour={19}
        initialEvents={INITIAL}
        onEventsChange={(events) => {
          console.log("Events:", events);
        }}
      />
    </div>
  );
}
