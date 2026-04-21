"use client";

import * as React from "react";
import { ArrowLeft, CalendarSearch, PanelRightIcon, X } from "lucide-react";
import {
  differenceInMinutes,
  format,
  isBefore,
  isSameYear,
  isToday,
  isTomorrow,
  startOfDay,
} from "date-fns";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { eventColorStyles } from "./calendar-event-item";
import { EventDetailPanel } from "./event-detail-panel";
import type { CalendarEvent } from "./week-view-types";

interface SidebarLeftProps extends React.ComponentProps<typeof Sidebar> {
  events?: CalendarEvent[];
  selectedEvent?: CalendarEvent | null;
  onEventChange?: (event: CalendarEvent) => void;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
}

interface DateGroup {
  key: string;
  label: string;
  isToday: boolean;
  events: CalendarEvent[];
}

function formatDuration(start: Date, end: Date): string {
  const totalMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}min`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}min`;
}

function formatTimeRange(event: CalendarEvent): string {
  if (event.isAllDay) {
    return "All day";
  }
  const startPeriod = format(event.start, "a");
  const endPeriod = format(event.end, "a");
  const endStr = format(event.end, "h:mm a").replace(":00 ", " ");

  if (startPeriod === endPeriod) {
    const startStr = format(event.start, "h:mm").replace(":00", "");
    return `${startStr}\u2013${endStr}`;
  }

  const startStr = format(event.start, "h:mm a").replace(":00 ", " ");
  return `${startStr}\u2013${endStr}`;
}

function formatDateHeader(date: Date): {
  label: string;
  isTodayGroup: boolean;
} {
  if (isToday(date)) {
    return { label: "Today", isTodayGroup: true };
  }
  if (isTomorrow(date)) {
    return { label: "Tomorrow", isTodayGroup: false };
  }
  if (isSameYear(date, new Date())) {
    return { label: format(date, "EEE MMM d"), isTodayGroup: false };
  }
  return { label: format(date, "EEE MMM d, yyyy"), isTodayGroup: false };
}

function groupEventsByDate(events: CalendarEvent[]): DateGroup[] {
  const grouped = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    const dayKey = format(startOfDay(event.start), "yyyy-MM-dd");
    const existing = grouped.get(dayKey);
    if (existing) {
      existing.push(event);
    } else {
      grouped.set(dayKey, [event]);
    }
  }

  const groups: DateGroup[] = [];
  for (const [key, groupEvents] of grouped) {
    const date = groupEvents[0].start;
    const { label, isTodayGroup } = formatDateHeader(date);
    const sorted = groupEvents.sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    );
    groups.push({ key, label, isToday: isTodayGroup, events: sorted });
  }

  return groups.sort((a, b) => a.key.localeCompare(b.key));
}

export function SidebarLeft({
  events = [],
  selectedEvent,
  onEventChange,
  onPrevWeek,
  onNextWeek,
  ...props
}: SidebarLeftProps) {
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [searchSelectedEvent, setSearchSelectedEvent] =
    React.useState<CalendarEvent | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isSearching = searchQuery.trim().length > 0;
  const isLoadingResults = isSearching && searchQuery !== debouncedQuery;

  React.useEffect(() => {
    if (!isSearching) {
      setDebouncedQuery("");
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, isSearching]);

  const resolvedSearchEvent = React.useMemo(() => {
    if (!searchSelectedEvent) return null;
    return (
      events.find((e) => e.id === searchSelectedEvent.id) ?? searchSelectedEvent
    );
  }, [events, searchSelectedEvent]);

  React.useEffect(() => {
    if (selectedEvent) {
      setSearchSelectedEvent(null);
    }
  }, [selectedEvent]);

  const searchResults = React.useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }
    const query = debouncedQuery.trim().toLowerCase();
    return events.filter((event) => event.title.toLowerCase().includes(query));
  }, [events, debouncedQuery]);

  const { pastGroups, todayGroup, futureGroups } = React.useMemo(() => {
    const allGroups = groupEventsByDate(searchResults);
    const now = new Date();
    const todayStart = startOfDay(now);

    const past: DateGroup[] = [];
    let today: DateGroup | null = null;
    const future: DateGroup[] = [];

    for (const group of allGroups) {
      if (group.isToday) {
        today = group;
        continue;
      }
      const groupDate = new Date(group.key);
      if (isBefore(groupDate, todayStart)) {
        past.push(group);
        continue;
      }
      future.push(group);
    }

    return { pastGroups: past, todayGroup: today, futureGroups: future };
  }, [searchResults]);

  const hasUpcomingResults = todayGroup !== null || futureGroups.length > 0;

  return (
    <Sidebar
      side="right"
      className="border-l !bg-context-panel [&_[data-slot=sidebar-inner]]:!bg-context-panel"
      style={{ "--muted-foreground": "#C7C5C1" } as React.CSSProperties}
      {...props}
    >
      <SidebarHeader className="h-14 justify-center px-4">
        <div className="flex items-center gap-2">
          {selectedEvent ? (
            <div className="flex-1" />
          ) : resolvedSearchEvent ? (
            <>
              <Button
                variant="ghost"
                className="-ml-2 h-7 gap-2 px-2 has-[>svg]:px-2 text-xs text-[#91908F] justify-start"
                onClick={() => setSearchSelectedEvent(null)}
              >
                <ArrowLeft className="size-4" />
                Search
              </Button>
              <div className="flex-1" />
            </>
          ) : (
            <div
              className="group/search flex flex-1 cursor-text items-center gap-2 rounded-sm border border-transparent px-1 hover:border-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:border-[#373737] dark:hover:bg-transparent has-[:focus]:border-[#F5F5F5] has-[:focus]:bg-[#F5F5F5] dark:has-[:focus]:border-[#242424] dark:has-[:focus]:bg-[#242424]"
              onClick={() => inputRef.current?.focus()}
            >
              <CalendarSearch className="size-4 shrink-0 text-[#C7C5C1] dark:text-[#595959]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-foreground placeholder:text-muted-foreground h-7 w-full border-none bg-transparent p-0 text-xs outline-none"
              />
              {isSearching && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0 opacity-0 transition-opacity group-hover/search:opacity-100 group-has-[:focus]/search:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0"
                onClick={toggleSidebar}
              >
                <PanelRightIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Close context panel <Kbd className="ml-1">/</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {selectedEvent ? (
          <EventDetailPanel
            event={selectedEvent}
            onEventChange={onEventChange}
            onPrevWeek={onPrevWeek}
            onNextWeek={onNextWeek}
          />
        ) : resolvedSearchEvent ? (
          <EventDetailPanel
            event={resolvedSearchEvent}
            onEventChange={onEventChange}
            onPrevWeek={onPrevWeek}
            onNextWeek={onNextWeek}
          />
        ) : isLoadingResults ? (
          <div className="px-4 pl-8 pt-8">
            <p className="text-[#ABABA9] dark:text-[#7C7C7C] text-xs">
              Searching
              <AnimatedDots />
            </p>
          </div>
        ) : isSearching ? (
          <div className="flex flex-col pb-16">
            {pastGroups.map((group) => (
              <DateGroupSection
                key={group.key}
                group={group}
                isPast
                onEventClick={setSearchSelectedEvent}
              />
            ))}
            <div className="px-4 pt-5">
              <p className="-ml-1 text-[#E8533E] text-xs font-semibold pb-3">
                Today
              </p>
              {todayGroup && (
                <div className="flex flex-col">
                  {todayGroup.events.map((event) => (
                    <SearchResultItem
                      key={event.id}
                      event={event}
                      onClick={setSearchSelectedEvent}
                    />
                  ))}
                </div>
              )}
              {!hasUpcomingResults && (
                <p className="text-[#ABABA9] dark:text-[#7F7F7F] pl-4 pt-1 text-xs">
                  No upcoming results
                </p>
              )}
            </div>
            {futureGroups.map((group) => (
              <DateGroupSection
                key={group.key}
                group={group}
                onEventClick={setSearchSelectedEvent}
              />
            ))}
          </div>
        ) : (
          <SidebarGroup className="px-3 pt-6">
            <SidebarGroupLabel className="text-foreground text-xs font-semibold px-0">
              Useful shortcuts
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-col">
                <ShortcutRow label="Command menu">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </ShortcutRow>
                <ShortcutRow label="Menu bar calendar">
                  <Kbd>⌃</Kbd>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </ShortcutRow>
                <ShortcutRow label="Toggle sidebar">
                  <Kbd>`</Kbd>
                </ShortcutRow>
                <ShortcutRow label="Show teammate calendar">
                  <Kbd>P</Kbd>
                </ShortcutRow>
                <ShortcutRow label="Go to date">
                  <Kbd>.</Kbd>
                </ShortcutRow>
                <ShortcutRow label="All keyboard shortcuts">
                  <Kbd>?</Kbd>
                </ShortcutRow>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

function DateGroupSection({
  group,
  isPast = false,
  onEventClick,
}: {
  group: DateGroup;
  isPast?: boolean;
  onEventClick?: (event: CalendarEvent) => void;
}) {
  return (
    <div className="px-4 pt-5">
      <p
        className={`-ml-1 text-xs font-semibold pb-3 ${group.isToday ? "text-[#E8533E]" : "text-foreground"}`}
      >
        {group.label}
      </p>
      <div className="flex flex-col">
        {group.events.map((event) => (
          <SearchResultItem
            key={event.id}
            event={event}
            isPast={isPast}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
}

/** Color tokens for search result items by temporal state */
const SEARCH_RESULT_COLORS = {
  future: {
    title: "text-[#32302C] dark:text-[#D4D4D4]",
    time: "text-[#787774] dark:text-[#7F7F7F]",
    duration: "text-[#ABABA9] dark:text-[#5A5A5A]",
    hover: "hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
  },
  past: {
    title: "text-[#989795] dark:text-[#777]",
    time: "text-[#BBBBB9] dark:text-[#4C4C4C]",
    duration: "text-[#D5D5D4] dark:text-[#3A3A3A]",
    hover: "hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F]",
  },
} as const;

/**
 * Sequential dot fill animation.
 * Steps: fill dot 0 → fill dot 1 → fill dot 2 → unfill dot 0 → unfill dot 1 → unfill dot 2
 * Each dot is either 10% or 100% opacity based on the current step.
 */
const DOT_STEP_INTERVAL_MS = 300;
const DOT_STEPS = [
  [false, false, false],
  [true, false, false],
  [true, true, false],
  [true, true, true],
  [false, true, true],
  [false, false, true],
] as const;

function AnimatedDots() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % DOT_STEPS.length);
    }, DOT_STEP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const filled = DOT_STEPS[step];

  return (
    <span className="ml-1 inline-flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block size-0.5 rounded-full bg-[#ABABA9] dark:bg-[#7C7C7C] transition-opacity duration-200"
          style={{ opacity: filled[i] ? 1 : 0.1 }}
        />
      ))}
    </span>
  );
}

function SearchResultItem({
  event,
  isPast = false,
  onClick,
}: {
  event: CalendarEvent;
  isPast?: boolean;
  onClick?: (event: CalendarEvent) => void;
}) {
  const timeRange = formatTimeRange(event);
  const duration = event.isAllDay ? "" : formatDuration(event.start, event.end);
  const colors = isPast
    ? SEARCH_RESULT_COLORS.past
    : SEARCH_RESULT_COLORS.future;

  return (
    <div
      className={`-mx-1 flex cursor-default items-start gap-2.5 rounded-sm px-1 py-2 ${colors.hover}`}
      onClick={() => onClick?.(event)}
    >
      <div
        className={`-mt-1 -mb-1 w-1 shrink-0 self-stretch rounded-full ${eventColorStyles[event.color ?? "blue"].border} ${isPast ? "opacity-40" : ""}`}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p
          className={`truncate text-sm font-medium leading-snug ${colors.title}`}
        >
          {event.title}
        </p>
        <p className="text-sm">
          <span className={colors.time}>{timeRange}</span>
          {duration && <span className={colors.duration}> {duration}</span>}
        </p>
      </div>
    </div>
  );
}

function ShortcutRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground flex items-center justify-between py-1 text-xs">
      <span>{label}</span>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}
