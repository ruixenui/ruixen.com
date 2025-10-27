"use client";

import PlaylistCarousel, {
  PlaylistItem,
} from "@/registry/ruixenui/playlist-carousel";

export default function DemoPlaylistCarousel() {
  const items: PlaylistItem[] = [
    {
      id: "1",
      title: "Morning Chill",
      duration: "3:45",
      image: "https://picsum.photos/200/120?random=1",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: "2",
      title: "Evening Focus",
      duration: "4:20",
      image: "https://picsum.photos/200/120?random=2",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: "3",
      title: "Workout Beats",
      duration: "5:10",
      image: "https://picsum.photos/200/120?random=3",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <PlaylistCarousel items={items} width={180} height={260} />
    </div>
  );
}
