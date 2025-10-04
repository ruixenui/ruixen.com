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
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <MagneticDock
        items={customItems}
        position="bottom"
        magneticStrength={20}
        hoverScale={1.5}
      />
    </div>
  );
}
