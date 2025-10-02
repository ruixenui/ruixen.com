"use client";

import { useState } from "react";
import RangeSliderInput from "@/registry/ruixenui/range-slider-input";

export default function RangeSliderDemoPage() {
  const [priceRange, setPriceRange] = useState({ from: 20, to: 80 });
  const [ageRange, setAgeRange] = useState({ from: 18, to: 50 });

  return (
    <main className="flex flex-col items-center justify-center p-12">
      <h1 className="text-2xl font-bold mb-6">Range Slider Demo</h1>

      <div className="w-full max-w-lg space-y-8">
        {/* Example 1: Price range with currency */}
        <RangeSliderInput
          label="Price Range"
          min={0}
          max={1000}
          step={10}
          unit="₹"
          value={priceRange}
          onChange={setPriceRange}
        />
        <p className="text-sm text-gray-600">
          Selected price: {priceRange.from} – {priceRange.to} ₹
        </p>

        {/* Example 2: Age range */}
        <RangeSliderInput
          label="Age Range"
          min={10}
          max={100}
          step={1}
          value={ageRange}
          onChange={setAgeRange}
        />
        <p className="text-sm text-gray-600">
          Selected age: {ageRange.from} – {ageRange.to} years
        </p>

        {/* Example 3: Temperature range */}
        <RangeSliderInput
          label="Temperature Range"
          min={-20}
          max={50}
          step={1}
          unit="°C"
        />
      </div>
    </main>
  );
}
