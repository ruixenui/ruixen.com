"use client";

import { FeatureHighlights } from "@/registry/ruixenui/feature-highlights";
import type { FeatureItem } from "@/registry/ruixenui/feature-highlights";

const features: FeatureItem[] = [
  {
    title: "AI-Powered Automation",
    description:
      "Streamline workflows with intelligent automation that learns from your patterns and adapts to your needs.",
    image: (
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png"
        alt=""
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Real-Time Analytics",
    description:
      "Monitor metrics live with sub-second latency. Dashboards update instantly as data flows in.",
    image: (
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png"
        alt=""
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect with the tools you already use. One-click setup, zero configuration drift.",
    image: (
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-01.png"
        alt=""
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Grow without limits. Auto-scaling handles traffic spikes so you never think about capacity.",
    image: (
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-06.png"
        alt=""
        className="h-full w-full object-cover"
      />
    ),
  },
];

export default function FeatureHighlightsDemo() {
  return (
    <FeatureHighlights
      features={features}
      title="Why we're different"
      className="py-0 md:py-0"
    />
  );
}
