"use client";

import PodcastCardPlayer from "@/registry/ruixenui/podcast-card-player";

export default function PodcastCardPlayerDemo() {
  const podcasts = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&h=200",
      title: "Health & Wellness",
      episodeInfo: "Episode 45: Mindfulness Tips",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1497493292307-31c376b6e479?fit=crop&w=400&h=200",
      title: "Startup Stories",
      episodeInfo: "Episode 78: Scaling Fast",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  return (
    <div className="p-6 flex flex-wrap gap-6 justify-center items-center min-h-screen">
      {podcasts.map((p, idx) => (
        <PodcastCardPlayer
          key={idx}
          imageSrc={p.imageSrc}
          title={p.title}
          episode={p.episodeInfo}
          audioSrc={p.audioSrc}
          width={320}
        />
      ))}
    </div>
  );
}
