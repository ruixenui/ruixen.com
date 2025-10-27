"use client";

import {
  RadioGroup,
  SentimentCard,
} from "@/registry/ruixenui/sentiment-radio-group";

function DemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-md space-y-6">
      <h2 className="text-lg font-semibold">How did it go?</h2>
      <p className="text-sm text-muted-foreground">
        Select the option that best reflects your experience.
      </p>

      <RadioGroup defaultValue="neutral">
        <SentimentCard
          value="angry"
          emoji="😠"
          title="Angry"
          description="Frustrated or upset with the experience."
        />
        <SentimentCard
          value="sad"
          emoji="🙁"
          title="Sad"
          description="Something didn’t meet expectations."
        />
        <SentimentCard
          value="neutral"
          emoji="😐"
          title="Neutral"
          description="Neither good nor bad, just okay."
        />
        <SentimentCard
          value="happy"
          emoji="🙂"
          title="Happy"
          description="Satisfied and had a good experience."
        />
        <SentimentCard
          value="laughing"
          emoji="😀"
          title="Delighted"
          description="Loved it, exceeded expectations!"
        />
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
