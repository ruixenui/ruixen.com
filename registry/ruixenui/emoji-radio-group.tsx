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
          className={cn("flex gap-3", className)}
          {...props}
        />
      </RadioContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

const EmojiRadio = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    emoji: string;
    label: string;
  }
>(({ className, value, emoji, label, disabled, ...props }, ref) => {
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
        "relative flex size-14 cursor-pointer flex-col items-center justify-center rounded-lg border border-input bg-background text-lg shadow-sm transition-all",
        "hover:scale-105 hover:border-primary/70",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
        "data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span>{emoji}</span>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
});
EmojiRadio.displayName = "EmojiRadio";

export { RadioGroup, EmojiRadio };
