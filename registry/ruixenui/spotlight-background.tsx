"use client";
import React, { useState, useEffect, useRef } from "react";

const SpotlightBackground: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  // Use ReturnType<typeof setTimeout> for compatibility
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 150); // idle after 150ms
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Smooth circle spotlight */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: isMoving ? "220px" : "280px", // shrink when moving, expand when idle
          height: isMoving ? "220px" : "280px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.7) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default SpotlightBackground;
