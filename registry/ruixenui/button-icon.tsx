"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "outline" | "ghost" | "destructive";
type IconButtonSize = "sm" | "md" | "lg";

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  rounded?: boolean;
  label?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "h-8 w-8 [&_svg]:size-4",
  md: "h-9 w-9 [&_svg]:size-4",
  lg: "h-10 w-10 [&_svg]:size-5",
};

export default function ButtonIcon({
  icon,
  variant = "default",
  size = "md",
  rounded = false,
  label,
  className,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        rounded ? "rounded-full" : "rounded-md",
        className,
      )}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}

export { ButtonIcon, type ButtonIconProps };
