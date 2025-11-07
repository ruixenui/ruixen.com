"use client";

import React, { useRef, useState } from "react";
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

interface VideoPlayerProProps {
  src: string;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoPlayerPro: React.FC<VideoPlayerProProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Play / Pause / Restart
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isEnded) {
      videoRef.current.currentTime = 0;
      setIsEnded(false);
    }
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Update progress and time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const prog =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(isFinite(prog) ? prog : 0);
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  // Video ended
  const handleEnded = () => {
    setIsEnded(true);
    setIsPlaying(false);
  };

  // Seek
  const handleSeek = (percent: number) => {
    if (!videoRef.current) return;
    const time = (percent / 100) * (videoRef.current.duration || 0);
    if (isFinite(time)) videoRef.current.currentTime = time;
    setProgress(percent);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    // Must be called inside a user-initiated event
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen failed:", err);
      });
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    setVolume(!isMuted ? 0 : 1);
    if (!isMuted) videoRef.current.volume = 0;
    else videoRef.current.volume = 1;
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full"
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlay}
      />

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] backdrop-blur-xl bg-white/10 rounded-2xl p-3 flex flex-col gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
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

            {/* Control Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play / Pause / Restart */}
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
                    <Button variant="ghost" size="icon" className="text-white">
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : volume > 0.5 ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <Volume1 className="w-5 h-5" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-transparent border-none p-2">
                    <Slider
                      value={[volume * 100]}
                      onValueChange={(val: number[]) => {
                        const newVolume = val[0] / 100;
                        if (videoRef.current)
                          videoRef.current.volume = newVolume;
                        setVolume(newVolume);
                        setIsMuted(newVolume === 0);
                      }}
                      step={1}
                      min={0}
                      max={100}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>

                {/* Timer */}
                <span className="text-white text-sm">
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
                            if (videoRef.current)
                              videoRef.current.playbackRate = s;
                            setPlaybackSpeed(s);
                          }}
                        >
                          {s}x
                        </Button>
                      ))}
                      <span className="text-sm font-medium text-muted-foreground mt-2">
                        Captions
                      </span>
                      <Button variant="outline" size="sm" className="w-full">
                        Off
                      </Button>
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
