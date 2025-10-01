"use client";

import * as React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

type Event = { time: string; title: string };

type MonthlyHeatmapCalendarProps = {
  initialMonth?: Date;
  initialEvents?: { [key: string]: Event[] };
  startYear?: number;
  endYear?: number;
  onEventAdd?: (dateKey: string, event: Event) => void;
  onEventDelete?: (dateKey: string, eventIndex: number) => void;
};

export default function MonthlyHeatmapCalendar({
  initialMonth = new Date(),
  initialEvents = {},
  startYear = 2015,
  endYear = new Date().getFullYear() + 5,
  onEventAdd,
  onEventDelete,
}: MonthlyHeatmapCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth);
  const [events, setEvents] = React.useState<{ [key: string]: Event[] }>(
    initialEvents,
  );
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventHour, setEventHour] = React.useState("12");
  const [eventMinute, setEventMinute] = React.useState("00");
  const [ampm, setAmpm] = React.useState("AM");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let days: JSX.Element[] = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const key = format(cloneDay, "yyyy-MM-dd");
      const hasEvents = events[key]?.length > 0;

      days.push(
        <div
          key={cloneDay.toString()}
          className={`border h-10 mb-2 flex items-start justify-center cursor-pointer relative rounded-md ${
            !isSameMonth(cloneDay, monthStart)
              ? "bg-muted/20 text-muted-foreground"
              : "bg-background"
          }`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-full flex items-start justify-center text-sm p-2"
              >
                {format(cloneDay, "d")}
                {hasEvents && (
                  <Badge
                    variant="default"
                    className="absolute top-1 right-1 h-2 w-2 rounded-full p-0"
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-3">
              <h4 className="font-medium">{format(cloneDay, "PPP")}</h4>
              <Input
                placeholder="Event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <div className="flex gap-2 items-center">
                <Select value={eventHour} onValueChange={setEventHour}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const h = (i + 1).toString().padStart(2, "0");
                      return (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <span>:</span>
                <Select value={eventMinute} onValueChange={setEventMinute}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["00", "15", "30", "45"].map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={ampm} onValueChange={setAmpm}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  if (!eventTitle) return;
                  const time = `${eventHour}:${eventMinute} ${ampm}`;
                  const newEvent = { time, title: eventTitle };
                  setEvents((prev) => {
                    const updated = {
                      ...prev,
                      [key]: [...(prev[key] || []), newEvent],
                    };
                    onEventAdd?.(key, newEvent);
                    return updated;
                  });
                  setEventTitle("");
                }}
              >
                Save Event
              </Button>

              <div className="space-y-2">
                {events[key]?.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <span>
                      {event.time} - {event.title}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEvents((prev) => {
                          const updated = [...(prev[key] || [])];
                          updated.splice(index, 1);
                          onEventDelete?.(key, index);
                          return { ...prev, [key]: updated };
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-2" key={day.toString()}>
        {days}
      </div>,
    );
    days = [];
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  return (
    <Card className="p-2">
      <CardContent className="p-2">
        <div className="flex justify-between items-center mb-2">
          <Select
            value={currentMonth.getMonth().toString()}
            onValueChange={(val) => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(parseInt(val));
              setCurrentMonth(newDate);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue>{months[currentMonth.getMonth()]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => (
                <SelectItem key={m} value={i.toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={currentMonth.getFullYear().toString()}
            onValueChange={(val) => {
              const newDate = new Date(currentMonth);
              newDate.setFullYear(parseInt(val));
              setCurrentMonth(newDate);
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>{currentMonth.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {rows}
      </CardContent>
    </Card>
  );
}
