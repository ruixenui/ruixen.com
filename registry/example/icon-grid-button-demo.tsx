"use client";

import IconGridButton from "@/registry/ruixenui/icon-grid-button";
import { MonitorDown, Settings, Star, Heart } from "lucide-react";

export default function DemoIconGridButton() {
  const icons = [
    { icon: <MonitorDown className="w-5 h-5" />, onClick: () => {} },
    { icon: <Star className="w-5 h-5" />, onClick: () => {} },
    { icon: <Heart className="w-5 h-5" />, onClick: () => {} },
    { icon: <Settings className="w-5 h-5" />, onClick: () => {} },
  ];

  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-4">
      <IconGridButton label="Quick Actions" icons={icons} />
    </div>
  );
}
