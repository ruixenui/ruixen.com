"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownRangeDatePickerProps = {
  selectedRange?: { from?: Date; to?: Date };
  onChange?: (range: { from?: Date; to?: Date } | undefined) => void;
  minYear?: number;
  maxYear?: number;
  monthFormat?: string;
  label?: string;
  className?: string;
  calendarClassName?: string;
  dropdownClassName?: string;
  clearable?: boolean;
};

export function DropdownRangeDatePicker({
  selectedRange,
  onChange,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
  monthFormat = "MMMM",
  label = "Pick a date range",
  className,
  calendarClassName,
  dropdownClassName,
  clearable = true,
}: DropdownRangeDatePickerProps) {
  const today = new Date();
  const [selected, setSelected] = React.useState(selectedRange);
  const [month, setMonth] = React.useState(today.getMonth());
  const [year, setYear] = React.useState(today.getFullYear());

  React.useEffect(() => {
    setSelected(selectedRange);
  }, [selectedRange]);

  const displayMonth = new Date(year, month, 1);

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    setSelected(range);
    onChange?.(range);
  };

  const formattedValue = selected?.from
    ? selected.to
      ? `${format(selected.from, "PPP")} - ${format(selected.to, "PPP")}`
      : format(selected.from, "PPP")
    : label;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate overflow-hidden">{formattedValue}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("w-auto p-4", dropdownClassName)}
        align="start"
      >
        <div className="space-y-4">
          {/* Dropdowns */}
          <div className="flex gap-2">
            <Select
              value={year.toString()}
              onValueChange={(val) => setYear(Number(val))}
            >
              <SelectTrigger className="w-[120px]">
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

            <Select
              value={month.toString()}
              onValueChange={(val) => setMonth(Number(val))}
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
            mode="range"
            selected={selected as { from: Date; to?: Date } | undefined}
            onSelect={handleSelect}
            month={displayMonth}
            onMonthChange={(date) => {
              setMonth(date.getMonth());
              setYear(date.getFullYear());
            }}
            className={cn("rounded-md border", calendarClassName)}
          />

          {/* Footer */}
          <div className="flex justify-between pt-2">
            {clearable && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSelect(undefined)}
                disabled={!selected?.from}
              >
                Clear
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => console.log("Confirmed:", selected)}
              disabled={!selected?.from}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
