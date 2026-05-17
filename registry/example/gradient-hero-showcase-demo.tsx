"use client";

import GradientHeroShowcase from "../ruixenui/gradient-hero-showcase";

export default function DemoPage() {
  return (
    <GradientHeroShowcase
      title="Revolutionize Your Workflow"
      description="Seamlessly integrate AI and automation to accelerate your business."
      buttons={[
        { label: "Get Started", href: "/start", variant: "default" },
        { label: "Book a Demo", href: "/demo", variant: "gradient" },
      ]}
      images={[
        {
          src: "https://placehold.co/2400x1500/0a0a0a/ffffff/png?text=App+Screen",
          alt: "App screen dark",
        },
        {
          src: "https://placehold.co/2400x1500/ffffff/0a0a0a/png?text=App+Screen",
          alt: "App screen light",
        },
      ]}
    />
  );
}
