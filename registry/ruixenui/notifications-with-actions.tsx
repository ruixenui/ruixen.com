"use client";

import * as React from "react";
import {
  Bell,
  GripVertical,
  Trash2,
  Archive,
  ChevronRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface NotificationsWithActionsProps {
  items?: NotificationItem[];
  placement?: "top" | "right" | "bottom" | "left";
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome 🎉",
    description: "Thanks for checking out the notifications component!",
    time: "just now",
  },
  {
    id: "2",
    title: "System Update",
    description: "We’ve rolled out a new feature for you.",
    time: "1h ago",
  },
  {
    id: "3",
    title: "Reminder",
    description: "Don’t forget to finish your profile setup.",
    time: "3h ago",
  },
];

export default function NotificationsWithActions({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsWithActionsProps) {
  const [notifications, setNotifications] =
    React.useState<NotificationItem[]>(items);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const handleArchive = () => {
    setActiveId(null);
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setActiveId(null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 text-xs px-1.5 py-0"
            >
              {notifications.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="center" side={placement}>
        <Card className="max-h-80 overflow-y-auto rounded-lg border-none shadow-none">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition"
                  >
                    {/* Left text with animation */}
                    <motion.div
                      animate={{ x: isActive ? -40 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>

                    {/* Right side controls */}
                    <div className="ml-2 flex items-center">
                      {isActive ? (
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={handleArchive}
                          >
                            <Archive className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={() => setActiveId(null)}
                          >
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="p-1 rounded-md hover:bg-muted"
                          onClick={() => setActiveId(isActive ? null : item.id)}
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}
