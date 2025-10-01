"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Edit2 } from "lucide-react";

export type Event = {
  id: number;
  date: Date;
  time: string;
};

type SchedulerProps = {
  defaultEvents?: Event[];
  defaultHour?: string;
  defaultMinute?: string;
  onAddEvent?: (event: Event) => void;
  onEditEvent?: (event: Event) => void;
  onDeleteEvent?: (id: number) => void;
};

export default function Scheduler({
  defaultEvents = [],
  defaultHour = "12",
  defaultMinute = "00",
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}: SchedulerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState(defaultMinute);
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    setEvents(defaultEvents);
  }, [defaultEvents]);

  const handleSave = () => {
    if (!selectedDate) return;
    const time = `${selectedHour}:${selectedMinute}`;

    if (editingEvent) {
      const updatedEvent = { ...editingEvent, date: selectedDate, time };
      setEvents(
        events.map((ev) => (ev.id === editingEvent.id ? updatedEvent : ev)),
      );
      setEditingEvent(null);
      onEditEvent?.(updatedEvent);
    } else {
      const newEvent = { id: Date.now(), date: selectedDate, time };
      setEvents([...events, newEvent]);
      onAddEvent?.(newEvent);
    }

    setSelectedDate(undefined);
    setSelectedHour(defaultHour);
    setSelectedMinute(defaultMinute);
    setOpen(false);
  };

  const handleEdit = (event: Event) => {
    setSelectedDate(new Date(event.date));
    const [hour, minute] = event.time.split(":");
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setEditingEvent(event);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((ev) => ev.id !== id));
    onDeleteEvent?.(id);
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {editingEvent ? "Edit Event" : "Schedule Event"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" side="bottom" align="start">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />

            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <Label>Hour</Label>
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <Label>Minute</Label>
                <Select
                  value={selectedMinute}
                  onValueChange={setSelectedMinute}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["00", "15", "30", "45"].map((min) => (
                      <SelectItem key={min} value={min}>
                        {min}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="grid gap-2">
        {events.length === 0 && (
          <p className="text-sm text-muted-foreground">No events scheduled.</p>
        )}

        {events.map((ev) => (
          <Card key={ev.id} className="flex items-center justify-between p-3">
            <CardContent className="p-0">
              <p className="font-medium">{ev.date.toDateString()}</p>
              <p className="text-sm text-muted-foreground">at {ev.time}</p>
            </CardContent>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(ev)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(ev.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
