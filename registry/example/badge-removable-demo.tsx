"use client";

import * as React from "react";
import BadgeRemovable from "@/registry/ruixenui/badge-removable";

const initialTags = ["React", "TypeScript", "Tailwind", "Next.js", "Shadcn"];

export default function BadgeRemovableDemo() {
  const [tags, setTags] = React.useState(initialTags);

  const handleRemove = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleReset = () => {
    setTags(initialTags);
  };

  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <BadgeRemovable key={tag} onRemove={() => handleRemove(tag)}>
            {tag}
          </BadgeRemovable>
        ))}
      </div>
      {tags.length === 0 && (
        <p className="text-sm text-muted-foreground">All tags removed</p>
      )}
      {tags.length < initialTags.length && (
        <button
          onClick={handleReset}
          className="text-sm text-primary hover:underline"
        >
          Reset tags
        </button>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <BadgeRemovable variant="default">Default</BadgeRemovable>
        <BadgeRemovable variant="outline">Outline</BadgeRemovable>
        <BadgeRemovable variant="destructive">Destructive</BadgeRemovable>
      </div>
    </div>
  );
}
