"use client";

import { Sun, Moon, Wind } from "lucide-react";
import EnvironmentCard from "../ruixenui/environment-card";

export default function EnvironmentCardDemo() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <EnvironmentCard
        roomName="Living Room"
        temperature={22.5}
        devices={[
          {
            id: "1",
            name: "Main Light",
            status: "on",
            value: 80,
            unit: "%",
            icon: <Sun className="w-4 h-4" />,
          },
          {
            id: "2",
            name: "AC",
            status: "off",
            value: 22,
            unit: "°C",
            icon: <Wind className="w-4 h-4" />,
          },
        ]}
        scenes={[
          {
            id: "1",
            name: "Day",
            icon: <Sun className="w-4 h-4" />,
            isActive: false,
          },
          {
            id: "2",
            name: "Night",
            icon: <Moon className="w-4 h-4" />,
            isActive: true,
          },
        ]}
      />
    </div>
  );
}
