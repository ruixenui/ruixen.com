"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

type CheckedState = boolean | "indeterminate";

interface CheckboxIndeterminateProps {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export default function CheckboxIndeterminate({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  disabled = false,
  id,
  className,
}: CheckboxIndeterminateProps) {
  const [internalChecked, setInternalChecked] =
    React.useState<CheckedState>(defaultChecked);
  const isControlled = checked !== undefined;
  const currentState = isControlled ? checked : internalChecked;
  const inputId = id || React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = currentState === "indeterminate";
    }
  }, [currentState]);

  const handleChange = () => {
    const newState = currentState === true ? false : true;
    if (!isControlled) {
      setInternalChecked(newState);
    }
    onCheckedChange?.(newState);
  };

  const isChecked = currentState === true;
  const isIndeterminate = currentState === "indeterminate";

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
          ref={inputRef}
          type="checkbox"
          id={inputId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
            isChecked || isIndeterminate
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/30 bg-background",
            !disabled &&
              !isChecked &&
              !isIndeterminate &&
              "group-hover:border-muted-foreground/50",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          )}
        >
          {isChecked && <Check className="size-3.5 stroke-[3]" />}
          {isIndeterminate && <Minus className="size-3.5 stroke-[3]" />}
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

export { CheckboxIndeterminate, type CheckboxIndeterminateProps };
