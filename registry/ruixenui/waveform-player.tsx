"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WaveformPlayerProps {
  audioSrc: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function WaveformPlayer({
  audioSrc,
  width = 400,
  height = 60,
  className,
}: WaveformPlayerProps) {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Only create Audio instance on client side
    if (typeof window !== "undefined") {
      const audioElement = new Audio(audioSrc);
      setAudio(audioElement);

      const handleTimeUpdate = () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.pause();
      };
    }
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = seekTime;
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="relative w-full rounded-md cursor-pointer overflow-hidden"
        style={{ width, height }}
        onClick={handleSeek}
      >
        {/* Background wave */}
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {Array.from({ length: 40 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-sm bg-black dark:bg-white"
              style={{
                width: 2,
                height: `${10 + Math.random() * (height - 20)}px`,
              }}
            />
          ))}
        </div>

        {/* Progress overlay */}
        <div
          className="absolute top-0 left-0 h-full rounded-md bg-black dark:bg-white"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <Button
        onClick={togglePlay}
        className="w-20 text-sm px-2 py-1"
        variant="outline"
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </div>
  );
}
