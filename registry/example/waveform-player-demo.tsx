"use client";

import WaveformPlayer from "@/registry/ruixenui/waveform-player";

export default function DemoWaveformPlayer() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <WaveformPlayer
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        // width={360}
        // height={50}
        // className="rounded-xl shadow-md"
      />
    </div>
  );
}
