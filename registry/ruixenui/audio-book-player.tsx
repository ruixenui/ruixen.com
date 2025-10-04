"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioBookPlayerProps {
  audioSrc?: string;
  chapterTitle?: string;
  author?: string;
  className?: string;
}

export default function AudioBookPlayer({
  audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  chapterTitle = "Chapter 1: The Beginning",
  author = "John Doe",
  className,
}: AudioBookPlayerProps) {
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [speed, setSpeed] = React.useState(1);

  React.useEffect(() => {
    // Only create Audio instance on client side
    if (typeof window !== "undefined") {
      const audioElement = new Audio(audioSrc);
      setAudio(audioElement);

      const updateProgress = () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      };

      audioElement.addEventListener("timeupdate", updateProgress);
      return () => {
        audioElement.pause();
        audioElement.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    if (!audio) return;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  const changeSpeed = () => {
    if (!audio) return;
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    audio.playbackRate = nextSpeed;
    setSpeed(nextSpeed);
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 border dark:border-gray-700 shadow-lg rounded-xl p-4 flex flex-col gap-3 w-[350px]",
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {chapterTitle}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{author}</p>
        </div>
        <Button size="sm" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>

      <Slider value={[progress]} onValueChange={(val) => handleSeek(val[0])} />

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {progress.toFixed(0)}%
        </span>
        <Button size="sm" onClick={changeSpeed}>
          {speed}x
        </Button>
      </div>
    </div>
  );
}
