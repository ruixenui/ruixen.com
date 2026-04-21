"use client";

import React from "react";
import { createPortal } from "react-dom";
import { isSameDay, startOfDay, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { isPast } from "date-fns";
import { calculatePositionedEvents } from "@/lib/layouts/event-utils";
import { CalendarEventItem } from "./calendar-event-item";
import { useCalendarPopoverBoundary } from "./calendar-popover-context";
import type {
  CalendarEvent,
  EventDragState,
  EventResizeState,
  PositionedEvent,
  WeekViewGridProps,
} from "./week-view-types";

/**
 * Main grid displaying hour/day intersection cells with events
 * Each cell represents one hour in one day
 */
export function WeekViewGrid({
  days,
  hours,
  hourHeight,
  events = [],
  onEventClick,
  selectedEventId,
  dragState,
  onEventDragMouseDown,
  resizeState,
  onEventResizeMouseDown,
  onEventChange,
  onContextMenuOpenChange,
  isSidebarOpen,
  onDockToSidebar,
  onClosePopover,
  onPrevWeek,
  onNextWeek,
  className,
}: WeekViewGridProps) {
  const { view } = useCalendarPopoverBoundary();
  const isDayView = view === "day";
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = React.useState(0);

  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setGridWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={cn("relative", className)}>
      {/* Background grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${days.length}, 1fr)`,
          gridTemplateRows: `repeat(${hours.length}, ${hourHeight}px)`,
        }}
      >
        {hours.map((hourSlot) =>
          days.map((day) => {
            const isWeekend =
              day.date.getDay() === 0 || day.date.getDay() === 6;
            return (
              <div
                key={`${day.date.toISOString()}-${hourSlot.hour}`}
                className={cn(
                  "border-border border-b border-l",
                  isWeekend && "bg-calendar-weekend",
                )}
              />
            );
          }),
        )}
      </div>

      {/* Events layer */}
      <div
        className="absolute inset-0 grid pointer-events-none"
        style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
      >
        {days.map((day) => {
          /**
           * Day view uses a smaller right gap than week view so events
           * nearly fill the column but still show a sliver of the grid
           * line — matching Notion Calendar's day-view styling.
           */
          const rightGap = isDayView ? 2 : 8;
          const positionedEvents = calculatePositionedEvents(
            events,
            day,
            rightGap,
          );

          return (
            <DayEventsColumn
              key={day.date.toISOString()}
              columnDate={day.date}
              events={positionedEvents}
              hourHeight={hourHeight}
              onEventClick={onEventClick}
              selectedEventId={selectedEventId}
              dragState={dragState}
              onEventDragMouseDown={onEventDragMouseDown}
              resizeState={resizeState}
              onEventResizeMouseDown={onEventResizeMouseDown}
              onEventChange={onEventChange}
              onContextMenuOpenChange={onContextMenuOpenChange}
              isSidebarOpen={isSidebarOpen}
              onDockToSidebar={onDockToSidebar}
              onClosePopover={onClosePopover}
              onPrevWeek={onPrevWeek}
              onNextWeek={onNextWeek}
            />
          );
        })}
      </div>

      {/* Resize placeholder overlay — rendered at grid level for cross-day support */}
      {resizeState?.isResizing &&
        !isSameDay(
          resizeState.currentStartDate,
          resizeState.currentEndDate,
        ) && (
          <ResizePlaceholderOverlay
            days={days}
            hourHeight={hourHeight}
            resizeState={resizeState}
          />
        )}

      {/* Drag placeholder overlay — rendered at grid level for cross-column support */}
      {dragState?.isDragging && (
        <DragPlaceholderOverlay
          days={days}
          hourHeight={hourHeight}
          dragState={dragState}
        />
      )}

      {/* Floating dragging copy — rendered at grid level so it can move freely */}
      {dragState?.isDragging && (
        <FloatingDragCopy
          days={days}
          hourHeight={hourHeight}
          dragState={dragState}
          gridWidth={gridWidth}
        />
      )}
    </div>
  );
}

interface DragPlaceholderOverlayProps {
  days: WeekViewGridProps["days"];
  hourHeight: number;
  dragState: EventDragState;
}

function DragPlaceholderOverlay({
  days,
  hourHeight,
  dragState,
}: DragPlaceholderOverlayProps) {
  // Find the target column index using dragState.currentDate
  const targetColumnIndex = days.findIndex((d) =>
    isSameDay(d.date, dragState.currentDate),
  );

  if (targetColumnIndex === -1) return null;

  // Build a minimal PositionedEvent from the drag state event
  const placeholderPositioned: PositionedEvent = {
    event: dragState.event,
    top: 0,
    height: 0,
    left: 0,
    width: 92,
    column: 0,
    totalColumns: 1,
  };

  return (
    <div
      className="absolute inset-0 grid pointer-events-none"
      style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
    >
      {days.map((day, i) => {
        if (i !== targetColumnIndex) {
          return <div key={day.date.toISOString()} />;
        }

        return (
          <div key={day.date.toISOString()} className="relative">
            <CalendarEventItem
              key={`${dragState.eventId}-placeholder`}
              positionedEvent={placeholderPositioned}
              hourHeight={hourHeight}
              dragVariant="placeholder"
              overrideStart={dragState.currentStart}
              overrideEnd={dragState.currentEnd}
            />
          </div>
        );
      })}
    </div>
  );
}

interface ResizePlaceholderOverlayProps {
  days: WeekViewGridProps["days"];
  hourHeight: number;
  resizeState: EventResizeState;
}

function ResizePlaceholderOverlay({
  days,
  hourHeight,
  resizeState,
}: ResizePlaceholderOverlayProps) {
  if (resizeState.effectiveEdge === "bottom") {
    return (
      <BottomEdgeOverlay
        days={days}
        hourHeight={hourHeight}
        resizeState={resizeState}
      />
    );
  }

  return (
    <TopEdgeOverlay
      days={days}
      hourHeight={hourHeight}
      resizeState={resizeState}
    />
  );
}

function BottomEdgeOverlay({
  days,
  hourHeight,
  resizeState,
}: ResizePlaceholderOverlayProps) {
  const endDay = resizeState.currentEndDate;

  const startColIndex = days.findIndex((d) =>
    isSameDay(d.date, resizeState.currentStartDate),
  );
  const endColIndex = days.findIndex((d) => isSameDay(d.date, endDay));

  if (startColIndex === -1 || endColIndex === -1) return null;
  if (endColIndex <= startColIndex) return null;

  return (
    <div
      className="absolute inset-0 grid pointer-events-none"
      style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
    >
      {days.map((day, i) => {
        // Skip start column (handled by DayEventsColumn) and columns outside range
        if (i <= startColIndex || i > endColIndex) {
          return <div key={day.date.toISOString()} />;
        }

        const isEndColumn = i === endColIndex;
        const segmentPosition = isEndColumn
          ? ("end" as const)
          : ("middle" as const);

        const midnight = startOfDay(day.date);
        const overrideStart = midnight;
        const overrideEnd = isEndColumn
          ? resizeState.currentEnd
          : addDays(midnight, 1);

        const positioned: PositionedEvent = {
          event: resizeState.event,
          top: 0,
          height: 0,
          left: 0,
          width: 92,
          column: 0,
          totalColumns: 1,
          segmentPosition,
        };

        return (
          <div key={day.date.toISOString()} className="relative">
            <CalendarEventItem
              positionedEvent={positioned}
              hourHeight={hourHeight}
              isSelected
              overrideStart={overrideStart}
              overrideEnd={overrideEnd}
            />
          </div>
        );
      })}
    </div>
  );
}

function TopEdgeOverlay({
  days,
  hourHeight,
  resizeState,
}: ResizePlaceholderOverlayProps) {
  const startDay = resizeState.currentStartDate;

  const startColIndex = days.findIndex((d) => isSameDay(d.date, startDay));
  const endColIndex = days.findIndex((d) =>
    isSameDay(d.date, resizeState.currentEndDate),
  );

  if (startColIndex === -1 || endColIndex === -1) return null;
  if (endColIndex <= startColIndex) return null;

  return (
    <div
      className="absolute inset-0 grid pointer-events-none"
      style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
    >
      {days.map((day, i) => {
        // Skip end column (handled by DayEventsColumn) and columns outside range
        if (i < startColIndex || i >= endColIndex) {
          return <div key={day.date.toISOString()} />;
        }

        const isStartColumn = i === startColIndex;
        const segmentPosition = isStartColumn
          ? ("start" as const)
          : ("middle" as const);

        const midnight = startOfDay(day.date);
        const overrideStart = isStartColumn
          ? resizeState.currentStart
          : midnight;
        const overrideEnd = addDays(midnight, 1);

        const positioned: PositionedEvent = {
          event: resizeState.event,
          top: 0,
          height: 0,
          left: 0,
          width: 92,
          column: 0,
          totalColumns: 1,
          segmentPosition,
        };

        return (
          <div key={day.date.toISOString()} className="relative">
            <CalendarEventItem
              positionedEvent={positioned}
              hourHeight={hourHeight}
              isSelected
              overrideStart={overrideStart}
              overrideEnd={overrideEnd}
            />
          </div>
        );
      })}
    </div>
  );
}

interface FloatingDragCopyProps {
  days: WeekViewGridProps["days"];
  hourHeight: number;
  dragState: EventDragState;
  gridWidth: number;
}

function FloatingDragCopy({
  days,
  hourHeight,
  dragState,
  gridWidth,
}: FloatingDragCopyProps) {
  const floatingPositioned: PositionedEvent = {
    event: dragState.event,
    top: 0,
    height: 0,
    left: 0,
    width: 92,
    column: 0,
    totalColumns: 1,
  };

  const durationMinutes =
    (dragState.currentEnd.getTime() - dragState.currentStart.getTime()) / 60000;
  const heightPx = (durationMinutes / 60) * hourHeight;
  const columnWidthPx =
    (days.length > 0 ? gridWidth / days.length : 200) * 0.92;

  return createPortal(
    <div
      className="pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      <CalendarEventItem
        key={`${dragState.eventId}-dragging`}
        positionedEvent={floatingPositioned}
        hourHeight={hourHeight}
        dragVariant="dragging"
        overrideStart={dragState.currentStart}
        overrideEnd={dragState.currentEnd}
        cursorY={dragState.clientY}
        cursorX={dragState.clientX}
        fixedWidth={columnWidthPx}
        fixedHeight={heightPx}
      />
    </div>,
    document.body,
  );
}

interface DayEventsColumnProps {
  columnDate: Date;
  events: ReturnType<typeof calculatePositionedEvents>;
  hourHeight: number;
  onEventClick?: (event: CalendarEvent) => void;
  selectedEventId?: string;
  dragState?: EventDragState;
  onEventDragMouseDown?: (e: React.MouseEvent, event: CalendarEvent) => void;
  resizeState?: EventResizeState;
  onEventResizeMouseDown?: (
    e: React.MouseEvent,
    event: CalendarEvent,
    edge: "top" | "bottom",
  ) => void;
  onEventChange?: (event: CalendarEvent) => void;
  onContextMenuOpenChange?: (open: boolean) => void;
  isSidebarOpen?: boolean;
  onDockToSidebar?: () => void;
  onClosePopover?: () => void;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
}

function renderColumnGhost(
  positionedEvent: PositionedEvent,
  hourHeight: number,
) {
  return (
    <CalendarEventItem
      key={`${positionedEvent.event.id}-ghost`}
      positionedEvent={positionedEvent}
      hourHeight={hourHeight}
      dragVariant="ghost"
    />
  );
}

function DayEventsColumn({
  columnDate,
  events,
  hourHeight,
  onEventClick,
  selectedEventId,
  dragState,
  onEventDragMouseDown,
  resizeState,
  onEventResizeMouseDown,
  onEventChange,
  onContextMenuOpenChange,
  isSidebarOpen,
  onDockToSidebar,
  onClosePopover,
  onPrevWeek,
  onNextWeek,
}: DayEventsColumnProps) {
  return (
    <div className="relative h-full pointer-events-auto">
      {events.map((positionedEvent) => {
        const eventId = positionedEvent.event.id;
        const isBeingDragged =
          dragState?.isDragging && dragState.eventId === eventId;

        if (isBeingDragged) {
          return renderColumnGhost(positionedEvent, hourHeight);
        }

        const isBeingResized =
          resizeState?.isResizing && resizeState.eventId === eventId;

        if (isBeingResized) {
          const { effectiveEdge, currentStartDate, currentEndDate } =
            resizeState;
          const isCrossDay = !isSameDay(currentStartDate, currentEndDate);

          // Determine if this column is the anchor column
          const isAnchorColumn =
            (effectiveEdge === "bottom" &&
              isSameDay(columnDate, currentStartDate)) ||
            (effectiveEdge === "top" && isSameDay(columnDate, currentEndDate));

          // Check if this column is within the new range at all
          const colTime = columnDate.getTime();
          const inRange =
            colTime >= currentStartDate.getTime() &&
            colTime <= currentEndDate.getTime();

          // Non-anchor columns with original segments: render as ghost
          // Columns outside new range with original segments: render as ghost
          if (!isAnchorColumn || !inRange) {
            return renderColumnGhost(positionedEvent, hourHeight);
          }

          // Anchor column rendering
          let displayStart: Date;
          let displayEnd: Date;
          let segmentPosition: "start" | "middle" | "end" | "full";

          if (!isCrossDay) {
            // Same day: show currentStart to currentEnd
            displayStart = resizeState.currentStart;
            displayEnd = resizeState.currentEnd;
            segmentPosition = "full";
          } else if (effectiveEdge === "bottom") {
            // Anchor is start column: show currentStart to end-of-day
            displayStart = resizeState.currentStart;
            displayEnd = addDays(startOfDay(columnDate), 1);
            segmentPosition = "start";
          } else {
            // Anchor is end column: show start-of-day to currentEnd
            displayStart = startOfDay(columnDate);
            displayEnd = resizeState.currentEnd;
            segmentPosition = "end";
          }

          const resizePositioned = { ...positionedEvent, segmentPosition };

          return (
            <React.Fragment key={eventId}>
              {renderColumnGhost(positionedEvent, hourHeight)}
              <CalendarEventItem
                key={`${eventId}-resizing`}
                positionedEvent={resizePositioned}
                hourHeight={hourHeight}
                isPast={isPast(positionedEvent.event.end)}
                isSelected={isCrossDay || eventId === selectedEventId}
                overrideStart={displayStart}
                overrideEnd={displayEnd}
                onEventChange={onEventChange}
              />
            </React.Fragment>
          );
        }

        return (
          <CalendarEventItem
            key={eventId}
            positionedEvent={positionedEvent}
            hourHeight={hourHeight}
            isPast={isPast(positionedEvent.event.end)}
            isSelected={eventId === selectedEventId}
            onClick={onEventClick}
            onDragMouseDown={onEventDragMouseDown}
            onResizeMouseDown={onEventResizeMouseDown}
            onEventChange={onEventChange}
            onContextMenuOpenChange={onContextMenuOpenChange}
            isSidebarOpen={isSidebarOpen}
            onDockToSidebar={onDockToSidebar}
            onClosePopover={onClosePopover}
            onPrevWeek={onPrevWeek}
            onNextWeek={onNextWeek}
          />
        );
      })}
    </div>
  );
}
