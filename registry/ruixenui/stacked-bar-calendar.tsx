"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  category?: "low" | "medium" | "high";
};

interface StackedBarCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function StackedBarCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: StackedBarCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<
    "low" | "medium" | "high"
  >("medium");
  const [filter, setFilter] = React.useState<"all" | "low" | "medium" | "high">(
    "all",
  );

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return;
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
      category: newCategory,
    });
    setNewTitle("");
  };

  const filteredEvents =
    filter === "all" ? events : events.filter((e) => e.category === filter);

  const eventsForDay = (date: Date) =>
    filteredEvents.filter(
      (e) =>
        format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );

  const getColor = (category?: string) => {
    switch (category) {
      case "low":
        return "bg-blue-300 dark:bg-blue-700";
      case "medium":
        return "bg-green-400 dark:bg-green-600";
      case "high":
        return "bg-red-500 dark:bg-red-600";
      default:
        return "bg-gray-300 dark:bg-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 items-center">
        <span className="font-medium">Filter:</span>
        <Select value={filter} onValueChange={(val) => setFilter(val as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        components={{
          DayContent: (day) => {
            const dayEvents = eventsForDay(day.date);
            return (
              <Popover key={day.date.toISOString()}>
                <PopoverTrigger asChild>
                  <div className="relative w-full h-20 flex flex-col justify-end cursor-pointer border border-gray-200 dark:border-gray-700 rounded">
                    {dayEvents.map((event, i) => (
                      <div
                        key={i}
                        className={`w-full ${getColor(event.category)} mb-0.5 rounded`}
                        style={{ height: `${18 / (dayEvents.length || 1)}px` }}
                      />
                    ))}
                    <span className="absolute top-1 left-1 text-xs">
                      {day.date.getDate()}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <Card>
                    <CardContent className="space-y-1 p-2">
                      <h3 className="font-medium text-sm">
                        {format(day.date, "PPP")}
                      </h3>
                      {dayEvents.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          No events
                        </p>
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
          },
        }}
      />

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">
            Events on {format(selectedDate, "PPP")}
          </h3>
          <div className="space-y-2 mt-2">
            {eventsForDay(selectedDate).length === 0 && (
              <p className="text-xs text-muted-foreground">No events</p>
            )}
            {eventsForDay(selectedDate).map((event) => (
              <Card key={event.id}>
                <CardContent className="flex justify-between items-center p-2 text-xs">
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
            ))}
          </div>
        </div>
      )}

      {/* Add Event */}
      {selectedDate && (
        <div className="flex gap-2 mt-4 items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Select
            value={newCategory}
            onValueChange={(val) => setNewCategory(val as any)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </div>
      )}
    </div>
  );
}
