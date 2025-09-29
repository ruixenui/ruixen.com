"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUp, ChevronDown } from "lucide-react";

interface InputWithSelectProps {
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  step?: number;
}

export default function InputWithSelect({
  label = "Amount",
  placeholder = "0.00",
  options = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "inr", label: "INR" },
  ],
  defaultValue = "usd",
  step = 1,
}: InputWithSelectProps) {
  const id = useId();
  const [value, setValue] = useState<number | string>("");

  const handleIncrement = () => {
    const num = parseFloat(value as string) || 0;
    setValue((num + step).toString());
  };

  const handleDecrement = () => {
    const num = parseFloat(value as string) || 0;
    setValue((num - step).toString());
  };

  return (
    <div className="space-y-2 w-full max-w-sm">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center rounded-xl border bg-background shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition">
        <div className="relative flex-1">
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 border-0 bg-transparent pr-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-2 space-y-0.5">
            <button
              type="button"
              onClick={handleIncrement}
              className="p-0.5 text-muted-foreground hover:text-primary"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="p-0.5 text-muted-foreground hover:text-primary"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Select defaultValue={defaultValue}>
          <SelectTrigger className="w-24 border-0 border-l">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
