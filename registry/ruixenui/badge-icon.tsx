"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Zap,
  Star,
  Check,
  AlertTriangle,
  Info,
  type LucideIcon,
} from "lucide-react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeIconProps {
  icon?: LucideIcon;
  children?: React.ReactNode;
  variant?: BadgeVariant;
  iconPosition?: "left" | "right";
  className?: string;
}

export default function BadgeIcon({
  icon: Icon = Zap,
  children = "Badge",
  variant = "default",
  iconPosition = "left",
  className,
}: BadgeIconProps) {
  return (
    <Badge variant={variant} className={cn("gap-1.5", className)}>
      {iconPosition === "left" && <Icon className="size-3" />}
      {children}
      {iconPosition === "right" && <Icon className="size-3" />}
    </Badge>
  );
}

export { BadgeIcon, type BadgeIconProps };
