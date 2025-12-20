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
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
  date: string; // ISO string
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

  const filteredEvents = React.useMemo(() => {
    return filter === "all"
      ? events
      : events.filter((e) => e.category === filter);
  }, [events, filter]);

  // Map events by yyyy-MM-dd so DayContent is fast
  const eventsByDay = React.useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of filteredEvents) {
      const key = format(new Date(e.date), "yyyy-MM-dd");
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [filteredEvents]);

  const eventsForDay = React.useCallback(
    (date: Date) => eventsByDay.get(format(date, "yyyy-MM-dd")) ?? [],
    [eventsByDay],
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
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-sm font-medium">Filter</span>
        <Select value={filter} onValueChange={(val) => setFilter(val as any)}>
          <SelectTrigger className="w-full sm:w-44">
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
      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          // prevents squeezing in small containers; scrolls instead
          className="w-full min-w-[560px] p-4"
          classNames={{
            // Use real table layout + spacing between cells (fixes “compressed” look)
            table: "w-full table-fixed border-separate border-spacing-2",
            head_row: "table-row",
            head_cell:
              "table-cell text-center text-muted-foreground font-normal text-[0.8rem] pb-2",
            row: "table-row",
            cell: "table-cell p-0 align-top focus-within:relative focus-within:z-20",

            // Make each day a large “card” cell (room for bars)
            day: cn(
              "relative w-full",
              "h-20 sm:h-8 md:h-16",
              "rounded-lg border border-border bg-background p-0",
              "overflow-hidden",
              "text-left text-sm font-normal",
              "hover:bg-accent/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              // selected styling
              "aria-selected:ring-2 aria-selected:ring-primary aria-selected:bg-accent/50",
            ),

            // Optional: slightly dim outside days
            day_outside: "day-outside text-muted-foreground/60",
          }}
          components={{
            // Keep your nav icons (because passing components overrides Calendar defaults)
            IconLeft: ({ className, ...p }: any) => (
              <ChevronLeft className={cn("size-4", className)} {...p} />
            ),
            IconRight: ({ className, ...p }: any) => (
              <ChevronRight className={cn("size-4", className)} {...p} />
            ),

            // Your stacked bars UI
            DayContent: (day: any) => {
              const date: Date = day.date;
              const dayEvents = eventsForDay(date);

              const MAX_BARS = 6;
              const visible = dayEvents.slice(0, MAX_BARS);
              const overflow = Math.max(0, dayEvents.length - visible.length);

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="relative h-full w-full p-2 cursor-pointer"
                      // Don’t rely on DayPicker click bubbling (Popover can interfere).
                      // We control selection explicitly to keep it consistent.
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => setSelectedDate(date)}
                    >
                      {/* Day number */}
                      <span className="absolute top-2 left-2 text-xs font-medium">
                        {date.getDate()}
                      </span>

                      {/* Bars area */}
                      <div className="absolute bottom-2 left-2 right-2 h-12 flex flex-col gap-[2px]">
                        {visible.length === 0 ? null : (
                          <>
                            {visible.map((event) => (
                              <div
                                key={event.id}
                                className={cn(
                                  "w-full rounded-sm flex-1",
                                  getColor(event.category),
                                )}
                                title={event.title}
                              />
                            ))}
                          </>
                        )}
                      </div>

                      {/* overflow label */}
                      {overflow > 0 && (
                        <span className="absolute bottom-2 right-2 text-[10px] leading-none text-muted-foreground">
                          +{overflow}
                        </span>
                      )}
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="w-72">
                    <Card>
                      <CardContent className="space-y-2 p-3">
                        <div className="text-sm font-semibold">
                          {format(date, "PPP")}
                        </div>

                        {dayEvents.length === 0 ? (
                          <p className="text-xs text-muted-foreground">
                            No events
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className="flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    className={cn(
                                      "h-2 w-2 rounded-full shrink-0",
                                      getColor(event.category),
                                    )}
                                  />
                                  <span className="truncate">
                                    {event.title}
                                  </span>
                                </div>

                                {onRemoveEvent && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 shrink-0"
                                    onClick={() => onRemoveEvent(event.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </PopoverContent>
                </Popover>
              );
            },
          }}
        />
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">
            Events on {format(selectedDate, "PPP")}
          </h3>

          {eventsForDay(selectedDate).length === 0 ? (
            <p className="text-xs text-muted-foreground">No events</p>
          ) : (
            <div className="space-y-2">
              {eventsForDay(selectedDate).map((event) => (
                <Card key={event.id}>
                  <CardContent className="flex items-center justify-between gap-3 p-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          getColor(event.category),
                        )}
                      />
                      <span className="truncate">{event.title}</span>
                    </div>

                    {onRemoveEvent && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => onRemoveEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Event */}
      {selectedDate && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_160px_auto] sm:items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <Select
            value={newCategory}
            onValueChange={(val) => setNewCategory(val as any)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAddEvent} className="w-full sm:w-auto">
            Add Event
          </Button>
        </div>
      )}
    </div>
  );
}
