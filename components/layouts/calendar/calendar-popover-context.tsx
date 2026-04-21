"use client";

import * as React from "react";

import type { ViewType } from "./week-view-types";

/**
 * Context to provide the collision boundary element, header inset,
 * and current view type for event detail popovers.
 * - boundary: the outer calendar container (so popovers can position freely)
 * - headerHeight: the height of the weekday header + all-day row,
 *   used as top collision padding so popovers never overlap the header.
 * - view: current calendar view ("day" | "week") — in day view, the collision
 *   boundary is skipped so Radix uses the viewport for positioning.
 * - boundaryRight: the right-edge x-coordinate (in viewport px) of the
 *   calendar boundary. Used in day view to place a fixed-position popover
 *   anchor at the calendar's right edge so popovers match Notion Calendar.
 */

interface CalendarPopoverBoundaryValue {
  boundary: HTMLElement | null;
  headerHeight: number;
  view: ViewType;
  /** Right edge of the calendar boundary in viewport pixels. */
  boundaryRight: number;
  /**
   * Bottom edge of the header (weekday + all-day row) in viewport pixels.
   * Used as collision padding top in day view so the popover never overlaps
   * the header area when the collision boundary is the viewport.
   */
  headerBottom: number;
}

const CalendarPopoverBoundaryContext =
  React.createContext<CalendarPopoverBoundaryValue>({
    boundary: null,
    headerHeight: 0,
    view: "week",
    boundaryRight: 0,
    headerBottom: 0,
  });

export function CalendarPopoverBoundaryProvider({
  boundaryRef,
  headerRef,
  view = "week",
  children,
}: {
  boundaryRef: React.RefObject<HTMLElement | null>;
  headerRef: React.RefObject<HTMLElement | null>;
  view?: ViewType;
  children: React.ReactNode;
}) {
  const [boundary, setBoundary] = React.useState<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [boundaryRight, setBoundaryRight] = React.useState(0);
  const [headerBottom, setHeaderBottom] = React.useState(0);

  React.useEffect(() => {
    setBoundary(boundaryRef.current);
  }, [boundaryRef]);

  // Observe header height changes (all-day row can expand/collapse).
  // Also track the viewport-relative bottom edge of the header for day-view
  // collision padding — the popover must not overlap the header area.
  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => {
      setHeaderHeight(el.offsetHeight);
      setHeaderBottom(el.getBoundingClientRect().bottom);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [headerRef]);

  // Track the right edge of the calendar boundary for day-view anchoring.
  // A ResizeObserver catches layout changes; we don't need scroll since the
  // boundary element itself doesn't scroll within the viewport.
  React.useEffect(() => {
    const el = boundaryRef.current;
    if (!el) return;

    const update = () => {
      setBoundaryRight(el.getBoundingClientRect().right);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [boundaryRef]);

  const value = React.useMemo(
    () => ({ boundary, headerHeight, view, boundaryRight, headerBottom }),
    [boundary, headerHeight, view, boundaryRight, headerBottom],
  );

  return (
    <CalendarPopoverBoundaryContext.Provider value={value}>
      {children}
    </CalendarPopoverBoundaryContext.Provider>
  );
}

export function useCalendarPopoverBoundary() {
  return React.useContext(CalendarPopoverBoundaryContext);
}
