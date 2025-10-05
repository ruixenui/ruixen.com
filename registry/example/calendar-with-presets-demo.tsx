"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar } from "@/registry/ruixenui/calendar-with-presets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";
import {
  subDays,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from "date-fns";

export default function CalendarWithPresets() {
  const today = new Date();

  // 📌 Define Presets
  const presets: Record<string, { from: Date; to: Date }> = {
    Today: { from: today, to: today },
    Yesterday: { from: subDays(today, 1), to: subDays(today, 1) },
    "Last 7 Days": { from: subDays(today, 6), to: today },
    "Last 14 Days": { from: subDays(today, 13), to: today },
    "Last 30 Days": { from: subDays(today, 29), to: today },
    "Last 90 Days": { from: subDays(today, 89), to: today },
    "Month to Date": { from: startOfMonth(today), to: today },
    "Quarter to Date": { from: startOfQuarter(today), to: today },
    "Year to Date": { from: startOfYear(today), to: today },
    "Last Month": {
      from: startOfMonth(subDays(startOfMonth(today), 1)),
      to: endOfMonth(subDays(startOfMonth(today), 1)),
    },
    "Last Quarter": {
      from: startOfQuarter(subDays(startOfQuarter(today), 1)),
      to: endOfQuarter(subDays(startOfQuarter(today), 1)),
    },
    "Last Year": {
      from: startOfYear(subDays(startOfYear(today), 1)),
      to: endOfYear(subDays(startOfYear(today), 1)),
    },
  };

  const [date, setDate] = useState<DateRange | undefined>(
    presets["Last 7 Days"],
  );
  const [month, setMonth] = useState<Date>(today);

  // 📌 Dynamic height lock (card matches calendar height)
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarHeight, setCalendarHeight] = useState<number>(0);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarHeight(calendarRef.current.offsetHeight);
    }
  }, [month]);

  return (
    <Card className="p-4">
      <div className="flex max-sm:flex-col">
        {/* Sidebar Presets with Scroll */}
        <div
          className="sm:w-40 border-r pr-2 max-sm:border-b max-sm:mb-2 overflow-y-auto"
          style={{ maxHeight: calendarHeight || 300 }}
        >
          <div className="flex flex-col gap-1">
            {Object.entries(presets).map(([label, range]) => (
              <Button
                key={label}
                variant="ghost"
                size="sm"
                className="justify-start w-full"
                onClick={() => {
                  setDate(range);
                  setMonth(range.to);
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="sm:hidden my-2" />

        {/* Calendar */}
        <div className="flex-1 flex justify-center" ref={calendarRef}>
          <Calendar
            mode="range"
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={setDate}
            className="bg-background p-2 rounded-md"
            disabled={[{ after: today }]}
          />
        </div>
      </div>

      {/* Credits */}
      <p
        className="mt-4 text-xs text-center text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Range calendar with configurable presets — built with{" "}
        <a
          href="https://daypicker.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          React DayPicker
        </a>
        ,{" "}
        <a
          href="https://www.ruixen.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Ruixen
        </a>{" "}
        & shadcn/ui
      </p>
    </Card>
  );
}
