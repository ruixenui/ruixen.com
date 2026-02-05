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

const RadioGroup = React.forwardRef<
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
          className={cn("flex flex-col gap-3", className)}
          {...props}
        />
      </RadioContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

const SentimentCard = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    emoji: string;
    title: string;
    description?: string;
  }
>(
  (
    { className, value, emoji, title, description, disabled, ...props },
    ref,
  ) => {
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
          "relative flex w-full items-center gap-3 rounded-lg border p-3 text-left shadow-sm transition-all",
          "hover:shadow-md",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
          "data-[state=checked]:border-gray-400 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="text-2xl">{emoji}</span>
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </button>
    );
  },
);
SentimentCard.displayName = "SentimentCard";

export { RadioGroup, SentimentCard };
