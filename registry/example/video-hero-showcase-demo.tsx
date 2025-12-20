"use client";

import VideoHeroShowcase from "@/registry/ruixenui/video-hero-showcase";

export default function DemoPage() {
  return (
    <VideoHeroShowcase
      badgeText="Discover the Animal World"
      badgeLink="https://ruixen.com"
      title="Explore nature’s most fascinating creatures"
      subtitle="Learn about wildlife, their habitats, and amazing facts. From the tiniest insects to the largest mammals — dive into the beauty of the animal kingdom."
      primaryButtonText="Start Exploring"
      primaryButtonHref="/docs/ui/getting-started/introduction"
      secondaryButtonText="Animal Data"
      secondaryButtonHref="https://ruixen.com/components"
      videoSrc="/demo-video-player-cmp-src.mp4"
      videoPoster="https://videos.pexels.com/video-files/26772138/12003967_1920_1080_30fps.jpg"
    />
  );
}
