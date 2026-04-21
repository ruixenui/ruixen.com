"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

import type { ViewType } from "@/components/layouts/calendar/week-view-types";

/** Reusable "Soon" badge for unimplemented command items */
const SOON_BADGE = (
  <span className="bg-muted text-muted-foreground ml-auto rounded px-1.5 py-0.5 text-[10px] leading-none font-medium">
    Soon
  </span>
);

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToToday: () => void;
  onGoToPrev: () => void;
  onGoToNext: () => void;
  onSwitchView: (view: ViewType) => void;
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  onCycleTheme: () => void;
}

export function CommandMenu({
  open,
  onOpenChange,
  onGoToToday,
  onGoToPrev,
  onGoToNext,
  onSwitchView,
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onCycleTheme,
}: CommandMenuProps) {
  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command Menu"
      description="Search for a command to run..."
    >
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* ── Calendar ── */}
        <CommandGroup heading="Calendar">
          <CommandItem disabled>
            Create event...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Meet with...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Show teammate calendar...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Create recurring scheduling link...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Create one-off scheduling link...
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── Navigation ── */}
        <CommandGroup heading="Navigation">
          <CommandItem disabled>
            Go to date...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onGoToToday)}>
            Go to today
            <Kbd className="ml-auto">T</Kbd>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onGoToNext)}>
            Go to next week
            <Kbd className="ml-auto">J</Kbd>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onGoToPrev)}>
            Go to previous week
            <Kbd className="ml-auto">K</Kbd>
          </CommandItem>
          <CommandItem disabled>
            Search events
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── Time zones ── */}
        <CommandGroup heading="Time zones">
          <CommandItem disabled>
            Travel to time zone...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Show additional time zones...
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── App ── */}
        <CommandGroup heading="App">
          <CommandItem onSelect={() => runCommand(onToggleLeftSidebar)}>
            Toggle sidebar
            <KbdGroup className="ml-auto">
              <Kbd>⌘</Kbd>
              <Kbd>/</Kbd>
            </KbdGroup>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onCycleTheme)}>
            Set theme...
            <KbdGroup className="ml-auto">
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>L</Kbd>
            </KbdGroup>
          </CommandItem>
        </CommandGroup>

        {/* ── View ── */}
        <CommandGroup heading="View">
          <CommandItem disabled>
            Start week on...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onSwitchView("day"))}>
            Display day view
            <KbdGroup className="ml-auto">
              <Kbd>D</Kbd>
            </KbdGroup>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onSwitchView("week"))}>
            Display week view
            <KbdGroup className="ml-auto">
              <Kbd>W</Kbd>
            </KbdGroup>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onSwitchView("month"))}>
            Display month view
            <KbdGroup className="ml-auto">
              <Kbd>M</Kbd>
            </KbdGroup>
          </CommandItem>
          <CommandItem disabled>
            Set number of displayed days...
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Select all visible
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Default hour size
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Zoom hours in
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Zoom hours out
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Hide weekends
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Hide declined events
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Hide week numbers
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── Settings & help ── */}
        <CommandGroup heading="Settings & help">
          <CommandItem disabled>
            Get CalendarCN mobile app
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Show keyboard shortcuts
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Go to settings
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Support & feedback
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── Accounts ── */}
        <CommandGroup heading="Accounts">
          <CommandItem disabled>
            Add Google Calendar account
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Manage calendar accounts
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            Log out
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── CalendarCN ── */}
        <CommandGroup heading="CalendarCN">
          <CommandItem disabled>
            Check for update
            {SOON_BADGE}
          </CommandItem>
          <CommandItem disabled>
            About CalendarCN
            {SOON_BADGE}
          </CommandItem>
        </CommandGroup>

        {/* ── Panels ── */}
        <CommandGroup heading="Panels">
          <CommandItem onSelect={() => runCommand(onToggleRightSidebar)}>
            Toggle context panel
            <Kbd className="ml-auto">/</Kbd>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      <div className="border-t px-3 py-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-muted-foreground/70">↑↓</span> Navigate
        </span>
        <span className="flex items-center gap-1">
          <span className="text-muted-foreground/70">↵</span> Select
        </span>
        <span className="flex items-center gap-1">
          <Kbd>⎋</Kbd> Close
        </span>
      </div>
    </CommandDialog>
  );
}
