"use client";

import { HaloReel, type HaloReelItem } from "@/registry/ruixenui/halo-reel";

const CDN = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev";

const CARDS: HaloReelItem[] = [
  {
    src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: "Double-exposure portrait blended with a city skyline at dusk",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-03.png`,
    alt: "Moon-toned gradient",
  },
  {
    src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: `${CDN}/gradients/shade_shiters/shade-shifters-05.png`,
    alt: "Shifting shade gradient",
  },
  {
    src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: "Figure holding a racket that dissolves into a swirling colourful cloud",
  },
  {
    src: `${CDN}/gradients/shade_shiters/shade-shifters-09.png`,
    alt: "Shifting shade gradient",
  },
  {
    src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: "Hand gesture with a colourful cutout of a bird flying through the fingers",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-06.png`,
    alt: "Moon-toned gradient",
  },
];

export default function HaloReelDemo() {
  return (
    <HaloReel
      items={CARDS}
      aria-label="Recent work"
      centerLabel={
        <span className="text-[3.4vw] font-medium tracking-tight text-foreground">
          Selected works
        </span>
      }
      cardWidth={130}
      cardHeight={180}
      minScale={0.4}
      radiusYRatio={0.36}
      holdDuration={1000}
      stepDuration={700}
      className="h-[560px] bg-muted/40"
    />
  );
}
