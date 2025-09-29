"use client";

import NotificationsPopover, {
  Notification,
} from "@/registry/ruixenui/notifications-popover";

export default function NotificationsPopoverDemo() {
  const demoNotifications: Notification[] = [
    {
      id: 1,
      type: "message",
      message: "New message from Alice",
      timestamp: "Just now",
    },
    {
      id: 2,
      type: "alert",
      message: "Server backup failed",
      timestamp: "5m ago",
    },
    {
      id: 3,
      type: "success",
      message: "Database restored successfully",
      timestamp: "10m ago",
      read: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 space-y-6">
      <h1 className="text-2xl font-bold">NotificationsPopover Demo</h1>

      <NotificationsPopover notifications={demoNotifications} />

      <p className="text-gray-500 text-sm">
        Click the bell icon to see unread notifications. Read notifications
        appear faded.
      </p>
    </div>
  );
}
