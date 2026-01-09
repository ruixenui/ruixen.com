"use client";

import * as React from "react";
import CheckboxCard from "@/registry/ruixenui/checkbox-card";
import { Zap, Shield, Rocket, Sparkles } from "lucide-react";

export default function CheckboxCardDemo() {
  const [selected, setSelected] = React.useState<string[]>(["performance"]);

  const features = [
    {
      id: "performance",
      title: "Performance",
      description: "Optimized for speed and efficiency",
      icon: <Zap className="size-5" />,
    },
    {
      id: "security",
      title: "Security",
      description: "Enterprise-grade protection",
      icon: <Shield className="size-5" />,
    },
    {
      id: "scalability",
      title: "Scalability",
      description: "Grow without limits",
      icon: <Rocket className="size-5" />,
    },
    {
      id: "ai",
      title: "AI Features",
      description: "Smart automation tools",
      icon: <Sparkles className="size-5" />,
    },
  ];

  const toggleFeature = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <CheckboxCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            checked={selected.includes(feature.id)}
            onCheckedChange={() => toggleFeature(feature.id)}
          />
        ))}
      </div>
    </div>
  );
}
