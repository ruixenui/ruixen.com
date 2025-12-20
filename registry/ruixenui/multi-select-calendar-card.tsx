"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MultiSelectCalendarCardProps = {
  selectedDates?: Date[];
  onChange?: (dates: Date[]) => void;
  maxSelectable?: number;
  label?: string;
  dateFormat?: string;
  className?: string;
  calendarClassName?: string;
};

export function MultiSelectCalendarCard({
  selectedDates = [],
  onChange,
  maxSelectable,
  label = "Select Multiple Dates",
  dateFormat = "PP",
  className,
  calendarClassName,
}: MultiSelectCalendarCardProps) {
  const [dates, setDates] = React.useState<Date[]>(selectedDates);

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

  return (
    <Card
      className={cn(
        "w-[380px] shadow-none border-none bg-background",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Calendar */}
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={handleSelect}
          className={cn("rounded-md border w-fit", calendarClassName)}
        />

        {/* Selected dates list */}
        <div className="flex flex-wrap gap-2">
          {dates.length === 0 && (
            <p className="text-xs text-muted-foreground">No dates selected</p>
          )}
          {dates.map((d) => (
            <Badge
              key={d.toISOString()}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {format(d, dateFormat)}
              <Button
                size="icon"
                variant="ghost"
                className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemove(d)}
              >
                ✕
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          onClick={() => console.log("Selected Dates:", dates)}
          disabled={dates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
