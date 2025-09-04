"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Square, // Stop button
} from "lucide-react";
import { useDirection } from "@radix-ui/react-direction";

const videoPlayerVariants = cva(
  "relative w-full bg-black rounded-card overflow-hidden group",
  {
    variants: {
      size: {
        sm: "max-w-md",
        default: "max-w-2xl",
        lg: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface VideoPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement>,
    VariantProps<typeof videoPlayerVariants> {
  src: string;
  poster?: string;
  showControls?: boolean;
  autoHide?: boolean;
  className?: string;
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      className,
      size,
      src,
      poster,
      showControls = true,
      autoHide = true,
      ...props
    },
    ref,
  ) => {
    const dir = useDirection();

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [showControlsState, setShowControlsState] = React.useState(true);

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const hideControlsTimeoutRef = React.useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

    React.useImperativeHandle(ref, () => videoRef.current!, []);

    // ---- Helpers ----
    const isFiniteTime = (t: number) => Number.isFinite(t) && t >= 0;

    const formatTime = (time: number) => {
      if (!isFiniteTime(time)) return "--:--";
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      return hours > 0
        ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        : `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const hasFiniteDuration = isFiniteTime(duration) && duration > 0;
    const safeProgressPct = hasFiniteDuration
      ? Math.min(100, (currentTime / duration) * 100)
      : 0;

    // ---- Controls ----
    const togglePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      if (isPlaying) {
        v.pause();
      } else {
        // play() can reject; ignore since we're calling from user events
        void v.play();
      }
    };

    const stopPlayback = () => {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      try {
        v.currentTime = 0;
      } catch {
        /* no-op */
      }
      setCurrentTime(0);
      setIsPlaying(false);
      setShowControlsState(true);
    };

    const toggleMute = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = !isMuted;
      setIsMuted(v.muted);
    };

    const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      const v = videoRef.current;
      if (v) {
        v.volume = newVolume;
        if (newVolume > 0 && v.muted) v.muted = false;
      }
      setIsMuted(newVolume === 0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = videoRef.current;
      if (!v) return;
      const newTime = parseFloat(e.target.value);
      const clamped = hasFiniteDuration
        ? Math.max(0, Math.min(duration, newTime))
        : 0;
      setCurrentTime(clamped);
      v.currentTime = clamped;
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        void containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        void document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    const skip = (seconds: number) => {
      const v = videoRef.current;
      if (!v) return;
      const target =
        (hasFiniteDuration ? currentTime : v.currentTime) + seconds;
      const clamped = hasFiniteDuration
        ? Math.max(0, Math.min(duration, target))
        : Math.max(0, target);
      v.currentTime = clamped;
      setCurrentTime(clamped);
    };

    const resetHideControlsTimeout = () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      if (autoHide && isPlaying) {
        hideControlsTimeoutRef.current = setTimeout(() => {
          setShowControlsState(false);
        }, 3000);
      }
    };

    const handleMouseMove = () => {
      setShowControlsState(true);
      resetHideControlsTimeout();
    };

    // ---- Lifecycle: wire video events ----
    React.useEffect(() => {
      const v = videoRef.current;
      if (!v) return;

      const pickDuration = () => {
        let d = v.duration;
        if (!Number.isFinite(d)) {
          // Fallback to seekable range when duration is unknown/stream-like
          if (v.seekable && v.seekable.length > 0) {
            d = v.seekable.end(v.seekable.length - 1);
          }
        }
        setDuration(Number.isFinite(d) ? d : 0);
      };

      const onLoadedMetadata = () => pickDuration();
      const onDurationChange = () => pickDuration();
      const onLoadedData = () => pickDuration();

      const onTimeUpdate = () => setCurrentTime(v.currentTime);
      const onPlay = () => {
        setIsPlaying(true);
        resetHideControlsTimeout();
      };
      const onPause = () => {
        setIsPlaying(false);
        setShowControlsState(true);
        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current);
        }
      };
      const onEnded = () => {
        setIsPlaying(false);
        setShowControlsState(true);
      };
      const onVolumeChange = () => {
        setVolume(v.volume);
        setIsMuted(v.muted || v.volume === 0);
      };

      v.addEventListener("loadedmetadata", onLoadedMetadata);
      v.addEventListener("durationchange", onDurationChange);
      v.addEventListener("loadeddata", onLoadedData);
      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("play", onPlay);
      v.addEventListener("pause", onPause);
      v.addEventListener("ended", onEnded);
      v.addEventListener("volumechange", onVolumeChange);

      // Initial snapshot (in case metadata already available)
      pickDuration();

      return () => {
        v.removeEventListener("loadedmetadata", onLoadedMetadata);
        v.removeEventListener("durationchange", onDurationChange);
        v.removeEventListener("loadeddata", onLoadedData);
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("play", onPlay);
        v.removeEventListener("pause", onPause);
        v.removeEventListener("ended", onEnded);
        v.removeEventListener("volumechange", onVolumeChange);
        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoHide]);

    // Keep DOM in sync when volume/mute state changes via keyboard, etc.
    React.useEffect(() => {
      const v = videoRef.current;
      if (!v) return;
      v.volume = Math.max(0, Math.min(1, volume));
      if (volume > 0 && v.muted) v.muted = false;
    }, [volume]);

    React.useEffect(() => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = isMuted;
    }, [isMuted]);

    React.useEffect(() => {
      const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", onFsChange);
      return () => document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    // Keyboard controls (active when container has focus)
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!containerRef.current?.contains(document.activeElement)) return;

        switch (e.key) {
          case " ":
          case "k":
            e.preventDefault();
            togglePlay();
            break;
          case "m":
            e.preventDefault();
            toggleMute();
            break;
          case "f":
            e.preventDefault();
            toggleFullscreen();
            break;
          case "s": // Stop
            e.preventDefault();
            stopPlayback();
            break;
          case "Home": // jump to start
            e.preventDefault();
            stopPlayback();
            break;
          case "End": // jump to end (if known)
            e.preventDefault();
            if (hasFiniteDuration) {
              const v = videoRef.current;
              if (v) {
                v.currentTime = duration;
                setCurrentTime(duration);
              }
            }
            break;
          case "ArrowLeft":
            e.preventDefault();
            skip(-10);
            break;
          case "ArrowRight":
            e.preventDefault();
            skip(10);
            break;
          case "ArrowUp":
            e.preventDefault();
            setVolume((prev) => Math.min(1, +(prev + 0.1).toFixed(2)));
            break;
          case "ArrowDown":
            e.preventDefault();
            setVolume((prev) => Math.max(0, +(prev - 0.1).toFixed(2)));
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, duration, hasFiniteDuration, isPlaying]);

    return (
      <div
        ref={containerRef}
        className={cn(videoPlayerVariants({ size }), className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() =>
          autoHide && isPlaying && setShowControlsState(false)
        }
        tabIndex={0}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          crossOrigin="anonymous"
          playsInline
          className="w-full h-full object-cover"
          onClick={togglePlay}
          {...props}
        />

        {showControls && (
          <>
            {/* Play/Pause Overlay */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
                !isPlaying || showControlsState ? "opacity-100" : "opacity-0",
              )}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 pointer-events-auto"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 ms-0.5" />
                ) : (
                  <Play className="w-6 h-6 ms-1 rtl:-scale-x-100" />
                )}
              </button>
            </div>

            {/* Controls Bar */}
            <div
              className={cn(
                "absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 to-transparent",
                "transition-opacity duration-300 pointer-events-none",
                showControlsState ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="p-4 space-y-3 pointer-events-auto">
                {/* Progress Bar */}
                <div className="flex items-center gap-2 text-white text-sm">
                  <span className="min-w-0 text-xs font-mono">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-1 relative group/progress">
                    <input
                      type="range"
                      min={0}
                      max={hasFiniteDuration ? duration : 0}
                      value={hasFiniteDuration ? currentTime : 0}
                      disabled={!hasFiniteDuration}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSeek(e);
                      }}
                      className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200
                        group-hover/progress:[&::-webkit-slider-thumb]:scale-125 disabled:cursor-not-allowed"
                      style={{
                        background: `linear-gradient(to ${
                          dir === "rtl" ? "left" : "right"
                        }, #ffffff 0%, #ffffff ${safeProgressPct}%, rgba(255,255,255,0.3) ${safeProgressPct}%, rgba(255,255,255,0.3) 100%)`,
                      }}
                      aria-label="Seek"
                    />
                  </div>
                  <span className="min-w-0 text-xs font-mono">
                    {hasFiniteDuration ? formatTime(duration) : "--:--"}
                  </span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        skip(-10);
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                      aria-label="Rewind 10 seconds"
                    >
                      <SkipBack className="w-4 h-4 rtl:-scale-x-100" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ms-0.5 rtl:-scale-x-100" />
                      )}
                    </button>

                    {/* Stop */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stopPlayback();
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                      aria-label="Stop"
                    >
                      <Square className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        skip(10);
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                      aria-label="Forward 10 seconds"
                    >
                      <SkipForward className="w-4 h-4 rtl:-scale-x-100" />
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2 group/volume">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                        aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <div className="w-0 group-hover/volume:w-20 transition-all duration-200 overflow-hidden">
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.1}
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleVolumeSlider(e);
                          }}
                          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                            [&::-webkit-slider-thumb]:cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${
                              (isMuted ? 0 : volume) * 100
                            }%, rgba(255,255,255,0.3) ${
                              (isMuted ? 0 : volume) * 100
                            }%, rgba(255,255,255,0.3) 100%)`,
                          }}
                          aria-label="Volume"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen();
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                      aria-label={
                        isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <Minimize className="w-4 h-4" />
                      ) : (
                        <Maximize className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer, videoPlayerVariants };
