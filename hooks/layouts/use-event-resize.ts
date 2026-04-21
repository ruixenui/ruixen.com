"use client";

import { isSameDay, startOfDay } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CalendarEvent,
  EventResizeState,
} from "@/components/layouts/calendar/week-view-types";

interface UseEventResizeOptions {
  hourHeight: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  events: CalendarEvent[];
  days: Date[];
  dayColumnWidth: number;
  timeAxisWidth: number;
  onEventChange?: (event: CalendarEvent) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onResizeNavigate?: (daysDelta: number) => void;
}

interface UseEventResizeReturn {
  resizeState: EventResizeState | null;
  handleResizeMouseDown: (
    e: React.MouseEvent,
    event: CalendarEvent,
    edge: "top" | "bottom",
  ) => void;
}

const DRAG_THRESHOLD_PX = 4;
const SNAP_MINUTES = 15;
const MIN_DURATION_MINUTES = 15;
const AUTO_SCROLL_ZONE_PX = 60;
const AUTO_SCROLL_MAX_SPEED = 12;
const EDGE_ZONE_PX = 40;
const EDGE_NAV_DELAY_MS = 500;
const EDGE_NAV_REPEAT_MS = 800;

function snapToGrid(minutes: number): number {
  return Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
}

function addMinutesToDate(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  result.setMinutes(minutes);
  return result;
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

interface ResizeInfo {
  eventId: string;
  event: CalendarEvent;
  edge: "top" | "bottom";
  startClientY: number;
  isResizing: boolean;
  originalStartMinutes: number;
  originalEndMinutes: number;
  originalStartDate: Date;
  originalEndDate: Date;
}

export function useEventResize({
  hourHeight,
  scrollContainerRef,
  events,
  days,
  dayColumnWidth,
  timeAxisWidth,
  onEventChange,
  onEventClick,
  onResizeNavigate,
}: UseEventResizeOptions): UseEventResizeReturn {
  const [resizeState, setResizeState] = useState<EventResizeState | null>(null);

  const resizeRef = useRef<ResizeInfo | null>(null);
  const onEventChangeRef = useRef(onEventChange);
  const onEventClickRef = useRef(onEventClick);
  const onResizeNavigateRef = useRef(onResizeNavigate);
  const eventsRef = useRef(events);
  const hourHeightRef = useRef(hourHeight);
  const daysRef = useRef(days);
  const dayColumnWidthRef = useRef(dayColumnWidth);
  const timeAxisWidthRef = useRef(timeAxisWidth);

  useEffect(() => {
    onEventChangeRef.current = onEventChange;
  }, [onEventChange]);
  useEffect(() => {
    onEventClickRef.current = onEventClick;
  }, [onEventClick]);
  useEffect(() => {
    onResizeNavigateRef.current = onResizeNavigate;
  }, [onResizeNavigate]);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);
  useEffect(() => {
    hourHeightRef.current = hourHeight;
  }, [hourHeight]);
  useEffect(() => {
    daysRef.current = days;
  }, [days]);
  useEffect(() => {
    dayColumnWidthRef.current = dayColumnWidth;
  }, [dayColumnWidth]);
  useEffect(() => {
    timeAxisWidthRef.current = timeAxisWidth;
  }, [timeAxisWidth]);

  const autoScrollRAFRef = useRef<number | null>(null);
  const autoScrollSpeedRef = useRef(0);
  const edgeNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const edgeNavDirectionRef = useRef<number | null>(null);

  const handleMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const handleMouseUpRef = useRef<(() => void) | null>(null);

  const cancelAutoScroll = useCallback(() => {
    if (autoScrollRAFRef.current !== null) {
      cancelAnimationFrame(autoScrollRAFRef.current);
      autoScrollRAFRef.current = null;
    }
    autoScrollSpeedRef.current = 0;
  }, []);

  const cancelEdgeNav = useCallback(() => {
    if (edgeNavTimerRef.current !== null) {
      clearTimeout(edgeNavTimerRef.current);
      edgeNavTimerRef.current = null;
    }
    edgeNavDirectionRef.current = null;
  }, []);

  const scheduleEdgeNav = useCallback(
    (direction: number) => {
      if (edgeNavDirectionRef.current === direction) return;

      cancelEdgeNav();
      edgeNavDirectionRef.current = direction;

      const fireNav = () => {
        onResizeNavigateRef.current?.(direction);
        edgeNavTimerRef.current = setTimeout(fireNav, EDGE_NAV_REPEAT_MS);
      };

      edgeNavTimerRef.current = setTimeout(fireNav, EDGE_NAV_DELAY_MS);
    },
    [cancelEdgeNav],
  );

  const cleanup = useCallback(() => {
    if (handleMouseMoveRef.current) {
      window.removeEventListener("mousemove", handleMouseMoveRef.current);
    }
    if (handleMouseUpRef.current) {
      window.removeEventListener("mouseup", handleMouseUpRef.current);
    }
    cancelAutoScroll();
    cancelEdgeNav();
  }, [cancelAutoScroll, cancelEdgeNav]);

  const startAutoScrollLoop = useCallback(() => {
    if (autoScrollRAFRef.current !== null) return;

    const tick = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const speed = autoScrollSpeedRef.current;
      if (speed === 0) {
        autoScrollRAFRef.current = null;
        return;
      }

      container.scrollTop += speed;
      autoScrollRAFRef.current = requestAnimationFrame(tick);
    };

    autoScrollRAFRef.current = requestAnimationFrame(tick);
  }, [scrollContainerRef]);

  useEffect(() => {
    handleMouseMoveRef.current = (e: MouseEvent) => {
      const resize = resizeRef.current;
      if (!resize) return;

      const deltaY = Math.abs(e.clientY - resize.startClientY);
      if (!resize.isResizing && deltaY < DRAG_THRESHOLD_PX) return;

      if (!resize.isResizing) {
        resize.isResizing = true;
      }

      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const absoluteY = e.clientY - containerRect.top + scrollTop;
      const rawMinutes = (absoluteY / hourHeightRef.current) * 60;
      const snappedMinutes = snapToGrid(rawMinutes);

      let newStartMinutes = resize.originalStartMinutes;
      let newEndMinutes = resize.originalEndMinutes;
      let startDate = resize.originalStartDate;
      let endDate = resize.originalEndDate;

      // Column detection (shared for both edges)
      const colWidth = dayColumnWidthRef.current;
      const visibleDays = daysRef.current;
      const gridLeftEdge = containerRect.left + timeAxisWidthRef.current;
      const cursorInGrid = e.clientX - gridLeftEdge;
      const columnIndex = clamp(
        Math.floor(cursorInGrid / colWidth),
        0,
        visibleDays.length - 1,
      );
      const targetDay = visibleDays[columnIndex];

      // Unified anchor model: anchor is the opposite end of the grabbed edge
      const anchorDate =
        resize.edge === "bottom"
          ? resize.originalStartDate
          : resize.originalEndDate;
      const anchorMinutes =
        resize.edge === "bottom"
          ? resize.originalStartMinutes
          : resize.originalEndMinutes;

      const cursorTimestamp = targetDay.getTime() + snappedMinutes * 60000;
      const anchorTimestamp = anchorDate.getTime() + anchorMinutes * 60000;

      let effectiveEdge: "top" | "bottom";

      if (cursorTimestamp > anchorTimestamp) {
        // Cursor is after anchor → effective bottom
        effectiveEdge = "bottom";
        startDate = anchorDate;
        newStartMinutes = anchorMinutes;
        endDate = targetDay;
        newEndMinutes = clamp(snappedMinutes, 0, 1440);

        // Cross-day edge case: cursor at minute 0 on day right after anchor → treat as end-of-anchor-day
        if (!isSameDay(targetDay, anchorDate)) {
          const dayAfterAnchor = new Date(anchorDate);
          dayAfterAnchor.setDate(dayAfterAnchor.getDate() + 1);
          dayAfterAnchor.setHours(0, 0, 0, 0);

          if (isSameDay(targetDay, dayAfterAnchor) && snappedMinutes === 0) {
            newEndMinutes = 1440;
            endDate = anchorDate;
          }
        }

        // Same-day: enforce min duration
        if (isSameDay(startDate, endDate)) {
          newEndMinutes = clamp(
            newEndMinutes,
            anchorMinutes + MIN_DURATION_MINUTES,
            1440,
          );
        }
      } else if (cursorTimestamp < anchorTimestamp) {
        // Cursor is before anchor → effective top
        effectiveEdge = "top";
        endDate = anchorDate;
        newEndMinutes = anchorMinutes;
        startDate = targetDay;
        newStartMinutes = clamp(snappedMinutes, 0, 1440);

        // Cross-day edge case: cursor at minute 1440 on day right before anchor → treat as start-of-anchor-day
        if (!isSameDay(targetDay, anchorDate)) {
          const dayBeforeAnchor = new Date(anchorDate);
          dayBeforeAnchor.setDate(dayBeforeAnchor.getDate() - 1);
          dayBeforeAnchor.setHours(0, 0, 0, 0);

          if (isSameDay(targetDay, dayBeforeAnchor) && snappedMinutes >= 1440) {
            newStartMinutes = 0;
            startDate = anchorDate;
          }
        }

        // Same-day: enforce min duration
        if (isSameDay(startDate, endDate)) {
          newStartMinutes = clamp(
            newStartMinutes,
            0,
            anchorMinutes - MIN_DURATION_MINUTES,
          );
        }
      } else {
        // Cursor at anchor → keep minimum duration in original edge direction (no flip)
        effectiveEdge = resize.edge;
        if (resize.edge === "bottom") {
          startDate = anchorDate;
          newStartMinutes = anchorMinutes;
          endDate = anchorDate;
          newEndMinutes = anchorMinutes + MIN_DURATION_MINUTES;
        } else {
          endDate = anchorDate;
          newEndMinutes = anchorMinutes;
          startDate = anchorDate;
          newStartMinutes = anchorMinutes - MIN_DURATION_MINUTES;
        }
      }

      const currentStart = addMinutesToDate(startDate, newStartMinutes);
      const currentEnd = addMinutesToDate(endDate, newEndMinutes);

      setResizeState({
        eventId: resize.eventId,
        event: resize.event,
        originalStart: resize.event.start,
        originalEnd: resize.event.end,
        currentStart,
        currentEnd,
        edge: resize.edge,
        effectiveEdge,
        isResizing: true,
        currentEndDate: endDate,
        currentStartDate: startDate,
      });

      // Auto-scroll at top/bottom edges
      const cursorYInContainer = e.clientY - containerRect.top;
      const containerHeight = containerRect.height;

      if (cursorYInContainer < AUTO_SCROLL_ZONE_PX) {
        const dist = cursorYInContainer;
        autoScrollSpeedRef.current =
          -AUTO_SCROLL_MAX_SPEED * (1 - dist / AUTO_SCROLL_ZONE_PX);
        startAutoScrollLoop();
      } else if (cursorYInContainer > containerHeight - AUTO_SCROLL_ZONE_PX) {
        const dist = containerHeight - cursorYInContainer;
        autoScrollSpeedRef.current =
          AUTO_SCROLL_MAX_SPEED * (1 - dist / AUTO_SCROLL_ZONE_PX);
        startAutoScrollLoop();
      } else {
        cancelAutoScroll();
      }

      // Edge-of-view week navigation
      const cursorXInGrid = e.clientX - gridLeftEdge;
      const gridWidth = colWidth * visibleDays.length;

      if (cursorXInGrid < EDGE_ZONE_PX) {
        scheduleEdgeNav(-7);
      } else if (cursorXInGrid > gridWidth - EDGE_ZONE_PX) {
        scheduleEdgeNav(7);
      } else {
        cancelEdgeNav();
      }
    };

    handleMouseUpRef.current = () => {
      const resize = resizeRef.current;
      if (!resize) return;

      cleanup();

      if (resize.isResizing) {
        setResizeState((prev) => {
          if (!prev) return null;

          const event = eventsRef.current.find((e) => e.id === resize.eventId);
          if (!event) return null;

          const MS_IN_24H = 24 * 60 * 60 * 1000;
          const isLongerThan24h =
            prev.currentEnd.getTime() - prev.currentStart.getTime() > MS_IN_24H;

          onEventChangeRef.current?.({
            ...event,
            start: prev.currentStart,
            end: prev.currentEnd,
            isAllDay: isLongerThan24h,
          });

          return null;
        });
      } else {
        setResizeState(null);
      }

      resizeRef.current = null;
    };
  }, [
    scrollContainerRef,
    cleanup,
    cancelAutoScroll,
    startAutoScrollLoop,
    scheduleEdgeNav,
    cancelEdgeNav,
  ]);

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, event: CalendarEvent, edge: "top" | "bottom") => {
      if (e.button !== 0) return;

      e.stopPropagation();

      onEventClickRef.current?.(event);

      const originalStartMinutes =
        event.start.getHours() * 60 + event.start.getMinutes();
      const originalEndMinutes =
        event.end.getHours() * 60 + event.end.getMinutes();

      const originalStartDate = startOfDay(event.start);
      const originalEndDate = startOfDay(event.end);

      resizeRef.current = {
        eventId: event.id,
        event,
        edge,
        startClientY: e.clientY,
        isResizing: false,
        originalStartMinutes,
        originalEndMinutes,
        originalStartDate,
        originalEndDate,
      };

      setResizeState({
        eventId: event.id,
        event,
        originalStart: event.start,
        originalEnd: event.end,
        currentStart: event.start,
        currentEnd: event.end,
        edge,
        effectiveEdge: edge,
        isResizing: false,
        currentEndDate: originalEndDate,
        currentStartDate: originalStartDate,
      });

      if (handleMouseMoveRef.current) {
        window.addEventListener("mousemove", handleMouseMoveRef.current);
      }
      if (handleMouseUpRef.current) {
        window.addEventListener("mouseup", handleMouseUpRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { resizeState, handleResizeMouseDown };
}
