"use client";

import * as React from "react";
import {
  ParticleFlowCalendar,
  ParticleEvent,
} from "@/registry/ruixenui/particle-flow-calendar";

export default function ParticleFlowDemoPage() {
  const [events, setEvents] = React.useState<ParticleEvent[]>([
    {
      id: 1,
      title: "Conference Talk",
      date: new Date(),
    },
    {
      id: 2,
      title: "Hackathon Deadline",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Particle Flow Calendar Demo</h1>
      <ParticleFlowCalendar
        initialEvents={events}
        onEventsChange={setEvents}
        particleCount={36} // Optional: customize number of particles
        radius={160} // Optional: customize circle size
        size={450} // Optional: customize the overall container size
      />
    </div>
  );
}
