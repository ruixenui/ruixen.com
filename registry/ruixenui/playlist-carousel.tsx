"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  src: string;
}

interface PlaylistCarouselProps {
  tracks: Track[];
  className?: string;
}

export default function PlaylistCarousel({
  tracks,
  className,
}: PlaylistCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState("0:00");
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handlePlay = (track: Track) => {
    if (activeTrack === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const audio = new Audio(track.src);
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      const pct = (audio.currentTime / (audio.duration || 1)) * 100;
      setProgress(pct);
      setCurrentTime(formatTime(audio.currentTime));
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    });

    audio.play().catch(() => setIsPlaying(false));
    setActiveTrack(track.id);
    setIsPlaying(true);
  };

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-3 flex">
          {tracks.map((track) => {
            const isActive = activeTrack === track.id;
            return (
              <div key={track.id} className="min-w-0 flex-[0_0_180px] pl-3">
                <div className="group rounded-xl border border-border/40 bg-card p-2.5 shadow-xs transition-shadow hover:shadow-md">
                  <div className="relative mb-2.5 overflow-hidden rounded-lg">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => handlePlay(track)}
                      className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25"
                      aria-label={
                        isActive && isPlaying
                          ? `Pause ${track.title}`
                          : `Play ${track.title}`
                      }
                    >
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-full bg-white shadow-md transition-all",
                          isActive && isPlaying
                            ? "scale-100 opacity-100"
                            : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                        )}
                      >
                        {isActive && isPlaying ? (
                          <Pause className="size-4 fill-black text-black" />
                        ) : (
                          <Play className="ml-0.5 size-4 fill-black text-black" />
                        )}
                      </div>
                    </button>
                  </div>

                  <p className="truncate text-sm font-medium text-card-foreground">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {track.artist}
                  </p>

                  {isActive && (
                    <div className="mt-2 space-y-0.5">
                      <div className="h-[3px] w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-foreground transition-[width] duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] tabular-nums text-muted-foreground">
                          {currentTime}
                        </span>
                        <span className="text-[10px] tabular-nums text-muted-foreground">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {canScrollPrev && (
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute -left-3 top-[40%] flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted"
          aria-label="Previous"
        >
          <ChevronLeft className="size-4 text-muted-foreground" />
        </button>
      )}

      {canScrollNext && (
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute -right-3 top-[40%] flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted"
          aria-label="Next"
        >
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
