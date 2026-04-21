"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from "lucide-react";

import { addDays, addWeeks, format, startOfDay, startOfWeek } from "date-fns";
import { useTheme } from "next-themes";
import { generateMockEvents } from "@/lib/layouts/mock-events";
import { CommandMenu } from "@/components/layouts/calendar/command-menu";
import { SidebarLeft } from "@/components/layouts/calendar/sidebar-left";
import type {
  CalendarEvent,
  ViewSettings,
  ViewType,
} from "@/components/layouts/calendar/week-view-types";
import { SidebarRight } from "@/components/layouts/calendar/sidebar-right";
import {
  WeekView,
  getCalendarHeaderInfo,
  getVisibleDays,
} from "@/components/layouts/calendar/week-view";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ViewDropdown } from "@/components/layouts/calendar/view-dropdown";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";

function PageContent() {
  const { theme, setTheme } = useTheme();
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(true);
  const [view, setView] = React.useState<ViewType>("week");
  const [currentDate, setCurrentDate] = React.useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 0 }),
  );
  const [events, setEvents] = React.useState(() => generateMockEvents());
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(
    null,
  );
  const [commandMenuOpen, setCommandMenuOpen] = React.useState(false);
  const [numberOfDays, setNumberOfDays] = React.useState(7);
  const [viewSettings, setViewSettings] = React.useState<ViewSettings>({
    showWeekends: true,
    showDeclinedEvents: true,
    showWeekNumbers: true,
  });
  const selectedEvent = React.useMemo(
    () => events.find((e) => e.id === selectedEventId) ?? null,
    [events, selectedEventId],
  );

  const handleEventChange = React.useCallback((updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)),
    );
  }, []);

  const goToToday = React.useCallback(() => {
    if (view === "day") {
      setCurrentDate(startOfDay(new Date()));
    } else {
      setCurrentDate(startOfWeek(new Date(), { weekStartsOn: 0 }));
    }
  }, [view]);

  const goToPrev = React.useCallback(() => {
    if (view === "day") {
      setCurrentDate((prev) => addDays(prev, -1));
    } else {
      setCurrentDate((prev) => addWeeks(prev, -1));
    }
  }, [view]);

  const goToNext = React.useCallback(() => {
    if (view === "day") {
      setCurrentDate((prev) => addDays(prev, 1));
    } else {
      setCurrentDate((prev) => addWeeks(prev, 1));
    }
  }, [view]);

  const goToDate = React.useCallback((date: Date) => setCurrentDate(date), []);

  const goToDateWeek = React.useCallback(
    (date: Date) => {
      if (view === "day") {
        setCurrentDate(startOfDay(date));
        return;
      }
      // Center the selected date inside the 7-day visible window so the
      // timeline shifts to place the clicked day in the middle column
      // (positions: [date-3, date-2, date-1, date, date+1, date+2, date+3]).
      // The week view always renders VISIBLE_DAYS_BY_VIEW.week = 7 days
      // starting from `currentDate`, so pulling back by 3 lands the click
      // in slot 4 of 7.
      setCurrentDate(addDays(startOfDay(date), -3));
    },
    [view],
  );

  const switchView = React.useCallback(
    (newView: ViewType) => {
      if (newView === view) return;
      setView(newView);
      if (newView === "day") {
        setCurrentDate(startOfDay(new Date()));
        return;
      }
      setCurrentDate((prev) => startOfWeek(prev, { weekStartsOn: 0 }));
    },
    [view],
  );

  const toggleWeekends = React.useCallback(() => {
    setViewSettings((prev) => ({ ...prev, showWeekends: !prev.showWeekends }));
  }, []);

  const toggleDeclinedEvents = React.useCallback(() => {
    setViewSettings((prev) => ({
      ...prev,
      showDeclinedEvents: !prev.showDeclinedEvents,
    }));
  }, []);

  const toggleWeekNumbers = React.useCallback(() => {
    setViewSettings((prev) => ({
      ...prev,
      showWeekNumbers: !prev.showWeekNumbers,
    }));
  }, []);

  const cycleTheme = React.useCallback(() => {
    if (theme === "system") {
      setTheme("light");
      return;
    }
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("system");
  }, [theme, setTheme]);

  const { toggleSidebar, open: rightSidebarOpen } = useSidebar();

  const [visibleDays, setVisibleDays] = React.useState<Date[]>(() =>
    getVisibleDays(currentDate, view),
  );

  const { monthName, year, weekNumber } = getCalendarHeaderInfo(
    visibleDays[0],
    0,
  );

  // Keyboard shortcuts (macOS conventions — symbols shown in Kbd hints are
  // ⌘ ⇧ ⌥ ⌃ ⎋). Handlers still accept metaKey || ctrlKey so Windows/Linux
  // users aren't locked out, but the displayed symbols are Mac-first.
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey; // ⌘ on Mac, Ctrl on Win/Linux
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // ⌘K — command menu
      if (mod && !e.shiftKey && !e.altKey && key === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
        return;
      }
      // ⌘/ — toggle left sidebar (mini-calendar column)
      if (mod && !e.shiftKey && !e.altKey && key === "/") {
        e.preventDefault();
        setLeftSidebarOpen((prev) => !prev);
        return;
      }
      // ⌘⇧E — toggle weekends
      if (mod && e.shiftKey && key === "e") {
        e.preventDefault();
        toggleWeekends();
        return;
      }
      // ⌘⇧D — toggle declined events
      if (mod && e.shiftKey && key === "d") {
        e.preventDefault();
        toggleDeclinedEvents();
        return;
      }
      // ⌘⇧L — cycle appearance (Safari / macOS-idiomatic for theme toggle)
      if (mod && e.shiftKey && key === "l") {
        e.preventDefault();
        cycleTheme();
        return;
      }
      // ⎋ — deselect the focused event
      if (e.key === "Escape") {
        setSelectedEventId(null);
        return;
      }

      // Below this point: bare-key shortcuts (Notion-Calendar style). Skip
      // if focus is in a text field so typing stays typing.
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      if (mod || e.altKey) return; // don't catch bare-key path on modifiers

      // / — toggle right sidebar (context panel)
      if (key === "/") {
        e.preventDefault();
        toggleSidebar();
        return;
      }
      // T — jump to today
      if (key === "t") {
        e.preventDefault();
        goToToday();
        return;
      }
      // D or 1 — day view
      if (key === "d" || key === "1") {
        e.preventDefault();
        switchView("day");
        return;
      }
      // W or 0 — week view
      if (key === "w" || key === "0") {
        e.preventDefault();
        switchView("week");
        return;
      }
      // M — month view
      if (key === "m") {
        e.preventDefault();
        switchView("month");
        return;
      }
      // 2–9 — set visible day count
      if (/^[2-9]$/.test(key)) {
        e.preventDefault();
        setNumberOfDays(Number(key));
        return;
      }
      // J or ← — previous period
      if (key === "j" || key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
        return;
      }
      // K or → — next period
      if (key === "k" || key === "ArrowRight") {
        e.preventDefault();
        goToNext();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    toggleSidebar,
    goToToday,
    goToPrev,
    goToNext,
    switchView,
    toggleWeekends,
    toggleDeclinedEvents,
    cycleTheme,
  ]);

  return (
    <>
      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onGoToToday={goToToday}
        onGoToPrev={goToPrev}
        onGoToNext={goToNext}
        onSwitchView={switchView}
        onToggleLeftSidebar={() => setLeftSidebarOpen((prev) => !prev)}
        onToggleRightSidebar={toggleSidebar}
        onCycleTheme={cycleTheme}
      />
      <SidebarRight
        open={leftSidebarOpen}
        onDateSelect={goToDateWeek}
        currentDate={currentDate}
        visibleDays={visibleDays}
      />
      <SidebarInset className="flex flex-col overflow-hidden">
        <header className="bg-background sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-4">
            <Link
              href="/layouts"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-3 w-3" />
              Layouts
            </Link>
            <Separator
              orientation="vertical"
              className="mx-1 data-[orientation=vertical]:h-4"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground"
                  onClick={() => setLeftSidebarOpen((prev) => !prev)}
                >
                  <PanelLeftIcon />
                  <span className="sr-only">Toggle Calendar Sidebar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {leftSidebarOpen ? "Close" : "Open"} sidebar{" "}
                <Kbd className="ml-1">⌘</Kbd> <Kbd>/</Kbd>
              </TooltipContent>
            </Tooltip>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-xl">
              <span className="font-extrabold">{monthName}</span>{" "}
              <span className="font-extrabold">{year}</span>{" "}
              <span className="text-muted-foreground text-xs">
                {view === "day" && format(currentDate, "EEEE, MMM d")}
                {view === "week" && `Week ${weekNumber}`}
                {view === "month" && format(currentDate, "MMMM")}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4">
            <Avatar className="size-7">
              <AvatarFallback>RX</AvatarFallback>
            </Avatar>
            <ViewDropdown
              view={view}
              numberOfDays={numberOfDays}
              viewSettings={viewSettings}
              onSwitchView={switchView}
              onSetNumberOfDays={setNumberOfDays}
              onToggleWeekends={toggleWeekends}
              onToggleDeclinedEvents={toggleDeclinedEvents}
              onToggleWeekNumbers={toggleWeekNumbers}
            />
            <Button
              variant="secondary"
              size="sm"
              className="px-3"
              onClick={goToToday}
            >
              Today
            </Button>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground"
                onClick={goToPrev}
              >
                <ChevronLeftIcon className="size-4" />
                <span className="sr-only">
                  {view === "day" ? "Previous day" : "Previous week"}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground"
                onClick={goToNext}
              >
                <ChevronRightIcon className="size-4" />
                <span className="sr-only">
                  {view === "day" ? "Next day" : "Next week"}
                </span>
              </Button>
            </div>
            {!rightSidebarOpen && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground"
                    onClick={toggleSidebar}
                  >
                    <PanelRightIcon />
                    <span className="sr-only">Toggle Navigation Sidebar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Open context panel <Kbd className="ml-1">/</Kbd>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden">
          <WeekView
            view={view}
            currentDate={currentDate}
            events={events}
            onEventClick={(e) => setSelectedEventId(e.id)}
            selectedEventId={selectedEvent?.id}
            onBackgroundClick={() => setSelectedEventId(null)}
            onDateChange={goToDate}
            onVisibleDaysChange={setVisibleDays}
            onEventChange={handleEventChange}
            isSidebarOpen={rightSidebarOpen}
            onDockToSidebar={() => {
              if (!rightSidebarOpen) toggleSidebar();
            }}
            onClosePopover={() => setSelectedEventId(null)}
            onPrevWeek={goToPrev}
            onNextWeek={goToNext}
          />
        </div>
      </SidebarInset>
      <SidebarLeft
        events={events}
        selectedEvent={selectedEvent}
        onEventChange={handleEventChange}
        onPrevWeek={goToPrev}
        onNextWeek={goToNext}
      />
    </>
  );
}

export default function CalendarLayoutPage() {
  return (
    <SidebarProvider className="h-screen">
      <PageContent />
    </SidebarProvider>
  );
}
