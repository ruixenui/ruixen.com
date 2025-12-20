"use client";

import { useState } from "react";
import { DateTimeInput } from "@/registry/ruixenui/date-time-input";

export default function DemoDateTimeInput() {
  const [dateTime, setDateTime] = useState<{
    date?: Date;
    time: string;
  }>({
    time: "12:00",
  });

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      {/* Container */}
      <div className="mx-auto max-w-xl space-y-10">
        {/* Picker Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Configurable DateTime Picker
          </h2>

          <DateTimeInput
            value={dateTime.date}
            time={dateTime.time}
            dateFormat="PPP"
            datePlaceholder="Select a date"
            timePlaceholder="Select a time"
            onChange={(date, time) => setDateTime({ date, time })}
            className="w-full"
          />
        </section>

        {/* Output */}
        <section className="rounded-lg border bg-muted/40 p-4 text-sm">
          <span className="font-medium">Selected:</span>{" "}
          {dateTime.date
            ? `${dateTime.date.toDateString()} at ${dateTime.time}`
            : "No date selected"}
        </section>
      </div>
    </div>
  );
}
