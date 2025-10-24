"use client";

import SpectrumHeroSection from "../ruixenui/spectrum-hero-section";

export default function DemoPage() {
  return (
    <SpectrumHeroSection
      title="Discover Your Inner Energy"
      description="Upload your photo and let AI reveal the unseen spectrum of your aura."
      button={{ label: "Try it now", href: "/upload" }}
      image={{
        src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/screen-website-template.png",
        alt: "Aura preview",
      }}
    />
  );
}
