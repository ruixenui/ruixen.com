"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SegmentedButtonGroupProps {
  options: string[];
  selected?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SegmentedButtonGroup({
  options,
  selected,
  onChange,
  className,
}: SegmentedButtonGroupProps) {
  const [active, setActive] = React.useState<string>(selected || options[0]);

  const handleClick = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={cn("inline-flex rounded-full bg-background", className)}>
      {options.map((option, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === options.length - 1;
        const isActive = option === active;

        return (
          <Button
            key={option}
            onClick={() => handleClick(option)}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "rounded-none px-4 py-2",
              isFirst && "rounded-l-full",
              isLast && "rounded-r-full",
              isActive && "bg-primary text-primary-foreground",
              !isActive && "bg-background text-foreground",
            )}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
