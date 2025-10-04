"use client";

import * as React from "react";
import VoiceMessageBubble from "@/registry/ruixenui/voice-message-bubble";

export default function DemoVoiceMessageBubble() {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
        Voice Message Bubble Demo
      </h2>

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        duration={15}
        bubbleColor="#fff"
        waveColor="#000"
      />

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        duration={10}
        bubbleColor="#000"
        waveColor="#fff"
      />

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        duration={20}
        bubbleColor="#fff"
        waveColor="#000"
      />

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        duration={12}
        bubbleColor="#000"
        waveColor="#fff"
      />
    </div>
  );
}
