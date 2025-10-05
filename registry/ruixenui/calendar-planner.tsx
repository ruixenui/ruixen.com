"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format, startOfYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarPlannerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  yearRange?: [number, number];
  info?: Record<string, string>; // dateKey -> info string
}

export function CalendarPlanner({
  value,
  onChange,
  className,
  yearRange = [2000, 2040],
  info = {},
}: CalendarPlannerProps) {
  const [mode, setMode] = React.useState<"month" | "year">("month");
  const [cursor, setCursor] = React.useState<Date>(value ?? new Date());

  const selectDate = (d: Date) => {
    onChange?.(d);
  };

  const prev = () => {
    if (mode === "month") setCursor(addMonths(cursor, -1));
    else {
      const c = new Date(cursor);
      c.setFullYear(c.getFullYear() - 12);
      setCursor(c);
    }
  };

  const next = () => {
    if (mode === "month") setCursor(addMonths(cursor, 1));
    else {
      const c = new Date(cursor);
      c.setFullYear(c.getFullYear() + 12);
      setCursor(c);
    }
  };

  const renderMonthGrid = (base: Date) => {
    const firstOfMonth = new Date(base.getFullYear(), base.getMonth(), 1);
    const lastOfMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0);
    const days: Date[] = [];
    for (let d = 1; d <= lastOfMonth.getDate(); d++) {
      days.push(new Date(base.getFullYear(), base.getMonth(), d));
    }
    const padStart = firstOfMonth.getDay();

    return (
      <div className="w-full">
        <div className="mb-2 text-center font-medium">
          {format(base, "MMMM yyyy")}
        </div>
        <div className="grid grid-cols-7 text-xs text-muted-foreground">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((wd) => (
            <div key={wd} className="h-7 flex items-center justify-center">
              {wd}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: padStart }).map((_, i) => (
            <div key={`pad-${i}`} className="h-14" />
          ))}
          {days.map((dt) => {
            const key = format(dt, "yyyy-MM-dd");
            const note = info[key];
            const isSelected =
              value && dt.toDateString() === value.toDateString();

            return (
              <button
                key={dt.toISOString()}
                onClick={() => selectDate(dt)}
                className={cn(
                  "h-14 w-14 m-0.5 flex flex-col items-center justify-center rounded-md border text-sm transition-colors",
                  "bg-background text-foreground hover:bg-muted",
                  isSelected &&
                    "border-foreground bg-foreground text-background",
                )}
              >
                <span>{dt.getDate()}</span>
                {note && (
                  <span className="text-[10px] text-muted-foreground truncate">
                    {note}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearGrid = () => {
    const cy = cursor.getFullYear();
    const startBlock = Math.floor((cy - yearRange[0]) / 12) * 12 + yearRange[0];
    const years = Array.from({ length: 12 }, (_, i) => startBlock + i).filter(
      (y) => y >= yearRange[0] && y <= yearRange[1],
    );

    return (
      <div className="p-2">
        <div className="grid grid-cols-3 gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                const n = new Date(cursor);
                n.setFullYear(y);
                setCursor(n);
                setMode("month");
              }}
              className={cn(
                "h-12 flex items-center justify-center rounded-md border text-sm transition",
                y === cy ? "bg-foreground text-background" : "hover:bg-muted",
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border bg-background p-6 w-[620px]",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <button
          className="text-base font-semibold hover:underline"
          onClick={() => setMode(mode === "month" ? "year" : "month")}
        >
          {mode === "month"
            ? format(cursor, "MMMM yyyy")
            : cursor.getFullYear()}
        </button>
        <Button variant="ghost" size="icon" onClick={next}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {mode === "month" ? (
        <div className="flex gap-6">
          {renderMonthGrid(cursor)}
          {renderMonthGrid(addMonths(cursor, 1))}
        </div>
      ) : (
        renderYearGrid()
      )}

      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Inspired by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}
