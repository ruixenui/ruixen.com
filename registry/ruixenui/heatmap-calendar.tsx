"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO string
};

interface HeatmapCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function HeatmapCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: HeatmapCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [newTitle, setNewTitle] = React.useState("");

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return;
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
    });
    setNewTitle("");
  };

  // Only days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  // Count events per day
  const eventsCount = (date: Date) =>
    events.filter(
      (e) =>
        format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-700";
    if (count === 1) return "bg-green-200 dark:bg-green-800";
    if (count === 2) return "bg-green-400 dark:bg-green-700";
    if (count >= 3) return "bg-green-600 dark:bg-green-600";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {format(selectedDate, "MMMM yyyy")}
      </h2>

      {/* Heatmap grid */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {daysInMonth.map((day) => {
          const dayEvents = eventsCount(day);
          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <div
                  className={`w-10 h-10 rounded cursor-pointer flex items-center justify-center ${getIntensityColor(
                    dayEvents.length,
                  )}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="text-xs">{day.getDate()}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Card>
                  <CardContent className="space-y-1 p-2">
                    <h3 className="font-medium text-sm">
                      {format(day, "PPP")}
                    </h3>
                    {dayEvents.length === 0 && (
                      <p className="text-xs text-muted-foreground">No events</p>
                    )}
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between items-center text-xs"
                      >
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
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>

      {/* Add new event */}
      {selectedDate && (
        <div className="flex gap-2 mt-4 items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </div>
      )}
    </div>
  );
}
