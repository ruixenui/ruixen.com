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
        { src: "/demo-dark.png", alt: "Dark Mode Preview" },
        { src: "/demo-light.png", alt: "Light Mode Preview" },
      ]}
    />
  );
}
