"use client";
import { Camera, Heart, Star, Music } from "lucide-react";
import TiltedDock, { DockItem } from "@/registry/ruixenui/tilted-dock";

const customItems: DockItem[] = [
  { id: 1, icon: <Camera size={28} />, label: "Camera" },
  { id: 2, icon: <Heart size={28} />, label: "Favorites" },
  { id: 3, icon: <Music size={28} />, label: "Music" },
  { id: 4, icon: <Star size={28} />, label: "Stars" },
];

export default function TiltedDockDemo() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <TiltedDock
        items={customItems}
        tilt={{ baseX: 20, maxY: 15 }}
        hoverScale={1.5}
      />
    </div>
  );
}
