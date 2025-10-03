"use client";

import React from "react";

export default function RainBackground() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      {/* Animated Rain Streaks */}
      <div className="absolute inset-0 w-full h-full rain-container"></div>

      {/* Glow Orbs Layer (only two colors) */}
      <div className="absolute inset-0 w-full h-full glow-container"></div>

      {/* Overlay Grid */}
      <div className="absolute inset-0 z-10 backdrop-blur-[0.6em] backdrop-brightness-[5] bg-[radial-gradient(circle_at_50%_50%,_#0000_0,_#0000_2px,_hsl(0_0%_7%)_2px)] bg-[length:12px_12px]"></div>

      <style>{`
        /* RAIN STREAKS */
        .rain-container {
          --c1: #5a4fff; /* neon blue */
          --c2: #9d4edd; /* neon purple */
          background-color: #000;
          background-image: 
            radial-gradient(3px 120px at 0px 200px, var(--c1), #0000),
            radial-gradient(3px 120px at 300px 200px, var(--c2), #0000),
            radial-gradient(3px 100px at 150px 100px, var(--c1), #0000),
            radial-gradient(2px 80px at 75px 150px, var(--c2), #0000),
            radial-gradient(2px 80px at 225px 250px, var(--c1), #0000);
          background-size: 300px 300px;
          animation: rainFlow 90s linear infinite;
          opacity: 0.55;
        }

        @keyframes rainFlow {
          0% {
            background-position: 0px 0px, 300px 0px, 150px 0px, 75px 0px, 225px 0px;
          }
          100% {
            background-position: 0px 6000px, 300px 6000px, 150px 6000px, 75px 6000px, 225px 6000px;
          }
        }

        /* GLOW ORBS – only two tones */
        .glow-container {
          background-image: 
            radial-gradient(circle at 25% 30%, rgba(90, 79, 255, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 75% 70%, rgba(157, 78, 221, 0.25) 0%, transparent 50%);
          animation: glowShift 70s ease-in-out infinite alternate;
          opacity: 0.7;
        }

        @keyframes glowShift {
          from {
            background-position: 25% 30%, 75% 70%;
          }
          to {
            background-position: 28% 35%, 72% 65%;
          }
        }
      `}</style>
    </div>
  );
}
