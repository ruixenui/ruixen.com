"use client";

import { useState } from "react";
import NotificationBadge from "@/registry/ruixenui/notification-badge";
import { Button } from "@/components/ui/button";

export default function NotificationBadgeDemo() {
  const [type, setType] = useState<"success" | "error" | "info" | "warning">(
    "info",
  );

  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6 min-h-screen">
      <h1 className="text-2xl font-bold">NotificationBadge Demo</h1>

      <NotificationBadge
        initialCount={2}
        type={type}
        label="Messages"
        duration={4000}
      />

      <div className="flex gap-2 mt-4">
        <Button onClick={() => setType("success")}>Success</Button>
        <Button onClick={() => setType("error")}>Error</Button>
        <Button onClick={() => setType("info")}>Info</Button>
        <Button onClick={() => setType("warning")}>Warning</Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Click the bell to increment notifications. The badge disappears after
        the duration.
      </p>
    </div>
  );
}
