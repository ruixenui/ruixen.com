"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SidePanelMultiCalendarProps = {
  selectedDates?: Date[];
  onChange?: (dates: Date[]) => void;
  maxSelectable?: number;
  label?: string;
  dateFormat?: string;
  className?: string;
  calendarClassName?: string;
  panelClassName?: string;
};

export function SidePanelMultiCalendar({
  selectedDates = [],
  onChange,
  maxSelectable,
  label = "Multi-Select Calendar with Side Panel",
  dateFormat = "d",
  className,
  calendarClassName,
  panelClassName,
}: SidePanelMultiCalendarProps) {
  const [dates, setDates] = React.useState<Date[]>(selectedDates);

  // Group selected dates by month-year
  const groupedDates = dates.reduce<Record<string, Date[]>>((acc, date) => {
    const key = format(date, "MMMM yyyy");
    if (!acc[key]) acc[key] = [];
    acc[key].push(date);
    return acc;
  }, {});

  const handleSelect = (selected: Date[] | undefined) => {
    let newDates = selected ?? [];
    if (maxSelectable) {
      newDates = newDates.slice(0, maxSelectable);
    }
    setDates(newDates);
    onChange?.(newDates);
  };

  const handleRemove = (date: Date) => {
    const newDates = dates.filter(
      (d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"),
    );
    setDates(newDates);
    onChange?.(newDates);
  };

  const handleClearMonth = (monthKey: string) => {
    const newDates = dates.filter((d) => format(d, "MMMM yyyy") !== monthKey);
    setDates(newDates);
    onChange?.(newDates);
  };

  return (
    <Card className={cn("shadow-none border-none bg-background", className)}>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        {/* Calendar Section */}
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={handleSelect}
          className={cn("rounded-md", calendarClassName)}
        />

        {/* Side Panel Section */}
        <div className={cn("w-[260px]", panelClassName)}>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Selected Dates
          </p>
          <ScrollArea className="h-[280px] pr-2">
            {Object.keys(groupedDates).length === 0 && (
              <p className="text-xs text-muted-foreground">No dates selected</p>
            )}
            {Object.entries(groupedDates).map(([monthKey, datesInMonth]) => (
              <div key={monthKey} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold">{monthKey}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => handleClearMonth(monthKey)}
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {datesInMonth
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((d) => (
                      <Button
                        key={d.toISOString()}
                        size="sm"
                        variant="secondary"
                        className="text-xs"
                        onClick={() => handleRemove(d)}
                      >
                        {format(d, dateFormat)}
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          onClick={() => console.log("Confirmed:", dates)}
          disabled={dates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Inspired by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </Card>
  );
}
