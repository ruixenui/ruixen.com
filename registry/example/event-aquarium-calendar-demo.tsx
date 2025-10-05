"use client";

import { EventAquariumCalendar } from "@/registry/ruixenui/event-aquarium-calendar";

export default function EventAquariumDemoPage() {
  return (
    <main className="p-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">
          🐠 Event Aquarium Calendar Demo
        </h1>
        <EventAquariumCalendar bubbleCount={40} width={500} height={500} />
      </div>
    </main>
  );
}
