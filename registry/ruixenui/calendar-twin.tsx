"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addMonths, format, startOfYear } from "date-fns";

interface CalendarTwinProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  yearRange?: [number, number]; // [start, end] years
}

export function CalendarTwin({
  value,
  onChange,
  className,
  yearRange = [2000, 2035],
}: CalendarTwinProps) {
  const [view, setView] = React.useState<"month" | "year">("month");
  const [current, setCurrent] = React.useState<Date>(value ?? new Date());

  const handleSelect = (date: Date) => {
    onChange?.(date);
  };

  const goPrev = () => {
    if (view === "month") setCurrent(addMonths(current, -1));
    if (view === "year") {
      const prev = new Date(current);
      prev.setFullYear(prev.getFullYear() - 12);
      setCurrent(prev);
    }
  };

  const goNext = () => {
    if (view === "month") setCurrent(addMonths(current, 1));
    if (view === "year") {
      const next = new Date(current);
      next.setFullYear(next.getFullYear() + 12);
      setCurrent(next);
    }
  };

  const renderMonth = (month: Date) => {
    const start = new Date(month.getFullYear(), month.getMonth(), 1);
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const days: Date[] = [];
    for (let i = 1; i <= end.getDate(); i++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), i));
    }

    return (
      <div className="w-full">
        <div className="mb-2 text-center text-sm font-medium">
          {format(month, "MMMM yyyy")}
        </div>
        <div className="grid grid-cols-7 text-xs text-muted-foreground">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="h-7 flex items-center justify-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: start.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}
          {days.map((day) => {
            const isSelected =
              value && day.toDateString() === value.toDateString();
            return (
              <button
                key={day.toISOString()}
                onClick={() => handleSelect(day)}
                className={cn(
                  "h-9 w-9 m-0.5 flex items-center justify-center rounded-md text-sm transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-foreground",
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearGrid = () => {
    const currentYear = current.getFullYear();
    const start = Math.max(yearRange[0], currentYear - (currentYear % 12));
    const years = Array.from({ length: 12 }, (_, i) => start + i);

    return (
      <div className="p-2">
        <div className="grid grid-cols-3 gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                const newDate = startOfYear(current);
                newDate.setFullYear(y);
                setCurrent(newDate);
                setView("month");
              }}
              className={cn(
                "h-10 rounded-md text-sm font-medium transition-colors",
                y === currentYear
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-foreground",
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
      className={cn("rounded-lg border bg-background p-3 w-[600px]", className)}
    >
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goPrev}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <button
          onClick={() => setView(view === "month" ? "year" : "month")}
          className="text-sm font-semibold hover:underline"
        >
          {view === "month"
            ? format(current, "MMMM yyyy")
            : `${current.getFullYear()}`}
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={goNext}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {view === "month" ? (
        <div className="flex gap-6">
          {renderMonth(current)}
          {renderMonth(addMonths(current, 1))}
        </div>
      ) : (
        renderYearGrid()
      )}
    </div>
  );
}
