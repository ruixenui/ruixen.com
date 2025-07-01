"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

export const codeStringInput_05 = `
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

export default function Input_05() {
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...code];
    updated[index] = value.slice(-1);
    setCode(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(text)) {
      setError(true);
      setTimeout(() => setError(false), 400);
      return;
    }
    const newCode = text.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
    setCode(newCode);
    const next = Math.min(text.length, OTP_LENGTH - 1);
    inputRefs.current[next]?.focus();
    setActiveIndex(next);
  };

  const setRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  }, []);

  return (
    <div className="flex justify-center pt-10 px-4">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800">
        <h2 className="text-center text-lg font-semibold text-zinc-800 dark:text-white">
          2-Step Verification
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Please enter the 6-digit code sent to your device
        </p>

        <div className="flex justify-between gap-3 px-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={setRef(index)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => setActiveIndex(index)}
              onPaste={handlePaste}
              className={cn(
                "w-10 text-center text-xl font-mono text-zinc-800 dark:text-white bg-transparent",
                "border-b-2 border-zinc-300 dark:border-zinc-600 outline-none",
                "focus:border-indigo-500 dark:focus:border-indigo-400",
                "transition-all duration-150",
                error && "animate-pulse text-red-500 dark:text-red-400"
              )}
            />
          ))}
        </div>

        <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
          Didn't receive the code? <button className="text-indigo-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
}
`;

export default function Input_05() {
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...code];
    updated[index] = value.slice(-1);
    setCode(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(text)) {
      setError(true);
      setTimeout(() => setError(false), 400);
      return;
    }
    const newCode = text.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
    setCode(newCode);
    const next = Math.min(text.length, OTP_LENGTH - 1);
    inputRefs.current[next]?.focus();
    setActiveIndex(next);
  };

  const setRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  }, []);

  return (
    <div className="flex justify-center pt-10 px-4">
      <div className="w-full max-w-sm space-y-6 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800">
        <h2 className="text-center text-lg font-semibold text-zinc-800 dark:text-white">
          2-Step Verification
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Please enter the 6-digit code sent to your device
        </p>

        <div className="flex justify-between gap-3 px-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={setRef(index)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => setActiveIndex(index)}
              onPaste={handlePaste}
              className={cn(
                "w-10 text-center text-xl font-mono text-zinc-800 dark:text-white bg-transparent",
                "border-b-2 border-zinc-300 dark:border-zinc-600 outline-none",
                "focus:border-indigo-500 dark:focus:border-indigo-400",
                "transition-all duration-150",
                error && "animate-pulse text-red-500 dark:text-red-400"
              )}
            />
          ))}
        </div>

        <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
          Didn't receive the code? <button className="text-indigo-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
}
