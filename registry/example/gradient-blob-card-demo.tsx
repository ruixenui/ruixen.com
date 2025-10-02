"use client";

import React from "react";
import GradientBlobCard from "@/registry/ruixenui/gradient-blob-card";

const GradientBlobDemo: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-8 p-8 justify-center">
      {/* Default card */}
      <GradientBlobCard />

      {/* Taller card with different gradient */}
      <GradientBlobCard
        width={220}
        height={380}
        gradientColors="from-purple-500 via-indigo-500 to-blue-500"
        blobMoveX={60}
        blobMoveY={30}
      />

      {/* Smaller card with larger blur */}
      <GradientBlobCard
        width={180}
        height={320}
        gradientColors="from-green-400 via-teal-400 to-cyan-400"
        blur={16}
        blobMoveX={40}
        blobMoveY={50}
      />

      {/* Square card */}
      <GradientBlobCard
        width={250}
        height={250}
        gradientColors="from-yellow-400 via-orange-400 to-red-400"
        blobMoveX={50}
        blobMoveY={50}
      />

      {/* Custom rounded card */}
      <GradientBlobCard
        width={200}
        height={350}
        borderRadius={24}
        gradientColors="from-pink-300 via-pink-500 to-purple-500"
        blobMoveX={70}
        blobMoveY={30}
        animationDuration={6}
      />
    </div>
  );
};

export default GradientBlobDemo;
