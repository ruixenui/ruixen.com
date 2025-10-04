"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VisualizerButtonProps {
  audioSrc: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function VisualizerButton({
  audioSrc,
  width = 60,
  height = 30,
  className,
}: VisualizerButtonProps) {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [levels, setLevels] = React.useState<number[]>(Array(5).fill(0));

  React.useEffect(() => {
    // Only create Audio instance on client side
    if (typeof window !== "undefined") {
      const audioElement = new Audio(audioSrc);
      setAudio(audioElement);
    }
  }, [audioSrc]);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isPlaying) {
      interval = setInterval(() => {
        setLevels((prev) => prev.map(() => Math.random() * height));
      }, 150);
    } else {
      setLevels(Array(5).fill(0));
    }

    return () => clearInterval(interval);
  }, [isPlaying, height]);

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      className={cn(
        "relative flex items-end justify-between px-2 py-1",
        className,
      )}
      onClick={togglePlay}
      variant="outline"
      style={{ width, height }}
    >
      {levels.map((lvl, idx) => (
        <div
          key={idx}
          className="bg-blue-500 dark:bg-white rounded-sm transition-all duration-150"
          style={{ width: 4, height: `${lvl}px` }}
        />
      ))}
    </Button>
  );
}
