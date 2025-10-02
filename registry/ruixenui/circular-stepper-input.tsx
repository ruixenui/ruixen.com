"use client";

import { useState } from "react";

interface CircularStepperInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  size?: number; // diameter of the circle in px
  onChange?: (value: number) => void;
}

export default function CircularStepperInput({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  size = 120,
  onChange,
}: CircularStepperInputProps) {
  const [value, setValue] = useState(defaultValue);

  const percentage = ((value - min) / (max - min)) * 100;
  const radius = size / 2 - 6; // subtract stroke width
  const circumference = 2 * Math.PI * radius;

  const incrementValue = () => {
    setValue((prev) => {
      const next = Math.min(prev + step, max);
      onChange?.(next);
      return next;
    });
  };

  const decrementValue = () => {
    setValue((prev) => {
      const next = Math.max(prev - step, min);
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className={`w-full max-w-md mx-auto`}>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 flex flex-col items-center gap-4">
        {/* Increment Button */}
        <button
          onClick={incrementValue}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition"
          aria-label="Increment"
        >
          +
        </button>

        {/* Circular Progress */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="rotate-[-90deg]">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              className="text-zinc-200 dark:text-zinc-700"
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              className="text-indigo-500"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - percentage / 100)}
              fill="transparent"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-zinc-800 dark:text-white">
              {value}
            </span>
          </div>
        </div>

        {/* Decrement Button */}
        <button
          onClick={decrementValue}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition"
          aria-label="Decrement"
        >
          −
        </button>

        {/* Min & Max Labels */}
        <div className="w-full mt-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}
