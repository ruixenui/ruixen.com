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

export interface HistoryOption {
  value: string;
  label: string;
}

interface BehavioralHistorySelectProps {
  options: HistoryOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  maxHistory?: number; // recent items to remember
  storageKey?: string; // localStorage key
  selectWidth?: string | number; // fixed width
}

interface StoredHistory {
  value: string;
  count: number;
  timestamp: number;
}

export const BehavioralHistorySelect: React.FC<
  BehavioralHistorySelectProps
> = ({
  options,
  label,
  placeholder = "Select an option...",
  onChange,
  defaultValue,
  maxHistory = 5,
  storageKey = "behavioral_history_select",
  selectWidth = "280px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const [history, setHistory] = React.useState<StoredHistory[]>([]);

  // Load history from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) setHistory(JSON.parse(stored));
    }
  }, [storageKey]);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);

    setHistory((prev) => {
      const existing = prev.find((h) => h.value === value);
      let updated: StoredHistory[];
      if (existing) {
        updated = prev.map((h) =>
          h.value === value
            ? { ...h, count: h.count + 1, timestamp: Date.now() }
            : h,
        );
      } else {
        updated = [...prev, { value, count: 1, timestamp: Date.now() }];
      }

      // Sort by frequency & recency
      updated.sort((a, b) => {
        if (b.count === a.count) return b.timestamp - a.timestamp;
        return b.count - a.count;
      });

      // Limit recent history
      const limited = updated.slice(0, maxHistory);

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(limited));
      }

      return limited;
    });
  };

  // Prepare sections
  const recentItems = history
    .map((h) => options.find((o) => o.value === h.value))
    .filter(Boolean) as HistoryOption[];

  const otherItems = options.filter(
    (o) => !recentItems.some((r) => r.value === o.value),
  );

  return (
    <div className="flex flex-col gap-2">
      <Select defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger
          className="w-full"
          style={{ width: selectWidth, minWidth: selectWidth }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          {label && (
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
            </SelectGroup>
          )}

          {recentItems.length > 0 && (
            <SelectGroup>
              <SelectLabel>Recent</SelectLabel>
              {recentItems.map((opt) => {
                const stored = history.find((h) => h.value === opt.value);
                return (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="flex justify-between items-center w-full"
                  >
                    <span>{opt.label}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-2">
                      {stored?.count}×
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          )}

          {otherItems.length > 0 && (
            <SelectGroup>
              <SelectLabel>Other Options</SelectLabel>
              {otherItems.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
