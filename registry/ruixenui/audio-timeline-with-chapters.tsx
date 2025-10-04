"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Chapter {
  time: number; // in seconds
  label: string;
}

interface AudioTimelineWithChaptersProps {
  audioSrc: string;
  chapters: Chapter[];
  width?: number;
  className?: string;
}

export default function AudioTimelineWithChapters({
  audioSrc,
  chapters,
  width = 400,
  className,
}: AudioTimelineWithChaptersProps) {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState<number>(0);

  React.useEffect(() => {
    // Only create Audio instance on client side
    if (typeof window !== "undefined") {
      const audioElement = new Audio(audioSrc);
      setAudio(audioElement);

      const handleTimeUpdate = () => {
        if (audioElement.duration) {
          setProgress((audioElement.currentTime / audioElement.duration) * 100);
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        audioElement.pause();
      };
    }
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const jumpToChapter = (time: number) => {
    if (!audio) return;
    audio.currentTime = time;
    if (!isPlaying) audio.play();
    setIsPlaying(true);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Timeline */}
      <div
        className="relative w-full h-3 bg-gray-200 dark:bg-gray-700  cursor-pointer"
        style={{ width }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-white"
          style={{ width: `${progress}%` }}
        />
        {/* Chapters (visible immediately after metadata loads) */}
        {duration > 0 &&
          chapters.map((ch, idx) => (
            <div
              key={idx}
              className="absolute top-0 w-1 h-3 bg-blue-300 cursor-pointer"
              style={{ left: `${(ch.time / duration) * 100}%` }}
              onClick={() => jumpToChapter(ch.time)}
              title={ch.label}
            />
          ))}
      </div>

      {/* Play/Pause */}
      <Button
        className="w-20 text-sm px-2 py-1"
        variant="outline"
        onClick={togglePlay}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>

      {/* Chapters List */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {chapters.map((ch, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="outline"
            onClick={() => jumpToChapter(ch.time)}
          >
            {ch.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
