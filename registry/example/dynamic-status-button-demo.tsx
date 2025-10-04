"use client";

import DynamicStatusButton, {
  ButtonStatus,
} from "@/registry/ruixenui/dynamic-status-button";
import { FaSun, FaMoon, FaCloud, FaBolt } from "react-icons/fa";

export default function DynamicStatusButtonDemo() {
  const statuses: ButtonStatus[] = [
    { label: "Sunny", icon: <FaSun />, color: "#e5e7eb", textColor: "#111827" }, // light gray background, dark text
    {
      label: "Night",
      icon: <FaMoon />,
      color: "#374151",
      textColor: "#f9fafb",
    }, // dark gray background, light text
    {
      label: "Cloudy",
      icon: <FaCloud />,
      color: "#9ca3af",
      textColor: "#111827",
    }, // medium gray background, dark text
    {
      label: "Storm",
      icon: <FaBolt />,
      color: "#6b7280",
      textColor: "#f9fafb",
    }, // slate gray background, light text
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      <DynamicStatusButton
        statuses={statuses}
        onClick={(status) => console.log("Current Status:", status.label)}
      />
      <DynamicStatusButton
        statuses={statuses}
        width={200}
        className="rounded-xl text-lg"
      />
    </div>
  );
}
