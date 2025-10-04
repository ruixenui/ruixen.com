"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PodcastCardPlayerProps {
  imageSrc: string;
  title: string;
  episode: string;
  audioSrc: string;
  width?: number;
  className?: string;
}

export default function PodcastCardPlayer({
  imageSrc,
  title,
  episode,
  audioSrc,
  width = 350,
  className,
}: PodcastCardPlayerProps) {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    // Only create Audio instance on client side
    if (typeof window !== "undefined") {
      const audioElement = new Audio(audioSrc);
      setAudio(audioElement);

      const handleTimeUpdate = () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
        setCurrentTime(audioElement.currentTime);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 gap-3",
        className,
      )}
      style={{ width }}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{episode}</p>
      </div>

      {/* Waveform/Progress */}
      <div
        className="relative w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-black dark:bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center w-full">
        <Button
          onClick={togglePlay}
          className="text-sm px-3 py-1"
          variant="outline"
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <span className="text-xs text-gray-500 dark:text-gray-300">
          {formatTime(currentTime)} / {formatTime(audio?.duration || 0)}
        </span>
      </div>
    </div>
  );
}
