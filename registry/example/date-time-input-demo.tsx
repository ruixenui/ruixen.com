"use client";

import { useState } from "react";
import { DateTimeInput } from "@/registry/ruixenui/date-time-input";

export default function DemoDateTimeInput() {
  const [dateTime, setDateTime] = useState<{ date?: Date; time: string }>({
    time: "12:00",
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Configurable DateTime Picker</h2>

      <DateTimeInput
        value={dateTime.date}
        time={dateTime.time}
        dateFormat="PPP"
        datePlaceholder="Select a date"
        timePlaceholder="Select a time"
        onChange={(date, time) => setDateTime({ date, time })}
        className="max-w-md"
      />

      <div className="mt-4 text-sm text-muted-foreground">
        Selected:{" "}
        {dateTime.date
          ? `${dateTime.date.toDateString()} at ${dateTime.time}`
          : "No date selected"}
      </div>
    </div>
  );
}
