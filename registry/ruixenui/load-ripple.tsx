"use client";

import * as React from "react";

export const LoadRipple: React.FC = () => {
  return (
    <div className="relative h-[250px] aspect-square">
      {/* Ripple circles */}
      <span className="absolute inset-[40%] rounded-full border border-gray-500/80 dark:border-gray-300/80 animate-[ripple_2s_infinite_ease-in-out] bg-gradient-to-tr from-gray-500/10 to-gray-400/10 backdrop-blur-sm z-[98]" />
      <span className="absolute inset-[30%] rounded-full border border-gray-500/60 dark:border-gray-300/60 animate-[ripple_2s_infinite_ease-in-out_0.2s] bg-gradient-to-tr from-gray-500/10 to-gray-400/10 backdrop-blur-sm z-[97]" />
      <span className="absolute inset-[20%] rounded-full border border-gray-500/40 dark:border-gray-300/40 animate-[ripple_2s_infinite_ease-in-out_0.4s] bg-gradient-to-tr from-gray-500/10 to-gray-400/10 backdrop-blur-sm z-[96]" />
      <span className="absolute inset-[10%] rounded-full border border-gray-500/30 dark:border-gray-300/30 animate-[ripple_2s_infinite_ease-in-out_0.6s] bg-gradient-to-tr from-gray-500/10 to-gray-400/10 backdrop-blur-sm z-[95]" />
      <span className="absolute inset-0 rounded-full border border-gray-500/20 dark:border-gray-300/20 animate-[ripple_2s_infinite_ease-in-out_0.8s] bg-gradient-to-tr from-gray-500/10 to-gray-400/10 backdrop-blur-sm z-[94]" />
    </div>
  );
};
