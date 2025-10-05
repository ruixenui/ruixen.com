"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarPrimitive,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarCell,
  Heading,
  Button,
  RangeCalendar as RangeCalendarPrimitive,
} from "react-aria-components";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { composeRenderProps } from "react-aria-components";

interface BaseCalendarProps {
  className?: string;
}

type CalendarProps = React.ComponentProps<typeof CalendarPrimitive> &
  BaseCalendarProps;

type RangeCalendarProps = React.ComponentProps<typeof RangeCalendarPrimitive> &
  BaseCalendarProps;

// --- Header with dropdown-like selectors ---
const CalendarHeader = () => (
  <header className="flex items-center justify-between px-2 py-1 border-b">
    <Button
      slot="previous"
      className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
    <Heading className="text-sm font-semibold" />
    <Button
      slot="next"
      className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  </header>
);

// --- Grid with pill-style cells ---
const CalendarGridComponent = ({ isRange = false }: { isRange?: boolean }) => {
  const now = today(getLocalTimeZone());

  return (
    <CalendarGrid className="p-2">
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className="h-8 w-8 text-xs font-medium text-muted-foreground">
            {day}
          </CalendarHeaderCell>
        )}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => (
          <CalendarCell
            date={date}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none",
              "data-[disabled]:opacity-30 data-[disabled]:pointer-events-none data-[unavailable]:line-through",
              "data-[hovered]:bg-accent data-[hovered]:text-foreground",
              "data-[selected]:bg-primary data-[selected]:text-primary-foreground",
              // range variant
              isRange &&
                "data-[selected]:rounded-none data-[selection-start]:rounded-l-full data-[selection-end]:rounded-r-full",
              // today indicator
              date.compare(now) === 0 &&
                "ring-1 ring-primary ring-offset-1 ring-offset-background",
            )}
          />
        )}
      </CalendarGridBody>
    </CalendarGrid>
  );
};

// --- Final Components ---
const Calendar = ({ className, ...props }: CalendarProps) => (
  <div className="rounded-lg border bg-card shadow-sm">
    <CalendarPrimitive
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className),
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent />
    </CalendarPrimitive>
  </div>
);

const RangeCalendar = ({ className, ...props }: RangeCalendarProps) => (
  <div className="rounded-lg border bg-card shadow-sm">
    <RangeCalendarPrimitive
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className),
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent isRange />
    </RangeCalendarPrimitive>
  </div>
);

export { Calendar, RangeCalendar };
