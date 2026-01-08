"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonBadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  badge?: number | string;
  badgeVariant?: "default" | "destructive" | "success";
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-10 px-5 text-base gap-2",
};

const badgeVariantStyles = {
  default: "bg-primary-foreground text-primary",
  destructive: "bg-destructive text-destructive-foreground",
  success: "bg-emerald-500 text-white",
};

export default function ButtonBadge({
  badge,
  badgeVariant = "default",
  variant = "default",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonBadgeProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {badge !== undefined && (
        <span
          className={cn(
            "absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium",
            badgeVariantStyles[badgeVariant],
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export { ButtonBadge, type ButtonBadgeProps };
