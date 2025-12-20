"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize2,
  RotateCw,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoPlayerProProps {
  src: string;
  poster?: string;
  className?: string;
}

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoPlayerPro: React.FC<VideoPlayerProProps> = ({
  src,
  poster,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastVolumeRef = useRef<number>(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const [loadError, setLoadError] = useState<string | null>(null);

  // Reload/reset cleanly when src changes
  useEffect(() => {
    const v = videoRef.current;
    setLoadError(null);
    setIsPlaying(false);
    setIsEnded(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    if (!v) return;
    try {
      v.pause();
      v.load(); // important when using <source> or when src changes
    } catch {
      // ignore
    }
  }, [src]);

  const updateTimeState = () => {
    const v = videoRef.current;
    if (!v) return;

    const d = v.duration;
    const t = v.currentTime;

    setDuration(isFinite(d) ? d : 0);
    setCurrentTime(isFinite(t) ? t : 0);

    const prog = d > 0 ? (t / d) * 100 : 0;
    setProgress(isFinite(prog) ? prog : 0);
  };

  // Robust play with catch (prevents "Uncaught (in promise)")
  const safePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      await v.play();
      // state will be updated by onPlay handler
    } catch (err: any) {
      // This is where your error originates
      console.error("video.play() failed:", err);

      const mediaErr = v.error;
      const code = mediaErr?.code;

      // Helpful message based on MediaError codes
      // 1: aborted, 2: network, 3: decode, 4: src not supported
      const msg =
        code === 2
          ? "Network error while loading video (blocked/404/403/CSP?)."
          : code === 3
            ? "Decode error (codec not supported or corrupted file)."
            : code === 4
              ? "Source not supported (bad URL/HTML response/wrong MIME/codec)."
              : "Playback failed.";

      setLoadError(msg);
      setIsPlaying(false);
    }
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    // If ended, restart
    if (isEnded) {
      v.currentTime = 0;
      setIsEnded(false);
    }

    if (v.paused) {
      await safePlay();
    } else {
      v.pause();
    }
  };

  const handleSeek = (percent: number) => {
    const v = videoRef.current;
    if (!v) return;

    const d = v.duration || 0;
    const time = (percent / 100) * d;

    if (isFinite(time)) {
      v.currentTime = time;
      setProgress(percent);
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen failed:", err);
      });
    }
  };

  const setVideoVolume = (v: number) => {
    const video = videoRef.current;
    if (!video) return;

    const clamped = Math.min(1, Math.max(0, v));
    video.volume = clamped;

    setVolume(clamped);
    const mutedNow = clamped === 0;
    setIsMuted(mutedNow);
    video.muted = mutedNow;

    if (!mutedNow) lastVolumeRef.current = clamped;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.muted || volume === 0) {
      // unmute -> restore last volume
      v.muted = false;
      const restore = lastVolumeRef.current > 0 ? lastVolumeRef.current : 1;
      setVideoVolume(restore);
    } else {
      // mute
      lastVolumeRef.current = volume;
      v.muted = true;
      setIsMuted(true);
      setVolume(0);
      v.volume = 0;
    }
  };

  const VolumeIcon =
    isMuted || volume === 0 ? VolumeX : volume > 0.5 ? Volume2 : Volume1;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black",
        className,
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        className="w-full h-auto"
        poster={poster}
        preload="metadata"
        playsInline
        // crossOrigin can help in some environments (esp. if later you draw to canvas)
        crossOrigin="anonymous"
        onClick={togglePlay}
        onTimeUpdate={updateTimeState}
        onLoadedMetadata={updateTimeState}
        onDurationChange={updateTimeState}
        onPlay={() => {
          setIsPlaying(true);
          setLoadError(null);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsEnded(true);
          setIsPlaying(false);
        }}
        onError={() => {
          const v = videoRef.current;
          const code = v?.error?.code;

          console.error("Video element error:", {
            code,
            src,
            networkState: v?.networkState,
            readyState: v?.readyState,
            currentSrc: v?.currentSrc,
          });

          const msg =
            code === 2
              ? "Network error while loading video (blocked/404/403/CSP?)."
              : code === 3
                ? "Decode error (codec not supported or corrupted file)."
                : code === 4
                  ? "Source not supported (bad URL/HTML response/wrong MIME/codec)."
                  : "Video failed to load.";

          setLoadError(msg);
          setIsPlaying(false);
        }}
      >
        {/* Using <source> helps some browsers pick types more reliably */}
        <source src={src} type="video/mp4" />
      </video>

      {/* Error overlay (so you know instantly what happened) */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/70">
          <div className="max-w-md text-center text-white space-y-2">
            <div className="text-sm font-semibold">Video can’t be played</div>
            <div className="text-xs opacity-90">{loadError}</div>
            <div className="text-[11px] opacity-70 break-all">{src}</div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setLoadError(null);
                videoRef.current?.load();
              }}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Controls */}
      <AnimatePresence>
        {showControls && !loadError && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] backdrop-blur-xl bg-white/10 rounded-2xl p-3 flex flex-col gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress */}
            <div
              className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                handleSeek((x / rect.width) * 100);
              }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-white/70 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause/Restart */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={togglePlay}
                >
                  {isEnded ? (
                    <RotateCw className="w-5 h-5" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>

                {/* Volume */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={toggleMute}
                    >
                      <VolumeIcon className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-32 bg-transparent border-none p-2">
                    <Slider
                      value={[Math.round(volume * 100)]}
                      onValueChange={(val: number[]) => {
                        setVideoVolume((val?.[0] ?? 0) / 100);
                      }}
                      step={1}
                      min={0}
                      max={100}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>

                {/* Time */}
                <span className="text-white text-sm tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Settings */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-background w-40 p-2">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Speed
                      </span>
                      {[0.5, 1, 1.5, 2].map((s) => (
                        <Button
                          key={s}
                          variant={playbackSpeed === s ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const v = videoRef.current;
                            if (v) v.playbackRate = s;
                            setPlaybackSpeed(s);
                          }}
                        >
                          {s}x
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Fullscreen */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayerPro;
