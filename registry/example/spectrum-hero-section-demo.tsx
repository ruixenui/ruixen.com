"use client";

import SpectrumHeroSection from "../ruixenui/spectrum-hero-section";

export default function DemoPage() {
  return (
    <SpectrumHeroSection
      title="Discover Your Inner Energy"
      description="Upload your photo and let AI reveal the unseen spectrum of your aura."
      button={{ label: "Try it now", href: "/upload" }}
      image={{ src: "/demo.jpg", alt: "Aura preview" }}
    />
  );
}
