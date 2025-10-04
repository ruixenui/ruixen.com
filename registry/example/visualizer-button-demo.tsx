"use client";

import VisualizerButton from "@/registry/ruixenui/visualizer-button";

export default function DemoVisualizer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h2 className="text-xl font-semibold">Visualizer Button Demo</h2>

      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // put a valid mp3 file in public folder
        height={30}
        width={140}
      />

      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        height={25}
        width={120}
      />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click the buttons to play/pause and see live waveform animation.
      </p>
    </div>
  );
}
