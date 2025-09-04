"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function OTPInput({
  length = 6,
  onChange,
  placeholder = "",
  autoFocus = true,
}: OTPInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [length, autoFocus]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...code];
    updated[index] = value.slice(-1);
    setCode(updated);
    onChange?.(updated.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").slice(0, length);
    if (!/^\d+$/.test(text)) {
      setError(true);
      setTimeout(() => setError(false), 400);
      return;
    }
    const newCode = text
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setCode(newCode);
    onChange?.(newCode.join(""));
    const next = Math.min(text.length, length - 1);
    inputRefs.current[next]?.focus();
    setActiveIndex(next);
  };

  const setRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    },
    [],
  );

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={setRef(index)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[index]}
          placeholder={placeholder}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => setActiveIndex(index)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-12 text-center text-xl font-mono rounded-md bg-transparent",
            "border-b-2 border-zinc-300 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none",
            "transition-all duration-150",
            error && "animate-pulse text-red-500 dark:text-red-400",
          )}
        />
      ))}
    </div>
  );
}
