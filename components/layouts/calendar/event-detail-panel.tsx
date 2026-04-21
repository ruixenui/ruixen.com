"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  addDays,
  differenceInCalendarDays,
  differenceInMinutes,
  format,
  parse,
} from "date-fns";
import {
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Globe,
  MapPin,
  MoreHorizontal,
  NotepadText,
  RefreshCcw,
  SquareDashed,
  TabletSmartphone,
  Trash2,
  User,
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import type { CalendarEvent, EventColor } from "./week-view-types";

interface EventDetailPanelProps {
  event: CalendarEvent;
  onEventChange?: (event: CalendarEvent) => void;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  /** Extra action buttons rendered in the header row (after the "..." menu). */
  headerActions?: React.ReactNode;
}

const colorDotClass: Record<EventColor, string> = {
  red: "bg-event-red-border",
  orange: "bg-event-orange-border",
  yellow: "bg-event-yellow-border",
  green: "bg-event-green-border",
  blue: "bg-event-blue-border",
  purple: "bg-event-purple-border",
  gray: "bg-event-gray-border",
};

function formatDuration(start: Date, end: Date): string {
  const totalMinutes = differenceInMinutes(end, start);

  if (totalMinutes < 60) {
    return `${totalMinutes}min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`;
}

function formatTimeDisplay(date: Date): string {
  const minutes = date.getMinutes();
  if (minutes === 0) {
    return format(date, "h a");
  }
  return format(date, "h:mm a");
}

interface ParsedTime {
  hours: number;
  minutes: number;
}

/**
 * Parses a user-typed time string into hours and minutes.
 * Accepts formats: "3 PM", "3:30 PM", "15:00", "3pm", "330pm", "3:30pm".
 * Returns null if the input cannot be parsed.
 */
function parseTimeInput(input: string): ParsedTime | null {
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length === 0) {
    return null;
  }

  const isPM = /pm$/.test(trimmed);
  const isAM = /am$/.test(trimmed);
  const stripped = trimmed.replace(/\s*(am|pm)\s*$/, "").trim();

  if (stripped.length === 0) {
    return null;
  }

  let hours: number;
  let minutes: number;

  if (stripped.includes(":")) {
    const parts = stripped.split(":");
    if (parts.length !== 2) {
      return null;
    }
    hours = Number.parseInt(parts[0], 10);
    minutes = Number.parseInt(parts[1], 10);
  } else {
    const num = Number.parseInt(stripped, 10);
    if (Number.isNaN(num)) {
      return null;
    }
    if (stripped.length > 2 && num > 99) {
      // e.g., "330" → 3:30, "1230" → 12:30
      minutes = num % 100;
      hours = Math.floor(num / 100);
    } else {
      hours = num;
      minutes = 0;
    }
  }

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  // Apply AM/PM conversion
  if (isPM && hours < 12) {
    hours += 12;
  }
  if (isAM && hours === 12) {
    hours = 0;
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return { hours, minutes };
}

/**
 * Returns a new Date with the same year/month/day as `base`
 * but with hours and minutes replaced.
 */
function applyTimeToDate(base: Date, hours: number, minutes: number): Date {
  const result = new Date(base);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function formatDateDisplay(date: Date): string {
  return format(date, "EEE MMM d");
}

/**
 * Parses a user-typed date string into a Date.
 * Strips any leading weekday name and parses "MMM d" (e.g., "Mar 11").
 * Uses the reference date's year. Returns null if unparseable.
 */
function parseDateInput(input: string, referenceDate: Date): Date | null {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return null;
  }

  // Strip optional leading weekday (e.g., "Tue ", "Wed ")
  const withoutWeekday = trimmed.replace(/^[a-z]{3}\s+/i, "");
  if (withoutWeekday.length === 0) {
    return null;
  }

  const parsed = parse(withoutWeekday, "MMM d", referenceDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function formatVisibility(
  visibility?: "default" | "public" | "private",
): string {
  if (visibility === "public") {
    return "Public";
  }
  if (visibility === "private") {
    return "Private";
  }
  return "Default visibility";
}

function FieldRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="size-4 shrink-0 text-[#C7C5C1] dark:text-[#595959]" />
      <span className="text-xs text-[#C7C5C1] dark:text-[#595959]">
        {label}
      </span>
      {value && <span className="text-muted-foreground text-xs">{value}</span>}
    </div>
  );
}

function TimezoneDisplay({ timezone }: { timezone: string }) {
  const spaceIdx = timezone.indexOf(" ");
  if (spaceIdx === -1) {
    return (
      <span className="text-xs text-[#C7C5C1] dark:text-[#595959]">
        {timezone}
      </span>
    );
  }

  const code = timezone.substring(0, spaceIdx);
  const city = timezone.substring(spaceIdx + 1);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className="text-[#C7C5C1] dark:text-[#595959]">{code}</span>
      <span className="text-foreground">{city}</span>
    </span>
  );
}

function RecurrenceDisplay({ recurrence }: { recurrence: string }) {
  const onIdx = recurrence.indexOf(" on ");
  if (onIdx === -1) {
    return <span className="text-foreground text-xs">{recurrence}</span>;
  }

  const main = recurrence.substring(0, onIdx);
  const suffix = recurrence.substring(onIdx);

  return (
    <span className="text-xs">
      <span className="text-foreground">{main}</span>
      <span className="text-[#C7C5C1] dark:text-[#595959]">{suffix}</span>
    </span>
  );
}

const EVENT_TYPES = [
  "Event",
  "Focus time",
  "Out of office",
  "Birthday",
] as const;
type EventType = (typeof EVENT_TYPES)[number];

const EVENT_TYPE_TOOLTIPS: Partial<Record<EventType, string>> = {
  "Focus time":
    "Create a focus time event with the option to automatically decline meetings during this time. Available for work and school accounts.",
  "Out of office":
    "Create an out of office (OOO) event with the option to automatically decline meetings during this time. Available for work and school accounts.",
  Birthday:
    "Create a birthday event to keep track of a person's upcoming birthdays. Birthdays from your Google Contacts may appear on a separate Birthday calendar.",
};

function EventTypeHelpIcon({ tooltip }: { tooltip?: string }) {
  const [tooltipPos, setTooltipPos] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  if (!tooltip) {
    return null;
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ top: rect.top + rect.height / 2, left: rect.left });
  }

  function handleMouseLeave() {
    setTooltipPos(null);
  }

  return (
    <span
      className="ml-auto shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CircleHelp className="size-3.5 text-white" />
      {tooltipPos &&
        ReactDOM.createPortal(
          <div
            className="pointer-events-none fixed z-[100] max-w-[240px] rounded-sm bg-[#252525] border border-[#303030] px-2 py-1 text-xs text-white shadow-md"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left - 8,
              transform: "translate(-100%, -50%)",
            }}
          >
            {tooltip}
          </div>,
          document.body,
        )}
    </span>
  );
}

export function EventDetailPanel({
  event,
  onEventChange,
  onPrevWeek,
  onNextWeek,
  headerActions,
}: EventDetailPanelProps) {
  const color = event.color ?? "blue";
  const [eventType, setEventType] = React.useState<EventType>("Event");
  const [eventDropdownOpen, setEventDropdownOpen] = React.useState(false);
  const [hoveredOther, setHoveredOther] = React.useState(false);
  /** Whether the compact "All-day / Time zone / Repeat" row is expanded into individual rows. */
  const [optionsExpanded, setOptionsExpanded] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState(event.title);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const escapePressedRef = React.useRef(false);
  /** Stores the title when the input gains focus, used to restore on Escape. */
  const titleOnFocusRef = React.useRef(event.title);

  React.useEffect(() => {
    setTitleValue(event.title);
  }, [event.title]);

  // Reset expanded options when switching to a different event
  React.useEffect(() => {
    setOptionsExpanded(false);
  }, [event.id]);

  const handleTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setTitleValue(next);
      onEventChange?.({ ...event, title: next });
    },
    [event, onEventChange],
  );

  const handleTitleFocus = React.useCallback(() => {
    titleOnFocusRef.current = event.title;
  }, [event.title]);

  const commitTitle = React.useCallback(() => {
    if (escapePressedRef.current) {
      escapePressedRef.current = false;
      return;
    }
    const trimmed = titleValue.trim();
    if (trimmed === titleValue) {
      return;
    }
    onEventChange?.({ ...event, title: trimmed });
  }, [titleValue, event, onEventChange]);

  const handleTitleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        titleRef.current?.blur();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        escapePressedRef.current = true;
        const original = titleOnFocusRef.current;
        setTitleValue(original);
        onEventChange?.({ ...event, title: original });
        titleRef.current?.blur();
      }
    },
    [event, onEventChange],
  );

  // --- Start time input state & handlers ---
  const [startTimeValue, setStartTimeValue] = React.useState(() =>
    formatTimeDisplay(event.start),
  );
  const startTimeRef = React.useRef<HTMLInputElement>(null);
  const startTimeEscapePressedRef = React.useRef(false);
  const startTimeOnFocusRef = React.useRef(formatTimeDisplay(event.start));

  React.useEffect(() => {
    setStartTimeValue(formatTimeDisplay(event.start));
  }, [event.start]);

  const handleStartTimeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartTimeValue(e.target.value);
    },
    [],
  );

  const handleStartTimeFocus = React.useCallback(() => {
    startTimeOnFocusRef.current = formatTimeDisplay(event.start);
    requestAnimationFrame(() => {
      startTimeRef.current?.select();
    });
  }, [event.start]);

  const commitStartTime = React.useCallback(() => {
    if (startTimeEscapePressedRef.current) {
      startTimeEscapePressedRef.current = false;
      return;
    }
    const parsed = parseTimeInput(startTimeValue);
    if (!parsed) {
      setStartTimeValue(startTimeOnFocusRef.current);
      return;
    }
    const newStart = applyTimeToDate(event.start, parsed.hours, parsed.minutes);
    if (newStart.getTime() >= event.end.getTime()) {
      setStartTimeValue(startTimeOnFocusRef.current);
      return;
    }
    setStartTimeValue(formatTimeDisplay(newStart));
    onEventChange?.({ ...event, start: newStart });
  }, [startTimeValue, event, onEventChange]);

  const handleStartTimeKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        startTimeRef.current?.blur();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        startTimeEscapePressedRef.current = true;
        setStartTimeValue(startTimeOnFocusRef.current);
        startTimeRef.current?.blur();
      }
    },
    [],
  );

  // --- End time input state & handlers ---
  const [endTimeValue, setEndTimeValue] = React.useState(() =>
    formatTimeDisplay(event.end),
  );
  const endTimeRef = React.useRef<HTMLInputElement>(null);
  const endTimeEscapePressedRef = React.useRef(false);
  const endTimeOnFocusRef = React.useRef(formatTimeDisplay(event.end));

  React.useEffect(() => {
    setEndTimeValue(formatTimeDisplay(event.end));
  }, [event.end]);

  const handleEndTimeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndTimeValue(e.target.value);
    },
    [],
  );

  const handleEndTimeFocus = React.useCallback(() => {
    endTimeOnFocusRef.current = formatTimeDisplay(event.end);
    requestAnimationFrame(() => {
      endTimeRef.current?.select();
    });
  }, [event.end]);

  const commitEndTime = React.useCallback(() => {
    if (endTimeEscapePressedRef.current) {
      endTimeEscapePressedRef.current = false;
      return;
    }
    const parsed = parseTimeInput(endTimeValue);
    if (!parsed) {
      setEndTimeValue(endTimeOnFocusRef.current);
      return;
    }
    const newEnd = applyTimeToDate(event.end, parsed.hours, parsed.minutes);
    if (newEnd.getTime() <= event.start.getTime()) {
      setEndTimeValue(endTimeOnFocusRef.current);
      return;
    }
    setEndTimeValue(formatTimeDisplay(newEnd));
    onEventChange?.({ ...event, end: newEnd });
  }, [endTimeValue, event, onEventChange]);

  const handleEndTimeKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        endTimeRef.current?.blur();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        endTimeEscapePressedRef.current = true;
        setEndTimeValue(endTimeOnFocusRef.current);
        endTimeRef.current?.blur();
      }
    },
    [],
  );

  // --- Date input state & handlers ---
  const [dateValue, setDateValue] = React.useState(() =>
    formatDateDisplay(event.start),
  );
  const dateRef = React.useRef<HTMLInputElement>(null);
  const dateEscapePressedRef = React.useRef(false);
  const dateOnFocusRef = React.useRef(formatDateDisplay(event.start));

  React.useEffect(() => {
    setDateValue(formatDateDisplay(event.start));
  }, [event.start]);

  const handleDateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateValue(e.target.value);
    },
    [],
  );

  const handleDateFocus = React.useCallback(() => {
    dateOnFocusRef.current = formatDateDisplay(event.start);
    requestAnimationFrame(() => {
      dateRef.current?.select();
    });
  }, [event.start]);

  const commitDate = React.useCallback(() => {
    if (dateEscapePressedRef.current) {
      dateEscapePressedRef.current = false;
      return;
    }
    const parsed = parseDateInput(dateValue, event.start);
    if (!parsed) {
      setDateValue(dateOnFocusRef.current);
      return;
    }
    const dayDiff = differenceInCalendarDays(parsed, event.start);
    if (dayDiff === 0) {
      setDateValue(formatDateDisplay(event.start));
      return;
    }
    const newStart = addDays(event.start, dayDiff);
    const newEnd = addDays(event.end, dayDiff);
    setDateValue(formatDateDisplay(newStart));
    onEventChange?.({ ...event, start: newStart, end: newEnd });
  }, [dateValue, event, onEventChange]);

  const handleDateKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        dateRef.current?.blur();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        dateEscapePressedRef.current = true;
        setDateValue(dateOnFocusRef.current);
        dateRef.current?.blur();
      }
    },
    [],
  );

  // --- End date input state & handlers (shown only for all-day events) ---
  const [endDateValue, setEndDateValue] = React.useState(() =>
    formatDateDisplay(event.end),
  );
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const endDateEscapePressedRef = React.useRef(false);
  const endDateOnFocusRef = React.useRef(formatDateDisplay(event.end));

  React.useEffect(() => {
    setEndDateValue(formatDateDisplay(event.end));
  }, [event.end]);

  const handleEndDateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndDateValue(e.target.value);
    },
    [],
  );

  const handleEndDateFocus = React.useCallback(() => {
    endDateOnFocusRef.current = formatDateDisplay(event.end);
    requestAnimationFrame(() => {
      endDateRef.current?.select();
    });
  }, [event.end]);

  const commitEndDate = React.useCallback(() => {
    if (endDateEscapePressedRef.current) {
      endDateEscapePressedRef.current = false;
      return;
    }
    const parsed = parseDateInput(endDateValue, event.end);
    if (!parsed) {
      setEndDateValue(endDateOnFocusRef.current);
      return;
    }
    const dayDiff = differenceInCalendarDays(parsed, event.end);
    if (dayDiff === 0) {
      setEndDateValue(formatDateDisplay(event.end));
      return;
    }
    const newEnd = addDays(event.end, dayDiff);
    if (newEnd.getTime() < event.start.getTime()) {
      setEndDateValue(endDateOnFocusRef.current);
      return;
    }
    setEndDateValue(formatDateDisplay(newEnd));
    onEventChange?.({ ...event, end: newEnd });
  }, [endDateValue, event, onEventChange]);

  const handleEndDateKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        endDateRef.current?.blur();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        endDateEscapePressedRef.current = true;
        setEndDateValue(endDateOnFocusRef.current);
        endDateRef.current?.blur();
      }
    },
    [],
  );

  // --- All-day toggle handler ---
  /**
   * Stores the original hours/minutes before toggling to all-day.
   * When toggling off, these are applied to the current (possibly resized) dates.
   */
  const savedTimeOfDayRef = React.useRef<{
    startHours: number;
    startMinutes: number;
    endHours: number;
    endMinutes: number;
  } | null>(null);

  const handleAllDayToggle = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        savedTimeOfDayRef.current = {
          startHours: event.start.getHours(),
          startMinutes: event.start.getMinutes(),
          endHours: event.end.getHours(),
          endMinutes: event.end.getMinutes(),
        };
        onEventChange?.({ ...event, isAllDay: true });
        return;
      }

      if (savedTimeOfDayRef.current) {
        const { startHours, startMinutes, endHours, endMinutes } =
          savedTimeOfDayRef.current;
        onEventChange?.({
          ...event,
          isAllDay: false,
          start: applyTimeToDate(event.start, startHours, startMinutes),
          end: applyTimeToDate(event.end, endHours, endMinutes),
        });
        savedTimeOfDayRef.current = null;
        return;
      }

      /** Default 9 AM – 10 AM when no saved times (e.g., existing all-day event). */
      const DEFAULT_START_HOUR = 9;
      const DEFAULT_END_HOUR = 10;
      onEventChange?.({
        ...event,
        isAllDay: false,
        start: applyTimeToDate(event.start, DEFAULT_START_HOUR, 0),
        end: applyTimeToDate(event.end, DEFAULT_END_HOUR, 0),
      });
    },
    [event, onEventChange],
  );

  const otherTypes = EVENT_TYPES.filter((t) => t !== eventType);

  return (
    <div className="flex flex-col gap-3 py-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <DropdownMenu
          open={eventDropdownOpen}
          onOpenChange={(open) => {
            setEventDropdownOpen(open);
            if (open) setHoveredOther(false);
          }}
        >
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium rounded-sm border border-transparent px-2.5 py-1.5 -ml-2.5 gap-1.5 hover:border-[#373737]",
                eventDropdownOpen
                  ? "bg-[#252525] text-white"
                  : "text-foreground",
              )}
            >
              {eventType}
              <ChevronDown
                className={cn(
                  "size-3.5",
                  eventDropdownOpen
                    ? "text-[#595959]"
                    : "text-[#C7C5C1] dark:text-[#595959]",
                )}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="left"
            sideOffset={12}
            alignOffset={-4}
            className="min-w-[180px] bg-[#252525] border-[#303030]"
            onMouseLeave={() => setHoveredOther(false)}
          >
            <DropdownMenuItem
              className={cn(
                "group/item text-xs text-white focus:bg-[#303030] focus:text-white",
                !hoveredOther && "bg-[#303030]",
              )}
              onSelect={() => setEventType(eventType)}
              onMouseEnter={() => setHoveredOther(false)}
            >
              <Check className="size-3.5" />
              <span className="flex-1">{eventType}</span>
              <EventTypeHelpIcon tooltip={EVENT_TYPE_TOOLTIPS[eventType]} />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#303030]" />
            {otherTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                className="group/item text-xs text-white focus:bg-[#303030] focus:text-white pl-8"
                onSelect={() => setEventType(type)}
                onMouseEnter={() => setHoveredOther(true)}
              >
                <span className="flex-1">{type}</span>
                <EventTypeHelpIcon tooltip={EVENT_TYPE_TOOLTIPS[type]} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 border border-transparent hover:border-[#242424] hover:bg-[#242424] text-[#C7C5C1] dark:text-[#595959]"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="left"
              className="min-w-[180px] bg-[#252525] border-[#303030]"
            >
              <DropdownMenuItem className="text-xs text-white focus:!bg-[#303030] focus:!text-white">
                <SquareDashed className="size-3.5" />
                Cut
                <DropdownMenuShortcut className="text-white/40">
                  ⌘X
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs text-white focus:!bg-[#303030] focus:!text-white">
                <TabletSmartphone className="size-3.5" />
                Copy
                <DropdownMenuShortcut className="text-white/40">
                  ⌘C
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs text-white focus:!bg-[#303030] focus:!text-white">
                <Copy className="size-3.5" />
                Duplicate
                <DropdownMenuShortcut className="text-white/40">
                  ⌘D
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#303030]" />
              <DropdownMenuItem className="text-xs text-[#E56458] focus:!bg-[#DE5551] focus:!text-white focus:[&>svg]:!text-white focus:[&>[data-slot=dropdown-menu-shortcut]]:!text-white">
                <Trash2 className="size-3.5 text-[#E56458]" />
                Delete
                <DropdownMenuShortcut className="text-white/40 tracking-normal">
                  delete
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {headerActions}
        </div>
      </div>

      {/* Title */}
      <input
        ref={titleRef}
        type="text"
        value={titleValue}
        onChange={handleTitleChange}
        onFocus={handleTitleFocus}
        onBlur={commitTitle}
        onKeyDown={handleTitleKeyDown}
        placeholder="Title"
        className="text-foreground placeholder:text-[#C7C5C1] dark:placeholder:text-[#595959] mx-2 rounded-sm border border-transparent bg-transparent px-2 py-1.5 text-xs outline-none hover:border-[#373737] focus:border-[#242424] focus:bg-[#242424]"
      />

      {/* Divider */}
      <div className="border-border border-t" />

      {/* Time — muted and non-interactive for all-day events */}
      {(event.start.getHours() !== 0 ||
        event.start.getMinutes() !== 0 ||
        event.end.getHours() !== 0 ||
        event.end.getMinutes() !== 0) && (
        <div className="flex min-w-0 items-center gap-1 px-2 text-xs">
          {/* Start time group — Clock icon + input in one bordered container */}
          <div
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-sm border border-transparent px-2 py-1.5",
              event.isAllDay
                ? "cursor-default"
                : "cursor-text hover:border-[#373737] has-[:focus]:border-[#242424] has-[:focus]:bg-[#242424]",
            )}
            onClick={
              event.isAllDay ? undefined : () => startTimeRef.current?.focus()
            }
          >
            <Clock className="size-4 shrink-0 text-[#C7C5C1] dark:text-[#595959]" />
            <input
              ref={startTimeRef}
              type="text"
              value={startTimeValue}
              onChange={handleStartTimeChange}
              onFocus={handleStartTimeFocus}
              onBlur={commitStartTime}
              onKeyDown={handleStartTimeKeyDown}
              readOnly={event.isAllDay}
              tabIndex={event.isAllDay ? -1 : undefined}
              className={cn(
                "w-[8ch] font-medium text-xs bg-transparent outline-none border-none p-0",
                event.isAllDay
                  ? "text-[#C7C5C1] dark:text-[#595959] pointer-events-none"
                  : "text-foreground",
              )}
            />
          </div>
          {/* End time group — arrow + input + duration in one bordered container */}
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center rounded-sm border border-transparent px-2 py-1.5",
              event.isAllDay
                ? "cursor-default"
                : "cursor-text hover:border-[#373737] has-[:focus]:border-[#242424] has-[:focus]:bg-[#242424]",
            )}
            onClick={
              event.isAllDay ? undefined : () => endTimeRef.current?.focus()
            }
          >
            <span className="mr-2 shrink-0 text-base leading-4 text-[#C7C5C1] dark:text-[#595959]">
              →
            </span>
            <input
              ref={endTimeRef}
              type="text"
              value={endTimeValue}
              onChange={handleEndTimeChange}
              onFocus={handleEndTimeFocus}
              onBlur={commitEndTime}
              onKeyDown={handleEndTimeKeyDown}
              readOnly={event.isAllDay}
              tabIndex={event.isAllDay ? -1 : undefined}
              className={cn(
                "min-w-0 font-medium text-xs bg-transparent outline-none border-none p-0",
                event.isAllDay
                  ? "text-[#C7C5C1] dark:text-[#595959] pointer-events-none"
                  : "text-foreground",
              )}
              size={endTimeValue.length}
            />
            <span className="shrink-0 text-[#C7C5C1] dark:text-[#595959]">
              {formatDuration(event.start, event.end)}
            </span>
          </div>
        </div>
      )}

      {/* Date — editable inline input(s), indented to align with time text */}
      <div
        className={cn(
          "flex items-center gap-2 -mt-2",
          event.start.getHours() !== 0 ||
            event.start.getMinutes() !== 0 ||
            event.end.getHours() !== 0 ||
            event.end.getMinutes() !== 0
            ? "ml-8"
            : "ml-4",
        )}
      >
        {/* Start date */}
        <div
          className="mr-0 flex min-w-[6.5rem] self-start cursor-text items-center rounded-sm border border-transparent px-2 py-1.5 hover:border-[#373737] has-[:focus]:border-[#242424] has-[:focus]:bg-[#242424]"
          onClick={() => dateRef.current?.focus()}
        >
          <input
            ref={dateRef}
            type="text"
            value={dateValue}
            onChange={handleDateChange}
            onFocus={handleDateFocus}
            onBlur={commitDate}
            onKeyDown={handleDateKeyDown}
            className="text-foreground text-xs bg-transparent outline-none border-none p-0"
            size={dateValue.length}
          />
        </div>
        {/* End date — only visible for all-day events */}
        {event.isAllDay && (
          <div
            className="flex min-w-[6.5rem] self-start cursor-text items-center rounded-sm border border-transparent px-2 py-1.5 hover:border-[#373737] has-[:focus]:border-[#242424] has-[:focus]:bg-[#242424]"
            onClick={() => endDateRef.current?.focus()}
          >
            <input
              ref={endDateRef}
              type="text"
              value={endDateValue}
              onChange={handleEndDateChange}
              onFocus={handleEndDateFocus}
              onBlur={commitEndDate}
              onKeyDown={handleEndDateKeyDown}
              className="text-foreground text-xs bg-transparent outline-none border-none p-0"
              size={endDateValue.length}
            />
          </div>
        )}
      </div>

      {optionsExpanded || event.isAllDay ? (
        <>
          {/* All-day toggle row — clicking label or row triggers toggle */}
          <div
            className="flex cursor-default items-center gap-3 px-4"
            onClick={() => handleAllDayToggle(!(event.isAllDay ?? false))}
          >
            <Switch
              checked={event.isAllDay ?? false}
              onCheckedChange={handleAllDayToggle}
              onClick={(e) => e.stopPropagation()}
              className="data-[state=unchecked]:!bg-[#C7C5C1] dark:data-[state=unchecked]:!bg-[#595959] data-[state=checked]:!bg-[#3A85D3]"
            />
            <span className="text-foreground text-xs">All-day</span>
          </div>

          {/* Timezone row — hidden when all-day */}
          {!event.isAllDay && (
            <div className="flex items-center gap-3 px-4">
              <Globe className="size-4 shrink-0 text-[#C7C5C1] dark:text-[#595959]" />
              <TimezoneDisplay timezone={event.timezone ?? "GMT-3 Sao Paulo"} />
            </div>
          )}

          {/* Recurrence row — active display for recurring, placeholder for non-recurring */}
          {event.recurrence ? (
            <div className="flex items-center gap-3 px-4">
              <RefreshCcw className="size-4 shrink-0 text-[#C7C5C1] dark:text-[#595959]" />
              <div className="flex flex-1 items-center justify-between">
                <RecurrenceDisplay recurrence={event.recurrence} />
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-[#C7C5C1] dark:text-[#595959]"
                    onClick={onPrevWeek}
                  >
                    <ChevronLeft className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-[#C7C5C1] dark:text-[#595959]"
                    onClick={onNextWeek}
                  >
                    <ChevronRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4">
              <RefreshCcw className="size-4 shrink-0 text-[#C7C5C1] dark:text-[#595959]" />
              <span className="text-xs text-[#C7C5C1] dark:text-[#595959]">
                Repeat
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="-mt-2 flex items-center pl-8">
          <div
            className="group/options flex cursor-default items-center gap-4 rounded-sm px-2 py-1.5 hover:bg-[#E8E8E4] dark:hover:bg-[#242424]"
            onClick={() => setOptionsExpanded(true)}
          >
            <span className="text-xs text-[#C7C5C1] dark:text-[#595959] dark:group-hover/options:text-[#636363]">
              All-day
            </span>
            <span className="text-xs text-[#C7C5C1] dark:text-[#595959] dark:group-hover/options:text-[#636363]">
              Time zone
            </span>
            <span className="text-xs text-[#C7C5C1] dark:text-[#595959] dark:group-hover/options:text-[#636363]">
              Repeat
            </span>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-border border-t" />

      {/* Field sections */}
      <div className="flex flex-col px-4">
        <FieldRow icon={User} label="Participants and Rooms" />
        <FieldRow icon={Video} label="Conferencing" />
        <FieldRow icon={NotepadText} label="AI Meeting Notes and Docs" />
        <FieldRow icon={MapPin} label="Location" value={event.location} />
      </div>

      {/* Divider */}
      <div className="border-border border-t" />

      {/* Description */}
      <div className="flex flex-col gap-1 px-4">
        <span className="text-xs text-[#C7C5C1] dark:text-[#595959]">
          Description
        </span>
        {event.description && (
          <span className="text-foreground text-xs">{event.description}</span>
        )}
      </div>

      {/* Divider */}
      <div className="border-border border-t" />

      {/* Calendar */}
      <div className="flex items-center gap-2 px-4">
        <div className={cn("size-3 rounded-xs", colorDotClass[color])} />
        <span className="text-foreground text-xs">
          {event.calendarEmail ?? event.calendarId ?? "Calendar"}
        </span>
      </div>

      {/* Status */}
      <div className="mt-1 grid grid-cols-2 pl-9">
        <span className="text-foreground text-xs font-medium capitalize">
          {event.status ?? "Busy"}
        </span>
        <span className="text-foreground text-xs font-medium">
          {formatVisibility(event.visibility)}
        </span>
      </div>

      {/* Reminders */}
      <div className="mt-1 flex flex-col gap-3 px-4">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-[#C7C5C1] dark:text-[#595959]" />
          <span className="text-xs text-[#C7C5C1] dark:text-[#595959]">
            Reminders
          </span>
        </div>
        {event.reminders &&
          event.reminders.length > 0 &&
          event.reminders.map((reminder) => (
            <span
              key={`${reminder.amount}-${reminder.unit}`}
              className="text-foreground pl-6 text-xs"
            >
              <span className="font-medium">
                {reminder.amount}
                {reminder.unit.replace(/s$/, "")}
              </span>{" "}
              before
            </span>
          ))}
      </div>
    </div>
  );
}
