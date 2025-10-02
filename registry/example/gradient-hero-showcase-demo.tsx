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
          src: "https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75",
          alt: "App screen dark",
        },
        {
          src: "https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75",
          alt: "App screen light",
        },
      ]}
    />
  );
}
