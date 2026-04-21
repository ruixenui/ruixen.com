"use client";

import * as React from "react";
import { PanelRightIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import { EventDetailPanel } from "./event-detail-panel";
import { useCalendarPopoverBoundary } from "./calendar-popover-context";
import type { CalendarEvent } from "./week-view-types";

interface EventDetailPopoverProps {
  event: CalendarEvent;
  onEventChange?: (event: CalendarEvent) => void;
  onClose: () => void;
  onDockToSidebar: () => void;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  /** Which side to prefer for the popover. Defaults to "right". */
  side?: "right" | "bottom" | "left" | "top";
  /** Alignment along the side axis. Defaults to "center". */
  align?: "start" | "center" | "end";
  /**
   * Override the top collision padding. When omitted the header height is
   * used so the popover never overlaps the weekday header. All-day events
   * live *inside* the header, so they pass a small value to avoid being
   * pushed off-screen.
   */
  collisionPaddingTop?: number;
}

export function EventDetailPopover({
  event,
  onEventChange,
  onClose,
  onDockToSidebar,
  onPrevWeek,
  onNextWeek,
  side = "right",
  align = "center",
  collisionPaddingTop,
}: EventDetailPopoverProps) {
  const { boundary, headerHeight, view } = useCalendarPopoverBoundary();

  /**
   * In day view the event trigger spans the full grid width, leaving no room
   * for a 320px popover on either side within the calendar container.
   * Skip the collision boundary so Radix uses the viewport instead.
   */
  const isDayView = view === "day";
  const effectiveBoundary = isDayView
    ? undefined
    : boundary
      ? [boundary]
      : undefined;

  const popoverHeaderActions = (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-[#C7C5C1] dark:text-[#595959]"
        onClick={(e) => {
          e.stopPropagation();
          onDockToSidebar();
        }}
        title="Dock to sidebar"
      >
        <PanelRightIcon className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-[#C7C5C1] dark:text-[#595959]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close"
      >
        <X className="size-4" />
      </Button>
    </>
  );

  return (
    <PopoverContent
      side={side}
      align={align}
      sideOffset={8}
      collisionPadding={{
        top: collisionPaddingTop ?? headerHeight,
        bottom: 8,
        left: 16,
        right: 16,
      }}
      collisionBoundary={effectiveBoundary}
      className="w-[320px] max-h-[80vh] overflow-y-auto p-0 bg-popover/60 backdrop-blur-xl border shadow-lg rounded-lg"
      onOpenAutoFocus={(e) => e.preventDefault()}
      onCloseAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("[data-radix-popper-content-wrapper]")) {
          e.preventDefault();
        }
      }}
    >
      <EventDetailPanel
        event={event}
        onEventChange={onEventChange}
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
        headerActions={popoverHeaderActions}
      />
    </PopoverContent>
  );
}
