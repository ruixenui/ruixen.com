"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface CarouselOption {
  value: string;
  label: string;
  color?: string;
}

interface Carousel3DSelectProps {
  options: CarouselOption[];
  label?: string;
  placeholder?: string;
  radius?: number; // 3D radius
  itemWidth?: number;
  itemHeight?: number;
  onChange?: (value: string) => void;
  defaultValue?: string;
  selectWidth?: string | number;
}

export const Carousel3DSelect: React.FC<Carousel3DSelectProps> = ({
  options,
  label,
  placeholder = "Select...",
  radius = 150,
  itemWidth = 80,
  itemHeight = 50,
  onChange,
  defaultValue,
  selectWidth = "200px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const [rotation, setRotation] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const angleStep = 360 / options.length;

  const handleSelect = (value: string, idx: number) => {
    setSelected(value);
    onChange?.(value);
    setCurrentIndex(idx);
    setRotation(-idx * angleStep);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + options.length) % options.length;
    handleSelect(options[newIndex].value, newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % options.length;
    handleSelect(options[newIndex].value, newIndex);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hidden shadcn Select for accessibility */}
      <Select defaultValue={defaultValue} onValueChange={setSelected}>
        <SelectTrigger className="w-[1px] h-[1px] p-0 overflow-hidden">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          <SelectGroup>
            {label && <span className="font-semibold">{label}</span>}
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Arrows */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Carousel container */}
        <div
          className="relative w-[300px] h-[200px] perspective-[1000px]"
          style={{ perspective: 800 }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {options.map((opt, idx) => {
              const angle = idx * angleStep;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value, idx)}
                  className={cn(
                    "absolute flex items-center justify-center cursor-pointer rounded-lg shadow-md",
                    selected === opt.value
                      ? "ring-2 ring-blue-500"
                      : "opacity-70",
                  )}
                  style={{
                    width: itemWidth,
                    height: itemHeight,
                    backgroundColor: opt.color || "#f3f4f6",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {selected && (
        <p className="mt-2">
          Selected: <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
};
