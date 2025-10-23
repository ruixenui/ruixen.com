"use client";
import MagneticDock, { DockItem } from "@/registry/ruixenui/magnetic-dock";
import { Camera, Music, Heart, Star } from "lucide-react";

const customItems: DockItem[] = [
  { id: 1, icon: <Camera className="h-7 w-7" />, label: "Camera" },
  { id: 2, icon: <Music className="h-7 w-7" />, label: "Music" },
  { id: 3, icon: <Heart className="h-7 w-7" />, label: "Likes" },
  { id: 4, icon: <Star className="h-7 w-7" />, label: "Stars" },
];

export default function MagneticDockDemo() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <MagneticDock
        items={customItems}
        position="bottom"
        magneticStrength={20}
        hoverScale={1.5}
      />
    </div>
  );
}
