"use client";

import React from "react";

interface GradientBlobCardProps {
  width?: number; // card width in px
  height?: number; // card height in px
  borderRadius?: number; // card border radius
  gradientColors?: string; // Tailwind gradient classes e.g. "from-pink-500 via-red-500 to-yellow-500"
  blur?: number; // blob blur in px
  backdropBlur?: number; // glass blur in px
  blobMoveX?: number; // movement in X direction (px)
  blobMoveY?: number; // movement in Y direction (px)
  animationDuration?: number; // duration in seconds
}

const GradientBlobCard: React.FC<GradientBlobCardProps> = ({
  width = 200,
  height = 350,
  borderRadius = 14,
  gradientColors = "from-pink-500 via-red-500 to-yellow-500",
  blur = 12,
  backdropBlur = 24,
  blobMoveX = 50,
  blobMoveY = 200,
  animationDuration = 1,
}) => {
  // Inner glass ratio (5px padding)
  const glassWidth = width - 10;
  const glassHeight = height - 10;

  // Blob size based on max dimension
  const blobSize = Math.max(width, height) * 0.5;

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
      }}
    >
      {/* Glassy Background */}
      <div
        className="absolute z-10 rounded"
        style={{
          top: 5,
          left: 5,
          width: `${glassWidth}px`,
          height: `${glassHeight}px`,
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: `blur(${backdropBlur}px)`,
          borderRadius: `${borderRadius - 4}px`,
          outline: "2px solid white",
        }}
      ></div>

      {/* Animated Gradient Blob */}
      <div
        className={`absolute z-0 rounded-full animate-blob filter blur-[${blur}px] bg-gradient-to-r ${gradientColors}`}
        style={{
          top: "50%",
          left: "50%",
          width: `${blobSize}px`,
          height: `${blobSize}px`,
          marginLeft: `-${blobSize / 2}px`,
          marginTop: `-${blobSize / 2}px`,
        }}
      ></div>

      {/* Inline keyframes animation */}
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(${blobMoveX}px, -${blobMoveY}px); }
            50% { transform: translate(${blobMoveX}px, ${blobMoveY}px); }
            75% { transform: translate(-${blobMoveX}px, ${blobMoveY}px); }
            100% { transform: translate(0px, 0px); }
          }
          .animate-blob { 
            animation: blob ${animationDuration}s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default GradientBlobCard;
