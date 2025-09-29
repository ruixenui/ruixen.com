import * as React from "react";
import { Bell, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Type definition for reusability
export interface NotificationItem {
  id: string;
  message: string;
  time: string;
  type?: "info" | "link" | "default"; // restrict to these string literals
  href?: string;
}

interface NotificationsProps {
  items?: NotificationItem[];
}

// Default notifications
const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    message: "Welcome to the platform 🎉",
    time: "just now",
    type: "default",
  },
  {
    id: "2",
    message: "Check out our new documentation section",
    time: "10m ago",
    type: "link",
    href: "/docs",
  },
  {
    id: "3",
    message: "System maintenance scheduled for tonight",
    time: "2h ago",
    type: "info",
  },
];

export default function NotificationsAlt({
  items = defaultNotifications,
}: NotificationsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          {items.length > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 text-xs px-1.5 py-0"
            >
              {items.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0" align="center" side="bottom">
        <Card className="max-h-80 overflow-y-auto rounded-lg border-none shadow-none">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 flex gap-3 hover:bg-muted/50 transition"
                >
                  {item.type === "info" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Important Information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}

                  <div className="flex-1">
                    {item.type === "link" && item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {item.message}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium">{item.message}</p>
                    )}
                    <span className="block text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}
