"use client";
import { motion } from "framer-motion";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";

// ----------------------------
// Type definitions
// ----------------------------
export interface DockItem {
  id: number;
  icon: React.ReactNode;
  label: string;
}

export interface TiltedDockProps {
  /** Dock items to display */
  items?: DockItem[];
  /** Overall tilt of the dock container */
  tilt?: {
    baseX?: number; // default: 18 degrees tilt forward
    maxY?: number; // default: 10 degrees left-right tilt
  };
  /** Scale factor for hovered item */
  hoverScale?: number;
}

// ----------------------------
// Default dock items
// ----------------------------
const defaultItems: DockItem[] = [
  { id: 1, icon: <Home size={28} />, label: "Home" },
  { id: 2, icon: <Search size={28} />, label: "Search" },
  { id: 3, icon: <Bell size={28} />, label: "Alerts" },
  { id: 4, icon: <User size={28} />, label: "Profile" },
  { id: 5, icon: <Settings size={28} />, label: "Settings" },
];

// ----------------------------
// Component
// ----------------------------
const TiltedDock: React.FC<TiltedDockProps> = ({
  items = defaultItems,
  tilt = { baseX: 18, maxY: 10 },
  hoverScale = 1.4,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex gap-10 px-12 py-6 rounded-3xl 
                   backdrop-blur-2xl bg-white/30 dark:bg-black/30 
                   border border-white/20 dark:border-white/10 
                   shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: tilt.baseX,
          rotateY: mouse.x * (tilt.maxY ?? 10),
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="relative flex flex-col items-center justify-center"
            onHoverStart={() => setHovered(item.id)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              scale: hovered === item.id ? hoverScale : 1,
              z: hovered === item.id ? 120 : hovered ? -20 : 0,
              opacity: hovered && hovered !== item.id ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Icon */}
            <motion.div
              animate={{
                rotateX: hovered === item.id ? -10 : 0,
                rotateY: hovered === item.id ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-gray-900 dark:text-gray-100"
            >
              {item.icon}
            </motion.div>

            {/* Label */}
            <motion.span
              className="absolute -bottom-8 text-xs font-medium 
                         text-gray-800 dark:text-gray-200"
              animate={{
                opacity: hovered === item.id ? 1 : 0,
                y: hovered === item.id ? 0 : 5,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TiltedDock;
