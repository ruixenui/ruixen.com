// app/hero-demo/page.tsx
import { HeroSection } from "@/registry/ruixenui/hero-section-glass-web";

export default function Page() {
  return (
    <HeroSection
      imageSrc="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/screen-website-template.png"
      imageAlt="Design in motion"
      kicker="Category: Creative Systems"
      title="Create experiences at the speed "
      description="An AI design workspace that helps you sketch ideas, evolve layouts, and ship complete interfaces—without breaking flow."
      primaryAction={{ href: "#start", label: "Start free" }}
      secondaryAction={{ href: "#plans", label: "See pricing" }}
      coordinates={"34°N 118°W\nLos Angeles, US"}
      metaLeft="Vol. 05 / 2025"
      metaCenter="AI study: Motion & form"
      metaRight="scroll to explore"
    />
  );
}
