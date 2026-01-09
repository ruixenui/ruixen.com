"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Clock, AlertTriangle, X, Loader2 } from "lucide-react";

type Status = "success" | "pending" | "warning" | "error" | "loading";

interface BadgeStatusProps {
  status?: Status;
  children?: React.ReactNode;
  showIcon?: boolean;
  showDot?: boolean;
  className?: string;
}

const statusConfig = {
  success: {
    icon: Check,
    dotColor: "bg-emerald-500",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20",
    label: "Success",
  },
  pending: {
    icon: Clock,
    dotColor: "bg-blue-500",
    badgeClass:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
    label: "Pending",
  },
  warning: {
    icon: AlertTriangle,
    dotColor: "bg-amber-500",
    badgeClass:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20",
    label: "Warning",
  },
  error: {
    icon: X,
    dotColor: "bg-red-500",
    badgeClass:
      "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
    label: "Error",
  },
  loading: {
    icon: Loader2,
    dotColor: "bg-gray-500",
    badgeClass:
      "bg-gray-500/10 text-gray-600 border-gray-500/20 hover:bg-gray-500/20",
    label: "Loading",
  },
};

export default function BadgeStatus({
  status = "success",
  children,
  showIcon = false,
  showDot = true,
  className,
}: BadgeStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const isLoading = status === "loading";

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-medium", config.badgeClass, className)}
    >
      {showDot && !showIcon && (
        <span
          className={cn(
            "size-2 rounded-full",
            config.dotColor,
            isLoading && "animate-pulse",
          )}
        />
      )}
      {showIcon && (
        <Icon className={cn("size-3", isLoading && "animate-spin")} />
      )}
      {children || config.label}
    </Badge>
  );
}

export { BadgeStatus, type BadgeStatusProps };
