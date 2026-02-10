"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type CheckboxColor =
  | "default"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "pink";

interface CheckboxColoredProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  color?: CheckboxColor;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const colorStyles: Record<CheckboxColor, { checked: string; ring: string }> = {
  default: {
    checked: "border-primary bg-primary",
    ring: "peer-focus-visible:ring-primary/30",
  },
  blue: {
    checked: "border-blue-500 bg-blue-500",
    ring: "peer-focus-visible:ring-blue-500/30",
  },
  green: {
    checked: "border-green-500 bg-green-500",
    ring: "peer-focus-visible:ring-green-500/30",
  },
  red: {
    checked: "border-red-500 bg-red-500",
    ring: "peer-focus-visible:ring-red-500/30",
  },
  yellow: {
    checked: "border-yellow-500 bg-yellow-500",
    ring: "peer-focus-visible:ring-yellow-500/30",
  },
  purple: {
    checked: "border-purple-500 bg-purple-500",
    ring: "peer-focus-visible:ring-purple-500/30",
  },
  pink: {
    checked: "border-pink-500 bg-pink-500",
    ring: "peer-focus-visible:ring-pink-500/30",
  },
};

export function CheckboxColored({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  color = "default",
  disabled = false,
  id,
  className,
}: CheckboxColoredProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const inputId = id || React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-3",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={inputId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-white transition-all duration-200",
            isChecked
              ? colorStyles[color].checked
              : "border-muted-foreground/30 bg-background",
            !disabled && !isChecked && "group-hover:border-muted-foreground/50",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            colorStyles[color].ring,
          )}
        >
          {isChecked && <Check className="size-3.5 stroke-[3]" />}
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium leading-none text-foreground">
          {label}
        </span>
      )}
    </label>
  );
}
