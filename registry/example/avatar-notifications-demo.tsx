"use client";

import React from "react";
import AvatarNotifications from "@/registry/ruixenui/avatar-notifications";

export default function DemoAvatarNotifications() {
  const demoItems = [
    {
      id: "1",
      user: "Alice",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      message: "Sent you a message.",
      time: "2m ago",
    },
    {
      id: "2",
      user: "Bob",
      avatarUrl: "https://i.pravatar.cc/40?img=2",
      message: "Commented on your post.",
      time: "10m ago",
    },
    {
      id: "3",
      user: "Charlie",
      avatarUrl: "https://i.pravatar.cc/40?img=3",
      message: "Liked your photo.",
      time: "30m ago",
    },
    {
      id: "4",
      user: "Diana",
      avatarUrl: "https://i.pravatar.cc/40?img=4",
      message: "Started following you.",
      time: "1h ago",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2 gap-6 min-h-screen">
      <div className="space-y-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-primary text-center">
          Avatar Notifications Demo
        </h1>

        <div className="flex justify-center">
          <AvatarNotifications items={demoItems} />
        </div>
      </div>
    </div>
  );
}
