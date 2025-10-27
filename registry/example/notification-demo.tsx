"use client";

import Notifications from "@/registry/ruixenui/notification";

export default function NotificationDemo() {
  const demoItems = [
    {
      id: "1",
      title: "New Message",
      description: "You have a new message from John.",
      time: "2h ago",
    },
    {
      id: "2",
      title: "System Alert",
      description: "Server downtime scheduled at midnight.",
      time: "5h ago",
    },
    {
      id: "3",
      title: "Meeting Reminder",
      description: "Project sync meeting at 3 PM.",
      time: "1d ago",
    },
    {
      id: "4",
      title: "Welcome 🎉",
      description: "Thanks for checking out the notifications component!",
      time: "just now",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6 min-h-screen">
      <h1 className="text-2xl font-bold">Notification Demo</h1>

      <Notifications items={demoItems} />

      <p className="text-gray-500 text-sm text-center max-w-md">
        Click the bell icon to view your notifications. Each notification shows
        a title, description, and timestamp.
      </p>
    </div>
  );
}
