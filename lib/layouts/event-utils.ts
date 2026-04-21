import {
  isSameDay,
  startOfDay,
  addDays,
  differenceInMinutes,
  isWithinInterval,
  areIntervalsOverlapping,
} from "date-fns";
import type {
  CalendarEvent,
  PositionedEvent,
  WeekDay,
} from "@/components/layouts/calendar/week-view-types";

/** Returns true when a timed event spans across midnight into a different day. */
export function isMultiDayEvent(event: CalendarEvent): boolean {
  if (event.isAllDay) {
    return false;
  }
  return !isSameDay(event.start, event.end);
}

/**
 * Filters events for a specific day (excluding all-day and multi-day events)
 */
export function getEventsForDay(
  events: CalendarEvent[],
  day: WeekDay,
): CalendarEvent[] {
  const dayStart = startOfDay(day.date);
  const dayEnd = addDays(dayStart, 1);

  return events.filter((event) => {
    if (event.isAllDay || isMultiDayEvent(event)) {
      return false;
    }
    // Event spans this day if it starts before day end AND ends after day start
    return event.start < dayEnd && event.end > dayStart;
  });
}

/**
 * Gets all-day events that span a specific day
 */
export function getAllDayEventsForDay(
  events: CalendarEvent[],
  day: WeekDay,
): CalendarEvent[] {
  return events.filter((event) => {
    if (!event.isAllDay) {
      return false;
    }
    const dayStart = startOfDay(day.date);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    return (
      isWithinInterval(dayStart, { start: event.start, end: event.end }) ||
      isSameDay(event.start, day.date) ||
      isSameDay(event.end, day.date)
    );
  });
}

/**
 * Checks if two events overlap in time
 */
function eventsOverlap(a: CalendarEvent, b: CalendarEvent): boolean {
  return areIntervalsOverlapping(
    { start: a.start, end: a.end },
    { start: b.start, end: b.end },
  );
}

/**
 * Groups overlapping events into columns
 */
function assignColumns(
  events: CalendarEvent[],
): Map<string, { column: number; totalColumns: number }> {
  const columnAssignments = new Map<
    string,
    { column: number; totalColumns: number }
  >();

  if (events.length === 0) {
    return columnAssignments;
  }

  // Sort events by start time, then by duration (longer first)
  const sortedEvents = [...events].sort((a, b) => {
    const startDiff = a.start.getTime() - b.start.getTime();
    if (startDiff !== 0) {
      return startDiff;
    }
    // Longer events first
    const durationA = a.end.getTime() - a.start.getTime();
    const durationB = b.end.getTime() - b.start.getTime();
    return durationB - durationA;
  });

  // Find groups of overlapping events
  const groups: CalendarEvent[][] = [];
  const processed = new Set<string>();

  for (const event of sortedEvents) {
    if (processed.has(event.id)) {
      continue;
    }

    const group: CalendarEvent[] = [event];
    processed.add(event.id);

    // Find all events that overlap with any event in the group
    let foundNew = true;
    while (foundNew) {
      foundNew = false;
      for (const otherEvent of sortedEvents) {
        if (processed.has(otherEvent.id)) {
          continue;
        }
        const overlapsWithGroup = group.some((groupEvent) =>
          eventsOverlap(groupEvent, otherEvent),
        );
        if (!overlapsWithGroup) {
          continue;
        }
        group.push(otherEvent);
        processed.add(otherEvent.id);
        foundNew = true;
      }
    }

    groups.push(group);
  }

  // Assign columns within each group
  for (const group of groups) {
    const columns: CalendarEvent[][] = [];

    // Sort group by start time
    group.sort((a, b) => a.start.getTime() - b.start.getTime());

    for (const event of group) {
      // Find the first column where this event doesn't overlap with existing events
      let placed = false;
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        const column = columns[colIndex];
        const overlapsWithColumn = column.some((colEvent) =>
          eventsOverlap(colEvent, event),
        );
        if (overlapsWithColumn) {
          continue;
        }
        column.push(event);
        columnAssignments.set(event.id, { column: colIndex, totalColumns: 0 });
        placed = true;
        break;
      }

      if (placed) {
        continue;
      }

      // Create new column
      columns.push([event]);
      columnAssignments.set(event.id, {
        column: columns.length - 1,
        totalColumns: 0,
      });
    }

    // Update total columns for all events in group
    const totalColumns = columns.length;
    for (const event of group) {
      const assignment = columnAssignments.get(event.id);
      if (!assignment) {
        continue;
      }
      assignment.totalColumns = totalColumns;
    }
  }

  return columnAssignments;
}

/**
 * Calculates positioned events for rendering in the grid.
 * @param rightGapPercent - right gap in percentage. Defaults to 8.
 *   Pass 0 for day view so events fill the full column width.
 */
export function calculatePositionedEvents(
  events: CalendarEvent[],
  day: WeekDay,
  rightGapPercent = 8,
): PositionedEvent[] {
  const dayEvents = getEventsForDay(events, day);

  if (dayEvents.length === 0) {
    return [];
  }

  const columnAssignments = assignColumns(dayEvents);
  const dayStart = startOfDay(day.date);

  const nextDayMidnight = addDays(dayStart, 1);

  return dayEvents.map((event) => {
    const assignment = columnAssignments.get(event.id) ?? {
      column: 0,
      totalColumns: 1,
    };

    // Compute effective start/end clamped to this day's boundaries
    const effectiveStart = event.start > dayStart ? event.start : dayStart;
    const effectiveEnd =
      event.end < nextDayMidnight ? event.end : nextDayMidnight;

    // Calculate top position (percentage from day start)
    const minutesFromDayStart = differenceInMinutes(effectiveStart, dayStart);
    const top = (minutesFromDayStart / (24 * 60)) * 100;

    // Calculate height (percentage of the day)
    const durationMinutes = differenceInMinutes(effectiveEnd, effectiveStart);
    const height = (durationMinutes / (24 * 60)) * 100;

    // Determine segment position for multi-day events
    const startsOnDay = isSameDay(event.start, dayStart);
    const endsOnDay = event.end <= nextDayMidnight;
    let segmentPosition: "start" | "middle" | "end" | "full" = "full";
    if (startsOnDay && !endsOnDay) {
      segmentPosition = "start";
    } else if (!startsOnDay && endsOnDay) {
      segmentPosition = "end";
    } else if (!startsOnDay && !endsOnDay) {
      segmentPosition = "middle";
    }

    // Calculate left and width based on column assignment
    // Events cascade with overlap - leftmost event has no gap, rightmost has gap
    const rightGap = rightGapPercent;
    const overlapAmount = 8; // percentage overlap between adjacent events
    const { column, totalColumns } = assignment;

    let left: number;
    let width: number;

    if (totalColumns === 1) {
      // Single event: full width with right gap
      left = 0;
      width = 100 - rightGap;
    } else {
      // Multiple overlapping events
      // Formula: n * eventWidth - (n-1) * overlap = availableWidth
      // So: eventWidth = (availableWidth + (n-1) * overlap) / n
      const eventWidth =
        (100 - rightGap + overlapAmount * (totalColumns - 1)) / totalColumns;

      left = column * (eventWidth - overlapAmount);

      if (column === totalColumns - 1) {
        // Last event: fill to end (has the right gap)
        width = 100 - rightGap - left;
      } else {
        // Other events extend under the next one (no gap)
        width = eventWidth;
      }
    }

    return {
      event,
      top,
      height,
      left,
      width,
      column: assignment.column,
      totalColumns: assignment.totalColumns,
      segmentPosition,
    };
  });
}

/**
 * Groups all-day events by their visual row (for stacking)
 */
export interface AllDayEventRow {
  event: CalendarEvent;
  startColumn: number;
  endColumn: number;
  row: number;
}

export function calculateAllDayEventRows(
  events: CalendarEvent[],
  days: WeekDay[],
): AllDayEventRow[] {
  const allDayEvents = events.filter((e) => e.isAllDay || isMultiDayEvent(e));

  if (allDayEvents.length === 0) {
    return [];
  }

  // Sort by start date, then by duration (longer first)
  const sortedEvents = [...allDayEvents].sort((a, b) => {
    const startDiff = a.start.getTime() - b.start.getTime();
    if (startDiff !== 0) {
      return startDiff;
    }
    const durationA = a.end.getTime() - a.start.getTime();
    const durationB = b.end.getTime() - b.start.getTime();
    return durationB - durationA;
  });

  const rows: AllDayEventRow[] = [];
  const occupiedRows: Map<number, { start: number; end: number }[]> = new Map();

  for (const event of sortedEvents) {
    // Find start and end columns
    let startColumn = -1;
    let endColumn = -1;

    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const dayStart = startOfDay(day.date);

      if (
        isSameDay(event.start, day.date) ||
        (event.start <= dayStart && event.end >= dayStart)
      ) {
        if (startColumn === -1) {
          startColumn = i;
        }
        endColumn = i;
      }
    }

    if (startColumn === -1) {
      continue;
    }

    // Find the first row where this event fits
    let targetRow = 0;
    let foundRow = false;

    while (!foundRow) {
      const rowOccupied = occupiedRows.get(targetRow) ?? [];
      const hasConflict = rowOccupied.some(
        (occupied) =>
          !(endColumn < occupied.start || startColumn > occupied.end),
      );

      if (!hasConflict) {
        foundRow = true;
        break;
      }

      targetRow++;
    }

    // Mark the row as occupied
    const rowOccupied = occupiedRows.get(targetRow) ?? [];
    rowOccupied.push({ start: startColumn, end: endColumn });
    occupiedRows.set(targetRow, rowOccupied);

    rows.push({
      event,
      startColumn,
      endColumn,
      row: targetRow,
    });
  }

  return rows;
}
