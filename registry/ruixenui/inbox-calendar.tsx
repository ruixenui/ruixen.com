"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, CalendarIcon, Plus } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export type InboxEvent = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  label?: string;
};

interface InboxCalendarProps {
  events: InboxEvent[];
  onAddEvent: (e: InboxEvent) => void;
  onRemoveEvent?: (id: string) => void;
}

export function InboxCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: InboxCalendarProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [label, setLabel] = React.useState("");

  // Group events by day
  const grouped = React.useMemo(() => {
    const groups: { date: Date; events: InboxEvent[] }[] = [];
    events.forEach((ev) => {
      const day = groups.find((g) => isSameDay(g.date, ev.date));
      if (day) {
        day.events.push(ev);
      } else {
        groups.push({ date: ev.date, events: [ev] });
      }
    });
    return groups.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  const handleAdd = () => {
    if (!title.trim() || !date) return;
    onAddEvent({
      id: uuidv4(),
      title: title.trim(),
      description,
      date,
      label,
    });
    setTitle("");
    setDescription("");
    setLabel("");
    setDate(new Date());
    setOpen(false);
  };

  return (
    <Card className="w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">Inbox Calendar</CardTitle>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Label (optional)"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 opacity-50" />
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <Button onClick={handleAdd} className="mt-2">
                Save Event
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          {grouped.map((group, gi) => (
            <div key={gi} className="p-4">
              <div className="text-sm font-semibold mb-2">
                {format(group.date, "EEEE, MMMM d, yyyy")}
              </div>
              <div className="space-y-2">
                {group.events.map((ev) => (
                  <Popover key={ev.id}>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer rounded-md border p-2 hover:bg-accent transition flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium">{ev.title}</div>
                          {ev.description && (
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {ev.description}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {format(ev.date, "hh:mm a")}
                          </div>
                        </div>
                        {ev.label && <Badge>{ev.label}</Badge>}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold">{ev.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(ev.date, "PPpp")}
                        </div>
                        {ev.description && (
                          <div className="text-sm">{ev.description}</div>
                        )}
                        {onRemoveEvent && (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="mt-2 flex items-center gap-2"
                            onClick={() => onRemoveEvent(ev.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
              {gi < grouped.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
          {grouped.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No events scheduled.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
