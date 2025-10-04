"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// Example icons from lucide-react
import { Home, Search, Settings, User, Bell } from "lucide-react";

// ----------------------------
// Types
// ----------------------------
export interface DockItem {
  id: number;
  icon: React.ReactNode;
  label?: string;
}

export interface MagneticDockProps {
  /** Items shown in dock */
  items?: DockItem[];
  /** Dock placement */
  position?: "bottom" | "top" | "left";
  /** How strong the magnetic effect is (default: 18) */
  magneticStrength?: number;
  /** How much the hovered icon enlarges (default: 1.35) */
  hoverScale?: number;
}

// ----------------------------
// Default configuration
// ----------------------------
const defaultItems: DockItem[] = [
  { id: 1, icon: <Home className="h-7 w-7" />, label: "Home" },
  { id: 2, icon: <Search className="h-7 w-7" />, label: "Search" },
  { id: 3, icon: <Bell className="h-7 w-7" />, label: "Alerts" },
  { id: 4, icon: <Settings className="h-7 w-7" />, label: "Settings" },
  { id: 5, icon: <User className="h-7 w-7" />, label: "Profile" },
];

// ----------------------------
// Component
// ----------------------------
const MagneticDock: React.FC<MagneticDockProps> = ({
  items = defaultItems,
  position = "bottom",
  magneticStrength = 18,
  hoverScale = 1.35,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Calculate the shift for nearby icons
  const getTranslate = (index: number) => {
    if (hoverIndex === null) return 0;
    const distance = index - hoverIndex;
    if (Math.abs(distance) > 2) return 0; // Only affect nearby icons
    return -distance * magneticStrength;
  };

  return (
    <Card
      className={cn(
        "fixed flex gap-6 p-4 rounded-2xl shadow-xl backdrop-blur-xl",
        "bg-white/50 dark:bg-black/40 border border-white/20 dark:border-white/10",
        position === "bottom" && "bottom-6 left-1/2 -translate-x-1/2 flex-row",
        position === "top" && "top-6 left-1/2 -translate-x-1/2 flex-row",
        position === "left" && "left-6 top-1/2 -translate-y-1/2 flex-col",
      )}
    >
      {items.map((item, i) => (
        <motion.button
          key={item.id}
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
          animate={{
            y: position === "left" ? getTranslate(i) : 0,
            x: position !== "left" ? getTranslate(i) : 0,
            scale: hoverIndex === i ? hoverScale : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        >
          <div className="text-gray-700 dark:text-gray-200">{item.icon}</div>
          {item.label && (
            <motion.span
              className="absolute text-xs -bottom-5 text-gray-600 dark:text-gray-300"
              animate={{
                opacity: hoverIndex === i ? 1 : 0,
                y: hoverIndex === i ? 0 : 5,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
          )}
        </motion.button>
      ))}
    </Card>
  );
};

export default MagneticDock;
