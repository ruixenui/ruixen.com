"use client";

import MusicPlayerCard, { Track } from "@/registry/ruixenui/music-player-card";

const tracks: Track[] = [
  {
    id: "1",
    title: "Bleeding Light",
    artist: "The Weeknd",
    cover: "/bleeding-light.jpg",
    duration: "4:59",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    likes: "991k",
    comments: "6k",
  },
  {
    id: "2",
    title: "Midnight City",
    artist: "M83",
    cover: "https://picsum.photos/seed/midcity/400/400",
    duration: "4:03",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    likes: "2.1M",
    comments: "12k",
  },
  {
    id: "3",
    title: "Intro",
    artist: "The xx",
    cover: "https://picsum.photos/seed/thexxintro/400/400",
    duration: "2:07",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    likes: "856k",
    comments: "4k",
  },
];

export default function MusicPlayerCardDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center px-8">
      <MusicPlayerCard tracks={tracks} />
    </div>
  );
}
