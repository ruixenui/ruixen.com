"use client";

import { useState } from "react";
import { CalendarLume } from "@/registry/ruixenui/calendar-lume";

export default function CalendarLumeDemo() {
  const [date, setDate] = useState<string>();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "24px 16px",
      }}
    >
      <CalendarLume value={date} onChange={setDate} />
      {date && (
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "monospace",
          }}
        >
          {date}
        </span>
      )}
    </div>
  );
}
