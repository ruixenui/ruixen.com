"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Copy,
  Monitor,
  SquareDashed,
  TabletSmartphone,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { CalendarEvent, EventColor } from "./week-view-types";

const EVENT_COLORS: EventColor[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "gray",
];

const colorSwatchClass: Record<EventColor, string> = {
  red: "bg-event-red-border",
  orange: "bg-event-orange-border",
  yellow: "bg-event-yellow-border",
  green: "bg-event-green-border",
  blue: "bg-event-blue-border",
  purple: "bg-event-purple-border",
  gray: "bg-event-gray-border",
};

interface CalendarAccountData {
  email: string;
  calendars: { name: string; color: EventColor }[];
}

const CALENDAR_ACCOUNTS: CalendarAccountData[] = [
  {
    email: "you@example.com",
    calendars: [
      { name: "you@example.com", color: "red" },
      { name: "Personal", color: "purple" },
      { name: "Work", color: "blue" },
      { name: "Family", color: "orange" },
      { name: "Side Projects", color: "yellow" },
      { name: "Fitness", color: "green" },
      { name: "Holidays in Brazil", color: "green" },
    ],
  },
];

interface EventContextMenuProps {
  event: CalendarEvent;
  position: { x: number; y: number };
  onClose: () => void;
  onEventChange?: (event: CalendarEvent) => void;
}

function MenuItem({
  className,
  children,
  onSelect,
}: {
  className?: string;
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-none select-none",
        "text-white hover:bg-[#303030] focus:bg-[#303030]",
        className,
      )}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

function Shortcut({ children }: { children: React.ReactNode }) {
  return <span className="ml-auto text-xs text-white/40">{children}</span>;
}

function Separator() {
  return <div className="-mx-1 my-1 h-px bg-[#303030]" />;
}

function SubMenu({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={cn(
          "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-none select-none",
          "text-white hover:bg-[#303030] focus:bg-[#303030]",
          open && "bg-[#303030]",
        )}
      >
        {trigger}
        <svg
          className="ml-auto size-4 text-white/60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-full top-0 ml-1 min-w-[180px] rounded-sm border border-[#303030] bg-[#252525] p-1 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

export function EventContextMenu({
  event,
  position,
  onClose,
  onEventChange,
}: EventContextMenuProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = React.useState(position);
  const [ready, setReady] = React.useState(false);
  const currentColor = event.color ?? "blue";

  React.useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const menuHeight = menu.offsetHeight;
    const menuWidth = menu.offsetWidth;
    let y = position.y;
    let x = position.x;

    if (position.y + menuHeight > window.innerHeight) {
      y = position.y - menuHeight;
    }
    if (position.x + menuWidth > window.innerWidth) {
      x = position.x - menuWidth;
    }

    setAdjustedPos({ x, y });
    setReady(true);
  }, [position]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      onClose();
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      onClose();
    }

    // Use capture to close before other handlers fire
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  function handleColorSelect(color: EventColor) {
    onEventChange?.({ ...event, color });
    onClose();
  }

  function handleCalendarSelect(calendarName: string) {
    onEventChange?.({ ...event, calendarId: calendarName });
    onClose();
  }

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[200px] rounded-sm border border-[#303030] bg-[#252525] p-1 shadow-md animate-in fade-in-0 zoom-in-95"
      style={{
        top: adjustedPos.y,
        left: adjustedPos.x,
        opacity: ready ? 1 : 0,
      }}
    >
      {/* Color selector row */}
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        {EVENT_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={cn(
              "relative flex size-3 items-center justify-center rounded-xs",
              colorSwatchClass[color],
            )}
            onClick={() => handleColorSelect(color)}
          >
            {color === currentColor && <Check className="size-2 text-white" />}
          </button>
        ))}
      </div>

      <Separator />

      {/* Block on calendar */}
      <SubMenu
        trigger={
          <>
            <Monitor className="size-3.5" />
            Block on calendar
          </>
        }
      >
        {CALENDAR_ACCOUNTS.map((account) => (
          <React.Fragment key={account.email}>
            <div className="px-2 py-1 text-[10px] text-white/40">
              {account.email}
            </div>
            {account.calendars.map((cal) => (
              <MenuItem
                key={cal.name}
                onSelect={() => handleCalendarSelect(cal.name)}
              >
                <div
                  className={cn(
                    "size-3 rounded-xs shrink-0",
                    colorSwatchClass[cal.color],
                  )}
                />
                {cal.name}
              </MenuItem>
            ))}
          </React.Fragment>
        ))}
      </SubMenu>

      <Separator />

      {/* Cut / Copy / Duplicate */}
      <MenuItem>
        <SquareDashed className="size-3.5" />
        Cut
        <Shortcut>⌘X</Shortcut>
      </MenuItem>
      <MenuItem>
        <TabletSmartphone className="size-3.5" />
        Copy
        <Shortcut>⌘C</Shortcut>
      </MenuItem>
      <MenuItem>
        <Copy className="size-3.5" />
        Duplicate
        <Shortcut>⌘D</Shortcut>
      </MenuItem>

      <Separator />

      {/* Delete */}
      <MenuItem className="text-[#E56458] hover:!bg-[#DE5551] hover:!text-white focus:!bg-[#DE5551] focus:!text-white [&:hover>svg]:!text-white [&:focus>svg]:!text-white [&:hover>.ml-auto]:!text-white [&:focus>.ml-auto]:!text-white">
        <Trash2 className="size-3.5 text-[#E56458]" />
        Delete
        <Shortcut>delete</Shortcut>
      </MenuItem>
    </div>,
    document.body,
  );
}
