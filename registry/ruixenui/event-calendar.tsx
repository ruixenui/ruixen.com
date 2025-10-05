"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO string
};

interface EventCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function EventCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [newTitle, setNewTitle] = React.useState("");

  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (e) =>
          format(new Date(e.date), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd"),
      )
    : [];

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return;
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
    });
    setNewTitle("");
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
      />

      {/* Events list for selected date */}
      {selectedDate && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            Events on {format(selectedDate, "PPP")}
          </h2>

          {eventsForSelectedDate.length === 0 && (
            <p className="text-sm text-muted-foreground">No events yet.</p>
          )}

          {eventsForSelectedDate.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-2 flex justify-between items-center text-sm">
                <span>{event.title}</span>
                {onRemoveEvent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => onRemoveEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add new event */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="New event title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={handleAddEvent}>Add Event</Button>
          </div>
        </div>
      )}
    </div>
  );
}
