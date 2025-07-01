"use client";

import { useState } from "react";

export const codeStringInput_03 = `
"use client";

import { useState } from "react";
interface NumericInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export default function Input_03({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
}: NumericInputProps) {
  const [value, setValue] = useState(defaultValue);

  const percentage = ((value - min) / (max - min)) * 100;

  const incrementValue = () => {
    setValue((prev) => Math.min(prev + step, max));
  };

  const decrementValue = () => {
    setValue((prev) => Math.max(prev - step, min));
  };
  return (
    <div className="w-full max-w-[160px] mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 flex flex-col items-center gap-4">
        <button
          onClick={incrementValue}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition"
          aria-label="Increment"
        >
          +
        </button>

        <div className="relative w-24 h-24">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              className="text-zinc-200 dark:text-zinc-700"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              className="text-indigo-500"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={
                2 * Math.PI * 42 * (1 - percentage / 100)
              }
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

        <button
          onClick={decrementValue}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition"
          aria-label="Decrement"
        >
          −
        </button>

        <div className="w-full mt-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};
`;

interface NumericInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export default function Input_03({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
}: NumericInputProps) {
  const [value, setValue] = useState(defaultValue);

  const percentage = ((value - min) / (max - min)) * 100;

  const incrementValue = () => {
    setValue((prev) => Math.min(prev + step, max));
  };

  const decrementValue = () => {
    setValue((prev) => Math.max(prev - step, min));
  };
  return (
    <div className="w-full max-w-[160px] mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 flex flex-col items-center gap-4">
        <button
          onClick={incrementValue}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition"
          aria-label="Increment"
        >
          +
        </button>

        <div className="relative w-24 h-24">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              className="text-zinc-200 dark:text-zinc-700"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
              className="text-indigo-500"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={
                2 * Math.PI * 42 * (1 - percentage / 100)
              }
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

        <button
          onClick={decrementValue}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition"
          aria-label="Decrement"
        >
          −
        </button>

        <div className="w-full mt-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};