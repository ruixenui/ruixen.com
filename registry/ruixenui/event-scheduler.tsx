"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  PlusCircle,
  CalendarDays,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Event {
  id: number;
  title: string;
  date: Date;
}

interface EventSchedulerProps {
  defaultEvents?: Event[];
  defaultTitle?: string;
  defaultDate?: Date;
  defaultHour?: string;
  defaultMinute?: string;
  defaultAMPM?: "AM" | "PM";
  onAddEvent?: (event: Event) => void;
  onDeleteEvent?: (id: number) => void;
  disabled?: boolean;
}

const EventScheduler: React.FC<EventSchedulerProps> = ({
  defaultEvents = [],
  defaultTitle = "",
  defaultDate,
  defaultHour = "12",
  defaultMinute = "00",
  defaultAMPM = "AM",
  onAddEvent,
  onDeleteEvent,
  disabled = false,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);
  const [hour, setHour] = React.useState(defaultHour);
  const [minute, setMinute] = React.useState(defaultMinute);
  const [ampm, setAmpm] = React.useState<"AM" | "PM">(defaultAMPM);
  const [title, setTitle] = React.useState(defaultTitle);
  const [events, setEvents] = React.useState<Event[]>(defaultEvents);

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

  const handleAddEvent = () => {
    if (!title || !selectedDateTime) return;
    const newEvent: Event = { id: Date.now(), title, date: selectedDateTime };
    setEvents((prev) => [...prev, newEvent]);
    onAddEvent?.(newEvent);
    setTitle(defaultTitle);
    setDate(defaultDate);
    setHour(defaultHour);
    setMinute(defaultMinute);
    setAmpm(defaultAMPM);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    onDeleteEvent?.(id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Event Creation */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="p-3">
          <CardTitle className="flex items-center gap-2 text-normal">
            <CalendarDays className="h-5 w-5 text-primary" />
            Create Event
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-3">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Event Title</label>
            <Input
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                  disabled={disabled}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4" side="bottom" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Time</label>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <Select value={hour} onValueChange={setHour} disabled={disabled}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const h = i + 1;
                    return (
                      <SelectItem key={h} value={h.toString().padStart(2, "0")}>
                        {h.toString().padStart(2, "0")}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <span className="font-semibold">:</span>

              <Select
                value={minute}
                onValueChange={setMinute}
                disabled={disabled}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {["00", "15", "30", "45"].map((m) => (
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
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Button */}
          <Button
            onClick={handleAddEvent}
            disabled={!title || !selectedDateTime || disabled}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Event
          </Button>
        </CardContent>
      </Card>

      {/* Event List */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Scheduled Events</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {events.length === 0 && (
            <p className="text-sm text-muted-foreground">No events scheduled</p>
          )}
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex justify-between items-center border rounded-lg px-3 py-2"
            >
              <div>
                <span className="font-medium block">{ev.title}</span>
                <span className="text-sm text-muted-foreground">
                  {format(ev.date, "PPP p")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteEvent(ev.id)}
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventScheduler;
