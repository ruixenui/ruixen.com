"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-6",
    month: "w-full",
    month_caption:
      "relative mb-2 flex h-9 items-center justify-center text-base font-semibold text-foreground",
    caption_label: "text-sm font-medium",
    nav: "absolute top-1 flex w-full justify-between px-2 z-10",
    button_previous: cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "size-8 rounded-full text-muted-foreground hover:text-foreground",
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "size-8 rounded-full text-muted-foreground hover:text-foreground",
    ),
    weekdays:
      "grid grid-cols-7 text-center text-xs font-medium uppercase text-muted-foreground/80",
    weekday: "py-1",
    week: "grid grid-cols-7",
    day_button:
      "relative flex size-9 items-center justify-center rounded-full text-sm transition-all " +
      "hover:bg-accent hover:text-accent-foreground " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 " +
      // ✅ clear strong selection
      "group-data-[selected]:bg-black group-data-[selected]:text-white " +
      "dark:group-data-[selected]:bg-white dark:group-data-[selected]:text-black " +
      "group-data-[selected]:shadow-md " +
      "group-data-[disabled]:opacity-40 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:hover:bg-transparent group-data-[disabled]:hover:text-muted-foreground/40",
    day: "text-center",
    range_start:
      "rounded-l-full bg-black text-white dark:bg-white dark:text-black shadow-md",
    range_end:
      "rounded-r-full bg-black text-white dark:bg-white dark:text-black shadow-md",
    range_middle:
      "bg-black/10 text-foreground dark:bg-white/20 rounded-none transition-colors",
    today:
      "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary",
    outside:
      "text-muted-foreground/50 hover:text-accent-foreground hover:bg-accent/30",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
  };

  const mergedClassNames = (
    Object.keys(defaultClassNames) as Array<keyof typeof defaultClassNames>
  ).reduce(
    (acc, key) => {
      const userClassName = classNames?.[key as keyof typeof classNames] as
        | string
        | undefined;
      return {
        ...acc,
        [key]: userClassName
          ? cn(defaultClassNames[key], userClassName)
          : defaultClassNames[key],
      };
    },
    {} as typeof defaultClassNames,
  );

  const defaultComponents = {
    Chevron: ({ orientation, ...props }: any) => {
      const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
      return <Icon size={18} strokeWidth={2} {...props} aria-hidden="true" />;
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit p-3 bg-card rounded-xl border shadow-sm", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
