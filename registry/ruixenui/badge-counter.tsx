"use client";

import { cn } from "@/lib/utils";

interface BadgeCounterProps {
  count: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "destructive" | "success";
  className?: string;
}

const sizeClasses = {
  sm: "size-5 text-[10px]",
  md: "size-6 text-xs",
  lg: "size-8 text-sm",
};

const variantClasses = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-white",
  success: "bg-emerald-500 text-white",
};

export default function BadgeCounter({
  count,
  max = 99,
  size = "md",
  variant = "default",
  className,
}: BadgeCounterProps) {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {displayCount}
    </span>
  );
}

export { BadgeCounter, type BadgeCounterProps };
