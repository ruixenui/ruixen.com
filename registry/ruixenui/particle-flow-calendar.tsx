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
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export type ParticleEvent = {
  id: number;
  title: string;
  date: Date;
};

interface ParticleFlowCalendarProps {
  initialEvents?: ParticleEvent[];
  particleCount?: number;
  radius?: number;
  size?: number;
  onEventsChange?: (events: ParticleEvent[]) => void;
}

export function ParticleFlowCalendar({
  initialEvents = [],
  particleCount = 30,
  radius = 150,
  size = 420,
  onEventsChange,
}: ParticleFlowCalendarProps) {
  const [events, setEvents] = React.useState<ParticleEvent[]>(initialEvents);
  const [title, setTitle] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const addEvent = () => {
    if (!title || !selectedDate) return;
    const updated = [...events, { id: Date.now(), title, date: selectedDate }];
    setEvents(updated);
    setTitle("");
    onEventsChange?.(updated);
  };

  const deleteEvent = (id: number) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    onEventsChange?.(updated);
  };

  const center = size / 2;

  const getParticlePosition = (index: number) => {
    const angle = (index / particleCount) * 2 * Math.PI;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Filter events for selected month/year
  const filteredEvents = events.filter(
    (e) =>
      e.date.getMonth() === currentMonth.getMonth() &&
      e.date.getFullYear() === currentMonth.getFullYear(),
  );

  const eventsForParticle = (index: number) => {
    return filteredEvents.filter(
      (ev) => ev.date.getDate() % particleCount === index,
    );
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Add Event Form */}
      <Card className="p-2">
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label>Event Title</Label>
              <Input
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mt-1 w-[160px]">
                    {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-5">
              <Button onClick={addEvent}>Add Event</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month Selector */}
      <div className="flex items-center gap-2">
        <Button onClick={() => changeMonth(-1)}>{"< Previous"}</Button>
        <span className="font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <Button onClick={() => changeMonth(1)}>{"Next >"}</Button>

        <Select
          onValueChange={(v) => {
            const today = new Date();
            const newMonth = new Date(today);
            if (v === "1") newMonth.setMonth(today.getMonth() - 1);
            if (v === "2") newMonth.setMonth(today.getMonth() - 3);
            if (v === "3") newMonth.setMonth(today.getMonth() - 6);
            setCurrentMonth(newMonth);
          }}
        >
          <SelectTrigger className="ml-4 w-[150px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Last Month</SelectItem>
            <SelectItem value="2">Last 3 Months</SelectItem>
            <SelectItem value="3">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Particle Flow Field */}
      <div
        className="relative rounded-lg overflow-hidden border dark:border-neutral-700 bg-gray-100 dark:bg-black"
        style={{ width: size, height: size }}
      >
        {[...Array(particleCount)].map((_, i) => {
          const { x, y } = getParticlePosition(i);
          const particleEvents = eventsForParticle(i);
          return (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-4 h-4 rounded-full cursor-pointer ${
                    particleEvents.length > 0
                      ? "bg-yellow-500 shadow-lg shadow-white/50 animate-pulse"
                      : "bg-gray-400 dark:bg-black dark:border dark:border-white"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </PopoverTrigger>
              {particleEvents.length > 0 && (
                <PopoverContent className="w-48">
                  <div className="flex flex-col gap-2 text-sm">
                    {particleEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex justify-between items-center gap-2"
                      >
                        <span>{ev.title}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteEvent(ev.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              )}
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
