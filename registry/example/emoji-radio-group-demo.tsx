"use client";

import { RadioGroup, EmojiRadio } from "@/registry/ruixenui/emoji-radio-group";

function DemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-sm space-y-6">
      <h2 className="text-lg font-semibold">How was your experience?</h2>
      <p className="text-sm text-muted-foreground">
        Select the emoji that best describes your feeling.
      </p>

      <RadioGroup defaultValue="happy">
        <EmojiRadio value="angry" emoji="😡" label="Angry" />
        <EmojiRadio value="neutral" emoji="😐" label="Neutral" />
        <EmojiRadio value="happy" emoji="😊" label="Happy" />
        <EmojiRadio value="love" emoji="😍" label="Loved it" />
      </RadioGroup>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Made by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

export default DemoPage;
