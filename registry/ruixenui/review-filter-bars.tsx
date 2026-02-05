"use client";

import * as React from "react";
import { RiStarFill } from "@remixicon/react";
import { cn } from "@/lib/utils";

type RadioContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

const RadioContext = React.createContext<RadioContextValue>({
  value: undefined,
  onValueChange: () => {},
});

const ReviewFilterGroup = React.forwardRef<
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
          className={cn("flex flex-col gap-2 w-full max-w-md", className)}
          {...props}
        />
      </RadioContext.Provider>
    );
  },
);
ReviewFilterGroup.displayName = "ReviewFilterGroup";

const ReviewFilterItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    stars: number;
    count: number;
    total: number;
  }
>(({ className, value, stars, count, total, disabled, ...props }, ref) => {
  const ctx = React.useContext(RadioContext);
  const isChecked = ctx.value === value;
  const percentage = Math.round((count / total) * 100);

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
        "relative flex items-center gap-3 rounded-md border border-input p-2 transition-colors",
        "hover:border-primary/60 hover:bg-accent/40",
        "data-[state=checked]:border-gray-500 data-[state=checked]:bg-accent/60",
        className,
      )}
      {...props}
    >
      {/* Star rating */}
      <div className="flex items-center gap-0.5 min-w-[72px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <RiStarFill
            key={i}
            size={16}
            className={
              i < stars ? "text-amber-500" : "text-muted-foreground/30"
            }
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex-1 h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Count */}
      <span className="text-xs font-medium text-muted-foreground w-12 text-right">
        {count.toLocaleString()}
      </span>
    </button>
  );
});
ReviewFilterItem.displayName = "ReviewFilterItem";

export { ReviewFilterGroup, ReviewFilterItem };
