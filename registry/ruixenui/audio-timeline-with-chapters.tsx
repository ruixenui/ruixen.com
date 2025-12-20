"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Chapter {
  time: number; // seconds
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
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [progress, setProgress] = React.useState(0); // 0..100
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  // Attach listeners once
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsReady(true);
      setErrorMsg(null);
    };

    const onTimeUpdate = () => {
      if (!audio.duration || !Number.isFinite(audio.duration)) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    const onError = () => {
      // Try to provide a helpful message
      const mediaErr = audio.error;
      let msg = "Audio could not be played.";

      if (mediaErr) {
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code
        switch (mediaErr.code) {
          case mediaErr.MEDIA_ERR_ABORTED:
            msg = "Playback was aborted.";
            break;
          case mediaErr.MEDIA_ERR_NETWORK:
            msg = "Network error while loading audio (check URL/CORS/403).";
            break;
          case mediaErr.MEDIA_ERR_DECODE:
            msg = "Audio decode failed (unsupported/invalid file).";
            break;
          case mediaErr.MEDIA_ERR_SRC_NOT_SUPPORTED:
            msg = "Audio source not supported (wrong URL or MIME type).";
            break;
          default:
            msg = "Audio error.";
        }
      }

      setErrorMsg(msg);
      setIsReady(false);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // When src changes: reset UI state
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setProgress(0);
    setDuration(0);
    setIsReady(false);
    setIsPlaying(false);
    setErrorMsg(null);

    // Force reload of media
    audio.pause();
    audio.currentTime = 0;
    audio.load();
  }, [audioSrc]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setErrorMsg(null);

    if (audio.paused) {
      try {
        // Ensure we have metadata; if not, browser will still try.
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // This is where your error was coming from
        setIsPlaying(false);
        setErrorMsg(
          "Unable to start playback. Check that the URL serves an actual audio file (and allows CORS/range requests).",
        );
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const jumpToChapter = async (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setErrorMsg(null);

    // clamp time
    const t = Math.max(0, Math.min(time, duration || time));
    audio.currentTime = t;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setErrorMsg(
        "Unable to play after seeking. Check that the audio source supports seeking (range requests) and is playable.",
      );
    }
  };

  const onTimelineClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const t = ratio * duration;

    audio.currentTime = t;
    setErrorMsg(null);

    // Optional: if it was playing, keep playing; if paused, don’t force autoplay
    if (isPlaying) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
        setErrorMsg("Could not continue playback after scrubbing.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Real audio element in DOM (more reliable than new Audio()) */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Timeline */}
      <div
        className="relative h-3 cursor-pointer bg-muted/40 border border-border/60"
        style={{ width }}
        onClick={onTimelineClick}
        role="slider"
        aria-label="Audio timeline"
      >
        <div
          className="absolute left-0 top-0 h-full bg-foreground/70"
          style={{ width: `${progress}%` }}
        />

        {/* Chapter markers */}
        {duration > 0 &&
          chapters.map((ch, idx) => (
            <button
              key={idx}
              type="button"
              className="absolute top-0 h-3 w-[3px] bg-foreground/30 hover:bg-foreground/60"
              style={{ left: `${(ch.time / duration) * 100}%` }}
              title={ch.label}
              onClick={(ev) => {
                ev.stopPropagation();
                jumpToChapter(ch.time);
              }}
              aria-label={`Jump to ${ch.label}`}
            />
          ))}
      </div>

      {/* Play/Pause */}
      <Button
        className="w-20 text-sm px-2 py-1"
        variant="outline"
        onClick={togglePlay}
        disabled={!audioSrc}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>

      {/* Error */}
      {errorMsg ? (
        <p className="text-xs text-destructive text-center max-w-[420px]">
          {errorMsg}
        </p>
      ) : null}

      {/* Chapters List */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {chapters.map((ch, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="outline"
            onClick={() => jumpToChapter(ch.time)}
            disabled={!isReady && duration === 0}
          >
            {ch.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
