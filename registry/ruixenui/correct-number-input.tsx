"use client";

import { useState, useId } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CorrectNumberInput() {
  const [value, setValue] = useState(0);
  const id = useId();

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative">
        {/* Input field */}
        <input
          id={id}
          type="text" // use text to hide browser arrows
          inputMode="numeric"
          pattern="[0-9]*"
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const val = e.target.value;
            setValue(val === "" ? 0 : Number(val));
          }}
          className="peer w-full h-12 pl-4 pr-12 text-black dark:text-white bg-transparent border border-black/30 dark:border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 transition-all"
          placeholder=" "
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 top-1 -translate-y-1/2 text-black/50 dark:text-white/50 text-sm transition-all duration-200 pointer-events-none",
            value !== 0
              ? "-translate-y-6 top-1/2 text-xs text-black dark:text-white"
              : "peer-placeholder-shown:translate-y-1/2",
          )}
        >
          Amount
        </label>

        {/* Custom chevron buttons */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col h-10 justify-between">
          <button
            type="button"
            onClick={increment}
            className="flex items-center justify-center w-8 h-5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded"
          >
            <ChevronUp size={12} className="text-black dark:text-white" />
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex items-center justify-center w-8 h-5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded"
          >
            <ChevronDown size={12} className="text-black dark:text-white" />
          </button>
        </div>
      </div>

      <p className="mt-1 text-xs text-black/50 dark:text-white/50">
        Use the arrows or type a number. Value 0 is shown as empty to avoid
        overlap.
      </p>
    </div>
  );
}
