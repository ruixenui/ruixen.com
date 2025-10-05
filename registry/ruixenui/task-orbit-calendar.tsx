"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  differenceInHours,
  parseISO,
  format,
  addDays,
  isBefore,
  isAfter,
} from "date-fns";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO string
};

interface TaskOrbitCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function TaskOrbitCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: TaskOrbitCalendarProps) {
  const [newTitle, setNewTitle] = React.useState("");
  const [newDate, setNewDate] = React.useState("");

  const now = new Date();
  const minDate = addDays(now, -7);
  const maxDate = addDays(now, 7);

  const handleAddEvent = () => {
    if (!newTitle.trim() || !newDate) return;

    const eventDate = parseISO(newDate);
    if (isBefore(eventDate, minDate) || isAfter(eventDate, maxDate)) {
      alert("Event date must be within ±7 days from today");
      return;
    }

    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: newDate,
    });
    setNewTitle("");
    setNewDate("");
  };

  const getOrbitDistance = (eventDate: string) => {
    const hoursDiff = Math.max(differenceInHours(parseISO(eventDate), now), 0);
    const maxDistance = 150;
    const distance = Math.min(maxDistance, hoursDiff * 5 + 40); // closer events move inward
    return distance;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Central Today Circle */}
      <div className="relative w-[400px] h-[400px] flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          Today
        </div>

        {/* Orbiting Events */}
        {events.map((event, i) => {
          const angle = (i / events.length) * 360;
          const distance = getOrbitDistance(event.date);
          return (
            <Popover key={event.id}>
              <PopoverTrigger asChild>
                <div
                  className="absolute w-8 h-8 bg-green-400 dark:bg-green-600 rounded-full flex items-center justify-center text-xs text-white cursor-pointer"
                  style={{
                    transform: `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`,
                  }}
                >
                  {format(parseISO(event.date), "HH:mm")}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Card>
                  <CardContent className="flex justify-between items-center p-2 text-sm">
                    <span>{event.title}</span>
                    {onRemoveEvent && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => onRemoveEvent(event.id)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>

      {/* Add Event */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Event date must be within 7 days before or after today
        </p>
      </div>
    </div>
  );
}
