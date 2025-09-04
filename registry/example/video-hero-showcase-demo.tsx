"use client";

import VideoHeroShowcase from "../ruixenui/video-hero-showcase";

export default function DemoPage() {
  return (
    <VideoHeroShowcase
      badgeText="Discover Ocean Life"
      badgeLink="https://oceanworld.com"
      title="Dive into the Depths of Innovation"
      primaryButtonText="Start Exploring"
      primaryButtonHref="/explore"
      secondaryButtonText="Watch Demo"
      secondaryButtonHref="/demo"
      videoSrc="https://videos.pexels.com/video-files/26772138/12003967_1920_1080_30fps.mp4"
      videoPoster="https://videos.pexels.com/video-files/26772138/12003967_1920_1080_30fps.jpg"
    />
  );
}
