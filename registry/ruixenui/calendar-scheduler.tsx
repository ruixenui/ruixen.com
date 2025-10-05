"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CalendarSchedulerProps {
  timeSlots?: string[];
  onConfirm?: (value: { date?: Date; time?: string }) => void;
}

function CalendarScheduler({
  timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ],
  onConfirm,
}: CalendarSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string | undefined>();

  return (
    <div>
      <Card className="w-[600px] shadow-none border-none bg-background">
        <CardHeader>
          <CardTitle className="text-base">Schedule a Meeting</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          {/* Calendar Section */}
          <div className="flex-1 border rounded-md p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>

          {/* Time Slots Section */}
          <div className="flex-1 border rounded-md p-2 overflow-y-auto max-h-[320px]">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Pick a time
            </p>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "w-full",
                    time === slot && "ring-2 ring-primary",
                  )}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDate(undefined);
              setTime(undefined);
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => onConfirm?.({ date, time })}
            disabled={!date || !time}
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • made by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

export { CalendarScheduler };
