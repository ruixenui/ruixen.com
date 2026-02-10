"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ButtonToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-8 px-2.5 text-xs",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-4 text-base",
};

export function ButtonToggleGroup({
  options,
  value,
  onChange,
  variant = "default",
  size = "md",
  className,
}: ButtonToggleGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md p-1",
        variant === "default"
          ? "bg-muted"
          : "border border-input bg-background",
        className,
      )}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            sizeStyles[size],
            value === option.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
