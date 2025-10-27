"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TagCloudOption {
  value: string;
  label: string;
  popularity: number; // 1–100 to indicate frequency
  color?: string; // Optional custom color
}

interface TagCloudSelectProps {
  options: TagCloudOption[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  defaultSelected?: string[];
  minFontSize?: number; // e.g., 12
  maxFontSize?: number; // e.g., 28
  showSearch?: boolean;
}

export const TagCloudSelect: React.FC<TagCloudSelectProps> = ({
  options,
  placeholder = "Select tags...",
  onChange,
  defaultSelected = [],
  minFontSize = 12,
  maxFontSize = 28,
  showSearch = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSelect = (value: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onChange?.(newSelected);
      return newSelected;
    });
  };

  const handleRemove = (value: string) => {
    setSelected((prev) => {
      const newSelected = prev.filter((v) => v !== value);
      onChange?.(newSelected);
      return newSelected;
    });
  };

  const getFontSize = (popularity: number) => {
    const clamped = Math.max(1, Math.min(100, popularity));
    return `${minFontSize + ((maxFontSize - minFontSize) * clamped) / 100}px`;
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] flex justify-between">
          {selected.length > 0
            ? `${selected.length} tag(s) selected`
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-3">
        {showSearch && (
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
        )}
        <ScrollArea className="h-52">
          <div className="flex flex-wrap gap-2">
            {filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "transition-all rounded-full px-3 py-1 font-medium cursor-pointer border",
                  selected.includes(opt.value)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-950",
                )}
                style={{
                  fontSize: getFontSize(opt.popularity),
                  color: !selected.includes(opt.value)
                    ? opt.color || "inherit"
                    : undefined,
                }}
              >
                {opt.label}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <p className="text-sm text-gray-500">No tags found.</p>
            )}
          </div>
        </ScrollArea>

        {selected.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-3">
            {selected.map((val) => {
              const tag = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {tag?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemove(val)}
                  />
                </span>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
