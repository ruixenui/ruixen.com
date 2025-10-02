"use client";

import { NotificationItem } from "@/registry/ruixenui/notification-alt";
import NotificationsAlt from "@/registry/ruixenui/notification-alt";

export default function NotificationsAltDemo() {
  const demoItems: NotificationItem[] = [
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
    {
      id: "4",
      message: "New features added to your dashboard",
      time: "1d ago",
      type: "default",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6">
      <h1 className="text-2xl font-bold text-center">NotificationsAlt Demo</h1>

      <NotificationsAlt items={demoItems} />

      <p className="text-gray-500 text-sm text-center max-w-md">
        Click the bell icon to see notifications. Some notifications are links,
        some show info tooltips, and others are default messages.
      </p>
    </div>
  );
}
