"use client";

import React from "react";

interface SolarLoaderProps {
  size?: number; // size of the sun
  speed?: number; // animation speed multiplier
  className?: string;
}

const SolarLoader: React.FC<SolarLoaderProps> = ({
  size = 40,
  speed = 1,
  className,
}) => {
  const planets = [
    {
      name: "Mercury",
      color: "from-gray-500 to-gray-800 dark:from-gray-300 dark:to-gray-600",
      orbit: 2.5,
      size: 0.3,
      duration: 2,
    },
    {
      name: "Venus",
      color:
        "from-yellow-400 to-yellow-700 dark:from-yellow-200 dark:to-yellow-500",
      orbit: 3.5,
      size: 0.4,
      duration: 3,
    },
    {
      name: "Earth",
      color: "from-sky-400 to-blue-900 dark:from-sky-300 dark:to-blue-700",
      orbit: 4.5,
      size: 0.45,
      duration: 4,
    },
    {
      name: "Mars",
      color: "from-red-400 to-red-800 dark:from-red-300 dark:to-red-700",
      orbit: 5.5,
      size: 0.4,
      duration: 5,
    },
    {
      name: "Jupiter",
      color:
        "from-amber-400 to-amber-800 dark:from-amber-300 dark:to-amber-700",
      orbit: 7,
      size: 0.8,
      duration: 6,
    },
    {
      name: "Saturn",
      color:
        "from-orange-400 to-orange-800 dark:from-orange-300 dark:to-orange-700",
      orbit: 8,
      size: 0.7,
      duration: 7,
      ring: true,
    },
    {
      name: "Uranus",
      color: "from-teal-300 to-cyan-700 dark:from-teal-200 dark:to-cyan-600",
      orbit: 9,
      size: 0.6,
      duration: 8,
    },
    {
      name: "Neptune",
      color:
        "from-blue-500 to-indigo-900 dark:from-blue-400 dark:to-indigo-700",
      orbit: 10,
      size: 0.6,
      duration: 9,
    },
  ];

  return (
    <div
      className={`relative mx-auto flex items-center justify-center ${className}`}
      style={{
        width: `${size * 10}px`,
        height: `${size * 10}px`,
        perspective: "1200px",
      }}
    >
      <div
        className="relative animate-[tilt_10s_infinite_linear] [transform-style:preserve-3d]"
        style={{ width: "100%", height: "100%" }}
      >
        {/*  Diagonal Axis Line */}
        <div
          className="absolute left-1/2 top-40 bg-gradient-to-r from-neutral-300/70 to-neutral-500/70 dark:from-neutral-500/60 dark:to-neutral-300/60"
          style={{
            width: `${size * 10}px`,
            height: "1.5px",
            transform: "translate(-50%, -50%) rotate(38deg)",
            boxShadow: "0 0 8px rgba(255,255,255,0.3)",
            zIndex: 0,
          }}
        />

        {/* Sun */}
        <div
          className="absolute flex items-center justify-center rounded-full shadow-lg
                     bg-gradient-to-br from-yellow-300 to-orange-500 dark:from-yellow-200 dark:to-orange-400"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            boxShadow:
              "0 0 40px rgba(255, 200, 0, 0.7), inset 0 0 15px rgba(255,255,255,0.5)",
            transform: "translateZ(30px)",
            zIndex: 10,
          }}
        />

        {/* Planets + Orbits */}
        {planets.map((planet, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-neutral-300 dark:border-neutral-700"
            style={{
              width: `${planet.orbit * size}px`,
              height: `${planet.orbit * size}px`,
              animation: `orbit3d ${planet.duration / speed}s linear infinite`,
              transformStyle: "preserve-3d",
              transform: `rotateX(20deg) translateZ(${(i % 2 === 0 ? 1 : -1) * 25}px)`,
            }}
          >
            <div
              className={`absolute rounded-full bg-gradient-to-br ${planet.color} shadow-inner`}
              style={{
                width: `${planet.size * size}px`,
                height: `${planet.size * size}px`,
                top: "50%",
                left: "100%",
                transform: "translate(-50%, -50%) rotateX(15deg)",
                boxShadow:
                  "inset -6px -6px 12px rgba(0,0,0,0.6), inset 4px 4px 8px rgba(255,255,255,0.2)",
              }}
            >
              {/* Reflection spot */}
              <div
                className="absolute rounded-full bg-white/40 blur-[2px]"
                style={{
                  width: `${planet.size * size * 0.3}px`,
                  height: `${planet.size * size * 0.3}px`,
                  top: "25%",
                  left: "25%",
                  opacity: 0.6,
                }}
              />

              {/* Saturn’s ring */}
              {planet.ring && (
                <div
                  className="absolute bg-gradient-to-r from-neutral-300 to-neutral-500 dark:from-neutral-400 dark:to-neutral-200 opacity-80"
                  style={{
                    width: `${planet.size * size * 2}px`,
                    height: "1.5px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(25deg)",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inject keyframes
const style = `
@keyframes orbit3d {
  0% { transform: rotateX(20deg) rotateY(0deg); }
  100% { transform: rotateX(20deg) rotateY(-360deg); }
}

@keyframes tilt {
  0%, 100% { transform: rotateX(10deg) rotateY(0deg); }
  50% { transform: rotateX(-10deg) rotateY(10deg); }
}
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("orbit3d-keyframes")
) {
  const styleEl = document.createElement("style");
  styleEl.id = "orbit3d-keyframes";
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
}

export default SolarLoader;
