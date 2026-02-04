"use client";

import VisualizerButton from "@/registry/ruixenui/visualizer-button";

export default function VisualizerButtonDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-4 p-8">
      <VisualizerButton audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        bars={18}
        height={24}
      />
    </div>
  );
}
