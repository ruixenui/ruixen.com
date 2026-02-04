"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  parseISO,
  getDay,
} from "date-fns";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO string
};

interface ThreeDWallCalendarProps {
  events?: CalendarEvent[];
  onAddEvent?: (e: CalendarEvent) => void;
  onRemoveEvent?: (id: string) => void;
  panelWidth?: number;
  panelHeight?: number;
  columns?: number;
}

export function ThreeDWallCalendar({
  events = [],
  onAddEvent,
  onRemoveEvent,
  panelWidth = 160,
  panelHeight = 120,
  columns = 7,
}: ThreeDWallCalendarProps) {
  const [dateRef, setDateRef] = React.useState<Date>(new Date());

  // For adding new event
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined,
  );
  const [eventTitle, setEventTitle] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const wallRef = React.useRef<HTMLDivElement | null>(null);

  // 3D tilt
  const [tiltX, setTiltX] = React.useState(18);
  const [tiltY, setTiltY] = React.useState(0);
  const isDragging = React.useRef(false);
  const dragStart = React.useRef<{ x: number; y: number } | null>(null);

  // Get all days of the month
  const monthStart = startOfMonth(dateRef);
  const monthEnd = endOfMonth(dateRef);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Leading blanks (Sunday = 0)
  const startingWeekday = getDay(monthStart);
  const leadingBlanks = Array.from({ length: startingWeekday }, () => null);

  // Always force 6 rows → 42 cells total
  const allCells = [...leadingBlanks, ...daysInMonth];
  const totalCellsNeeded = 42; // 6 × 7
  const trailingBlanksNeeded = Math.max(0, totalCellsNeeded - allCells.length);
  const trailingBlanks = Array.from(
    { length: trailingBlanksNeeded },
    () => null,
  );

  const paddedCells = [...allCells, ...trailingBlanks];

  // Fixed 6 rows for consistent height & visibility
  const rowCount = 6;
  const wallCenterRow = (rowCount - 1) / 2; // 2.5

  const eventsForDay = (d: Date | null) => {
    if (!d) return [];
    return events.filter(
      (ev) =>
        format(parseISO(ev.date), "yyyy-MM-dd") === format(d, "yyyy-MM-dd"),
    );
  };

  // Add event
  const handleAddEvent = () => {
    if (!eventTitle.trim() || !selectedDate) return;

    onAddEvent?.({
      id: uuidv4(),
      title: eventTitle.trim(),
      date: selectedDate.toISOString(),
    });

    setEventTitle("");
    setSelectedDate(undefined);
    setIsDialogOpen(false);
  };

  // Wheel & drag tilt handlers (with safer limits)
  const onWheel = (e: React.WheelEvent) => {
    setTiltX((t) => Math.max(5, Math.min(40, t + e.deltaY * 0.02)));
    setTiltY((t) => Math.max(-45, Math.min(45, t + e.deltaX * 0.05)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setTiltY((t) => Math.max(-60, Math.min(60, t + dx * 0.1)));
    setTiltX((t) => Math.max(5, Math.min(45, t - dy * 0.1)));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    isDragging.current = false;
    dragStart.current = null;
  };

  const gap = 12;

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex gap-4 items-center justify-center">
        <Button
          variant="outline"
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
          }
        >
          Prev Month
        </Button>
        <div className="text-xl font-semibold">
          {format(dateRef, "MMMM yyyy")}
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
          }
        >
          Next Month
        </Button>
      </div>

      {/* Interactive Calendar for adding events */}
      <div className="flex justify-center flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {selectedDate
                ? format(selectedDate, "PPP")
                : "Pick a date to add event"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={!selectedDate}
              onClick={() => selectedDate && setIsDialogOpen(true)}
            >
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add Event on {selectedDate && format(selectedDate, "PPP")}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Meeting, Birthday..."
                  autoFocus
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Save Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Wall container */}
      <div
        ref={wallRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="w-full "
        style={{ perspective: 1200 }}
      >
        <div
          className="inline-block"
          style={{
            width: columns * (panelWidth + gap),
            marginLeft: "200px",
            transformStyle: "preserve-3d",
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: isDragging.current ? "none" : "transform 120ms linear",
            minWidth: "fit-content",
          }}
        >
          <div
            className="relative"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, ${panelWidth}px)`,
              gridAutoRows: `${panelHeight}px`,
              gap: `${gap}px`,
              padding: gap,
              transformStyle: "preserve-3d",
            }}
          >
            {paddedCells.map((day, idx) => {
              const row = Math.floor(idx / columns);
              const rowOffset = row - wallCenterRow;
              const z = Math.max(-80, 40 - Math.abs(rowOffset) * 20);
              const dayEvents = eventsForDay(day);

              // Blank cells (leading + trailing)
              if (day === null) {
                return (
                  <div
                    key={`blank-${idx}`}
                    className="relative"
                    style={{
                      transform: `translateZ(${z}px)`,
                      zIndex: Math.round(100 - Math.abs(rowOffset)),
                    }}
                  >
                    <Card className="h-full bg-transparent border-dashed border-muted opacity-30 cursor-default">
                      <CardContent className="p-3 h-full" />
                    </Card>
                  </div>
                );
              }

              // Real day cells
              return (
                <div
                  key={day.toISOString()}
                  className="relative"
                  style={{
                    transform: `translateZ(${z}px)`,
                    zIndex: Math.round(100 - Math.abs(rowOffset)),
                  }}
                >
                  <Card className="h-full overflow-visible shadow-lg">
                    <CardContent className="p-3 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-semibold">
                          {format(day, "d")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(day, "EEE")}
                        </div>
                      </div>

                      <div className="mt-2 flex-1 relative">
                        {dayEvents.map((ev, i) => {
                          const left = 8 + ((i * 34) % (panelWidth - 40));
                          const top =
                            8 + Math.floor((i * 34) / (panelWidth - 40)) * 28;

                          return (
                            <Popover key={ev.id}>
                              <PopoverTrigger asChild>
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div
                                      className="absolute w-7 h-7 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-[10px] cursor-pointer shadow-md"
                                      style={{
                                        left,
                                        top,
                                        transform: "translateZ(20px)",
                                      }}
                                    >
                                      •
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="text-xs">
                                    {ev.title}
                                  </HoverCardContent>
                                </HoverCard>
                              </PopoverTrigger>
                              <PopoverContent className="w-64">
                                <Card>
                                  <CardContent className="p-3 flex justify-between items-start">
                                    <div>
                                      <p className="font-medium">{ev.title}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {format(parseISO(ev.date), "PPP")}
                                      </p>
                                    </div>
                                    {onRemoveEvent && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => onRemoveEvent(ev.id)}
                                      >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    )}
                                  </CardContent>
                                </Card>
                              </PopoverContent>
                            </Popover>
                          );
                        })}
                      </div>

                      <div className="mt-auto text-xs text-muted-foreground">
                        {dayEvents.length} event
                        {dayEvents.length !== 1 ? "s" : ""}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
