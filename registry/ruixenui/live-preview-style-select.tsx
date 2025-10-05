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

export interface StyleOption {
  value: string;
  label: string;
  previewClass?: string;
  previewStyle?: React.CSSProperties;
  description?: string;
}

interface LivePreviewStyleSelectProps {
  options: StyleOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  previewHeight?: string | number;
  previewBgClass?: string;
  showDescription?: boolean;
  selectWidth?: string | number; // new prop
}

export const LivePreviewStyleSelect: React.FC<LivePreviewStyleSelectProps> = ({
  options,
  label,
  placeholder = "Select a style...",
  onChange,
  defaultValue,
  previewHeight = "160px",
  previewBgClass = "bg-gray-100 dark:bg-gray-800",
  showDescription = true,
  selectWidth = "250px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const current = options.find((opt) => opt.value === selected);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Select
        defaultValue={defaultValue}
        onValueChange={(val) => {
          setSelected(val);
          onChange?.(val);
        }}
      >
        <SelectTrigger
          className={cn("flex items-center justify-between truncate", "w-full")}
          style={{ width: selectWidth }}
        >
          <SelectValue placeholder={placeholder} className="truncate" />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="w-full" // full width for wrapping div
              >
                {/* Wrap inside flex-col container */}
                <div className="flex flex-col w-full">
                  <span className="truncate">{opt.label}</span>
                  {showDescription && opt.description && (
                    <span className="text-xs text-muted-foreground truncate">
                      {opt.description}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Preview */}
      <div
        className={cn(
          "rounded-lg border shadow-inner flex items-center justify-center text-sm font-medium",
          previewBgClass,
          current?.previewClass,
        )}
        style={{ height: previewHeight, ...current?.previewStyle }}
      >
        {current ? current.label : "Preview will appear here"}
      </div>
    </div>
  );
};
