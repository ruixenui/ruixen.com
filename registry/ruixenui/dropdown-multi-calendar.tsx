"use client";

import * as React from "react";
import { format, setMonth, setYear } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type DropdownMultiCalendarProps = {
  selectedDates?: Date[];
  onChange?: (dates: Date[]) => void;
  minYear?: number;
  maxYear?: number;
  maxSelectable?: number;
  label?: string;
  monthFormat?: string;
  className?: string;
  calendarClassName?: string;
  dropdownClassName?: string;
};

export function DropdownMultiCalendar({
  selectedDates = [],
  onChange,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
  maxSelectable,
  label = "Select Dates",
  monthFormat = "MMMM",
  className,
  calendarClassName,
  dropdownClassName,
}: DropdownMultiCalendarProps) {
  const today = new Date();
  const [month, setMonthState] = React.useState(today.getMonth());
  const [year, setYearState] = React.useState(today.getFullYear());
  const [dates, setDates] = React.useState<Date[]>(selectedDates);

  const handleRemove = (date: Date) => {
    const newDates = dates.filter(
      (d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"),
    );
    setDates(newDates);
    onChange?.(newDates);
  };

  const handleSelect = (selected: Date[] | undefined) => {
    let newDates = selected ?? [];
    if (maxSelectable) newDates = newDates.slice(0, maxSelectable);
    setDates(newDates);
    onChange?.(newDates);
  };

  const displayMonth = setMonth(setYear(today, year), month);

  return (
    <Card className={cn("shadow-none border-none bg-background", className)}>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Dropdowns */}
        <div className={cn("flex gap-2", dropdownClassName)}>
          {/* Year Select */}
          <Select
            value={year.toString()}
            onValueChange={(val) => setYearState(Number(val))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: maxYear - minYear + 1 },
                (_, i) => minYear + i,
              ).map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month Select */}
          <Select
            value={month.toString()}
            onValueChange={(val) => setMonthState(Number(val))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {format(new Date(2000, i, 1), monthFormat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar */}
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={handleSelect}
          month={displayMonth}
          onMonthChange={(date) => {
            setMonthState(date.getMonth());
            setYearState(date.getFullYear());
          }}
          className={cn("rounded-md border", calendarClassName)}
        />

        {/* Selected Dates */}
        <div className="flex flex-wrap gap-2">
          {dates.length === 0 && (
            <p className="text-xs text-muted-foreground">No dates selected</p>
          )}
          {dates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((d) => (
              <Badge
                key={d.toISOString()}
                variant="secondary"
                className="flex items-center gap-2"
              >
                {format(d, "PPP")}
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
          onClick={() => console.log("Confirmed:", dates)}
          disabled={dates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
