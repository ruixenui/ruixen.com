"use client";

import { ThreeDWallCalendar } from "@/registry/ruixenui/three-dwall-calendar";

export default function ThreeDWallCalendarDemo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <ThreeDWallCalendar
        events={[
          { id: "1", title: "Kickoff meeting", date: `${y}-${m}-03` },
          { id: "2", title: "Design sync", date: `${y}-${m}-05` },
          { id: "3", title: "Code review", date: `${y}-${m}-05` },
          { id: "4", title: "Sprint planning", date: `${y}-${m}-10` },
          { id: "5", title: "Standup", date: `${y}-${m}-11` },
          { id: "6", title: "Demo day", date: `${y}-${m}-14` },
          { id: "7", title: "Retro", date: `${y}-${m}-15` },
          { id: "8", title: "Ship it", date: `${y}-${m}-22` },
          { id: "9", title: "Offsite", date: `${y}-${m}-25` },
          { id: "10", title: "Team dinner", date: `${y}-${m}-25` },
        ]}
      />
    </div>
  );
}
