"use client";

import {
  RatingScaleGroup,
  RatingScaleItem,
} from "@/registry/ruixenui/rating-scale-group";

function DemoPage() {
  return (
    <div className="max-w-md space-y-6">
      <h2 className="text-lg font-semibold">How satisfied are you?</h2>
      <p className="text-sm text-muted-foreground">
        Choose a number between 1 and 10 that best reflects your experience.
      </p>

      <RatingScaleGroup defaultValue="7">
        {Array.from({ length: 10 }).map((_, i) => (
          <RatingScaleItem
            key={i}
            value={(i + 1).toString()}
            label={(i + 1).toString()}
          />
        ))}
      </RatingScaleGroup>

      <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
        <span>Not satisfied 😞</span>
        <span>Very satisfied 🤩</span>
      </div>
    </div>
  );
}

export default DemoPage;
