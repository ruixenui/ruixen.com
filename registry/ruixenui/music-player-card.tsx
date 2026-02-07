"use client";

import * as React from "react";
import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ListPlus,
  Share2,
  Shuffle,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  src: string;
  likes?: string;
  comments?: string;
}

interface MusicPlayerCardProps {
  tracks: Track[];
  className?: string;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

export default function MusicPlayerCard({
  tracks,
  className,
}: MusicPlayerCardProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const playingRef = React.useRef(false);

  const [trackIndex, setTrackIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState("0:00");
  const [liked, setLiked] = React.useState(false);
  const [shuffleOn, setShuffleOn] = React.useState(false);
  const [repeatOn, setRepeatOn] = React.useState(false);

  const track = tracks[trackIndex];

  React.useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  React.useEffect(() => {
    if (!track) return;

    setProgress(0);
    setCurrentTime("0:00");

    const audio = new Audio(track.src);
    audioRef.current = audio;

    const onTime = () => {
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
      setCurrentTime(fmt(audio.currentTime));
    };

    const onEnd = () => {
      if (repeatOn) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else if (trackIndex < tracks.length - 1) {
        setTrackIndex((i) => i + 1);
      } else {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime("0:00");
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    if (playingRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setTrackIndex((i) => (i > 0 ? i - 1 : tracks.length - 1));
    }
  };

  const nextTrack = () => {
    if (shuffleOn && tracks.length > 1) {
      let next: number;
      do {
        next = Math.floor(Math.random() * tracks.length);
      } while (next === trackIndex);
      setTrackIndex(next);
    } else {
      setTrackIndex((i) => (i < tracks.length - 1 ? i + 1 : 0));
    }
  };

  const seek = (e: React.PointerEvent | PointerEvent) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    seek(e);
    const onMove = (ev: PointerEvent) => seek(ev);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  if (!track) return null;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[320px] rounded-2xl border-2 border-border bg-card p-4",
        className,
      )}
    >
      {/* album art + heart */}
      <div className="relative overflow-hidden rounded-[10px]">
        <img
          src={track.cover}
          alt={track.title}
          className="aspect-square w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute right-2.5 top-2.5 transition-transform duration-200 active:scale-90"
          aria-label={liked ? "Unlike" : "Like"}
        >
          <Heart
            className="size-[18px] drop-shadow-md"
            fill={liked ? "#ef4444" : "none"}
            stroke={liked ? "#ef4444" : "rgba(255,255,255,0.6)"}
            strokeWidth={liked ? 0 : 1.8}
          />
        </button>
      </div>

      {/* title + artist */}
      <div className="mt-3">
        <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-foreground">
          {track.title}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {track.artist}
        </p>
      </div>

      {/* action pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {/* like / dislike */}
        <div className="flex items-center rounded-full bg-foreground/[0.08] px-2.5 py-1">
          <ThumbsUp className="size-[12px] text-muted-foreground" />
          {track.likes && (
            <span className="ml-1 text-[10px] text-muted-foreground">
              {track.likes}
            </span>
          )}
          <div className="mx-1.5 h-[12px] w-px bg-border" />
          <ThumbsDown className="size-[12px] text-muted-foreground" />
        </div>

        {/* comments */}
        {track.comments && (
          <div className="flex items-center rounded-full bg-foreground/[0.08] px-2.5 py-1">
            <MessageSquare className="size-[12px] text-muted-foreground" />
            <span className="ml-1 text-[10px] text-muted-foreground">
              {track.comments}
            </span>
          </div>
        )}

        {/* save */}
        <button className="flex items-center rounded-full bg-foreground/[0.08] px-2.5 py-1 transition-colors hover:bg-foreground/[0.12]">
          <ListPlus className="size-[12px] text-muted-foreground" />
          <span className="ml-1 text-[10px] text-muted-foreground">Save</span>
        </button>

        {/* share */}
        <button className="flex items-center rounded-full bg-foreground/[0.08] px-2.5 py-1 transition-colors hover:bg-foreground/[0.12]">
          <Share2 className="size-[12px] text-muted-foreground" />
          <span className="ml-1 text-[10px] text-muted-foreground">Share</span>
        </button>
      </div>

      {/* progress bar */}
      <div className="mt-4">
        <div
          ref={progressRef}
          onPointerDown={onPointerDown}
          className="relative h-[2px] w-full cursor-pointer rounded-full bg-foreground/[0.12]"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-foreground"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 size-[9px] rounded-full bg-foreground shadow-md"
            style={{
              left: `${progress}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div className="mt-1.5 flex justify-between">
          <span className="text-[10px] tabular-nums text-muted-foreground/60">
            {currentTime}
          </span>
          <span className="text-[10px] tabular-nums text-muted-foreground/60">
            {track.duration}
          </span>
        </div>
      </div>

      {/* transport controls */}
      <div className="mt-1.5 flex items-center justify-between">
        <button
          onClick={() => setShuffleOn((s) => !s)}
          className={cn(
            "transition-colors duration-200",
            shuffleOn
              ? "text-foreground"
              : "text-foreground/30 hover:text-foreground/50",
          )}
          aria-label="Shuffle"
        >
          <Shuffle className="size-[16px]" />
        </button>

        <button
          onClick={prevTrack}
          className="text-foreground/60 transition-colors duration-200 hover:text-foreground"
          aria-label="Previous"
        >
          <SkipBack className="size-[20px]" fill="currentColor" />
        </button>

        <button
          onClick={togglePlay}
          className="flex size-[44px] items-center justify-center rounded-full bg-foreground text-background transition-transform duration-200 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-[18px]" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 size-[18px]" fill="currentColor" />
          )}
        </button>

        <button
          onClick={nextTrack}
          className="text-foreground/60 transition-colors duration-200 hover:text-foreground"
          aria-label="Next"
        >
          <SkipForward className="size-[20px]" fill="currentColor" />
        </button>

        <button
          onClick={() => setRepeatOn((r) => !r)}
          className={cn(
            "transition-colors duration-200",
            repeatOn
              ? "text-foreground"
              : "text-foreground/30 hover:text-foreground/50",
          )}
          aria-label="Repeat"
        >
          <Repeat className="size-[16px]" />
        </button>
      </div>
    </div>
  );
}
