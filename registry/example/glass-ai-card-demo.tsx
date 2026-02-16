"use client";

import GlassAICard from "@/registry/ruixenui/glass-ai-card";

export default function GlassAICardDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <GlassAICard onAction={() => console.log("Summarize")} />
    </div>
  );
}
