"use client";

import * as React from "react";
import {
  BellRing,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Notification {
  id: number;
  type: "message" | "alert" | "success";
  message: string;
  timestamp?: string;
  read?: boolean;
}

interface NotificationsPopoverProps {
  notifications?: Notification[];
  icon?: React.ReactNode;
  maxHeight?: string;
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    type: "message",
    message: "New message from John",
    timestamp: "2m ago",
  },
  {
    id: 2,
    type: "success",
    message: "Report generated successfully",
    timestamp: "10m ago",
  },
  {
    id: 3,
    type: "alert",
    message: "Server downtime scheduled",
    timestamp: "1h ago",
  },
];

export default function NotificationsPopover({
  notifications = defaultNotifications,
  icon,
  maxHeight = "64",
}: NotificationsPopoverProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <BellRing className="w-5 h-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 rounded-full border hover:border-gray-200 hover:bg-gray-100 inline-flex items-center justify-center">
        {icon || <BellRing className="w-5 h-5 text-gray-700" />}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="center"
        className={`w-96 bg-white border border-gray-200 rounded-md shadow-lg max-h-${maxHeight} overflow-y-auto divide-y divide-gray-100`}
      >
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-gray-400 cursor-default">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={`flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                n.read ? "opacity-70" : "font-medium"
              }`}
            >
              <div>{getIcon(n.type)}</div>
              <div className="flex flex-col">
                <span>{n.message}</span>
                {n.timestamp && (
                  <span className="text-xs text-gray-400 mt-1">
                    {n.timestamp}
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
