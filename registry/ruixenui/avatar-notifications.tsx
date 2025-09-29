"use client";

import * as React from "react";
import { Bell, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  user: string;
  avatarUrl?: string;
  message: string;
  time: string;
}

interface NotificationsProps {
  items?: NotificationItem[];
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    user: "Alice",
    avatarUrl: "https://i.pravatar.cc/40?img=1",
    message: "Sent you a message.",
    time: "2m ago",
  },
  {
    id: "2",
    user: "Bob",
    avatarUrl: "https://i.pravatar.cc/40?img=2",
    message: "Commented on your post.",
    time: "10m ago",
  },
];

export default function AvatarNotifications({
  items = defaultNotifications,
}: NotificationsProps) {
  const [notifications, setNotifications] = React.useState(items);

  const clearAll = () => {
    setNotifications([]);
  };

  const hasNotifications = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted focus:outline-none border rounded">
          <Bell className="h-5 w-5" />
          {/* Blinking / static status dot */}
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
              hasNotifications ? "bg-green-500 animate-ping" : "bg-gray-400",
            )}
          />
        </button>
      </PopoverTrigger>
      {/* Align popover to the center of the icon */}
      <PopoverContent className="w-80 p-0" side="bottom" align="center">
        <div className="max-h-80 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <h2 className="text-sm font-medium">Notifications</h2>
            {hasNotifications && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearAll}
                className="h-6 w-6 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No messages
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50 transition"
                >
                  <Avatar className="h-8 w-8">
                    {item.avatarUrl ? (
                      <AvatarImage src={item.avatarUrl} alt={item.user} />
                    ) : (
                      <AvatarFallback>{item.user[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">{item.user}</span>
                    <span className="text-muted-foreground text-xs">
                      {item.message}
                    </span>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
