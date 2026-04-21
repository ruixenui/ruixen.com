"use client";

import * as React from "react";
import { ChevronRight, Eye, EyeOff, Rss } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  CalendarAccount,
  CalendarColor,
} from "@/components/layouts/calendar/sidebar-right";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const colorStyles: Record<CalendarColor, string> = {
  red: "bg-event-red",
  orange: "bg-event-orange",
  yellow: "bg-event-yellow",
  green: "bg-event-green",
  blue: "bg-event-blue",
  purple: "bg-event-purple",
  gray: "bg-event-gray",
};

interface CalendarsProps {
  accounts: CalendarAccount[];
}

export function Calendars({ accounts }: CalendarsProps) {
  const [visibleCalendars, setVisibleCalendars] = React.useState<Set<string>>(
    () => {
      const visible = new Set<string>();
      for (const account of accounts) {
        for (const calendar of account.calendars) {
          if (calendar.visible) {
            visible.add(`${account.email}-${calendar.name}`);
          }
        }
      }
      return visible;
    },
  );

  const toggleVisibility = (accountEmail: string, calendarName: string) => {
    const key = `${accountEmail}-${calendarName}`;
    setVisibleCalendars((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      {accounts.map((account, index) => (
        <React.Fragment key={account.email}>
          <SidebarGroup className="py-0">
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-xs"
              >
                <CollapsibleTrigger>
                  <span className="truncate">{account.email}</span>
                  <ChevronRight className="ml-auto shrink-0 opacity-0 transition-transform group-hover/label:opacity-100 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0">
                    {account.calendars.map((calendar) => {
                      const isVisible = visibleCalendars.has(
                        `${account.email}-${calendar.name}`,
                      );
                      return (
                        <SidebarMenuItem
                          key={calendar.name}
                          className="group/calendar-item"
                        >
                          <SidebarMenuButton className="pr-1">
                            <div
                              className={cn(
                                "size-3 shrink-0 flex items-center justify-center rounded-xs",
                                colorStyles[calendar.color],
                                !isVisible && "opacity-40",
                              )}
                            >
                              {calendar.isSubscribed && (
                                <Rss className="size-2 text-white" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "flex-1 truncate text-xs text-sidebar-foreground",
                                !isVisible && "opacity-50",
                              )}
                            >
                              {calendar.name}
                            </span>
                            <span
                              role="button"
                              tabIndex={0}
                              className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm opacity-0 hover:bg-sidebar-accent group-hover/calendar-item:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVisibility(account.email, calendar.name);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleVisibility(
                                    account.email,
                                    calendar.name,
                                  );
                                }
                              }}
                            >
                              {isVisible ? (
                                <Eye className="size-3.5 text-sidebar-muted-foreground" />
                              ) : (
                                <EyeOff className="size-3.5 text-sidebar-muted-foreground" />
                              )}
                            </span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          {index < accounts.length - 1 && <SidebarSeparator className="mx-0" />}
        </React.Fragment>
      ))}
    </>
  );
}
