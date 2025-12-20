"use client";

import { TourPopover, TourStep } from "@/registry/ruixenui/tour-popover";
import { Home, Settings, HelpCircle, Keyboard } from "lucide-react";

const steps: TourStep[] = [
  {
    icon: Home,
    title: "Dashboard",
    description: "This is your dashboard where you see your project overview.",
  },
  {
    icon: Settings,
    title: "Settings",
    description: "Adjust your preferences and configure your workspace.",
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Access our help center and documentation anytime.",
  },
  {
    icon: Keyboard,
    title: "Shortcuts",
    description: "Use shortcuts to navigate faster and improve productivity.",
  },
];

export default function TourDemoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <TourPopover
        steps={steps}
        triggerLabel="Take a tour"
        popoverWidth="w-96"
        side="right"
        align="start"
      />
    </div>
  );
}
