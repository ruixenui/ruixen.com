"use client";

import AudioTimelineWithChapters, {
  Chapter,
} from "@/registry/ruixenui/audio-timeline-with-chapters";

export default function DemoAudioTimelineWithChapters() {
  const chapters: Chapter[] = [
    { time: 0, label: "Intro" },
    { time: 15, label: "Chapter 1" },
    { time: 30, label: "Chapter 2" },
    { time: 45, label: "Chapter 3" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold text-black dark:text-white">
        Podcast Player with Chapters
      </h2>
      <AudioTimelineWithChapters
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        chapters={chapters}
        width={500}
      />
    </div>
  );
}
