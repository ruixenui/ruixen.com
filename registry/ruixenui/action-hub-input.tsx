"use client";

import { useId, useState, useRef, useEffect } from "react";
import { Loader2Icon, CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ActionHubInputAction {
  icon: JSX.Element;
  onClick: (value: string) => Promise<void> | void;
  tooltip?: string;
  showOnEmpty?: boolean;
}

interface ActionHubInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  validate?: (value: string) => string | null;
  actions?: ActionHubInputAction[];
  historyEnabled?: boolean;
}

export default function ActionHubInput({
  label = "Action Input",
  placeholder = "Type command, email, or snippet...",
  type = "text",
  defaultValue = "",
  validate,
  actions = [],
  historyEnabled = true,
}: ActionHubInputProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history
  useEffect(() => {
    if (historyEnabled) {
      const saved = localStorage.getItem(`actionhub-${id}`);
      if (saved) setHistory(JSON.parse(saved));
    }
  }, [id, historyEnabled]);

  // Save history on submit
  const saveToHistory = (val: string) => {
    if (!historyEnabled || !val) return;
    const newHistory = [val, ...history.filter((h) => h !== val)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem(`actionhub-${id}`, JSON.stringify(newHistory));
  };

  const handleActionClick = async (action: ActionHubInputAction) => {
    try {
      setStatus("loading");
      await action.onClick(value);
      setStatus("success");
      saveToHistory(value);
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  // Validation
  useEffect(() => {
    if (validate) setError(validate(value));
    else setError(null);
  }, [value, validate]);

  const renderStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2Icon className="animate-spin text-blue-500" size={16} />;
      case "success":
        return <CheckCircle2Icon className="text-green-500" size={16} />;
      case "error":
        return <XCircleIcon className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-lg flex flex-col gap-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative flex items-center">
        <Input
          id={id}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-24"
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
        />

        {/* Status icon */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          {renderStatusIcon()}
        </div>

        {/* Actions */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
          {actions.map(
            (action, idx) =>
              (value || action.showOnEmpty) && (
                <Button
                  key={idx}
                  size="icon"
                  onClick={() => handleActionClick(action)}
                  title={action.tooltip}
                  className="h-8 w-8 rounded-md p-1"
                >
                  {action.icon}
                </Button>
              ),
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* History dropdown */}
      {showHistory && history.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-background shadow-lg z-10 max-h-36 overflow-auto">
          {history.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="w-full text-left px-2 py-1 hover:bg-accent hover:text-accent-foreground flex items-center gap-2 text-sm"
              onClick={() => setValue(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
