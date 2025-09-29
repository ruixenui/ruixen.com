"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sun, Moon, Clock } from "lucide-react";

interface TimeWithIconProps {
  label?: string;
  defaultTime?: string; // format "HH:MM"
}

export default function TimeWithIcon({
  label = "Select Time",
  defaultTime,
}: TimeWithIconProps) {
  const [time, setTime] = useState(defaultTime || "");
  const [Icon, setIcon] = useState(() => Clock); // default icon

  // Update icon based on time
  useEffect(() => {
    if (!time) {
      setIcon(() => Clock);
      return;
    }

    const [hours] = time.split(":").map(Number);
    if (hours >= 6 && hours < 18) {
      setIcon(() => Sun); // day
    } else {
      setIcon(() => Moon); // night
    }
  }, [time]);

  return (
    <div className="w-full max-w-sm relative">
      <Label className="text-foreground text-sm font-medium">{label}</Label>
      <div className="relative mt-1">
        {/* Icon */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/80">
          <Icon size={16} aria-hidden="true" />
        </div>

        {/* Time input */}
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="ps-9 h-10"
        />
      </div>
    </div>
  );
}
