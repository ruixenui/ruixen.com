"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onValueChange,
  label,
  orientation = "vertical",
  className,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] =
    React.useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    const newValue = checked
      ? [...selectedValues, optionValue]
      : selectedValues.filter((v) => v !== optionValue);

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
      <div
        className={cn(
          "flex gap-4",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        )}
      >
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          const inputId = `checkbox-group-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                "group inline-flex cursor-pointer items-start gap-3",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  id={inputId}
                  checked={isChecked}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  disabled={option.disabled}
                  className="peer sr-only"
                />
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
                    isChecked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-background",
                    !option.disabled &&
                      !isChecked &&
                      "group-hover:border-muted-foreground/50",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                  )}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium leading-none text-foreground">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-sm text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export { CheckboxGroup, type CheckboxGroupProps, type CheckboxOption };
