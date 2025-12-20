"use client";

import React from "react";
import NotificationsCarousel from "@/registry/ruixenui/notifications-carousel";

export default function DemoNotificationsCarousel() {
  const demoNotifications = [
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

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
      <div className="space-y-4">
        <div className="mx-auto">
          <NotificationsCarousel items={demoNotifications} placement="bottom" />
        </div>
      </div>
    </div>
  );
}
