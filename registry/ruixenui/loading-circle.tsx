"use client";

import * as React from "react";

export const LoadingCircle: React.FC = () => {
  const circles = Array.from({ length: 8 }); // 8 ripple circles

  return (
    <div className="relative h-[250px] aspect-square">
      {circles.map((_, i) => (
        <span
          key={i}
          className={`
            absolute rounded-full 
            border 
            bg-gradient-to-tr 
            from-gray-300/5 to-gray-200/10 
            dark:from-gray-500/10 dark:to-gray-400/10 
            backdrop-blur-sm
          `}
          style={{
            inset: `${i * 5}%`,
            zIndex: 99 - i,
            borderColor: `rgba(100,100,100,${0.9 - i * 0.1})`,
            animation: `ripple 2s infinite ease-in-out ${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};
