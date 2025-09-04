"use client";

import ScheduleCard from "../ruixenui/schedule-card";

export default function ScheduleCardDemo() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ScheduleCard
        date="Today, December 14"
        events={[
          {
            title: "Design Review",
            time: "10:00 AM",
            attendees: 5,
            status: "completed",
          },
          {
            title: "Team Sync",
            time: "2:30 PM",
            attendees: 8,
            status: "inProgress",
          },
          {
            title: "Product Planning",
            time: "4:00 PM",
            attendees: 12,
            status: "upcoming",
          },
        ]}
      />
    </div>
  );
}
