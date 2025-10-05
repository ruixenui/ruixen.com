"use client";

import * as React from "react";
import {
  TagCloudSelect,
  TagCloudOption,
} from "@/registry/ruixenui/tag-cloud-select";

const tagOptions: TagCloudOption[] = [
  { value: "ai", label: "AI", popularity: 95, color: "#ef4444" },
  { value: "nextjs", label: "Next.js", popularity: 85, color: "#3b82f6" },
  { value: "react", label: "React", popularity: 92, color: "#06b6d4" },
  { value: "docker", label: "Docker", popularity: 70, color: "#2563eb" },
  {
    value: "kubernetes",
    label: "Kubernetes",
    popularity: 50,
    color: "#8b5cf6",
  },
  { value: "aws", label: "AWS", popularity: 80, color: "#f59e0b" },
  { value: "sql", label: "SQL", popularity: 60, color: "#10b981" },
  { value: "ml", label: "Machine Learning", popularity: 88, color: "#ec4899" },
  { value: "security", label: "Security", popularity: 40, color: "#f97316" },
  { value: "linux", label: "Linux", popularity: 65, color: "#374151" },
];

export default function DemoTagCloudSelect() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <TagCloudSelect
        options={tagOptions}
        placeholder="Pick your skills..."
        onChange={setSelectedTags}
        defaultSelected={["react", "aws"]}
        minFontSize={12}
        maxFontSize={28}
      />
      {selectedTags.length > 0 && (
        <div>
          <p className="font-medium">Selected Tags:</p>
          <ul className="list-disc pl-5">
            {selectedTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
