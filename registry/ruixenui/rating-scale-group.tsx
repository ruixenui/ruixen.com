"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RadioContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

const RadioContext = React.createContext<RadioContextValue>({
  value: undefined,
  onValueChange: () => {},
});

const RatingScaleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  }
>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value = controlledValue ?? internalValue;

    return (
      <RadioContext.Provider
        value={{
          value,
          onValueChange: onValueChange ?? setInternalValue,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn("flex w-full justify-between gap-1", className)}
          {...props}
        />
      </RadioContext.Provider>
    );
  },
);
RatingScaleGroup.displayName = "RatingScaleGroup";

const RatingScaleItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    label: string;
  }
>(({ className, value, label, disabled, ...props }, ref) => {
  const ctx = React.useContext(RadioContext);
  const isChecked = ctx.value === value;

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-all",
        "hover:border-primary/70 hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
        "data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {label}
      {isChecked && (
        <span className="absolute -top-1 -right-1">
          <span className="flex size-2.5 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]" />
        </span>
      )}
    </button>
  );
});
RatingScaleItem.displayName = "RatingScaleItem";

export { RatingScaleGroup, RatingScaleItem };
