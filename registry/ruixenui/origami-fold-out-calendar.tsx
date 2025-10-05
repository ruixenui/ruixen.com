"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export type EventItem = {
  id: number;
  title: string;
  date: Date;
};

type OrigamiFoldOutCalendarProps = {
  initialEvents?: EventItem[];
  onEventsChange?: (events: EventItem[]) => void;
  showAddForm?: boolean; // allow disabling the form
};

export function OrigamiFoldOutCalendar({
  initialEvents = [],
  onEventsChange,
  showAddForm = true,
}: OrigamiFoldOutCalendarProps) {
  const [events, setEvents] = React.useState<EventItem[]>(initialEvents);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [title, setTitle] = React.useState("");
  const [displayedMonth, setDisplayedMonth] = React.useState<Date>(new Date());

  const addEvent = () => {
    if (!title || !selectedDate) return;
    const newEvent = { id: Date.now(), title, date: selectedDate };
    const updated = [...events, newEvent];
    setEvents(updated);
    onEventsChange?.(updated);
    setTitle("");
  };

  const deleteEvent = (id: number) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    onEventsChange?.(updated);
  };

  const eventsByDate = (date: Date) =>
    events.filter((e) => e.date.toDateString() === date.toDateString());

  // update displayed month when user picks new date
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  // calculate days in displayed month
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="flex flex-col gap-6">
      {showAddForm && (
        <Card>
          <CardContent className="flex flex-wrap items-end gap-4">
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
                    onSelect={handleDateSelect}
                    month={displayedMonth}
                    onMonthChange={setDisplayedMonth}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-5">
              <Button onClick={addEvent}>
                <Plus className="w-4 h-4 mr-1" /> Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Origami Fold-Out View */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">
            {displayedMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <div className="h-[500px] overflow-y-auto pr-2">
            <Accordion type="single" collapsible className="w-full">
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = new Date(year, month, i + 1);
                const dayEvents = eventsByDate(day);

                return (
                  <AccordionItem
                    key={i}
                    value={`day-${i}`}
                    className="border rounded-lg mb-2 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-2 text-lg font-semibold">
                      Day {i + 1} — {day.toDateString()}{" "}
                      {dayEvents.length > 0 && `(${dayEvents.length} events)`}
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/40 p-4 space-y-2">
                      {dayEvents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No events
                        </p>
                      ) : (
                        dayEvents.map((ev) => (
                          <Card
                            key={ev.id}
                            className="shadow-sm border border-dashed relative transition-transform hover:scale-[1.01]"
                          >
                            <CardContent className="flex justify-between items-center p-3">
                              <span className="font-medium">{ev.title}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEvent(ev.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
