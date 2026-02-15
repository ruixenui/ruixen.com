"use client";

import { useState } from "react";
import { DrumPicker } from "@/registry/ruixenui/drum-picker";

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0"),
);
const periods = ["AM", "PM"];

export default function DrumPickerDemo() {
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState("AM");

  return (
    <div className="flex min-h-[420px] w-full max-w-sm mx-auto flex-col items-center justify-center gap-2 px-4">
      {/* Formatted time readout */}
      <span className="text-[28px] font-[580] tracking-[-0.03em] text-white tabular-nums leading-none">
        {hour}
        <span className="text-neutral-600">:</span>
        {minute}{" "}
        <span className="text-neutral-500 text-[17px] font-[450]">
          {period}
        </span>
      </span>

      {/* Three-drum composition */}
      <div className="flex items-center w-full">
        <div className="flex-1">
          <DrumPicker items={hours} value={hour} onChange={setHour} />
        </div>
        <span className="text-[20px] font-[500] text-neutral-700 shrink-0 -mx-1">
          :
        </span>
        <div className="flex-1">
          <DrumPicker items={minutes} value={minute} onChange={setMinute} />
        </div>
        <div className="w-[76px] shrink-0">
          <DrumPicker items={periods} value={period} onChange={setPeriod} />
        </div>
      </div>
    </div>
  );
}
