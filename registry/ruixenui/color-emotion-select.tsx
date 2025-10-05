"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface ColorEmotionOption {
  value: string;
  label: string;
  color: string; // Tailwind color or hex
  emoji?: string; // Optional emoji for visual cue
}

interface ColorEmotionSelectProps {
  options: ColorEmotionOption[];
  label?: string; // Optional label for the whole group
  placeholder?: string; // Placeholder text
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export const ColorEmotionSelect: React.FC<ColorEmotionSelectProps> = ({
  options,
  label,
  placeholder = "Select...",
  onChange,
  defaultValue,
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn("flex items-center gap-2")}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              />
              {option.emoji && <span>{option.emoji}</span>}
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
