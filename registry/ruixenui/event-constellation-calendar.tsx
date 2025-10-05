"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO
};

interface EventConstellationCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (e: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function EventConstellationCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: EventConstellationCalendarProps) {
  const [dateRef, setDateRef] = React.useState(new Date());
  const [title, setTitle] = React.useState("");
  const [newDate, setNewDate] = React.useState("");

  // get days in month
  const days = eachDayOfInterval({
    start: startOfMonth(dateRef),
    end: endOfMonth(dateRef),
  });

  // filter events for given day
  const eventsForDay = (d: Date) =>
    events.filter(
      (ev) =>
        format(new Date(ev.date), "yyyy-MM-dd") === format(d, "yyyy-MM-dd"),
    );

  const handleAdd = () => {
    if (!title.trim() || !newDate) return;
    onAddEvent({
      id: uuidv4(),
      title: title.trim(),
      date: new Date(newDate).toISOString(),
    });
    setTitle("");
    setNewDate("");
  };

  // ✅ Keep stars inside container (with padding)
  const getStarPosition = (dayIndex: number) => {
    const angle = (dayIndex / days.length) * 2 * Math.PI;
    const radius = 100 + (dayIndex % 5) * 20; // smaller radius range
    const centerX = 200;
    const centerY = 200;
    const padding = 20; // ensures no star goes outside box
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return {
      x: Math.min(400 - padding, Math.max(padding, x)),
      y: Math.min(400 - padding, Math.max(padding, y)),
    };
  };

  return (
    <div className="space-y-4 flex flex-col items-center">
      {/* Month Navigation */}
      <div className="flex gap-2 items-center">
        <Button
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
          }
        >
          Prev
        </Button>
        <div className="font-semibold">{format(dateRef, "MMMM yyyy")}</div>
        <Button
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
          }
        >
          Next
        </Button>
      </div>

      {/* Starfield (Constellation Map) */}
      <div className="relative w-[400px] h-[400px] bg-neutral-900 dark:bg-neutral-950 rounded-lg overflow-hidden border border-neutral-700 dark:border-neutral-800">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {days.map((day, idx) => {
            const { x, y } = getStarPosition(idx);
            const dayEvents = eventsForDay(day);
            if (dayEvents.length === 0) return null;

            // connect to next day with events
            const nextDay = days[idx + 1];
            if (!nextDay) return null;
            const nextEvents = eventsForDay(nextDay);
            if (nextEvents.length === 0) return null;

            const { x: nx, y: ny } = getStarPosition(idx + 1);

            return (
              <line
                key={`line-${idx}`}
                x1={x}
                y1={y}
                x2={nx}
                y2={ny}
                stroke="white"
                strokeWidth="1"
                opacity="0.4"
              />
            );
          })}
        </svg>

        {days.map((day, idx) => {
          const { x, y } = getStarPosition(idx);
          const dayEvents = eventsForDay(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-6 h-6 flex items-center justify-center rounded-full text-[10px] cursor-pointer transition-colors ${
                    hasEvents
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-neutral-500 text-white dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {format(day, "d")}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <Card>
                  <CardContent className="p-2 space-y-2 text-sm">
                    <div className="font-medium">{format(day, "PPP")}</div>
                    {dayEvents.length === 0 && (
                      <div className="text-xs text-muted-foreground">
                        No events
                      </div>
                    )}
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex justify-between items-center"
                      >
                        <span>{ev.title}</span>
                        {onRemoveEvent && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => onRemoveEvent(ev.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
