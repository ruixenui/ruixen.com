"use client";

import React from "react";

const GradientBlobCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div
        className="relative w-[200px] h-[250px] rounded-[14px] flex flex-col items-center justify-center
                      shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#111,-20px_-20px_60px_#222]
                      overflow-hidden"
      >
        {/* Glassy Background */}
        <div
          className="absolute top-[5px] left-[5px] w-[190px] h-[240px] bg-white/95 dark:bg-black/70 backdrop-blur-[24px]
                        rounded-[10px] outline outline-2 outline-white dark:outline-gray-700 z-10"
        ></div>

        {/* Animated Gradient Blob (same bold colors for light & dark mode) */}
        <div
          className="absolute top-1/2 left-1/2 w-[150px] h-[150px] rounded-full opacity-100
                        filter blur-[12px] z-0 animate-blob 
                        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
        ></div>

        {/* Inline keyframes animation */}
        <style>
          {`
            @keyframes blob {
              0% {
                transform: translate(-100%, -100%);
              }
              25% {
                transform: translate(0%, -100%);
              }
              50% {
                transform: translate(0%, 0%);
              }
              75% {
                transform: translate(-100%, 0%);
              }
              100% {
                transform: translate(-100%, -100%);
              }
            }

            .animate-blob {
              animation: blob 5s linear infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default GradientBlobCard;
