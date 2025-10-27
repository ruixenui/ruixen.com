"use client";

import * as React from "react";
import {
  ColorEmotionSelect,
  ColorEmotionOption,
} from "@/registry/ruixenui/color-emotion-select";

const moodOptions: ColorEmotionOption[] = [
  { value: "happy", label: "Happy", color: "#FFD700", emoji: "😄" },
  { value: "sad", label: "Sad", color: "#1E3A8A", emoji: "😢" },
  { value: "angry", label: "Angry", color: "#DC2626", emoji: "😡" },
  { value: "neutral", label: "Neutral", color: "#9CA3AF", emoji: "😐" },
];

export default function DemoColorEmotionSelect() {
  const [selectedMood, setSelectedMood] = React.useState<string | undefined>();

  return (
    <div className="p-4 flex flex-col gap-4 min-h-screen items-center justify-center">
      <ColorEmotionSelect
        options={moodOptions}
        label="Select Your Mood"
        placeholder="Choose mood"
        onChange={setSelectedMood}
        defaultValue={selectedMood}
      />
      {selectedMood && (
        <p className="text-sm text-gray-700">
          You selected: <span className="font-semibold">{selectedMood}</span>
        </p>
      )}
    </div>
  );
}
