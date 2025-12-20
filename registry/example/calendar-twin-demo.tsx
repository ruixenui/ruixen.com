"use client";

import * as React from "react";
import { CalendarTwin } from "@/registry/ruixenui/calendar-twin";
import Link from "next/link";

export default function CalendarTwinDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="p-8 flex flex-col justify-center items-start space-y-4">
      <CalendarTwin value={date} onChange={setDate} />
      <p className="text-xs text-muted-foreground mt-2 mx-auto">
        {date ? `Selected: ${date.toDateString()}` : "No date selected"} —{" "}
        <Link
          href="https://www.ruixen.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ruixen.com
        </Link>
      </p>
    </div>
  );
}
