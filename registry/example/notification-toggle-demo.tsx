"use client";

import React from "react";
import NotificationsToggle from "@/registry/ruixenui/notification-toggle";
import { Info, AlertCircle, Calendar } from "lucide-react";

export default function DemoNotificationsToggle() {
  const demoItems = [
    {
      id: "1",
      icon: <Info className="h-4 w-4 text-blue-500" />,
      title: "Welcome",
      description: "Thanks for checking out notifications.",
      time: "just now",
    },
    {
      id: "2",
      icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      title: "System Update",
      description: "A new feature has been rolled out.",
      time: "1h ago",
    },
    {
      id: "3",
      icon: <Calendar className="h-4 w-4 text-green-500" />,
      title: "Reminder",
      description: "Complete your profile setup.",
      time: "3h ago",
    },
    {
      id: "4",
      icon: <Info className="h-4 w-4 text-purple-500" />,
      title: "Weekly Report",
      description: "Your weekly report is now available.",
      time: "1d ago",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Notifications Toggle Demo
        </h1>
        <div className="flex justify-center">
          <NotificationsToggle items={demoItems} placement="bottom" />
        </div>
      </div>
    </div>
  );
}
