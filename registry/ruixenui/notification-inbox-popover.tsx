"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, LucideIcon } from "lucide-react";

export interface Notification {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  unread: boolean;
  icon: LucideIcon;
}

interface NotificationInboxPopoverProps {
  notifications: Notification[];
  triggerLabel?: React.ReactNode;
  popoverWidth?: string;
  onMarkAll?: (notifications: Notification[]) => void;
  onMarkAsRead?: (id: number) => void;
  onViewAll?: () => void;
  tabs?: { value: string; label: string }[];
}

export function NotificationInboxPopover({
  notifications: initialNotifications,
  triggerLabel = <Bell />,
  popoverWidth = "w-[380px]",
  onMarkAll,
  onMarkAsRead,
  onViewAll,
  tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
  ],
}: NotificationInboxPopoverProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [tab, setTab] = useState(tabs[0].value);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const filtered =
    tab === "unread" ? notifications.filter((n) => n.unread) : notifications;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
    onMarkAsRead?.(id);
  };

  const handleMarkAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    onMarkAll?.(notifications);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative"
          aria-label="Open notifications"
        >
          <span>
            <Bell />
          </span>
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${popoverWidth} p-0`}>
        {/* Header with Tabs + Mark All */}
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex items-center justify-between border-b px-3 py-2">
            <TabsList className="bg-transparent">
              {tabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="text-sm">
                  {t.label}
                  {t.value === "unread" && unreadCount > 0 && (
                    <Badge className="ml-1">{unreadCount}</Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                className="text-xs font-medium text-muted-foreground hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              filtered.map((n) => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    onClick={() => handleMarkAsRead(n.id)}
                    className="flex w-full items-start gap-3 border-b px-3 py-3 text-left hover:bg-accent"
                  >
                    <div className="mt-1 text-muted-foreground">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p
                        className={`text-sm ${
                          n.unread
                            ? "font-semibold text-foreground"
                            : "text-foreground/80"
                        }`}
                      >
                        {n.user} {n.action}{" "}
                        <span className="font-medium">{n.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {n.timestamp}
                      </p>
                    </div>
                    {n.unread && (
                      <span className="mt-1 inline-block size-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </Tabs>
        {/* Footer */}
        <div className="px-3 py-2 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={onViewAll}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
