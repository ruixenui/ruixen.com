"use client";

import * as React from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  List,
  PanelsTopLeft,
  Info,
  AlertCircle,
  Calendar,
} from "lucide-react";
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
  icon: React.ReactNode;
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
    icon: <Info className="h-4 w-4" />,
    title: "Welcome",
    description: "Thanks for checking out notifications.",
    time: "just now",
  },
  {
    id: "2",
    icon: <AlertCircle className="h-4 w-4" />,
    title: "System Update",
    description: "A new feature has been rolled out.",
    time: "1h ago",
  },
  {
    id: "3",
    icon: <Calendar className="h-4 w-4" />,
    title: "Reminder",
    description: "Complete your profile setup.",
    time: "3h ago",
  },
];

export default function NotificationsToggle({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsProps) {
  const [index, setIndex] = React.useState(0);
  const [isCarousel, setIsCarousel] = React.useState(true);

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

      <PopoverContent side={placement} align="center" className="w-80 p-0">
        {/* Header with toggle */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-sm font-medium">Notifications</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCarousel((prev) => !prev)}
          >
            {isCarousel ? (
              <List className="h-4 w-4" />
            ) : (
              <PanelsTopLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No notifications
          </div>
        ) : isCarousel ? (
          // Carousel view
          <div className="relative flex items-center w-full py-4">
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
              <div className="flex items-center gap-2 mb-2 w-full justify-between">
                <div className="flex items-center gap-2">
                  {items[index].icon}
                  <span className="font-medium text-sm">
                    {items[index].title}
                  </span>
                </div>
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
        ) : (
          // Vertical list view
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {items.map((item) => (
              <div key={item.id} className="p-4 hover:bg-muted/50 transition">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
