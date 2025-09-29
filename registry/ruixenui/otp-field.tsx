"use client";

import { useId, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MinusIcon } from "lucide-react";

interface OTPFieldProps {
  label?: string;
  length?: number;
  separator?: boolean;
  onComplete?: (otp: string) => void;
}

export default function OTPField({
  label = "Enter OTP",
  length = 6,
  separator = true,
  onComplete,
}: OTPFieldProps) {
  const id = useId();
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (idx: number, char: string) => {
    if (!/^[0-9]?$/.test(char)) return; // allow only digits
    const newValues = [...values];
    newValues[idx] = char;
    setValues(newValues);

    if (char && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    if (newValues.every((v) => v !== "")) {
      onComplete?.(newValues.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("Text").slice(0, length).split("");
    const newValues = [...values];
    paste.forEach((char, i) => (newValues[i] = char));
    setValues(newValues);
    if (paste.length > 0 && paste.length < length) {
      inputsRef.current[paste.length]?.focus();
    }
    if (paste.length === length) onComplete?.(newValues.join(""));
    e.preventDefault();
  };

  return (
    <div className="space-y-2 w-full max-w-md">
      <Label htmlFor={id}>{label}</Label>

      <div className="flex items-center gap-2" onPaste={handlePaste}>
        {values.map((val, idx) => (
          <div key={idx} className="flex items-center">
            <input
              ref={(el) => (inputsRef.current[idx] = el!)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={cn(
                "w-12 h-12 text-center text-lg rounded-xl border bg-background font-semibold shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary",
                val ? "border-primary" : "border-input",
              )}
            />
            {separator && idx === Math.floor(length / 2) - 1 && (
              <MinusIcon
                size={16}
                aria-hidden="true"
                className="mx-1 text-muted-foreground/60"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
