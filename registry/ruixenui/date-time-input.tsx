"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type DateTimeInputProps = {
  value?: Date;
  time?: string;
  onChange?: (date: Date | undefined, time: string) => void;
  datePlaceholder?: string;
  timePlaceholder?: string;
  dateFormat?: string;
  className?: string;
  inputClassName?: string;
};

export function DateTimeInput({
  value,
  time: initialTime = "12:00",
  onChange,
  datePlaceholder = "Pick a date",
  timePlaceholder = "Pick a time",
  dateFormat = "PPP",
  className,
  inputClassName,
}: DateTimeInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState(initialTime);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onChange?.(newDate, time);
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    onChange?.(date, newTime);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Date Picker */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[250px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
                inputClassName,
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, dateFormat) : <span>{datePlaceholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="time" className="text-xs font-medium">
          Time
        </Label>
        <div className="relative w-[250px]">
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            step="60"
            placeholder={timePlaceholder}
            className={cn("pl-8", inputClassName)}
          />
          <Clock className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-md border p-2 text-sm text-muted-foreground">
        Selected:{" "}
        {date ? `${format(date, dateFormat)} at ${time}` : "No date selected"}
      </div>
    </div>
  );
}
