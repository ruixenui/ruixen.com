"use client";

import * as React from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface NotificationsProps {
  items?: NotificationItem[];
  placement?: "top" | "bottom" | "left" | "right";
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "🎉 Welcome",
    description: "Thanks for checking out the carousel notifications!",
    time: "just now",
  },
  {
    id: "2",
    title: "⚡ System Update",
    description: "A new feature has been rolled out to your account.",
    time: "1h ago",
  },
  {
    id: "3",
    title: "⏰ Reminder",
    description: "Don’t forget to complete your profile setup.",
    time: "3h ago",
  },
  {
    id: "4",
    title: "📊 Weekly Report",
    description: "Your weekly report is now available.",
    time: "1d ago",
  },
];

export default function NotificationsCarousel({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsProps) {
  const [index, setIndex] = React.useState(0);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);

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

      <PopoverContent
        side={placement}
        align="center"
        className="w-80 p-0 flex flex-col items-center"
      >
        {items.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No notifications
          </div>
        ) : (
          <div className="relative flex items-center w-full">
            {/* Prev button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 z-10"
              onClick={prev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Notification card */}
            <Card className="w-full mx-8 p-4 flex flex-col items-start text-left transition-all duration-300 shadow-none border-0">
              <div className="flex justify-between w-full items-center mb-2">
                <span className="font-medium text-sm">
                  {items[index].title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {items[index].time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {items[index].description}
              </p>
            </Card>

            {/* Next button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 z-10"
              onClick={next}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
