"use client";

import * as React from "react";
import { DayPicker, DateRange, CustomComponents } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MultiMonthCalendarBaseProps = {
  numberOfMonths?: number;
  showOutsideDays?: boolean;
  className?: string;
};

type MultiMonthCalendarSingleProps = MultiMonthCalendarBaseProps & {
  mode: "single";
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
};

type MultiMonthCalendarRangeProps = MultiMonthCalendarBaseProps & {
  mode: "range";
  selected?: DateRange | undefined;
  onSelect?: (date: DateRange | undefined) => void;
};

export type MultiMonthCalendarProps =
  | MultiMonthCalendarSingleProps
  | MultiMonthCalendarRangeProps;

function MultiMonthCalendar({
  numberOfMonths = 2,
  mode = "single",
  selected,
  onSelect,
  showOutsideDays = true,
  className,
}: MultiMonthCalendarProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // ✅ Default select = today
  const defaultSelected =
    selected ?? (mode === "range" ? { from: today, to: today } : today);

  const defaultComponents: Partial<CustomComponents> = {
    IconLeft: () => <ChevronLeft className="h-4 w-4" />,
    IconRight: () => <ChevronRight className="h-4 w-4" />,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Year / Month dropdowns */}
      <div className="flex justify-center gap-2">
        <Select defaultValue={String(currentYear)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 5 }).map((_, idx) => {
              const year = currentYear - 2 + idx;
              return (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select defaultValue={String(currentMonth)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }).map((_, idx) => (
              <SelectItem key={idx} value={String(idx)}>
                {new Date(0, idx).toLocaleString("default", { month: "long" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <DayPicker
        mode={mode as any}
        numberOfMonths={numberOfMonths}
        selected={defaultSelected as any}
        onSelect={onSelect as any}
        showOutsideDays={showOutsideDays}
        className={cn(
          "rounded-lg border border-border bg-background p-2 w-fit",
          className,
        )}
        components={defaultComponents}
        classNames={{
          root: "p-2",
          months: "flex flex-col sm:flex-row gap-6",
          month: "flex flex-col gap-2",
          caption_label: "text-sm font-medium text-center mb-2",
          nav: "flex justify-between mb-2",
          nav_button:
            "hover:bg-black/10 dark:hover:bg-white/10 rounded-md p-1 transition",
          table: "w-full border-separate border-spacing-0",
          head_row: "text-xs font-medium text-muted-foreground/80",
          head_cell: "text-xs font-medium text-muted-foreground/80",
          day: "group size-9 px-0 text-sm",
          button:
            "relative flex size-9 items-center justify-center rounded-md text-sm hover:bg-black/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-black",
          day_selected:
            "bg-black text-white dark:bg-white dark:text-black rounded-md",
          day_range_start: "rounded-l-md bg-black text-white",
          day_range_end: "rounded-r-md bg-black text-white",
          day_range_middle:
            "bg-gray-200 text-black dark:bg-neutral-700 dark:text-white",
          day_today:
            "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-black dark:after:bg-white",
          day_disabled:
            "text-muted-foreground/30 line-through pointer-events-none",
          day_outside: "text-muted-foreground/30",
        }}
      />

      {/* Credits */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        Powered by{" "}
        <a
          href="https://www.ruixen.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          ruixen.com
        </a>
      </p>
    </div>
  );
}

MultiMonthCalendar.displayName = "MultiMonthCalendar";

export { MultiMonthCalendar };
