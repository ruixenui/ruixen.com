import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

/**
 * NotificationButton
 *
 * Button with a badge count, ideal for notifications, messages, cart items, or tasks.
 * Shows an icon (default: Bell) with optional badge count.
 */

interface NotificationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { padding: "p-2", icon: "w-4 h-4", badge: "text-xs h-4 min-w-[1rem]" },
  md: { padding: "p-3", icon: "w-5 h-5", badge: "text-sm h-5 min-w-[1.25rem]" },
  lg: { padding: "p-4", icon: "w-6 h-6", badge: "text-sm h-5 min-w-[1.25rem]" },
};

export function NotificationButton({
  count,
  icon,
  size = "md",
  className,
  ...props
}: NotificationButtonProps) {
  const s = sizeConfig[size];

  return (
    <Button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        s.padding,
        className,
      )}
      {...props}
    >
      {/* Icon */}
      {icon ?? <Bell className={cn(s.icon)} />}

      {/* Badge */}
      {count !== undefined && count > 0 && (
        <span className="absolute -top-1 -right-1">
          <Badge className={cn(s.badge, "p-1")}>{count}</Badge>
        </span>
      )}
    </Button>
  );
}

export default NotificationButton;
