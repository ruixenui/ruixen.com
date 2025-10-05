"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";

type Event = {
  id: number;
  date: Date;
  title: string;
  category: "meeting" | "workshop" | "holiday";
};

export default function CalendarDemoPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [events, setEvents] = useState<Event[]>([
    { id: 1, date: new Date(), title: "Team Meeting", category: "meeting" },
    {
      id: 2,
      date: new Date(),
      title: "Holiday Planning",
      category: "holiday",
    },
  ]);

  const eventsForDay = (date: Date) =>
    events.filter((event) => event.date.toDateString() === date.toDateString());

  const handleAddEvent = () => {
    if (!selectedDate) return;
    const newEvent: Event = {
      id: Date.now(),
      date: selectedDate,
      title: `New Event ${events.length + 1}`,
      category: "meeting",
    };
    setEvents([...events, newEvent]);
  };

  const handleRemoveEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const getColor = (category: Event["category"]) => {
    switch (category) {
      case "meeting":
        return "bg-blue-500";
      case "workshop":
        return "bg-green-500";
      case "holiday":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-bold">Calendar with Events</h1>

      <Button onClick={handleAddEvent}>Add Event to Selected Day</Button>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border shadow"
        components={{
          DayContent: (day) => {
            const dayEvents = eventsForDay(day.date);
            return (
              <Popover key={day.date.toISOString()}>
                <PopoverTrigger asChild>
                  <div className="relative w-full h-20 flex flex-col justify-end cursor-pointer border border-gray-200 rounded hover:bg-gray-100">
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => handleRemoveEvent(event.id)}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
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
    </div>
  );
}
