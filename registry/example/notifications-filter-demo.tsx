"use client";

import React from "react";
import NotificationsFilter from "@/registry/ruixenui/notifications-filter";
import { Info, AlertCircle, Calendar } from "lucide-react";
import { NotificationItem } from "@/registry/ruixenui/notifications-filter";

export default function DemoNotificationsFilter() {
  const demoItems: NotificationItem[] = [
    {
      id: "1",
      category: "updates", // ✅ matches union type
      icon: <Info className="h-4 w-4 text-blue-500" />,
      title: "System Update",
      description: "A new feature has been deployed.",
      time: "just now",
    },
    {
      id: "2",
      category: "alerts", // ✅ matches union type
      icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      title: "Security Alert",
      description: "Suspicious login detected.",
      time: "1h ago",
    },
    {
      id: "3",
      category: "reminders", // ✅ matches union type
      icon: <Calendar className="h-4 w-4 text-green-500" />,
      title: "Meeting Reminder",
      description: "Project sync at 3 PM.",
      time: "2h ago",
    },
    {
      id: "4",
      category: "updates", // ✅ matches union type
      icon: <Info className="h-4 w-4 text-purple-500" />,
      title: "Weekly Report",
      description: "Your weekly summary is ready.",
      time: "1d ago",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Notifications Filter Demo
        </h1>

        <div className="flex justify-center">
          <NotificationsFilter items={demoItems} placement="bottom" />
        </div>
      </div>
    </div>
  );
}
