"use client";

import { useRef } from "react";

import { ScrollImageTunnel } from "@/registry/ruixenui/scroll-image-tunnel";

const IMAGES = [
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg",
    alt: "Surreal illustration of a diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/821d815affa6496c39cbdeeec7a84603.jpg",
    alt: "Double-exposure portrait of a profile blended with a city skyline at dusk",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/937438c560ada1c83317f2c11b3454b0.jpg",
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/98f89cb9994f5c382ab964062c4039db.jpg",
    alt: "Illustration of a figure holding a racket that dissolves into a swirling colorful cloud at dusk",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg",
    alt: "Black-and-white photo of a hand gesture with a colorful cutout of a bird flying through the fingers",
  },
];

export default function ScrollImageTunnelDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      data-scroll-image-tunnel-demo
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-scroll-image-tunnel-demo]::-webkit-scrollbar{display:none}`,
        }}
      />
      <ScrollImageTunnel
        images={IMAGES}
        container={containerRef}
        stepHeight="150vh"
      />
    </div>
  );
}
