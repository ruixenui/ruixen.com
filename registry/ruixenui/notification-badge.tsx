"use client";

import { useState, useEffect } from "react";
import {
  BellIcon,
  CheckIcon,
  XIcon,
  InfoIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBadgeProps {
  initialCount?: number;
  type?: "success" | "error" | "info" | "warning";
  label?: string;
  duration?: number;
}

const defaultProps: Required<NotificationBadgeProps> = {
  initialCount: 0,
  type: "info",
  label: "Notifications",
  duration: 5000,
};

export default function NotificationBadge(props: NotificationBadgeProps) {
  // Merge props with defaults
  const { initialCount, type, label, duration } = { ...defaultProps, ...props };

  // Explicitly tell TypeScript count is always a number
  const [count, setCount] = useState<number>(initialCount);
  const [visible, setVisible] = useState(false);

  const typeColors: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const typeIcons: Record<string, JSX.Element> = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    info: <InfoIcon size={16} />,
    warning: <AlertTriangleIcon size={16} />,
  };

  useEffect(() => {
    if (count > 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [count, duration]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0));

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={increment}
      >
        <BellIcon size={18} />
        {label} {count > 0 && <span className="font-bold">({count})</span>}
      </Button>

      {visible && count > 0 && (
        <div
          className={`absolute -top-4 -right-2 flex items-center gap-1 px-2 py-1 text-xs rounded-full text-white ${typeColors[type]}`}
        >
          {typeIcons[type]} {count} new
        </div>
      )}

      <div className="mt-2 flex gap-2">
        <Button size="sm" variant="ghost" onClick={decrement}>
          Decrement
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setCount(0)}>
          Clear
        </Button>
      </div>
    </div>
  );
}
