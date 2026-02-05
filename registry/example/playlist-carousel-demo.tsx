"use client";

import PlaylistCarousel, { Track } from "@/registry/ruixenui/playlist-carousel";

const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Drive",
    artist: "Neon Pulse",
    cover: "https://picsum.photos/seed/track1/300/300",
    duration: "3:45",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Ocean Breeze",
    artist: "Calm Shores",
    cover: "https://picsum.photos/seed/track2/300/300",
    duration: "4:20",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "City Lights",
    artist: "Urban Echo",
    cover: "https://picsum.photos/seed/track3/300/300",
    duration: "5:10",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Forest Rain",
    artist: "Nature Sounds",
    cover: "https://picsum.photos/seed/track4/300/300",
    duration: "3:30",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Stargazing",
    artist: "Cosmos",
    cover: "https://picsum.photos/seed/track5/300/300",
    duration: "4:55",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

export default function PlaylistCarouselDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <PlaylistCarousel tracks={tracks} />
      </div>
    </div>
  );
}
