"use client";

import { PhoneScrollHero } from "@/registry/ruixenui/phone-scroll-hero";

const SCREEN_VIDEO =
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/landscape-videos/old-money-lookbook.mp4";

export default function PhoneScrollHeroDemo() {
  return (
    <PhoneScrollHero
      titleComponent={
        <>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Autumn / Winter lookbook
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            The whole collection,
            <br />
            <span className="mt-1 block text-5xl font-bold leading-none tracking-tight md:text-[6rem]">
              in your pocket
            </span>
          </h1>
        </>
      }
    >
      {/* Landscape source in a portrait screen — object-cover crops to the
          centre of the frame, which is what a phone-shot feed looks like. */}
      <video
        src={SCREEN_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Autumn/winter lookbook film playing on the phone screen"
        className="h-full w-full object-cover"
      />
    </PhoneScrollHero>
  );
}
