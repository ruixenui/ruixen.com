"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceMessageBubbleProps {
  audioSrc: string;
  duration: number; // in seconds
  bubbleColor?: string;
  waveColor?: string;
  className?: string;
}

export default function VoiceMessageBubble({
  audioSrc,
  duration,
  bubbleColor = "#fff",
  waveColor = "#000",
  className,
}: VoiceMessageBubbleProps) {
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

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl shadow-sm",
        className,
      )}
      style={{ backgroundColor: bubbleColor }}
    >
      {/* Play/Pause Button */}
      <Button
        variant="outline"
        className="p-2 rounded-full"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>

      {/* Waveform */}
      <div
        className="flex-1 h-6 relative cursor-pointer"
        onClick={(e) => {
          if (!audio) return;
          const rect = (e.target as HTMLDivElement).getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          audio.currentTime = (clickX / rect.width) * audio.duration;
        }}
      >
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-sm"
              style={{
                width: 2,
                height: `${4 + Math.random() * 12}px`,
                backgroundColor: waveColor,
              }}
            />
          ))}
        </div>

        {/* Progress Overlay */}
        <div
          className="absolute top-0 left-0 h-full rounded-sm"
          style={{
            width: `${progress}%`,
            backgroundColor: waveColor,
            opacity: 0.3,
          }}
        />
      </div>

      {/* Duration */}
      <span
        className={cn(
          "text-sm font-mono",
          waveColor === "#fff" ? "text-white" : "text-black",
        )}
      >
        {duration}s
      </span>
    </div>
  );
}
