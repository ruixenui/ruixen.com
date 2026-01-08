"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonRoundedProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
};

const sizeStyles = {
  sm: "h-8 px-4 text-xs gap-1.5",
  md: "h-9 px-5 text-sm gap-2",
  lg: "h-10 px-6 text-base gap-2",
};

export default function ButtonRounded({
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonRoundedProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export { ButtonRounded, type ButtonRoundedProps };
