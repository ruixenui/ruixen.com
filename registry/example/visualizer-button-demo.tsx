"use client";

import VisualizerButton from "@/registry/ruixenui/visualizer-button";

export default function DemoVisualizer() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        height={30}
        width={140}
      />

      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        height={25}
        width={120}
      />
    </div>
  );
}
