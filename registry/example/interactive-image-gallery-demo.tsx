"use client";

import { GalleryItem } from "@/registry/ruixenui/interactive-image-gallery";
import { InteractiveImageGallery } from "@/registry/ruixenui/interactive-image-gallery";

export default function GalleryDemoPage() {
  const items: GalleryItem[] = [
    {
      id: "1",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/globe-light.jpg",
    },
    {
      id: "5",
      type: "text",
      text: "Discover our AI-powered visual collection that transforms data and creativity into emotion.",
    },
    {
      id: "2",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/three-dwall-calendar-dark.jpg",
    },
    {
      id: "3",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/solar-system-dark.png",
    },
    {
      id: "6",
      type: "text",
      text: "Explore how intelligent design systems visualize the unseen and amplify imagination.",
    },
    {
      id: "4",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/infinite-scroll-light.png",
    },
    {
      id: "8",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ripple-distortion-dark.png",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex justify-center items-center">
      <InteractiveImageGallery items={items} />
    </main>
  );
}
