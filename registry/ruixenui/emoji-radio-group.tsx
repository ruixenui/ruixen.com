"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex gap-3", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const EmojiRadio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    emoji: string;
    label: string;
  }
>(({ className, emoji, label, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
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
  </RadioGroupPrimitive.Item>
));
EmojiRadio.displayName = "EmojiRadio";

export { RadioGroup, EmojiRadio };
