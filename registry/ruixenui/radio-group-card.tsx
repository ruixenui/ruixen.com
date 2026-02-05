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
          className={cn("grid gap-4 sm:grid-cols-2", className)}
          {...props}
        />
      </RadioContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

const RadioCard = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }
>(({ className, value, title, description, icon, disabled, ...props }, ref) => {
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
        "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left shadow-sm transition-all",
        "hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
        "data-[state=checked]:border-gray-400 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-primary">{icon}</span>}
        <span className="font-semibold">{title}</span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {/* Glowing green dot indicator */}
      {isChecked && (
        <span className="absolute top-3 right-3">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]"></span>
          </span>
        </span>
      )}
    </button>
  );
});
RadioCard.displayName = "RadioCard";

export { RadioGroup, RadioCard };
