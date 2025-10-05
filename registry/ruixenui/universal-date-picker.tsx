"use client";

import * as React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

type Mode = "single" | "range";

interface Preset {
  label: string;
  range: { from: Date; to: Date };
}

interface UniversalDatePickerProps {
  mode?: Mode;
  onChange?: (date: Date | DateRange | undefined) => void;
  selected?: Date | DateRange;
  className?: string;
  presets?: Preset[];
  label?: string;
}

export function UniversalDatePicker({
  mode: initialMode = "single",
  onChange,
  selected,
  className,
  presets: customPresets,
  label = "Date picker",
}: UniversalDatePickerProps) {
  const id = useId();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [date, setDate] = useState<Date | undefined>(
    selected instanceof Date ? selected : undefined,
  );
  const [range, setRange] = useState<DateRange | undefined>(
    selected && typeof selected !== "object"
      ? undefined
      : (selected as DateRange | undefined),
  );

  const today = new Date();
  const defaultPresets: Preset[] = [
    { label: "Today", range: { from: today, to: today } },
    {
      label: "Yesterday",
      range: { from: subDays(today, 1), to: subDays(today, 1) },
    },
    { label: "Last 7 days", range: { from: subDays(today, 6), to: today } },
    { label: "Last 30 days", range: { from: subDays(today, 29), to: today } },
    {
      label: "This Month",
      range: { from: startOfMonth(today), to: endOfMonth(today) },
    },
    {
      label: "Last Month",
      range: {
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      },
    },
    {
      label: "This Year",
      range: { from: startOfYear(today), to: endOfYear(today) },
    },
  ];

  const presets = customPresets ?? defaultPresets;

  const handleSelect = (value: Date | DateRange | undefined) => {
    if (mode === "single") {
      setDate(value as Date | undefined);
    } else {
      setRange(value as DateRange | undefined);
    }
    onChange?.(value);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "single" ? "default" : "outline"}
            onClick={() => setMode("single")}
          >
            Single
          </Button>
          <Button
            size="sm"
            variant={mode === "range" ? "default" : "outline"}
            onClick={() => setMode("range")}
          >
            Range
          </Button>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
              !date && !range && "text-muted-foreground",
            )}
          >
            <span className="truncate">
              {mode === "single" && date
                ? format(date, "PPP")
                : mode === "range" && range
                  ? `${range.from ? format(range.from, "PPP") : "—"} – ${
                      range.to ? format(range.to, "PPP") : "—"
                    }`
                  : "Pick a date"}
            </span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto max-h-[300px] overflow-y-auto p-3 space-y-3"
          align="start"
        >
          {/* Presets */}
          <Card className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <Button
                  key={p.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() =>
                    handleSelect(mode === "single" ? p.range.to : p.range)
                  }
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Calendar */}
          {mode === "single" ? (
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              showOutsideDays
              className="rounded-md border"
            />
          ) : (
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleSelect}
              showOutsideDays
              className="rounded-md border"
            />
          )}

          {/* Year Selector */}
          <Card className="p-3">
            <div className="grid grid-cols-4 gap-2">
              {Array.from(
                { length: 9 },
                (_, i) => today.getFullYear() - 4 + i,
              ).map((year) => (
                <Button
                  key={year}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const yDate = new Date(
                      year,
                      today.getMonth(),
                      today.getDate(),
                    );
                    handleSelect(
                      mode === "single"
                        ? yDate
                        : { from: startOfYear(yDate), to: endOfYear(yDate) },
                    );
                  }}
                >
                  {year}
                </Button>
              ))}
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
