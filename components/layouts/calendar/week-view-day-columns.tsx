"use client";

import { cn } from "@/lib/utils";
import type { WeekViewDayColumnsProps } from "./week-view-types";

/**
 * Gets the browser's timezone abbreviation
 */
function getTimezoneAbbreviation(): string {
  const date = new Date();
  const timeZoneString = date.toLocaleTimeString("en-US", {
    timeZoneName: "short",
  });
  const match = timeZoneString.match(/\s([A-Z]{2,5})$/);

  if (match) {
    return match[1];
  }

  // Fallback to offset format
  const offset = -date.getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const sign = offset >= 0 ? "+" : "-";
  return `GMT${sign}${hours}`;
}

/**
 * Day column headers showing day names and date numbers
 * Includes timezone label on the left (unless standalone mode)
 * Highlights the current day
 */
export function WeekViewDayColumns({
  days,
  standalone,
  className,
}: WeekViewDayColumnsProps) {
  const timezone = getTimezoneAbbreviation();

  // Standalone mode: just render the day columns (used inside scroll container)
  if (standalone) {
    return (
      <div
        className={cn("grid", className)}
        style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
      >
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={cn(
              "flex items-center justify-center py-2 text-sm",
              day.isToday ? "gap-0.5 " : "gap-0",
            )}
          >
            <span
              className={cn(
                day.isToday
                  ? "text-foreground font-medium"
                  : "text-muted-foreground font-normal",
              )}
            >
              {day.dayName}
            </span>
            <span
              className={cn(
                "flex h-5 w-[1.2rem] items-center justify-center rounded-xs text-sm",
                day.isToday
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {day.dayNumber}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("grid bg-background", className)}
      style={{ gridTemplateColumns: "4rem 1fr" }}
    >
      {/* Timezone label */}
      <div className="text-muted-foreground flex items-center justify-end pr-2 text-xxs">
        {timezone}
      </div>

      {/* Day columns */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
      >
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={cn(
              "flex items-center justify-center py-2 text-sm",
              day.isToday ? "gap-0.5 " : "gap-0",
            )}
          >
            <span
              className={cn(
                day.isToday
                  ? "text-foreground font-medium"
                  : "text-muted-foreground font-normal",
              )}
            >
              {day.dayName}
            </span>
            <span
              className={cn(
                "flex h-5 w-[1.2rem] items-center justify-center rounded-xs text-sm",
                day.isToday
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {day.dayNumber}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
