"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
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
  date: Date;
};

interface WheelOfTimeCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (e: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function WheelOfTimeCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: WheelOfTimeCalendarProps) {
  const [rotation, setRotation] = React.useState(0);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth()); // 0-based

  const radius = 150;
  const center = 200;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const segmentCount = daysInMonth;
  const segmentAngle = (2 * Math.PI) / segmentCount;

  const monthNames = [
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

  const getSegmentPosition = (i: number) => {
    const angle = i * segmentAngle + (rotation * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const eventsForSegment = (index: number) => {
    return events.filter(
      (ev) =>
        ev.date.getFullYear() === year &&
        ev.date.getMonth() === month &&
        ev.date.getDate() === index + 1,
    );
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const monthName = monthNames[date.getMonth()].slice(0, 3);
    return `${day} ${monthName} ${date.getFullYear()}`;
  };

  const yearOptions = Array.from({ length: 21 }, (_, i) => year - 10 + i);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Month/Year Select */}
      <div className="flex gap-4 mb-4 flex-wrap justify-center items-center">
        <div className="flex flex-col">
          <span className="font-medium text-sm mb-1">Month</span>
          <Select
            value={month.toString()}
            onValueChange={(val) => setMonth(Number(val))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((name, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm mb-1">Year</span>
          <Select
            value={year.toString()}
            onValueChange={(val) => setYear(Number(val))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rotate Controls */}
      <div className="flex gap-2">
        <Button onClick={() => setRotation((r) => r - 15)}>
          ⟲ Rotate Left
        </Button>
        <Button onClick={() => setRotation((r) => r + 15)}>
          Rotate Right ⟳
        </Button>
      </div>

      {/* Wheel */}
      <div className="relative w-[400px] h-[400px] rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {[...Array(segmentCount)].map((_, i) => {
            const startAngle = i * segmentAngle + (rotation * Math.PI) / 180;
            const endAngle = startAngle + segmentAngle;
            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);

            return (
              <path
                key={i}
                d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
                fill={
                  i % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                }
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>

        {[...Array(segmentCount)].map((_, i) => {
          const { x, y } = getSegmentPosition(i);
          const segEvents = eventsForSegment(i);
          return (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-[10px] cursor-pointer transition-colors ${
                    segEvents.length > 0
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-neutral-500 text-white dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {i + 1}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <Card>
                  <CardContent className="p-2 space-y-2 text-sm">
                    <div className="font-medium">
                      {formatDate(new Date(year, month, i + 1))}
                    </div>
                    {segEvents.length === 0 && (
                      <div className="text-xs text-muted-foreground">
                        No events
                      </div>
                    )}
                    {segEvents.map((ev) => (
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
    </div>
  );
}
