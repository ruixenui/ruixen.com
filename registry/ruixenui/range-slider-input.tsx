"use client";

import { useId, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

interface RangeSliderInputProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  value?: { from: number; to: number };
  onChange?: (val: { from: number; to: number }) => void;
}

export default function RangeSliderInput({
  label = "Select Range",
  min = 0,
  max = 100,
  step = 1,
  unit,
  value,
  onChange,
}: RangeSliderInputProps) {
  const id = useId();
  const [range, setRange] = useState<{ from: number; to: number }>({
    from: value?.from ?? min,
    to: value?.to ?? max,
  });

  useEffect(() => {
    if (value) setRange(value);
  }, [value]);

  const handleFromChange = (val: number) => {
    const newFrom = Math.min(val, range.to);
    setRange({ ...range, from: newFrom });
    onChange?.({ ...range, from: newFrom });
  };

  const handleToChange = (val: number) => {
    const newTo = Math.max(val, range.from);
    setRange({ ...range, to: newTo });
    onChange?.({ ...range, to: newTo });
  };

  const increment = (key: "from" | "to") => {
    if (key === "from") handleFromChange(Math.min(range.from + step, range.to));
    else handleToChange(Math.min(range.to + step, max));
  };

  const decrement = (key: "from" | "to") => {
    if (key === "from") handleFromChange(Math.max(range.from - step, min));
    else handleToChange(Math.max(range.to - step, range.from));
  };

  const inputClass =
    "flex-1 pr-10 rounded relative [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0";

  return (
    <div className="w-md mx-auto space-y-3">
      <Label htmlFor={id}>{label}</Label>

      {/* Slider */}
      <div className="relative h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.from}
          onChange={(e) => handleFromChange(Number(e.target.value))}
          className={cn(
            "absolute w-full h-[2px] bg-gray-300 rounded-lg appearance-none z-20 pointer-events-auto accent-primary",
          )}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.to}
          onChange={(e) => handleToChange(Number(e.target.value))}
          className={cn(
            "absolute w-full h-1 bg-gray-300 rounded-lg appearance-none z-20 pointer-events-auto accent-secondary",
          )}
        />
        <div
          className="absolute h-1 bg-primary rounded-lg"
          style={{
            left: `${((range.from - min) / (max - min)) * 100}%`,
            width: `${((range.to - range.from) / (max - min)) * 100}%`,
          }}
        />
      </div>

      {/* Inputs with Lucide Icons */}
      <div className="flex relative">
        <div className="relative flex-1">
          <Input
            id={`${id}-from`}
            type="number"
            min={min}
            max={range.to}
            step={step}
            value={range.from}
            onChange={(e) => handleFromChange(Number(e.target.value))}
            className={inputClass + " rounded-e-none rounded-lg rounded-r-none"}
            placeholder="From"
          />
          <div className="absolute top-1/2 end-2 -translate-y-1/2 flex flex-col">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => increment("from")}
            >
              <ChevronUp size={14} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => decrement("from")}
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="relative flex-1">
          <Input
            id={`${id}-to`}
            type="number"
            min={range.from}
            max={max}
            step={step}
            value={range.to}
            onChange={(e) => handleToChange(Number(e.target.value))}
            className={inputClass + " rounded-s-none rounded-lg rounded-l-none"}
            placeholder="To"
          />
          <div className="absolute top-1/2 end-2 -translate-y-1/2 flex flex-col">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => increment("to")}
            >
              <ChevronUp size={14} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => decrement("to")}
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {unit && (
          <span className="flex items-center px-2 text-muted-foreground">
            {unit}
          </span>
        )}
      </div>

      {/* Validation */}
      {range.from > range.to && (
        <p className="text-xs text-red-500 mt-1">“From” should be ≤ “To”</p>
      )}
    </div>
  );
}
