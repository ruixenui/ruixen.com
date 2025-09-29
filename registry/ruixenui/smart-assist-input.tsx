"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CircleXIcon, CopyIcon, HistoryIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SmartAssistInputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "search";
  rememberHistory?: boolean;
  validate?: (value: string) => string | null; // returns error string or null
}

export default function SmartAssistInput({
  label = "Smart Assist Input",
  placeholder = "Type something...",
  type = "text",
  rememberHistory = true,
  validate,
}: SmartAssistInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    if (rememberHistory) {
      const saved = localStorage.getItem(`history-${id}`);
      if (saved) setHistory(JSON.parse(saved));
    }
  }, [id, rememberHistory]);

  // Save history on change
  useEffect(() => {
    if (rememberHistory && value) {
      localStorage.setItem(
        `history-${id}`,
        JSON.stringify([...new Set([value, ...history])].slice(0, 5)),
      );
    }
  }, [value]);

  // Validation
  useEffect(() => {
    if (validate) {
      setError(validate(value));
    }
  }, [value, validate]);

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative group">
        <Input
          id={id}
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 150)}
          className="pe-20"
        />

        {/* Action buttons */}
        {value && (
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-1">
            <button
              type="button"
              aria-label="Copy input"
              onClick={handleCopy}
              className="p-1 text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              <CopyIcon size={16} />
            </button>
            <button
              type="button"
              aria-label="Clear input"
              onClick={handleClear}
              className="p-1 text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              <CircleXIcon size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* History dropdown */}
      {showHistory && history.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-background shadow-lg z-10">
          {history.map((item, idx) => (
            <button
              key={idx}
              className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setValue(item)}
              type="button"
            >
              <HistoryIcon size={14} /> {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
