"use client";

import AudioBookPlayer from "@/registry/ruixenui/audio-book-player";

export default function DemoAudioBook() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AudioBookPlayer
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        chapterTitle="Chapter 2: The Journey Continues"
        author="Jane Smith"
      />
    </div>
  );
}
