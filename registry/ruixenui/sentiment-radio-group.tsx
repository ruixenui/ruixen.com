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
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const SentimentCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    emoji: string;
    title: string;
    description?: string;
  }
>(({ className, emoji, title, description, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
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
  </RadioGroupPrimitive.Item>
));
SentimentCard.displayName = "SentimentCard";

export { RadioGroup, SentimentCard };
