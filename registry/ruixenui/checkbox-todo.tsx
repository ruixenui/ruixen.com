"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxTodoProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  animated?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function CheckboxTodo({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  animated = true,
  disabled = false,
  id,
  className,
}: CheckboxTodoProps) {
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
        "group inline-flex cursor-pointer items-center gap-3 py-1",
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
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
            isChecked
              ? "border-green-500 bg-green-500 text-white"
              : "border-muted-foreground/30 bg-background",
            !disabled && !isChecked && "group-hover:border-green-500/50",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-green-500/30 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          )}
        >
          <Check
            className={cn(
              "size-3 stroke-[3] transition-all duration-300",
              isChecked ? "scale-100 opacity-100" : "scale-0 opacity-0",
            )}
          />
        </div>
      </div>
      <span className="relative text-sm font-medium text-foreground">
        <span
          className={cn(
            "transition-all duration-300",
            isChecked && "text-muted-foreground",
          )}
        >
          {label}
        </span>
        {animated && (
          <span
            className={cn(
              "absolute left-0 top-1/2 h-px bg-muted-foreground transition-all duration-300",
              isChecked ? "w-full" : "w-0",
            )}
          />
        )}
      </span>
    </label>
  );
}
