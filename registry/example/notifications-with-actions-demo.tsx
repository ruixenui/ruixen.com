"use client";

import React from "react";
import NotificationsWithActions from "@/registry/ruixenui/notifications-with-actions";

export default function DemoNotificationsPage() {
  const demoNotifications = [
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
    {
      id: "4",
      title: "New Feature",
      description: "You can now customize your dashboard.",
      time: "5h ago",
    },
    {
      id: "5",
      title: "Server Alert",
      description: "Server maintenance scheduled for tonight.",
      time: "1d ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-gray-800">
          Notifications With Actions Demo
        </h1>
        <NotificationsWithActions
          items={demoNotifications}
          placement="bottom"
        />
      </div>
    </div>
  );
}
