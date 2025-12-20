"use client";

import {
  NotificationInboxPopover,
  Notification,
} from "@/registry/ruixenui/notification-inbox-popover";
import { GitMerge, FileText } from "lucide-react";

const demoNotifications: Notification[] = [
  {
    id: 1,
    user: "Alice",
    action: "merged",
    target: "PR #45",
    timestamp: "5 mins ago",
    unread: true,
    icon: GitMerge,
  },
  {
    id: 2,
    user: "Bob",
    action: "uploaded",
    target: "Project Plan.pdf",
    timestamp: "1 hour ago",
    unread: true,
    icon: FileText,
  },
];

export default function NotificationsDemoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <NotificationInboxPopover
        notifications={demoNotifications}
        triggerLabel=""
        onMarkAll={(notifs) => console.log("Marked all as read:", notifs)}
        onMarkAsRead={(id) => console.log("Marked as read:", id)}
        onViewAll={() => console.log("View all clicked")}
      />
    </div>
  );
}
