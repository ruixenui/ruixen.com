"use client";

import { useState } from "react";
import { ClockIcon, ChevronDownIcon } from "lucide-react";

export default function BetterTimePicker() {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [openHour, setOpenHour] = useState(false);
  const [openMinute, setOpenMinute] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0"),
  ); // step 5

  return (
    <div className="w-full max-w-xs mx-auto space-y-2 relative">
      <label className="block text-sm font-medium text-black dark:text-white mb-1">
        Select Time
      </label>
      <div className="flex items-center border border-black/30 dark:border-white/30 rounded-lg px-3 py-2 bg-transparent">
        <ClockIcon
          size={16}
          className="text-black/50 dark:text-white/50 mr-2"
        />
        {/* Hour Dropdown */}
        <div className="relative flex-1">
          <div
            className="flex justify-between items-center cursor-pointer text-black dark:text-white"
            onClick={() => setOpenHour((prev) => !prev)}
          >
            {hour}
            <ChevronDownIcon
              size={14}
              className="ml-1 text-black/50 dark:text-white/50"
            />
          </div>
          {openHour && (
            <div className="absolute z-10 mt-1 w-full max-h-40 overflow-auto border border-black/30 dark:border-white/30 rounded-lg bg-white dark:bg-black shadow-md">
              {hours.map((h) => (
                <div
                  key={h}
                  className="px-3 py-1 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer text-black dark:text-white text-sm"
                  onClick={() => {
                    setHour(h);
                    setOpenHour(false);
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="mx-1 text-black/50 dark:text-white/50">:</span>

        {/* Minute Dropdown */}
        <div className="relative flex-1">
          <div
            className="flex justify-between items-center cursor-pointer text-black dark:text-white"
            onClick={() => setOpenMinute((prev) => !prev)}
          >
            {minute}
            <ChevronDownIcon
              size={14}
              className="ml-1 text-black/50 dark:text-white/50"
            />
          </div>
          {openMinute && (
            <div className="absolute z-10 mt-1 w-full max-h-40 overflow-auto border border-black/30 dark:border-white/30 rounded-lg bg-white dark:bg-black shadow-md">
              {minutes.map((m) => (
                <div
                  key={m}
                  className="px-3 py-1 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer text-black dark:text-white text-sm"
                  onClick={() => {
                    setMinute(m);
                    setOpenMinute(false);
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-black/50 dark:text-white/50 mt-1">
        Select hour and minute separately. Step 5 minutes for faster selection.
      </p>
    </div>
  );
}
