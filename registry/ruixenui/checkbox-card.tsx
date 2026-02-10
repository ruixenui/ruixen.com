"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function CheckboxCard({
  checked,
  defaultChecked = false,
  onCheckedChange,
  title,
  description,
  icon,
  disabled = false,
  id,
  className,
}: CheckboxCardProps) {
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
        "group relative flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all duration-200",
        isChecked
          ? "border-primary bg-primary/5"
          : "border-border bg-background hover:border-muted-foreground/50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        type="checkbox"
        id={inputId}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="peer sr-only"
      />
      {icon && (
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
            isChecked
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        {description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
      </div>
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
          isChecked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30 bg-background",
        )}
      >
        {isChecked && <Check className="size-3 stroke-[3]" />}
      </div>
    </label>
  );
}
