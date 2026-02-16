"use client";

import VisualizerButton from "@/registry/ruixenui/visualizer-button";

export default function VisualizerButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <VisualizerButton audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>
  );
}
