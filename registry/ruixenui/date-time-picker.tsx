"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  defaultDate?: Date;
  defaultHour?: string;
  defaultMinute?: string;
  defaultAMPM?: "AM" | "PM";
  onChange?: (date: Date | null) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  hourOptions?: string[];
  minuteOptions?: string[];
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  defaultDate,
  defaultHour = "12",
  defaultMinute = "00",
  defaultAMPM = "AM",
  onChange,
  disabled = false,
  minDate,
  maxDate,
  hourOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  ),
  minuteOptions = ["00", "15", "30", "45"],
}) => {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);
  const [hour, setHour] = React.useState(defaultHour);
  const [minute, setMinute] = React.useState(defaultMinute);
  const [ampm, setAmpm] = React.useState<"AM" | "PM">(defaultAMPM);

  const handleAmpmChange = (value: string) => {
    setAmpm(value as "AM" | "PM");
  };

  const selectedDateTime = React.useMemo(() => {
    if (!date) return null;
    const d = new Date(date);
    let h = parseInt(hour);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    d.setHours(h, parseInt(minute), 0, 0);
    return d;
  }, [date, hour, minute, ampm]);

  React.useEffect(() => {
    onChange?.(selectedDateTime ?? null);
  }, [selectedDateTime, onChange]);

  return (
    <div className="flex flex-col gap-4">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-fit">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={
              disabled
                ? true
                : (date) => {
                    if (minDate && date < minDate) return true;
                    if (maxDate && date > maxDate) return true;
                    return false;
                  }
            }
          />
        </PopoverContent>
      </Popover>

      {/* Time Picker */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Select value={hour} onValueChange={setHour} disabled={disabled}>
          <SelectTrigger className="w-[62px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {hourOptions.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span>:</span>

        <Select value={minute} onValueChange={setMinute} disabled={disabled}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {minuteOptions.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={ampm}
          onValueChange={handleAmpmChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Result */}
      <p className="text-sm text-muted-foreground">
        Selected:{" "}
        {selectedDateTime
          ? format(selectedDateTime, "PPP p")
          : "No date & time selected"}
      </p>
    </div>
  );
};

export default DateTimePicker;
