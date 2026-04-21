"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AllDayResizeState,
  CalendarEvent,
} from "@/components/layouts/calendar/week-view-types";

interface UseAllDayResizeOptions {
  days: Date[];
  dayColumnWidth: number;
  allDayContainerRef: React.RefObject<HTMLDivElement | null>;
  events: CalendarEvent[];
  onEventChange?: (event: CalendarEvent) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

interface UseAllDayResizeReturn {
  allDayResizeState: AllDayResizeState | null;
  handleAllDayResizeMouseDown: (
    e: React.MouseEvent,
    event: CalendarEvent,
    edge: "left" | "right" | "move",
    startColumn: number,
    endColumn: number,
  ) => void;
}

const DRAG_THRESHOLD_PX = 4;

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

interface ResizeInfo {
  eventId: string;
  event: CalendarEvent;
  edge: "left" | "right" | "move";
  startClientX: number;
  isResizing: boolean;
  originalStartColumn: number;
  originalEndColumn: number;
  /** Column index at the initial mousedown position (used for move delta) */
  startColumnIndex: number;
  /** Offset from cursor to event left edge at mousedown (px) */
  cursorOffsetX: number;
  /** Offset from cursor to event top edge at mousedown (px) */
  cursorOffsetY: number;
}

export function useAllDayResize({
  days,
  dayColumnWidth,
  allDayContainerRef,
  events,
  onEventChange,
  onEventClick,
}: UseAllDayResizeOptions): UseAllDayResizeReturn {
  const [allDayResizeState, setAllDayResizeState] =
    useState<AllDayResizeState | null>(null);

  const resizeRef = useRef<ResizeInfo | null>(null);
  const onEventChangeRef = useRef(onEventChange);
  const onEventClickRef = useRef(onEventClick);
  const eventsRef = useRef(events);
  const daysRef = useRef(days);
  const dayColumnWidthRef = useRef(dayColumnWidth);

  useEffect(() => {
    onEventChangeRef.current = onEventChange;
  }, [onEventChange]);
  useEffect(() => {
    onEventClickRef.current = onEventClick;
  }, [onEventClick]);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);
  useEffect(() => {
    daysRef.current = days;
  }, [days]);
  useEffect(() => {
    dayColumnWidthRef.current = dayColumnWidth;
  }, [dayColumnWidth]);

  const handleMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const handleMouseUpRef = useRef<(() => void) | null>(null);

  const cleanup = useCallback(() => {
    if (handleMouseMoveRef.current) {
      window.removeEventListener("mousemove", handleMouseMoveRef.current);
    }
    if (handleMouseUpRef.current) {
      window.removeEventListener("mouseup", handleMouseUpRef.current);
    }
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    handleMouseMoveRef.current = (e: MouseEvent) => {
      const resize = resizeRef.current;
      if (!resize) return;

      const deltaX = Math.abs(e.clientX - resize.startClientX);
      if (!resize.isResizing && deltaX < DRAG_THRESHOLD_PX) return;

      if (!resize.isResizing) {
        resize.isResizing = true;
        document.body.style.cursor =
          resize.edge === "move" ? "grabbing" : "col-resize";
      }

      const container = allDayContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const colWidth = dayColumnWidthRef.current;
      const currentDays = daysRef.current;
      const columnIndex = clamp(
        Math.floor((e.clientX - rect.left) / colWidth),
        0,
        currentDays.length - 1,
      );

      let newStartColumn = resize.originalStartColumn;
      let newEndColumn = resize.originalEndColumn;

      if (resize.edge === "move") {
        const span = resize.originalEndColumn - resize.originalStartColumn;
        const delta = columnIndex - resize.startColumnIndex;
        newStartColumn = clamp(
          resize.originalStartColumn + delta,
          0,
          currentDays.length - 1 - span,
        );
        newEndColumn = newStartColumn + span;
      } else if (resize.edge === "right") {
        newEndColumn = Math.max(columnIndex, resize.originalStartColumn);
      } else {
        newStartColumn = Math.min(columnIndex, resize.originalEndColumn);
      }

      setAllDayResizeState({
        eventId: resize.eventId,
        event: resize.event,
        originalStartColumn: resize.originalStartColumn,
        originalEndColumn: resize.originalEndColumn,
        currentStartColumn: newStartColumn,
        currentEndColumn: newEndColumn,
        edge: resize.edge,
        isResizing: true,
        ...(resize.edge === "move"
          ? {
              clientX: e.clientX,
              clientY: e.clientY,
              cursorOffsetX: resize.cursorOffsetX,
              cursorOffsetY: resize.cursorOffsetY,
            }
          : {}),
      });
    };

    handleMouseUpRef.current = () => {
      const resize = resizeRef.current;
      if (!resize) return;

      cleanup();

      if (resize.isResizing) {
        setAllDayResizeState((prev) => {
          if (!prev) return null;

          const event = eventsRef.current.find((e) => e.id === resize.eventId);
          if (!event) return null;

          const currentDays = daysRef.current;
          const newStartDate = currentDays[prev.currentStartColumn];
          const newEndDate = currentDays[prev.currentEndColumn];

          if (!newStartDate || !newEndDate) return null;

          // Preserve time-of-day from original event
          const newStart = new Date(newStartDate);
          newStart.setHours(
            event.start.getHours(),
            event.start.getMinutes(),
            event.start.getSeconds(),
            event.start.getMilliseconds(),
          );

          const newEnd = new Date(newEndDate);
          newEnd.setHours(
            event.end.getHours(),
            event.end.getMinutes(),
            event.end.getSeconds(),
            event.end.getMilliseconds(),
          );

          // Move preserves the original isAllDay flag (duration unchanged).
          // Resize determines isAllDay by whether the span exceeds 24h.
          const isMove = resize.edge === "move";
          const MS_IN_24H = 24 * 60 * 60 * 1000;
          const isLongerThan24h =
            newEnd.getTime() - newStart.getTime() > MS_IN_24H;
          const isAllDay = isMove ? event.isAllDay === true : isLongerThan24h;

          onEventChangeRef.current?.({
            ...event,
            start: newStart,
            end: newEnd,
            isAllDay,
          });

          return null;
        });
      } else {
        setAllDayResizeState(null);
      }

      resizeRef.current = null;
    };
  }, [allDayContainerRef, cleanup]);

  const handleAllDayResizeMouseDown = useCallback(
    (
      e: React.MouseEvent,
      event: CalendarEvent,
      edge: "left" | "right" | "move",
      startColumn: number,
      endColumn: number,
    ) => {
      if (e.button !== 0) return;

      e.stopPropagation();

      onEventClickRef.current?.(event);

      // Compute the column under the cursor at mousedown for move delta
      const container = allDayContainerRef.current;
      let startColumnIndex = startColumn;
      let cursorOffsetX = 0;
      const cursorOffsetY = 0;
      if (container) {
        const rect = container.getBoundingClientRect();
        const colWidth = dayColumnWidthRef.current;
        startColumnIndex = clamp(
          Math.floor((e.clientX - rect.left) / colWidth),
          0,
          daysRef.current.length - 1,
        );
        // Compute offset from cursor to the event element's top-left
        const eventLeft = rect.left + startColumn * colWidth;
        cursorOffsetX = e.clientX - eventLeft;
      }

      resizeRef.current = {
        eventId: event.id,
        event,
        edge,
        startClientX: e.clientX,
        isResizing: false,
        originalStartColumn: startColumn,
        originalEndColumn: endColumn,
        startColumnIndex,
        cursorOffsetX,
        cursorOffsetY,
      };

      setAllDayResizeState({
        eventId: event.id,
        event,
        originalStartColumn: startColumn,
        originalEndColumn: endColumn,
        currentStartColumn: startColumn,
        currentEndColumn: endColumn,
        edge,
        isResizing: false,
      });

      if (handleMouseMoveRef.current) {
        window.addEventListener("mousemove", handleMouseMoveRef.current);
      }
      if (handleMouseUpRef.current) {
        window.addEventListener("mouseup", handleMouseUpRef.current);
      }
    },
    [allDayContainerRef],
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { allDayResizeState, handleAllDayResizeMouseDown };
}
