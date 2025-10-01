"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type HoverPlayCardProps = {
  src: string;
  poster?: string;
  className?: string;
  loop?: boolean;
  mutedOnHover?: boolean; // default true to satisfy autoplay policy
};

export default function HoverPlayCard({
  src,
  poster,
  className,
  loop = false,
  mutedOnHover = true,
}: HoverPlayCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userStarted, setUserStarted] = useState(false); // true when user clicked play
  const [prevMuted, setPrevMuted] = useState<boolean | null>(null);

  // Play muted on hover (if allowed). Pause on leave.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ignore = false;

    const doPlayMuted = async () => {
      if (!video) return;
      // Save previous muted state first time
      if (prevMuted === null) setPrevMuted(video.muted);

      if (mutedOnHover) {
        video.muted = true;
      }
      try {
        await video.play();
        if (!ignore) setIsPlaying(true);
      } catch {
        // autoplay blocked (shouldn't if muted) — ignore
        if (!ignore) setIsPlaying(false);
      }
    };

    const doPause = () => {
      if (!video) return;
      video.pause();
      setIsPlaying(false);
      // restore mute state only if user didn't start playback manually
      if (!userStarted && prevMuted !== null) {
        video.muted = prevMuted;
      }
    };

    if (isHovering && !userStarted) {
      // only auto play on hover when user hasn't manually started playback
      void doPlayMuted();
    } else if (!isHovering && !userStarted) {
      doPause();
    }

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering, mutedOnHover, userStarted]);

  // If user clicks play icon: toggle playback and treat as user gesture
  const handleIconClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    // If not playing, user-initiated play: unmute (restore prevMuted false) so user hears audio
    if (!isPlaying) {
      // Mark that user started explicit playback
      setUserStarted(true);
      // restore to unmuted so clicking plays with sound
      video.muted = false;
      setPrevMuted(false);
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // if play fails, keep state consistent
        console.error("Play failed:", err);
        setIsPlaying(false);
      }
    } else {
      // pause on click
      video.pause();
      setIsPlaying(false);
    }
  };

  // keep visual play state in sync with native events (in case video ends or is paused externally)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setUserStarted(false); // allow hover autoplay after end if desired
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden shadow-sm group",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        // do not set autoplay here — we control playback on hover/click
        className="w-full h-full max-w-xl object-cover"
      />

      {/* Overlay: Play/Pause button (always visible but subtle) */}
      <AnimatePresence>
        {/* show when not playing OR when hovered (to allow pause by clicking) */}
        {(isHovering || !isPlaying) && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick();
              }}
              className="pointer-events-auto bg-black/20 hover:bg-black/40 text-white rounded-full w-16 h-16"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* small subtle status badge bottom-left */}
      <div className="absolute left-3 bottom-3 text-xs text-muted-foreground bg-black/20 px-2 py-1 rounded-full">
        {isPlaying ? "Playing" : "Paused"}
      </div>
    </div>
  );
}
