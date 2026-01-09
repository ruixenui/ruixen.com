"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SplitButtonOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface ButtonSplitProps {
  label: string;
  onClick: () => void;
  options: SplitButtonOption[];
  variant?: "default" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizeStyles = {
  sm: "h-8 text-xs",
  md: "h-9 text-sm",
  lg: "h-10 text-base",
};

export default function ButtonSplit({
  label,
  onClick,
  options,
  variant = "default",
  size = "md",
  disabled = false,
  className,
}: ButtonSplitProps) {
  return (
    <div className={cn("inline-flex rounded-md shadow-sm", className)}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
        )}
      >
        {label}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-r-md border-l border-white/20 px-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              variantStyles[variant],
              sizeStyles[size],
            )}
          >
            <ChevronDown className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.onClick}
              className="cursor-pointer"
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { ButtonSplit, type ButtonSplitProps, type SplitButtonOption };
